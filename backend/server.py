from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from supabase import create_client


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Supabase connection
supabase_url = os.environ.get('SUPABASE_URL')
supabase_key = os.environ.get('SUPABASE_SERVICE_KEY')
supabase = create_client(supabase_url, supabase_key) if supabase_url and supabase_key else None

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# ========= Supabase Form Submission Models =========

class NewsletterSubmit(BaseModel):
    email: str

class ContactSubmit(BaseModel):
    full_name: str
    email: str
    company: Optional[str] = None
    phone: Optional[str] = None
    inquiry_type: Optional[str] = "general"
    message: Optional[str] = None

class CVSubmit(BaseModel):
    full_name: str
    email: str
    phone: Optional[str] = None
    linkedin_url: Optional[str] = None
    job_role: Optional[str] = None
    experience_years: Optional[str] = None
    preferred_industry: Optional[str] = None
    message: Optional[str] = None

class ConsultationSubmit(BaseModel):
    full_name: str
    email: str
    company: Optional[str] = None
    phone: Optional[str] = None
    service_interest: Optional[str] = None
    preferred_date: Optional[str] = None
    message: Optional[str] = None


# ========= Supabase Form Endpoints =========

@api_router.post("/newsletter")
async def submit_newsletter(data: NewsletterSubmit):
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase not configured")
    try:
        result = supabase.table("newsletter_subscriptions").insert({
            "email": data.email,
            "source": "website_footer"
        }).execute()
        return {"success": True, "message": "Subscribed successfully"}
    except Exception as e:
        error_msg = str(e)
        if "23505" in error_msg or "duplicate" in error_msg.lower():
            raise HTTPException(status_code=409, detail="This email is already subscribed.")
        logger.error(f"Newsletter error: {error_msg}")
        raise HTTPException(status_code=500, detail="Failed to subscribe. Please try again.")

@api_router.post("/contact")
async def submit_contact(data: ContactSubmit):
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase not configured")
    try:
        result = supabase.table("contact_submissions").insert(
            data.model_dump(exclude_none=True)
        ).execute()
        return {"success": True, "message": "Contact form submitted successfully"}
    except Exception as e:
        logger.error(f"Contact error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit. Please try again.")

@api_router.post("/cv")
async def submit_cv(data: CVSubmit):
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase not configured")
    try:
        result = supabase.table("cv_submissions").insert(
            data.model_dump(exclude_none=True)
        ).execute()
        return {"success": True, "message": "CV submitted successfully"}
    except Exception as e:
        logger.error(f"CV error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit. Please try again.")

@api_router.post("/consultation")
async def submit_consultation(data: ConsultationSubmit):
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase not configured")
    try:
        result = supabase.table("consultation_requests").insert(
            data.model_dump(exclude_none=True)
        ).execute()
        return {"success": True, "message": "Consultation request submitted successfully"}
    except Exception as e:
        logger.error(f"Consultation error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit. Please try again.")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
"""
Backend API Tests for Ad Astra Consultants Website
Tests: Health check, status API, newsletter subscription, contact forms
"""

import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://talent-hub-371.preview.emergentagent.com').rstrip('/')


class TestHealthCheck:
    """Health and basic API tests"""

    def test_root_endpoint(self):
        """Test root API endpoint returns Hello World"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "Hello World"
        print("PASS: Root endpoint returns Hello World")

    def test_status_endpoint_get(self):
        """Test GET /api/status returns list"""
        response = requests.get(f"{BASE_URL}/api/status")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"PASS: Status endpoint returns list with {len(data)} items")


class TestStatusAPI:
    """Status CRUD tests"""

    def test_create_status_check(self):
        """Test POST /api/status creates a status check"""
        test_client = f"TEST_client_{uuid.uuid4().hex[:8]}"
        response = requests.post(
            f"{BASE_URL}/api/status",
            json={"client_name": test_client}
        )
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert data["client_name"] == test_client
        assert "timestamp" in data
        print(f"PASS: Created status check for {test_client}")

    def test_verify_status_persisted(self):
        """Test that created status appears in GET list"""
        # Create a unique status
        test_client = f"TEST_verify_{uuid.uuid4().hex[:8]}"
        create_resp = requests.post(
            f"{BASE_URL}/api/status",
            json={"client_name": test_client}
        )
        assert create_resp.status_code == 200
        created_id = create_resp.json()["id"]

        # Verify it appears in the list
        list_resp = requests.get(f"{BASE_URL}/api/status")
        assert list_resp.status_code == 200
        items = list_resp.json()
        found = any(item.get("id") == created_id for item in items)
        assert found, f"Created status {created_id} not found in list"
        print(f"PASS: Status {created_id} persisted and retrieved")


class TestNewsletterAPI:
    """Newsletter subscription endpoint tests"""

    def test_newsletter_valid_email(self):
        """Test newsletter subscription with valid email"""
        unique_email = f"test_{uuid.uuid4().hex[:8]}@testexample.com"
        response = requests.post(
            f"{BASE_URL}/api/newsletter",
            json={"email": unique_email}
        )
        # Should return 200 on success or 409 if already subscribed
        assert response.status_code in [200, 409], f"Unexpected status: {response.status_code}"
        if response.status_code == 200:
            data = response.json()
            assert data["success"] == True
            print(f"PASS: Newsletter subscription successful for {unique_email}")
        else:
            print(f"PASS: Newsletter returned 409 (duplicate) as expected")

    def test_newsletter_missing_email(self):
        """Test newsletter subscription without email returns 422"""
        response = requests.post(
            f"{BASE_URL}/api/newsletter",
            json={}
        )
        # Should return 422 for validation error (missing email)
        assert response.status_code == 422, f"Expected 422, got {response.status_code}"
        print("PASS: Newsletter endpoint validates missing email")


class TestContactAPI:
    """Contact form endpoint tests"""

    def test_contact_valid_submission(self):
        """Test contact form with valid data"""
        unique_email = f"test_contact_{uuid.uuid4().hex[:8]}@testexample.com"
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json={
                "full_name": "Test User",
                "email": unique_email,
                "company": "Test Company",
                "phone": "+1234567890",
                "inquiry_type": "general",
                "message": "This is a test message"
            }
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert data["success"] == True
        print(f"PASS: Contact form submission successful")

    def test_contact_minimal_fields(self):
        """Test contact form with only required fields"""
        unique_email = f"test_minimal_{uuid.uuid4().hex[:8]}@testexample.com"
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json={
                "full_name": "Minimal User",
                "email": unique_email
            }
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        print("PASS: Contact form works with minimal required fields")

    def test_contact_missing_required_fields(self):
        """Test contact form fails without required fields"""
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json={"message": "No name or email"}
        )
        assert response.status_code == 422, f"Expected 422, got {response.status_code}"
        print("PASS: Contact form validates required fields")


class TestCVAPI:
    """CV submission endpoint tests"""

    def test_cv_valid_submission(self):
        """Test CV submission with valid data"""
        unique_email = f"test_cv_{uuid.uuid4().hex[:8]}@testexample.com"
        response = requests.post(
            f"{BASE_URL}/api/cv",
            json={
                "full_name": "Test Candidate",
                "email": unique_email,
                "phone": "+1234567890",
                "linkedin_url": "https://linkedin.com/in/testuser",
                "job_role": "Software Engineer",
                "experience_years": "5+",
                "preferred_industry": "Technology",
                "message": "Looking for new opportunities"
            }
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert data["success"] == True
        print("PASS: CV submission successful")

    def test_cv_minimal_fields(self):
        """Test CV submission with only required fields"""
        unique_email = f"test_cvmin_{uuid.uuid4().hex[:8]}@testexample.com"
        response = requests.post(
            f"{BASE_URL}/api/cv",
            json={
                "full_name": "Minimal Candidate",
                "email": unique_email
            }
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        print("PASS: CV submission works with minimal fields")


class TestConsultationAPI:
    """Consultation request endpoint tests"""

    def test_consultation_valid_submission(self):
        """Test consultation request with valid data"""
        unique_email = f"test_consult_{uuid.uuid4().hex[:8]}@testexample.com"
        response = requests.post(
            f"{BASE_URL}/api/consultation",
            json={
                "full_name": "Test Executive",
                "email": unique_email,
                "company": "Test Corp",
                "phone": "+1234567890",
                "service_interest": "Executive Search",
                "preferred_date": "2026-02-15",
                "message": "Looking for talent acquisition services"
            }
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert data["success"] == True
        print("PASS: Consultation request successful")

    def test_consultation_minimal_fields(self):
        """Test consultation with only required fields"""
        unique_email = f"test_consultmin_{uuid.uuid4().hex[:8]}@testexample.com"
        response = requests.post(
            f"{BASE_URL}/api/consultation",
            json={
                "full_name": "Quick User",
                "email": unique_email
            }
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        print("PASS: Consultation works with minimal fields")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])

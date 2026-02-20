# Supabase Database Setup

Run the following SQL in your Supabase SQL Editor (Dashboard → SQL Editor → New Query):

```sql
-- ===========================================
-- AD ASTRA CONSULTANTS — DATABASE SCHEMA
-- ===========================================

-- 1. Newsletter Subscriptions
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  source TEXT DEFAULT 'website_footer'
);

-- 2. Contact Form Submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  inquiry_type TEXT DEFAULT 'general',
  message TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CV / Resume Submissions
CREATE TABLE IF NOT EXISTS cv_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  linkedin_url TEXT,
  current_role TEXT,
  experience_years TEXT,
  preferred_industry TEXT,
  message TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Consultation Requests
CREATE TABLE IF NOT EXISTS consultation_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  service_interest TEXT,
  preferred_date TEXT,
  message TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Allow anonymous inserts from the website
-- ===========================================

ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for public forms)
CREATE POLICY "Allow anonymous inserts" ON newsletter_subscriptions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON cv_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON consultation_requests
  FOR INSERT WITH CHECK (true);
```

## Steps:
1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to SQL Editor
4. Paste the SQL above and click "Run"
5. Verify tables are created under Table Editor

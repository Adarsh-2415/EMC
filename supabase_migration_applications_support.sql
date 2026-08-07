-- ========================================================
-- PRODUCTION SQL MIGRATION SCRIPT (SECURE)
-- Excel Management Certifications (EMC)
-- Modules: Online Application Management & Support Management
-- ========================================================

-- Enable pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ========================================================
-- 1. Table: emc_online_applications
-- ========================================================
CREATE TABLE IF NOT EXISTS public.emc_online_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  address TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  email TEXT NOT NULL,
  certification_required TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ========================================================
-- 2. Table: emc_support_messages
-- ========================================================
CREATE TABLE IF NOT EXISTS public.emc_support_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  department TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ========================================================
-- 3. Required Indexes
-- ========================================================
CREATE INDEX IF NOT EXISTS idx_emc_apps_created_at ON public.emc_online_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_emc_apps_company_name ON public.emc_online_applications(company_name);
CREATE INDEX IF NOT EXISTS idx_emc_apps_email ON public.emc_online_applications(email);

CREATE INDEX IF NOT EXISTS idx_emc_support_created_at ON public.emc_support_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_emc_support_email ON public.emc_support_messages(email);
CREATE INDEX IF NOT EXISTS idx_emc_support_department ON public.emc_support_messages(department);

-- ========================================================
-- 4. Enable Row Level Security (RLS) & Secure Policies
-- ========================================================
ALTER TABLE public.emc_online_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emc_support_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Allow public insert to emc_online_applications" ON public.emc_online_applications;
DROP POLICY IF EXISTS "Allow public insert to emc_support_messages" ON public.emc_support_messages;
DROP POLICY IF EXISTS "Allow authenticated read emc_online_applications" ON public.emc_online_applications;
DROP POLICY IF EXISTS "Allow authenticated read emc_support_messages" ON public.emc_support_messages;
DROP POLICY IF EXISTS "Allow anon read emc_online_applications" ON public.emc_online_applications;
DROP POLICY IF EXISTS "Allow anon read emc_support_messages" ON public.emc_support_messages;

-- Public website visitors: ONLY INSERT allowed (cannot read data)
CREATE POLICY "Allow public insert to emc_online_applications"
  ON public.emc_online_applications
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public insert to emc_support_messages"
  ON public.emc_support_messages
  FOR INSERT
  WITH CHECK (true);

-- Authenticated admins ONLY: SELECT allowed (read data in Admin Panel)
CREATE POLICY "Allow authenticated read emc_online_applications"
  ON public.emc_online_applications
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated read emc_support_messages"
  ON public.emc_support_messages
  FOR SELECT
  TO authenticated
  USING (true);

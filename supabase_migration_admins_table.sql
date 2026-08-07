-- ========================================================
-- PRODUCTION SQL MIGRATION SCRIPT (EMC ADMINS & SECURITY)
-- Excel Management Certifications (EMC)
-- Table: emc_admins & Strict Row Level Security Policies
-- ========================================================

-- Enable pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ========================================================
-- 1. Table: emc_admins
-- ========================================================
CREATE TABLE IF NOT EXISTS public.emc_admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'Administrator' NOT NULL,
  status BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Index for fast lookup by email and status
CREATE INDEX IF NOT EXISTS idx_emc_admins_email_status ON public.emc_admins(email, status);
CREATE INDEX IF NOT EXISTS idx_emc_admins_user_id ON public.emc_admins(user_id);

-- ========================================================
-- 2. Seed Initial Admin Account
-- ========================================================
INSERT INTO public.emc_admins (email, full_name, role, status)
VALUES ('ankulrocksclub@gmail.com', 'Ankul', 'Super Admin', true)
ON CONFLICT (email) DO UPDATE SET
  status = true,
  role = 'Super Admin';

-- ========================================================
-- 3. Automatic updated_at Timestamp Trigger
-- ========================================================
CREATE OR REPLACE FUNCTION public.update_emc_admins_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_emc_admins_updated_at ON public.emc_admins;
CREATE TRIGGER trg_update_emc_admins_updated_at
  BEFORE UPDATE ON public.emc_admins
  FOR EACH ROW
  EXECUTE FUNCTION public.update_emc_admins_updated_at();

-- ========================================================
-- 4. Enable Row Level Security (RLS) & Policies on emc_admins
-- ========================================================
ALTER TABLE public.emc_admins ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow active admins select emc_admins" ON public.emc_admins;
DROP POLICY IF EXISTS "Allow authenticated select emc_admins" ON public.emc_admins;

CREATE POLICY "Allow authenticated select emc_admins"
  ON public.emc_admins
  FOR SELECT
  TO authenticated
  USING (true);

-- ========================================================
-- 5. Strict RLS Hardening for All Admin Tables
-- Only active users in emc_admins can read/manage data.
-- ========================================================

-- A. emc_certificates
DROP POLICY IF EXISTS "Allow authenticated admin manage emc_certificates" ON public.emc_certificates;
CREATE POLICY "Allow authenticated admin manage emc_certificates"
  ON public.emc_certificates
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.emc_admins a
      WHERE (a.user_id = auth.uid() OR LOWER(a.email) = LOWER(auth.jwt()->>'email'))
      AND a.status = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.emc_admins a
      WHERE (a.user_id = auth.uid() OR LOWER(a.email) = LOWER(auth.jwt()->>'email'))
      AND a.status = true
    )
  );

-- B. emc_online_applications
DROP POLICY IF EXISTS "Allow authenticated read emc_online_applications" ON public.emc_online_applications;
CREATE POLICY "Allow authenticated read emc_online_applications"
  ON public.emc_online_applications
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.emc_admins a
      WHERE (a.user_id = auth.uid() OR LOWER(a.email) = LOWER(auth.jwt()->>'email'))
      AND a.status = true
    )
  );

-- C. emc_support_messages
DROP POLICY IF EXISTS "Allow authenticated read emc_support_messages" ON public.emc_support_messages;
CREATE POLICY "Allow authenticated read emc_support_messages"
  ON public.emc_support_messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.emc_admins a
      WHERE (a.user_id = auth.uid() OR LOWER(a.email) = LOWER(auth.jwt()->>'email'))
      AND a.status = true
    )
  );

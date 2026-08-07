-- ========================================================
-- PRODUCTION SQL MIGRATION SCRIPT (PHASE 1)
-- Excel Management Certifications (EMC)
-- Module: Certificate Management System (Database & Storage Foundation)
-- ========================================================

-- Enable pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ========================================================
-- 1. Table: emc_certificates
-- ========================================================
CREATE TABLE IF NOT EXISTS public.emc_certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_no TEXT UNIQUE NOT NULL,
  issue_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  company_name TEXT NOT NULL,
  address TEXT NOT NULL,
  standard TEXT NOT NULL,
  scope TEXT NOT NULL,
  cons_name TEXT NOT NULL,
  pdf_path TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ========================================================
-- 2. Performance Indexes
-- ========================================================
CREATE UNIQUE INDEX IF NOT EXISTS idx_emc_certs_certificate_no ON public.emc_certificates(certificate_no);
CREATE INDEX IF NOT EXISTS idx_emc_certs_company_name ON public.emc_certificates(company_name);
CREATE INDEX IF NOT EXISTS idx_emc_certs_standard ON public.emc_certificates(standard);
CREATE INDEX IF NOT EXISTS idx_emc_certs_issue_date ON public.emc_certificates(issue_date);
CREATE INDEX IF NOT EXISTS idx_emc_certs_expiry_date ON public.emc_certificates(expiry_date);

-- ========================================================
-- 3. Automatic Expiry Date Calculation Trigger Function
-- Business Rule: Expiry Date = Issue Date + 1 Year
-- Recalculates on INSERT or when issue_date changes on UPDATE
-- ========================================================
CREATE OR REPLACE FUNCTION public.calculate_emc_certificate_expiry()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND (NEW.issue_date IS DISTINCT FROM OLD.issue_date OR NEW.expiry_date IS NULL)) THEN
    NEW.expiry_date := NEW.issue_date + INTERVAL '1 year';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_calculate_emc_certificate_expiry ON public.emc_certificates;
CREATE TRIGGER trg_calculate_emc_certificate_expiry
  BEFORE INSERT OR UPDATE ON public.emc_certificates
  FOR EACH ROW
  EXECUTE FUNCTION public.calculate_emc_certificate_expiry();

-- ========================================================
-- 4. Automatic updated_at Timestamp Renewal Trigger
-- ========================================================
CREATE OR REPLACE FUNCTION public.update_emc_certificates_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_emc_certificates_updated_at ON public.emc_certificates;
CREATE TRIGGER trg_update_emc_certificates_updated_at
  BEFORE UPDATE ON public.emc_certificates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_emc_certificates_updated_at();

-- ========================================================
-- 5. Row Level Security (RLS) & Policies on emc_certificates
-- Authenticated Admins ONLY can manage certificates.
-- Anonymous users are strictly denied access.
-- ========================================================
ALTER TABLE public.emc_certificates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow authenticated admin manage emc_certificates" ON public.emc_certificates;

CREATE POLICY "Allow authenticated admin manage emc_certificates"
  ON public.emc_certificates
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ========================================================
-- 6. Private Supabase Storage Bucket Initialization (certificate-pdfs)
-- ========================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('certificate-pdfs', 'certificate-pdfs', false, 10485760, ARRAY['application/pdf'])
ON CONFLICT (id) DO UPDATE SET
  public = false,
  allowed_mime_types = ARRAY['application/pdf'];

-- ========================================================
-- 7. Supabase Storage Policies for certificate-pdfs
-- Authenticated Admins ONLY can upload, update, delete, and view PDFs.
-- ========================================================
DROP POLICY IF EXISTS "Allow authenticated admin insert certificate-pdfs" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated admin update certificate-pdfs" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated admin delete certificate-pdfs" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated admin select certificate-pdfs" ON storage.objects;

CREATE POLICY "Allow authenticated admin insert certificate-pdfs"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'certificate-pdfs');

CREATE POLICY "Allow authenticated admin update certificate-pdfs"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'certificate-pdfs');

CREATE POLICY "Allow authenticated admin delete certificate-pdfs"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'certificate-pdfs');

CREATE POLICY "Allow authenticated admin select certificate-pdfs"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'certificate-pdfs');

-- ========================================================
-- PRODUCTION HARDENED SQL MIGRATION SCRIPT (FINAL)
-- Excel Management Certifications (EMC)
-- Feature: Secure Hardened Public Certificate Verification RPC & Storage
-- ========================================================

-- Enable pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ========================================================
-- 1. Hardened SECURITY DEFINER RPC Function
-- Prevents Search Path Hijacking (SET search_path = public)
-- Returns ONLY the minimum required public fields
-- ========================================================
CREATE OR REPLACE FUNCTION public.verify_certificate(search_cert_no TEXT)
RETURNS TABLE (
  certificate_no TEXT,
  company_name TEXT,
  address TEXT,
  standard TEXT,
  scope TEXT,
  cons_name TEXT,
  issue_date DATE,
  pdf_path TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.certificate_no,
    c.company_name,
    c.address,
    c.standard,
    c.scope,
    c.cons_name,
    c.issue_date,
    c.pdf_path
  FROM public.emc_certificates c
  WHERE UPPER(TRIM(c.certificate_no)) = UPPER(TRIM(search_cert_no))
  LIMIT 1;
END;
$$;

-- ========================================================
-- 2. Explicit Permission Hardening
-- Revoke default public execution before granting specific access
-- ========================================================
REVOKE ALL ON FUNCTION public.verify_certificate(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.verify_certificate(TEXT) TO anon, authenticated;

-- ========================================================
-- 3. SECURITY DEFINER Helper Function for Storage RLS Policy
-- Bypasses emc_certificates RLS when evaluating anon storage queries
-- ========================================================
CREATE OR REPLACE FUNCTION public.is_valid_certificate_pdf(object_name TEXT)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.emc_certificates c 
    WHERE c.pdf_path = object_name
       OR c.pdf_path = 'certificate-pdfs/' || object_name
       OR object_name = c.certificate_no || '.pdf'
       OR UPPER(object_name) = UPPER(c.certificate_no || '.pdf')
  );
$$;

REVOKE ALL ON FUNCTION public.is_valid_certificate_pdf(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_valid_certificate_pdf(TEXT) TO anon, authenticated;

-- ========================================================
-- 4. Hardened Storage RLS Policy
-- Upload strategy stores pdf_path relative to bucket root (e.g. "ABC123.pdf").
-- Permits reading ONLY PDF objects whose path belongs to a valid certificate.
-- ========================================================
DROP POLICY IF EXISTS "Allow authenticated admin select certificate-pdfs" ON storage.objects;
DROP POLICY IF EXISTS "Allow public select certificate-pdfs" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon select valid certificate pdfs" ON storage.objects;

CREATE POLICY "Allow anon select valid certificate pdfs"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (
    bucket_id = 'certificate-pdfs' 
    AND public.is_valid_certificate_pdf(name)
  );

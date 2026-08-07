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
-- 3. Simplified & Exact Storage RLS Policy
-- Upload strategy stores pdf_path relative to bucket root (e.g. "ABC123.pdf").
-- Permits reading ONLY PDF objects whose path exactly matches emc_certificates.pdf_path.
-- ========================================================
DROP POLICY IF EXISTS "Allow public select certificate-pdfs" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon select valid certificate pdfs" ON storage.objects;

CREATE POLICY "Allow anon select valid certificate pdfs"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (
    bucket_id = 'certificate-pdfs' 
    AND EXISTS (
      SELECT 1 FROM public.emc_certificates c 
      WHERE c.pdf_path = storage.objects.name
    )
  );

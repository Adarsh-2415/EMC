import React, { useState } from 'react'
import { CertificateSearchForm } from '@/components/certificate/CertificateSearchForm'
import {
  CertificateInformationCard,
  type CertificateDetails,
} from '@/components/certificate/CertificateInformationCard'
import { CertificatePdfSection } from '@/components/certificate/CertificatePdfSection'
import { CertificateNotFoundState } from '@/components/certificate/CertificateNotFoundState'
import { supabase } from '@/lib/supabase'
import { AlertCircle } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { MAIN_PAGES_SEO } from '@/constants/seoData'
import { generateBreadcrumbSchema } from '@/utils/schemaGenerator'

export const CertificateVerificationPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [searchResult, setSearchResult] = useState<{
    found: boolean
    data?: CertificateDetails
  } | null>(null)

  const formatDateDisplay = (dateString: string): string => {
    try {
      const d = new Date(dateString)
      if (isNaN(d.getTime())) return dateString
      return d
        .toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })
        .toUpperCase()
    } catch {
      return dateString
    }
  }

  const calculateStatus = (issueDateString: string): 'VERIFIED' | 'RENEWAL_DUE' => {
    try {
      const issueDate = new Date(issueDateString)
      if (isNaN(issueDate.getTime())) return 'VERIFIED'

      const expiryDate = new Date(issueDate)
      expiryDate.setFullYear(expiryDate.getFullYear() + 1)

      const today = new Date()
      // Set to start of day for accurate comparison
      today.setHours(0, 0, 0, 0)
      expiryDate.setHours(23, 59, 59, 999)

      return today <= expiryDate ? 'VERIFIED' : 'RENEWAL_DUE'
    } catch {
      return 'VERIFIED'
    }
  }

  const handleSearch = async (certNo: string) => {
    setIsLoading(true)
    setErrorMessage(null)
    setSearchResult(null)

    const trimmedCertNo = certNo.trim()

    try {
      // 1. Call secure RPC function
      const { data, error } = await supabase.rpc('verify_certificate', {
        search_cert_no: trimmedCertNo,
      })

      if (error) {
        setErrorMessage('Unable to verify certificate due to a network connection error. Please try again.')
        return
      }

      // RPC returns array with 0 or 1 item
      const record = data && data.length > 0 ? data[0] : null

      if (!record) {
        setSearchResult({ found: false })
        return
      }

      // 2. Compute dynamic validity status
      const computedStatus = record.issue_date
        ? calculateStatus(record.issue_date)
        : 'VERIFIED'

      // 3. Generate signed URL for PDF if pdf_path exists
      let pdfSignedUrl: string | null = null
      if (record.pdf_path) {
        const { data: pdfData } = await supabase.storage
          .from('certificate-pdfs')
          .createSignedUrl(record.pdf_path, 3600) // 1 hour validity

        if (pdfData?.signedUrl) {
          pdfSignedUrl = pdfData.signedUrl
        }
      }

      // 4. Set Search Result
      setSearchResult({
        found: true,
        data: {
          date: record.issue_date ? formatDateDisplay(record.issue_date) : 'N/A',
          certificateNo: record.certificate_no,
          companyName: record.company_name || 'N/A',
          address: record.address || 'N/A',
          standard: record.standard || 'N/A',
          scope: record.scope || 'N/A',
          consName: record.cons_name || 'N/A',
          status: computedStatus,
          pdfUrl: pdfSignedUrl,
        },
      })
    } catch {
      setErrorMessage('An unexpected error occurred while verifying the certificate.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full bg-slate-50 text-slate-900 py-10 sm:py-14 md:py-18 min-h-screen flex items-center justify-center">
      <SEO
        {...MAIN_PAGES_SEO.certificationSearch}
        schemas={[
          generateBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Certification Search', url: '/certification-search' },
          ]),
        ]}
      />
      <div className="max-w-2xl mx-auto w-full px-4 sm:px-6">
        {/* 1. Page Heading & 2. Short Description */}
        <div className="text-center space-y-3 mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight uppercase">
            CERTIFICATION SEARCH
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 via-blue-600 to-slate-800 mx-auto rounded-full" />
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg mx-auto leading-relaxed pt-1">
            Enter your Certificate Number to verify the authenticity and current validity of your
            certificate.
          </p>
        </div>

        {/* 3. Certificate Search Section */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-slate-200/80 mb-8">
          <CertificateSearchForm onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Error State Banner */}
        {errorMessage && (
          <div
            role="alert"
            className="mb-8 p-4 sm:p-5 rounded-2xl bg-red-50 border border-red-300 text-red-900 flex items-start gap-3 shadow-md animate-in fade-in"
          >
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold">Verification Error</h4>
              <p className="text-xs sm:text-sm font-medium leading-relaxed">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* 4. Certificate Result Section */}
        {searchResult && (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-3 duration-400">
            {searchResult.found && searchResult.data ? (
              <>
                {/* Certificate Information Card (includes Status Badge at top) */}
                <CertificateInformationCard data={searchResult.data} />

                {/* Certificate PDF Section */}
                <CertificatePdfSection pdfUrl={searchResult.data.pdfUrl} />
              </>
            ) : (
              /* Certificate Not Found State */
              <CertificateNotFoundState />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

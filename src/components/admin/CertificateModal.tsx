import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { StandardSelect } from './StandardSelect'
import { uploadCertificatePdf, renameCertificatePdf } from '@/lib/certificateStorage'
import { X, Award, Upload, AlertCircle, Loader2, Calendar } from 'lucide-react'

export interface CertificateRecord {
  id: string
  certificate_no: string
  issue_date: string | null
  expiry_date: string | null
  company_name: string | null
  address: string | null
  standard: string | null
  scope: string | null
  cons_name: string | null
  pdf_path: string | null
  created_at: string
}

interface CertificateModalProps {
  isOpen: boolean
  certificate: CertificateRecord | null
  onClose: () => void
  onSuccess: () => void
  // eslint-disable-next-line no-unused-vars
  showToast: (title: string, message: string, type?: 'success' | 'error' | 'info') => void
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  certificate,
  onClose,
  onSuccess,
  showToast,
}) => {
  const isEdit = Boolean(certificate)

  const [certificateNo, setCertificateNo] = useState('')
  const [issueDate, setIssueDate] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [address, setAddress] = useState('')
  const [standard, setStandard] = useState('')
  const [scope, setScope] = useState('')
  const [consName, setConsName] = useState('')
  const [pdfFile, setPdfFile] = useState<File | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [certNoError, setCertNoError] = useState<string | null>(null)
  const [companyNameError, setCompanyNameError] = useState<string | null>(null)
  const [issueDateError, setIssueDateError] = useState<string | null>(null)
  const [addressError, setAddressError] = useState<string | null>(null)
  const [standardError, setStandardError] = useState<string | null>(null)
  const [scopeError, setScopeError] = useState<string | null>(null)
  const [consNameError, setConsNameError] = useState<string | null>(null)
  const [pdfError, setPdfError] = useState<string | null>(null)

  // Track prop changes during render to avoid setState in effect
  const [prevCertificate, setPrevCertificate] = useState<CertificateRecord | null>(null)
  const [prevIsOpen, setPrevIsOpen] = useState<boolean>(false)

  if (certificate !== prevCertificate || isOpen !== prevIsOpen) {
    setPrevCertificate(certificate)
    setPrevIsOpen(isOpen)

    if (certificate && isOpen) {
      setCertificateNo(certificate.certificate_no || '')
      setIssueDate(certificate.issue_date || '')
      setCompanyName(certificate.company_name || '')
      setAddress(certificate.address || '')
      setStandard(certificate.standard || '')
      setScope(certificate.scope || '')
      setConsName(certificate.cons_name || '')
      setPdfFile(null)
    } else {
      setCertificateNo('')
      setIssueDate('')
      setCompanyName('')
      setAddress('')
      setStandard('')
      setScope('')
      setConsName('')
      setPdfFile(null)
    }
    setFormError(null)
    setCertNoError(null)
    setCompanyNameError(null)
    setIssueDateError(null)
    setAddressError(null)
    setStandardError(null)
    setScopeError(null)
    setConsNameError(null)
    setPdfError(null)
  }

  if (!isOpen) return null

  // Calculate Read-Only Expiry Date Preview (Issue Date + 3 Years - Timezone Safe String Parsing)
  const getExpiryPreview = (): string => {
    if (!issueDate) return ''
    const parts = issueDate.split('-')
    if (parts.length !== 3) return ''
    const year = parseInt(parts[0], 10) + 3
    return `${year}-${parts[1]}-${parts[2]}`
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPdfError(null)
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      setPdfError('Only PDF files are allowed.')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setPdfError('File size exceeds maximum limit of 10 MB.')
      return
    }

    setPdfFile(file)
  }

  const mapDatabaseErrorToFriendlyMessage = (err: unknown): string => {
    const message = err instanceof Error ? err.message : String(err || '')

    if (
      message.includes('certificate_no') &&
      (message.includes('unique') || message.includes('already exists') || message.includes('duplicate'))
    ) {
      return 'This certificate number already exists in the database. Please enter a different certificate number.'
    }
    if (message.includes('violates not-null constraint') || message.includes('null value')) {
      return 'Please enter all required certificate information before saving.'
    }
    if (message.includes('FetchError') || message.includes('network') || message.includes('connection')) {
      return 'Unable to connect to the database right now. Please check your internet connection and try again.'
    }
    return 'Unable to save the certificate record right now. Please verify all information and try again.'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setCertNoError(null)
    setCompanyNameError(null)
    setIssueDateError(null)
    setAddressError(null)
    setStandardError(null)
    setScopeError(null)
    setConsNameError(null)
    setPdfError(null)

    const trimmedCertNo = certificateNo.trim()
    const trimmedCompanyName = companyName.trim()
    const trimmedAddress = address.trim()
    const trimmedStandard = standard.trim()
    const trimmedScope = scope.trim()
    const trimmedConsName = consName.trim()

    let hasErrors = false

    if (!trimmedCertNo) {
      setCertNoError('Certificate Number is required.')
      hasErrors = true
    }

    if (!issueDate) {
      setIssueDateError('Issue Date is required.')
      hasErrors = true
    }

    if (!trimmedCompanyName) {
      setCompanyNameError('Company Name is required.')
      hasErrors = true
    }

    if (!trimmedAddress) {
      setAddressError('Address is required.')
      hasErrors = true
    }

    if (!trimmedStandard) {
      setStandardError('Standard / Certification is required.')
      hasErrors = true
    }

    if (!trimmedScope) {
      setScopeError('Scope of certification is required.')
      hasErrors = true
    }

    if (!trimmedConsName) {
      setConsNameError('Consultant Name is required.')
      hasErrors = true
    }

    if (hasErrors) {
      setFormError('Please enter all required certificate information highlighted below before saving.')
      return
    }

    setIsSubmitting(true)

    try {
      // 1. Frontend Check for Duplicate Certificate Number
      let dupQuery = supabase
        .from('emc_certificates')
        .select('id')
        .eq('certificate_no', trimmedCertNo)

      if (isEdit && certificate) {
        dupQuery = dupQuery.neq('id', certificate.id)
      }

      const { data: dupData, error: dupErr } = await dupQuery

      if (!dupErr && dupData && dupData.length > 0) {
        const dupMsg = 'This certificate number already exists. Please use a different certificate number.'
        setCertNoError(dupMsg)
        setFormError(dupMsg)
        setIsSubmitting(false)
        return
      }

      let finalPdfPath: string | null = certificate?.pdf_path || null

      // 2. Handle PDF Rename if Certificate Number changed AND old PDF existed
      if (isEdit && certificate && certificate.pdf_path && certificate.certificate_no !== trimmedCertNo) {
        const { newPath, error: renameErr } = await renameCertificatePdf(
          certificate.certificate_no,
          trimmedCertNo
        )
        if (!renameErr && newPath) {
          finalPdfPath = newPath
          showToast('PDF Renamed', `PDF updated to match new Certificate Number.`, 'info')
        }
      }

      // 3. Handle New PDF Upload/Replacement
      if (pdfFile) {
        const { path, error: uploadErr } = await uploadCertificatePdf(pdfFile, trimmedCertNo)
        if (uploadErr) {
          const userPdfErr = 'PDF upload failed. Please verify the file is a valid PDF under 10 MB.'
          setPdfError(userPdfErr)
          setFormError(userPdfErr)
          setIsSubmitting(false)
          return
        }
        finalPdfPath = path
        showToast('PDF Uploaded', `Certificate PDF stored as ${trimmedCertNo}.pdf`, 'success')
      }

      // 4. Save Record in Supabase Table
      const recordPayload = {
        certificate_no: trimmedCertNo,
        issue_date: issueDate,
        company_name: trimmedCompanyName,
        address: trimmedAddress,
        standard: trimmedStandard,
        scope: trimmedScope,
        cons_name: trimmedConsName,
        pdf_path: finalPdfPath,
      }

      if (isEdit && certificate) {
        const { error: updateErr } = await supabase
          .from('emc_certificates')
          .update(recordPayload)
          .eq('id', certificate.id)

        if (updateErr) {
          throw new Error(updateErr.message)
        }
        showToast('Certificate Updated', `Certificate ${trimmedCertNo} updated successfully.`, 'success')
      } else {
        const { error: insertErr } = await supabase
          .from('emc_certificates')
          .insert([recordPayload])

        if (insertErr) {
          throw new Error(insertErr.message)
        }
        showToast('Certificate Added', `Certificate ${trimmedCertNo} created successfully.`, 'success')
      }

      onSuccess()
      onClose()
    } catch (err) {
      const friendlyError = mapDatabaseErrorToFriendlyMessage(err)
      setFormError(friendlyError)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl border border-slate-200 text-slate-900 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header (Fixed Top) */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">
                {isEdit ? 'Edit Certificate Record' : 'Add New Certificate'}
              </h3>
              <p className="text-xs text-slate-400">
                {isEdit ? 'Modify certificate details and PDF attachment.' : 'Create a new certificate entry in database.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {/* Modal Form Container with Scrollable Body and Fixed Footer */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 overflow-hidden" noValidate>
          {/* Form Content Body (Scrollable) */}
          <div className="p-6 space-y-4 overflow-y-auto flex-1">
            {/* Top Submission Error Summary Banner */}
            {formError && (
              <div
                role="alert"
                className="p-4 rounded-xl bg-red-50 border border-red-300 text-red-900 flex items-start gap-3 shadow-xs animate-in fade-in"
              >
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-red-800">
                    Submission Error
                  </h4>
                  <p className="text-xs sm:text-sm font-medium leading-relaxed">{formError}</p>
                </div>
              </div>
            )}

            {/* Certificate Number (MANDATORY) */}
            <div className="space-y-1">
              <label htmlFor="certNoInput" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Certificate Number <span className="text-red-500">*</span>
              </label>
              <input
                id="certNoInput"
                type="text"
                required
                disabled={isSubmitting}
                value={certificateNo}
                onChange={(e) => {
                  setCertificateNo(e.target.value)
                  if (certNoError) setCertNoError(null)
                  if (formError) setFormError(null)
                }}
                placeholder="e.g. YIQ-QMS-I25DRQ25A"
                className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-colors text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  certNoError
                    ? 'border-red-500 focus:ring-red-500 bg-red-50/20'
                    : 'border-slate-300 focus:ring-slate-900 focus:border-slate-900 bg-white'
                }`}
              />
              {certNoError && (
                <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{certNoError}</span>
                </p>
              )}
            </div>

            {/* Issue Date & Read-only Expiry Date Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="issueDateInput" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Issue Date <span className="text-red-500">*</span>
                </label>
                <input
                  id="issueDateInput"
                  type="date"
                  disabled={isSubmitting}
                  value={issueDate}
                  onChange={(e) => {
                    setIssueDate(e.target.value)
                    if (issueDateError) setIssueDateError(null)
                    if (formError) setFormError(null)
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-colors text-slate-900 focus:outline-none focus:ring-2 ${
                    issueDateError
                      ? 'border-red-500 focus:ring-red-500 bg-red-50/20'
                      : 'border-slate-300 focus:ring-slate-900 focus:border-slate-900 bg-white'
                  }`}
                />
                {issueDateError && (
                  <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{issueDateError}</span>
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Expiry Date Preview (Read-Only)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    disabled
                    value={getExpiryPreview() || 'Auto-calculated (+3 Years)'}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-500 bg-slate-100 cursor-not-allowed select-none"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Company Name */}
            <div className="space-y-1">
              <label htmlFor="companyNameInput" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                id="companyNameInput"
                type="text"
                disabled={isSubmitting}
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value)
                  if (companyNameError) setCompanyNameError(null)
                  if (formError) setFormError(null)
                }}
                placeholder="Official Client Company Name"
                className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-colors text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  companyNameError
                    ? 'border-red-500 focus:ring-red-500 bg-red-50/20'
                    : 'border-slate-300 focus:ring-slate-900 focus:border-slate-900 bg-white'
                }`}
              />
              {companyNameError && (
                <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{companyNameError}</span>
                </p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-1">
              <label htmlFor="addressInput" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="addressInput"
                rows={2}
                disabled={isSubmitting}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value)
                  if (addressError) setAddressError(null)
                  if (formError) setFormError(null)
                }}
                placeholder="Full postal address"
                className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-colors text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  addressError
                    ? 'border-red-500 focus:ring-red-500 bg-red-50/20'
                    : 'border-slate-300 focus:ring-slate-900 focus:border-slate-900 bg-white'
                }`}
              />
              {addressError && (
                <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{addressError}</span>
                </p>
              )}
            </div>

            {/* Standard Select */}
            <StandardSelect
              value={standard}
              onChange={(val) => {
                setStandard(val)
                if (standardError) setStandardError(null)
                if (formError) setFormError(null)
              }}
              error={standardError || undefined}
              disabled={isSubmitting}
            />

            {/* Scope & CONS NAME */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="scopeInput" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Scope <span className="text-red-500">*</span>
                </label>
                <input
                  id="scopeInput"
                  type="text"
                  disabled={isSubmitting}
                  value={scope}
                  onChange={(e) => {
                    setScope(e.target.value)
                    if (scopeError) setScopeError(null)
                    if (formError) setFormError(null)
                  }}
                  placeholder="Scope of certification"
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-colors text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                    scopeError
                      ? 'border-red-500 focus:ring-red-500 bg-red-50/20'
                      : 'border-slate-300 focus:ring-slate-900 focus:border-slate-900 bg-white'
                  }`}
                />
                {scopeError && (
                  <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{scopeError}</span>
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label htmlFor="consNameInput" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  CONS NAME <span className="text-red-500">*</span>
                </label>
                <input
                  id="consNameInput"
                  type="text"
                  disabled={isSubmitting}
                  value={consName}
                  onChange={(e) => {
                    setConsName(e.target.value)
                    if (consNameError) setConsNameError(null)
                    if (formError) setFormError(null)
                  }}
                  placeholder="Consultant Name"
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-colors text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                    consNameError
                      ? 'border-red-500 focus:ring-red-500 bg-red-50/20'
                      : 'border-slate-300 focus:ring-slate-900 focus:border-slate-900 bg-white'
                  }`}
                />
                {consNameError && (
                  <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{consNameError}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Upload Certificate PDF */}
            <div className="space-y-1 pt-2">
              <label htmlFor="pdfFileInput" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Upload Certificate PDF <span className="text-slate-400 font-normal">(Max 10 MB, .pdf only)</span>
              </label>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold cursor-pointer transition-colors shadow-xs">
                  <Upload className="w-4 h-4 text-emerald-600" />
                  <span>{pdfFile ? 'Change Selected PDF' : 'Choose PDF File'}</span>
                  <input
                    id="pdfFileInput"
                    type="file"
                    accept="application/pdf"
                    disabled={isSubmitting}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>

                {pdfFile && (
                  <span className="text-xs font-semibold text-emerald-600 truncate max-w-xs">
                    Selected: {pdfFile.name}
                  </span>
                )}

                {!pdfFile && certificate?.pdf_path && (
                  <span className="text-xs font-semibold text-slate-500">
                    Current PDF: {certificate.pdf_path.split('/').pop()}
                  </span>
                )}
              </div>

              {pdfError && (
                <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{pdfError}</span>
                </p>
              )}
            </div>
          </div>

          {/* Modal Footer Buttons (Fixed Bottom) */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-md active:scale-95 flex items-center gap-2 disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Record...</span>
                </>
              ) : (
                <span>{isEdit ? 'Update Certificate' : 'Save Certificate'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

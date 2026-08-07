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
  const [certNoError, setCertNoError] = useState<string | null>(null)
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
    setCertNoError(null)
    setPdfError(null)
  }

  if (!isOpen) return null

  // Calculate Read-Only Expiry Date Preview (Issue Date + 1 Year)
  const getExpiryPreview = (): string => {
    if (!issueDate) return ''
    const parts = issueDate.split('-')
    if (parts.length !== 3) return ''
    const year = parseInt(parts[0], 10) + 1
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCertNoError(null)
    setPdfError(null)

    const trimmedCertNo = certificateNo.trim()
    if (!trimmedCertNo) {
      setCertNoError('Certificate Number is required.')
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
        setCertNoError(`Certificate Number "${trimmedCertNo}" already exists in database.`)
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
          setPdfError(`PDF Upload Failed: ${uploadErr.message}`)
          setIsSubmitting(false)
          return
        }
        finalPdfPath = path
        showToast('PDF Uploaded', `Certificate PDF stored as ${trimmedCertNo}.pdf`, 'success')
      }

      // 4. Save Record in Supabase Table
      const recordPayload = {
        certificate_no: trimmedCertNo,
        issue_date: issueDate || null,
        company_name: companyName.trim() || null,
        address: address.trim() || null,
        standard: standard.trim() || null,
        scope: scope.trim() || null,
        cons_name: consName.trim() || null,
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
      const errMsg = err instanceof Error ? err.message : 'Failed to save certificate record.'
      showToast('Database Error', errMsg, 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl border border-slate-200 text-slate-900 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
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

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1" noValidate>
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
                Issue Date
              </label>
              <input
                id="issueDateInput"
                type="date"
                disabled={isSubmitting}
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              />
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
                  value={getExpiryPreview() || 'Auto-calculated (+1 Year)'}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-500 bg-slate-100 cursor-not-allowed select-none"
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* Company Name */}
          <div className="space-y-1">
            <label htmlFor="companyNameInput" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Company Name
            </label>
            <input
              id="companyNameInput"
              type="text"
              disabled={isSubmitting}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Official Client Company Name"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
            />
          </div>

          {/* Address */}
          <div className="space-y-1">
            <label htmlFor="addressInput" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Address
            </label>
            <textarea
              id="addressInput"
              rows={2}
              disabled={isSubmitting}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Full postal address"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
            />
          </div>

          {/* Standard Select */}
          <StandardSelect
            value={standard}
            onChange={(val) => setStandard(val)}
            disabled={isSubmitting}
          />

          {/* Scope & CONS NAME */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="scopeInput" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Scope
              </label>
              <input
                id="scopeInput"
                type="text"
                disabled={isSubmitting}
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                placeholder="Scope of certification"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="consNameInput" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                CONS NAME
              </label>
              <input
                id="consNameInput"
                type="text"
                disabled={isSubmitting}
                value={consName}
                onChange={(e) => setConsName(e.target.value)}
                placeholder="Consultant Name"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              />
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

          {/* Modal Footer Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
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

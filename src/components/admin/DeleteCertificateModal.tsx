import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { deleteCertificatePdf } from '@/lib/certificateStorage'
import type { CertificateRecord } from './CertificateModal'
import { AlertTriangle, Loader2 } from 'lucide-react'

interface DeleteCertificateModalProps {
  certificate: CertificateRecord | null
  onClose: () => void
  onSuccess: () => void
  // eslint-disable-next-line no-unused-vars
  showToast: (title: string, message: string, type?: 'success' | 'error' | 'info') => void
}

export const DeleteCertificateModal: React.FC<DeleteCertificateModalProps> = ({
  certificate,
  onClose,
  onSuccess,
  showToast,
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  if (!certificate) return null

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      // 1. Delete associated PDF file from storage if present
      if (certificate.pdf_path || certificate.certificate_no) {
        await deleteCertificatePdf(certificate.certificate_no)
      }

      // 2. Delete database record
      const { error } = await supabase
        .from('emc_certificates')
        .delete()
        .eq('id', certificate.id)

      if (error) {
        throw new Error(error.message)
      }

      showToast(
        'Certificate Deleted',
        `Certificate ${certificate.certificate_no} and associated PDF deleted successfully.`,
        'info'
      )
      onSuccess()
      onClose()
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Failed to delete certificate record.'
      showToast('Delete Failed', errMsg, 'error')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl border border-slate-200 text-slate-900 overflow-hidden select-none">
        {/* Header Warning */}
        <div className="p-6 bg-red-50 border-b border-red-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center text-red-600 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-red-900">Confirm Certificate Deletion</h3>
            <p className="text-xs font-medium text-red-700">Permanent action request</p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 text-xs font-medium text-slate-700">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Target Record:
            </p>
            <p className="text-sm font-extrabold text-slate-900">
              {certificate.certificate_no}
            </p>
            {certificate.company_name && (
              <p className="text-xs text-slate-600 font-semibold">{certificate.company_name}</p>
            )}
          </div>

          <div
            role="alert"
            className="p-3.5 rounded-xl bg-red-100/80 border border-red-200 text-red-950 font-bold text-xs leading-relaxed"
          >
            This action will permanently delete the certificate record and its uploaded PDF. This action cannot be undone.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            type="button"
            disabled={isDeleting}
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isDeleting}
            onClick={handleDelete}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-all shadow-md active:scale-95 flex items-center gap-2 disabled:opacity-60"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Permanently Delete</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

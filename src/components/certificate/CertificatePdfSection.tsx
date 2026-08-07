import React from 'react'
import { Download } from 'lucide-react'

interface CertificatePdfSectionProps {
  pdfUrl?: string | null
}

export const CertificatePdfSection: React.FC<CertificatePdfSectionProps> = ({ pdfUrl }) => {
  const isEnabled = Boolean(pdfUrl)

  const handleDownload = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200/80 space-y-4">
      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
        Certificate PDF
      </h3>

      <button
        type="button"
        disabled={!isEnabled}
        onClick={handleDownload}
        className="w-full py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-md flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Download className="w-4 h-4 text-white" aria-hidden="true" />
        <span>Download Certificate</span>
      </button>
    </div>
  )
}

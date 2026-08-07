import React from 'react'
import { CertificateStatusBadge, type CertificateStatusType } from './CertificateStatusBadge'

export interface CertificateDetails {
  date: string
  certificateNo: string
  companyName: string
  address: string
  standard: string
  scope: string
  consName: string
  status: CertificateStatusType
  pdfUrl?: string | null
}

interface CertificateInformationCardProps {
  data: CertificateDetails
}

export const CertificateInformationCard: React.FC<CertificateInformationCardProps> = ({
  data,
}) => {
  return (
    <div className="w-full bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl border border-slate-200/80 space-y-6">
      {/* Top Status Area */}
      <CertificateStatusBadge status={data.status} />

      {/* Corporate Information Grid (NO Table Layout) */}
      <div className="space-y-4 pt-2">
        {/* 1. Date */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Date
          </span>
          <p className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
            {data.date}
          </p>
        </div>

        {/* 2. Certificate No. */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Certificate No.
          </span>
          <p className="text-sm sm:text-base font-mono font-bold text-slate-900 leading-snug">
            {data.certificateNo}
          </p>
        </div>

        {/* 3. Company Name */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Company Name
          </span>
          <p className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
            {data.companyName}
          </p>
        </div>

        {/* 4. Address */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Address
          </span>
          <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed whitespace-pre-line">
            {data.address}
          </p>
        </div>

        {/* 5. Standard */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Standard
          </span>
          <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
            {data.standard}
          </p>
        </div>

        {/* 6. Scope */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Scope
          </span>
          <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
            {data.scope}
          </p>
        </div>

        {/* 7. Cons Name */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Cons Name
          </span>
          <p className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
            {data.consName}
          </p>
        </div>
      </div>
    </div>
  )
}

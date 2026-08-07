import React from 'react'
import { X, User, Mail, FolderKanban, HelpCircle, MessageSquare, Calendar } from 'lucide-react'

export interface SupportMessageRecord {
  id: string
  first_name: string
  last_name: string
  email: string
  department: string
  subject: string
  message: string
  created_at: string
}

interface SupportDetailModalProps {
  supportMessage: SupportMessageRecord | null
  onClose: () => void
}

export const SupportDetailModal: React.FC<SupportDetailModalProps> = ({
  supportMessage,
  onClose,
}) => {
  if (!supportMessage) return null

  const fullName = `${supportMessage.first_name} ${supportMessage.last_name}`
  const formattedDate = new Date(supportMessage.created_at).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl border border-slate-200 text-slate-900 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                Support Ticket Detail
              </span>
              <h3 className="text-lg font-extrabold text-white truncate max-w-md">
                {fullName}
              </h3>
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

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Submitted Date */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-2 rounded-lg">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Received On: {formattedDate}</span>
          </div>

          {/* Fields List */}
          <div className="space-y-4">
            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Full Name</span>
                </div>
                <p className="text-sm font-extrabold text-slate-900">{fullName}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>Email</span>
                </div>
                <p className="text-sm font-bold text-slate-900">{supportMessage.email}</p>
              </div>
            </div>

            {/* Department */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <FolderKanban className="w-3.5 h-3.5 text-indigo-600" />
                <span>Department</span>
              </div>
              <p className="text-sm font-extrabold text-indigo-700">
                {supportMessage.department}
              </p>
            </div>

            {/* Subject */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                <span>Subject</span>
              </div>
              <p className="text-base font-bold text-slate-900">{supportMessage.subject}</p>
            </div>

            {/* Message Body */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                <span>Message</span>
              </div>
              <p className="text-sm font-medium text-slate-800 leading-relaxed whitespace-pre-line">
                {supportMessage.message}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-md"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  )
}

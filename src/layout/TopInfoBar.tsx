import React from 'react'
import { Mail } from 'lucide-react'

export const TopInfoBar: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 text-slate-200 border-b border-slate-800 text-xs sm:text-sm py-2 px-4 sm:px-6 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-end">
        <a
          href="mailto:enq@emcindia.org"
          className="inline-flex items-center gap-2 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 rounded px-1.5 py-0.5"
          aria-label="Email Excel Management Certifications"
        >
          <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 shrink-0" aria-hidden="true" />
          <span className="font-medium tracking-wide">enq@emcindia.org</span>
        </a>
      </div>
    </div>
  )
}

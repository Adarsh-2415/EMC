import React from 'react'
import { Link } from 'react-router-dom'
import { SERVICES_MEGA_MENU } from '@/constants/navigation'
import { ShieldCheck } from 'lucide-react'

interface MegaMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div
      role="region"
      aria-label="Services Offered Mega Menu"
      className="absolute top-full left-0 right-0 w-full bg-slate-900 text-slate-100 border-t border-b border-slate-800 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150"
    >
      <div className="max-w-7xl mx-auto py-8 px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-2">
          <div className="flex items-center gap-2 text-slate-200 font-semibold text-sm uppercase tracking-wider">
            <ShieldCheck className="w-4.5 h-4.5 text-emerald-400 shrink-0" aria-hidden="true" />
            <span>International Management Certifications & Global Standards</span>
          </div>
          <span className="text-xs text-slate-400 font-normal">
            Accredited Assessment & Technical Verification
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-6">
          {SERVICES_MEGA_MENU.map((category) => (
            <div key={category.title} className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 border-l-2 border-emerald-500 pl-2.5">
                {category.title}
              </h3>
              <ul className="space-y-1.5 pl-2.5">
                {category.certifications.map((cert) => (
                  <li key={cert.name}>
                    <Link
                      to={cert.href}
                      onClick={onClose}
                      className="text-sm text-slate-300 hover:text-white hover:underline transition-colors block py-0.5 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400"
                    >
                      {cert.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

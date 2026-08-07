import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SERVICES_MEGA_MENU } from '@/constants/navigation'
import { ChevronDown, ShieldCheck } from 'lucide-react'

interface MobileAccordionProps {
  onLinkClick: () => void
}

export const MobileAccordion: React.FC<MobileAccordionProps> = ({ onLinkClick }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-slate-800">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-services-accordion"
        className="w-full flex items-center justify-between py-3.5 px-4 text-left font-medium text-slate-200 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400"
      >
        <span className="text-base tracking-wide font-medium">Services Offered</span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-white' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div id="mobile-services-accordion" className="bg-slate-950/60 px-4 py-3 space-y-5">
          {SERVICES_MEGA_MENU.map((category) => (
            <div key={category.title} className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                <span>{category.title}</span>
              </div>
              <ul className="space-y-1 pl-5">
                {category.certifications.map((cert) => (
                  <li key={cert.name}>
                    <Link
                      to={cert.href}
                      onClick={onLinkClick}
                      className="text-sm text-slate-300 hover:text-white block py-1.5 transition-colors"
                    >
                      {cert.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

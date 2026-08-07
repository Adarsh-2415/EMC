import React from 'react'
import { Link } from 'react-router-dom'
import { PRIMARY_NAV_ITEMS } from '@/constants/navigation'
import emcLogo from '@/assets/images/emc-logo.png'
import { Mail, MapPin } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 text-slate-300 border-t border-slate-800 text-sm mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1 - Organization */}
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-xl inline-block shadow-md">
              <img
                src={emcLogo}
                alt="Excel Management Certifications Logo"
                className="h-20 sm:h-24 w-auto object-contain max-w-full"
                loading="lazy"
              />
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Excel Management Certifications is an autonomous research and development consultancy
              organization providing certification, inspection, training, verification, and
              compliance services aligned with international standards.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-100 border-l-2 border-emerald-500 pl-2.5">
              Quick Links
            </h3>
            <ul className="space-y-2 pl-2.5">
              {PRIMARY_NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-slate-400 hover:text-white transition-colors block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 rounded"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Contact Information */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-100 border-l-2 border-emerald-500 pl-2.5">
              Contact Information
            </h3>
            <div className="space-y-3 text-slate-400 pl-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                <address className="not-italic text-xs leading-relaxed">
                  Plot No. 127/556A
                  <br />
                  Juhi Kala
                  <br />
                  Bara Devi
                  <br />
                  Kanpur-209208
                  <br />
                  Uttar Pradesh
                  <br />
                  India
                </address>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                <a
                  href="mailto:enq@emcindia.org"
                  className="text-slate-300 hover:text-white transition-colors text-xs font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 rounded"
                >
                  enq@emcindia.org
                </a>
              </div>
            </div>
          </div>

          {/* Column 4 - Location Map */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-100 border-l-2 border-emerald-500 pl-2.5">
              Location
            </h3>
            <div className="w-full h-44 rounded overflow-hidden border border-slate-800 shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d893.0907391774434!2d80.32641058953662!3d26.44402695099384!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c470b56e14e91%3A0x1e74d3097b677891!2s127%2F271%2C%20Juhi%2C%20Kanpur%2C%20Uttar%20Pradesh%20208014!5e0!3m2!1sen!2sin!4v1785914434009!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Excel Management Certifications Location Map"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-900 bg-slate-950 py-4 px-4 text-center text-xs text-slate-500">
        &copy; 2026 - Excel Management Certifications
      </div>
    </footer>
  )
}

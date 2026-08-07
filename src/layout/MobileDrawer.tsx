import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PRIMARY_NAV_ITEMS } from '@/constants/navigation'
import { MobileAccordion } from './MobileAccordion'
import { X } from 'lucide-react'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const location = useLocation()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile Navigation Menu">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div className="fixed top-0 right-0 w-full max-w-xs h-full bg-slate-900 text-slate-100 shadow-2xl flex flex-col overflow-y-auto z-50 animate-in slide-in-from-right duration-200">
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <span className="font-semibold text-sm tracking-wide text-slate-200">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Navigation Menu"
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav aria-label="Mobile Navigation" className="flex-1 divide-y divide-slate-800">
          {PRIMARY_NAV_ITEMS.map((item) => {
            if (item.hasMegaMenu) {
              return <MobileAccordion key={item.label} onLinkClick={onClose} />
            }

            const isActive = location.pathname === item.href

            return (
              <div key={item.label}>
                <Link
                  to={item.href}
                  onClick={onClose}
                  className={`block py-3.5 px-4 font-medium text-base transition-colors ${
                    isActive
                      ? 'text-white bg-slate-800/60 font-semibold border-l-4 border-slate-400 pl-3'
                      : 'text-slate-200 hover:text-white hover:bg-slate-800/30'
                  }`}
                >
                  {item.label}
                </Link>
              </div>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 text-xs text-slate-400 text-center">
          Excel Management Certifications &copy; {new Date().getFullYear()}
        </div>
      </div>
    </div>
  )
}

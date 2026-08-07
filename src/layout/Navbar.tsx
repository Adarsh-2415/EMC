import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PRIMARY_NAV_ITEMS } from '@/constants/navigation'
import { MegaMenu } from './MegaMenu'
import { MobileDrawer } from './MobileDrawer'
import { ChevronDown, Menu } from 'lucide-react'

export const Navbar: React.FC = () => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  // Close mega menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMegaMenuOpen(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMegaMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div
      ref={navRef}
      className="sticky top-0 z-40 w-full bg-slate-900 text-white border-b border-slate-800 shadow-md transition-shadow relative"
      role="navigation"
      aria-label="Main Navigation"
      onMouseLeave={() => setIsMegaMenuOpen(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Mobile Hamburger Button */}
          <div className="flex items-center lg:hidden w-full justify-between">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-300">Navigation</span>
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(true)}
              aria-label="Open Navigation Menu"
              aria-expanded={isMobileDrawerOpen}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1 xl:gap-2 w-full justify-between">
            {PRIMARY_NAV_ITEMS.map((item) => {
              if (item.hasMegaMenu) {
                const isServicesActive = location.pathname.startsWith('/services')
                return (
                  <div
                    key={item.label}
                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                  >
                    <button
                      type="button"
                      onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                      onFocus={() => setIsMegaMenuOpen(true)}
                      aria-expanded={isMegaMenuOpen}
                      aria-haspopup="true"
                      className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 ${
                        isServicesActive || isMegaMenuOpen
                          ? 'text-white border-b-2 border-slate-300 font-semibold'
                          : 'text-slate-300 hover:bg-slate-800/50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isMegaMenuOpen ? 'rotate-180 text-white' : 'text-slate-400'
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                )
              }

              const isActive = location.pathname === item.href

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setIsMegaMenuOpen(false)}
                  onMouseEnter={() => setIsMegaMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-medium transition-colors rounded hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 ${
                    isActive
                      ? 'text-white border-b-2 border-slate-300 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Desktop Services Mega Menu positioned relative to full navbar */}
      <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />

      {/* Mobile Side Drawer */}
      <MobileDrawer isOpen={isMobileDrawerOpen} onClose={() => setIsMobileDrawerOpen(false)} />
    </div>
  )
}

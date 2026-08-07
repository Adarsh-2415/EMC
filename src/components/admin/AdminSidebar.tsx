import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import logoImg from '@/assets/images/emc-logo.png'
import { LayoutDashboard, Award, FileText, MessageSquare, LogOut, ChevronLeft, ChevronRight } from 'lucide-react'

interface AdminSidebarProps {
  collapsed: boolean
  onToggleCollapse: () => void
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  collapsed,
  onToggleCollapse,
}) => {
  const { logout } = useAuth()

  const navItems = [
    {
      label: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'Certificate Management',
      href: '/admin/certificates',
      icon: Award,
    },
    {
      label: 'Online Application Management',
      href: '/admin/applications',
      icon: FileText,
    },
    {
      label: 'Support Management',
      href: '/admin/support',
      icon: MessageSquare,
    },
  ]

  return (
    <aside
      className={`bg-slate-900 border-r border-slate-800 text-white flex flex-col justify-between transition-all duration-300 z-30 select-none ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Header & Logo */}
      <div className="space-y-6">
        <div className="p-4 flex items-center justify-between border-b border-slate-800/80">
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src={logoImg}
              alt="EMC Logo"
              className="h-9 w-auto object-contain bg-white/10 p-1 rounded-lg shrink-0"
            />
            {!collapsed && (
              <span className="font-extrabold text-sm tracking-tight text-white truncate">
                EMC ADMIN
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="px-3 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.href}
                to={item.href}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </NavLink>
            )
          })}
        </nav>
      </div>

      {/* Bottom Footer & Logout Button */}
      <div className="p-3 border-t border-slate-800/80">
        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-5 h-5 shrink-0" aria-hidden="true" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}

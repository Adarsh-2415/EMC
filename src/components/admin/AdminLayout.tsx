import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { AdminSidebar } from './AdminSidebar'
import { AdminHeader } from './AdminHeader'

export const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)

  // Auto-collapse sidebar on smaller mobile screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans antialiased text-slate-900">
      <SEO title="Admin Dashboard | EMC" noindex={true} />
      {/* Sidebar */}
      <AdminSidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />

      {/* Main Right Content Panel */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <AdminHeader />

        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

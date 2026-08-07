import React, { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { StatCard } from '@/components/admin/StatCard'
import { Award, FileText, MessageSquare, ShieldCheck, RefreshCw } from 'lucide-react'

export const AdminDashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [totalCertificates, setTotalCertificates] = useState<number | null>(null)
  const [totalApplications, setTotalApplications] = useState<number | null>(null)
  const [totalSupportMessages, setTotalSupportMessages] = useState<number | null>(null)
  const [activeAdmins, setActiveAdmins] = useState<number | null>(null)

  const fetchStats = useCallback(async () => {
    setLoading(true)
    try {
      // 1. Total Certificates (emc_certificates)
      const { count: certCount, error: certErr } = await supabase
        .from('emc_certificates')
        .select('*', { count: 'exact', head: true })
      setTotalCertificates(certErr ? 0 : certCount ?? 0)

      // 2. Total Online Applications (emc_online_applications)
      const { count: appCount, error: appErr } = await supabase
        .from('emc_online_applications')
        .select('*', { count: 'exact', head: true })
      setTotalApplications(appErr ? 0 : appCount ?? 0)

      // 3. Total Support Messages (emc_support_messages)
      const { count: msgCount, error: msgErr } = await supabase
        .from('emc_support_messages')
        .select('*', { count: 'exact', head: true })
      setTotalSupportMessages(msgErr ? 0 : msgCount ?? 0)

      // 4. Active Admins
      const { count: adminCount, error: adminErr } = await supabase
        .from('emc_admins')
        .select('*', { count: 'exact', head: true })
        .eq('status', true)
      setActiveAdmins(adminErr ? 1 : adminCount ?? 1)
    } catch {
      setTotalCertificates(0)
      setTotalApplications(0)
      setTotalSupportMessages(0)
      setActiveAdmins(1)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let isMounted = true
    async function loadData() {
      if (isMounted) {
        await fetchStats()
      }
    }
    loadData()
    return () => {
      isMounted = false
    }
  }, [fetchStats])

  return (
    <div className="space-y-6 max-w-7xl mx-auto select-none">
      {/* Title & Refresh Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Real-time metrics and system record indicators.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchStats}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 shadow-xs transition-colors active:scale-95 disabled:opacity-60"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Metrics</span>
        </button>
      </div>

      {/* Real-time Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Certificates"
          count={totalCertificates}
          loading={loading}
          icon={Award}
          color="emerald"
          subtitle="System Issued Registrations"
        />

        <StatCard
          title="Total Online Applications"
          count={totalApplications}
          loading={loading}
          icon={FileText}
          color="blue"
          subtitle="Submitted Application Leads"
        />

        <StatCard
          title="Total Support Messages"
          count={totalSupportMessages}
          loading={loading}
          icon={MessageSquare}
          color="indigo"
          subtitle="Customer Enquiries & Support"
        />

        <StatCard
          title="Active Admins"
          count={activeAdmins}
          loading={loading}
          icon={ShieldCheck}
          color="amber"
          subtitle="Verified Active Accounts"
        />
      </div>

      {/* Info Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure Admin Workspace Active</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white">
            Excel Management Certifications Corporate Management Portal
          </h3>
          <p className="text-xs text-slate-400 font-medium max-w-xl">
            You are securely authenticated into EMC Admin Panel. All certificate records, application leads, and support tickets are stored directly in Supabase.
          </p>
        </div>
      </div>
    </div>
  )
}

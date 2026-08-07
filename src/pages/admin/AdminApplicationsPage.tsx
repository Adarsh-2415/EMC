import React, { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import {
  ApplicationDetailModal,
  type OnlineApplicationRecord,
} from '@/components/admin/ApplicationDetailModal'
import { Search, ArrowUpDown, ChevronLeft, ChevronRight, Eye, FileText, Loader2, AlertCircle } from 'lucide-react'

export const AdminApplicationsPage: React.FC = () => {
  const [records, setRecords] = useState<OnlineApplicationRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Controls
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'company'>('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Modal Detail State
  const [selectedRecord, setSelectedRecord] = useState<OnlineApplicationRecord | null>(null)

  const fetchApplications = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      let query = supabase.from('emc_online_applications').select('*')

      if (sortBy === 'newest') {
        query = query.order('created_at', { ascending: false })
      } else if (sortBy === 'oldest') {
        query = query.order('created_at', { ascending: true })
      } else if (sortBy === 'company') {
        query = query.order('company_name', { ascending: true })
      }

      const { data, error: err } = await query

      if (err) {
        setError('Failed to fetch online applications. Please check database configuration.')
        setRecords([])
      } else {
        setRecords(data || [])
      }
    } catch {
      setError('An unexpected error occurred while fetching application submissions.')
    } finally {
      setLoading(false)
    }
  }, [sortBy])

  useEffect(() => {
    let isMounted = true
    async function loadData() {
      if (isMounted) {
        await fetchApplications()
      }
    }
    loadData()
    return () => {
      isMounted = false
    }
  }, [fetchApplications])

  // Filtered Records based on Search
  const filteredRecords = records.filter((item) => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return true
    return (
      item.company_name.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.mobile_number.toLowerCase().includes(q) ||
      item.certification_required.toLowerCase().includes(q)
    )
  })

  // Pagination calculation
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 1
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto select-none">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>Online Application Submissions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Online Application Management
          </h1>
        </div>

        <span className="text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs self-start sm:self-auto">
          Total Submissions: <span className="text-emerald-600">{records.length}</span>
        </span>
      </div>

      {/* Control Bar: Search & Sort */}
      <div className="bg-white p-4 rounded-2xl shadow-md border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            placeholder="Search by company, email, mobile, or certification..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
          />
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <ArrowUpDown className="w-4 h-4 text-slate-500 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'company')}
            className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <option value="newest">Sort by: Newest First</option>
            <option value="oldest">Sort by: Oldest First</option>
            <option value="company">Sort by: Company A-Z</option>
          </select>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-red-50 border border-red-300 text-red-900 text-xs font-semibold flex items-center gap-2 shadow-xs"
        >
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Data Table Container */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            <p className="text-sm font-semibold text-slate-600">
              Loading application submissions...
            </p>
          </div>
        ) : paginatedRecords.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <FileText className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Submissions Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchQuery
                ? 'No online applications match your search query.'
                : 'There are currently no online applications submitted from the website.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider border-b border-slate-800">
                  <th className="py-4 px-6">Company Name</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Mobile Number</th>
                  <th className="py-4 px-6">Certification Required</th>
                  <th className="py-4 px-6">Submitted Date</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs text-slate-800 font-medium">
                {paginatedRecords.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-4 px-6 font-bold text-slate-900">{item.company_name}</td>
                    <td className="py-4 px-6">{item.email}</td>
                    <td className="py-4 px-6">{item.mobile_number}</td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[11px]">
                        {item.certification_required}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500 whitespace-nowrap">
                      {new Date(item.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setSelectedRecord(item)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {!loading && filteredRecords.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4 text-xs font-semibold text-slate-600 flex-wrap">
            <span>
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredRecords.length)} of{' '}
              {filteredRecords.length} submissions
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="p-2 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="p-2 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Application Detail Modal */}
      <ApplicationDetailModal
        application={selectedRecord}
        onClose={() => setSelectedRecord(null)}
      />
    </div>
  )
}

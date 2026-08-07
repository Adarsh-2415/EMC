import React, { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import {
  CertificateModal,
  type CertificateRecord,
} from '@/components/admin/CertificateModal'
import { DeleteCertificateModal } from '@/components/admin/DeleteCertificateModal'
import {
  Search,
  Plus,
  Award,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  FileX,
  Loader2,
  AlertCircle,
} from 'lucide-react'

export const AdminCertificatesPage: React.FC = () => {
  const { showToast } = useAuth()

  const [records, setRecords] = useState<CertificateRecord[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Controls
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Modal States
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<CertificateRecord | null>(null)
  const [recordToDelete, setRecordToDelete] = useState<CertificateRecord | null>(null)

  const fetchCertificates = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const from = (currentPage - 1) * itemsPerPage
      const to = from + itemsPerPage - 1

      let query = supabase
        .from('emc_certificates')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to)

      if (searchQuery.trim()) {
        const q = searchQuery.trim()
        query = query.or(
          `certificate_no.ilike.%${q}%,company_name.ilike.%${q}%,standard.ilike.%${q}%`
        )
      }

      const { data, count, error: err } = await query

      if (err) {
        setError('Failed to fetch certificate records. Please check database configuration.')
        setRecords([])
        setTotalCount(0)
      } else {
        setRecords(data || [])
        setTotalCount(count || 0)
      }
    } catch {
      setError('An unexpected error occurred while fetching certificate records.')
    } finally {
      setLoading(false)
    }
  }, [currentPage, searchQuery])

  useEffect(() => {
    let isMounted = true
    async function loadData() {
      if (isMounted) {
        await fetchCertificates()
      }
    }
    loadData()
    return () => {
      isMounted = false
    }
  }, [fetchCertificates])

  const totalPages = Math.ceil(totalCount / itemsPerPage) || 1

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const handleOpenAddModal = () => {
    setSelectedRecord(null)
    setIsAddEditModalOpen(true)
  }

  const handleOpenEditModal = (record: CertificateRecord) => {
    setSelectedRecord(record)
    setIsAddEditModalOpen(true)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto select-none">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Certificate Management System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Certificate Records
          </h1>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-emerald-400" />
          <span>Add Certificate</span>
        </button>
      </div>

      {/* Control Bar: Search */}
      <div className="bg-white p-4 rounded-2xl shadow-md border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            placeholder="Search by Certificate No, Company Name, or Standard..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
          />
        </div>

        <span className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl">
          Total Records: <span className="text-slate-900">{totalCount}</span>
        </span>
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
              Loading certificate records...
            </p>
          </div>
        ) : records.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Award className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">
              {searchQuery ? 'No Matching Certificates Found' : 'No Certificates Found'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchQuery
                ? 'No certificate records match your search criteria.'
                : 'There are currently no certificate records in the database. Click "Add Certificate" to create one.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider border-b border-slate-800">
                  <th className="py-4 px-6">Certificate No.</th>
                  <th className="py-4 px-6">Company Name</th>
                  <th className="py-4 px-6">Standard</th>
                  <th className="py-4 px-6">Issue Date</th>
                  <th className="py-4 px-6">Expiry Date</th>
                  <th className="py-4 px-6">PDF Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs text-slate-800 font-medium">
                {records.map((item) => {
                  const hasPdf = Boolean(item.pdf_path)

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-extrabold text-slate-900 font-mono">
                        {item.certificate_no}
                      </td>
                      <td className="py-4 px-6 font-semibold text-slate-900">
                        {item.company_name || '—'}
                      </td>
                      <td className="py-4 px-6">
                        {item.standard ? (
                          <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-bold border border-slate-200 text-[11px]">
                            {item.standard}
                          </span>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="py-4 px-6 text-slate-600 whitespace-nowrap">
                        {item.issue_date || '—'}
                      </td>
                      <td className="py-4 px-6 text-slate-600 whitespace-nowrap font-semibold">
                        {item.expiry_date || '—'}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        {hasPdf ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[11px]">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Available</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-semibold border border-slate-200 text-[11px]">
                            <FileX className="w-3.5 h-3.5 text-slate-400" />
                            <span>Not Uploaded</span>
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right whitespace-nowrap space-x-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(item)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors border border-slate-300"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-slate-600" />
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setRecordToDelete(item)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs transition-colors border border-red-200"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-600" />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {!loading && records.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4 text-xs font-semibold text-slate-600 flex-wrap">
            <span>
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} records
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

      {/* Add / Edit Certificate Modal */}
      <CertificateModal
        isOpen={isAddEditModalOpen}
        certificate={selectedRecord}
        onClose={() => setIsAddEditModalOpen(false)}
        onSuccess={fetchCertificates}
        showToast={showToast}
      />

      {/* Delete Certificate Confirmation Modal */}
      <DeleteCertificateModal
        certificate={recordToDelete}
        onClose={() => setRecordToDelete(null)}
        onSuccess={fetchCertificates}
        showToast={showToast}
      />
    </div>
  )
}

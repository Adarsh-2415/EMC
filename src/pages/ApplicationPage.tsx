import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react'
import { SERVICES_MEGA_MENU } from '@/constants/navigation'
import { supabase } from '@/lib/supabase'
import { sendEmailNotification } from '@/lib/emailService'
import { SEO } from '@/components/common/SEO'
import { MAIN_PAGES_SEO } from '@/constants/seoData'
import { generateBreadcrumbSchema } from '@/utils/schemaGenerator'

const applicationSchema = z.object({
  companyName: z.string().min(1, { message: 'Company Name is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  mobileNumber: z
    .string()
    .min(1, { message: 'Mobile Number is required' })
    .regex(/^[0-9+\s-]{10,15}$/, { message: 'Please enter a valid numeric mobile number' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),
  certificationRequired: z.string().min(1, { message: 'Please select a certification' }),
  message: z.string().min(1, { message: 'Message is required' }),
})

type ApplicationFormValues = z.infer<typeof applicationSchema>

export const ApplicationPage: React.FC = () => {
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      companyName: '',
      address: '',
      mobileNumber: '',
      email: '',
      certificationRequired: '',
      message: '',
    },
  })

  const onSubmit = async (data: ApplicationFormValues) => {
    setIsSubmitting(true)
    setSubmissionStatus('idle')

    try {
      // 1. Save to Supabase emc_online_applications table FIRST
      const { error } = await supabase.from('emc_online_applications').insert([
        {
          company_name: data.companyName,
          address: data.address,
          mobile_number: data.mobileNumber,
          email: data.email,
          certification_required: data.certificationRequired,
          message: data.message,
        },
      ])

      if (error) {
        setSubmissionStatus('error')
      } else {
        setSubmissionStatus('success')
        reset()

        // 2. Non-blocking asynchronous SMTP notification call
        sendEmailNotification('application', {
          companyName: data.companyName,
          address: data.address,
          mobileNumber: data.mobileNumber,
          email: data.email,
          certificationRequired: data.certificationRequired,
          message: data.message,
          submittedAt: new Date().toLocaleString('en-US', {
            dateStyle: 'full',
            timeStyle: 'medium',
          }),
        }).catch(() => {
          // Suppress error so user submission is never affected
        })
      }
    } catch {
      setSubmissionStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full bg-slate-50 text-slate-900 py-10 sm:py-14 md:py-18 min-h-screen flex items-center justify-center">
      <SEO
        {...MAIN_PAGES_SEO.apply}
        schemas={[
          generateBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Online Application Form', url: '/apply' },
          ]),
        ]}
      />
      <div className="max-w-2xl mx-auto w-full px-4 sm:px-6">
        {/* Header */}
        <div className="text-center space-y-3 mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Online Application Form
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 via-blue-600 to-slate-800 mx-auto rounded-full" />
        </div>

        {/* Notifications */}
        {submissionStatus === 'success' && (
          <div
            role="alert"
            className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-3 shadow-md animate-in fade-in slide-in-from-top-2 duration-300"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
            <span className="text-sm font-semibold">Application submitted successfully.</span>
          </div>
        )}

        {submissionStatus === 'error' && (
          <div
            role="alert"
            className="mb-6 p-4 rounded-xl bg-red-50 border border-red-300 text-red-900 flex items-center gap-3 shadow-md animate-in fade-in slide-in-from-top-2 duration-300"
          >
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" aria-hidden="true" />
            <span className="text-sm font-semibold">
              Unable to submit your application. Please try again.
            </span>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-slate-200/80">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            {/* 1. Company Name */}
            <div className="space-y-1.5">
              <label htmlFor="companyName" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                id="companyName"
                type="text"
                aria-required="true"
                aria-invalid={errors.companyName ? 'true' : 'false'}
                className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  errors.companyName
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50/20'
                    : 'border-slate-300 focus:ring-slate-900 focus:border-slate-900 bg-white'
                }`}
                placeholder="Enter official company name"
                {...register('companyName')}
              />
              {errors.companyName && (
                <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.companyName.message}</span>
                </p>
              )}
            </div>

            {/* 2. Address */}
            <div className="space-y-1.5">
              <label htmlFor="address" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                rows={3}
                aria-required="true"
                aria-invalid={errors.address ? 'true' : 'false'}
                className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  errors.address
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50/20'
                    : 'border-slate-300 focus:ring-slate-900 focus:border-slate-900 bg-white'
                }`}
                placeholder="Enter complete postal address"
                {...register('address')}
              />
              {errors.address && (
                <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.address.message}</span>
                </p>
              )}
            </div>

            {/* 3. Mobile Number */}
            <div className="space-y-1.5">
              <label htmlFor="mobileNumber" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                id="mobileNumber"
                type="tel"
                aria-required="true"
                aria-invalid={errors.mobileNumber ? 'true' : 'false'}
                className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  errors.mobileNumber
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50/20'
                    : 'border-slate-300 focus:ring-slate-900 focus:border-slate-900 bg-white'
                }`}
                placeholder="e.g. +91 9876543210"
                {...register('mobileNumber')}
              />
              {errors.mobileNumber && (
                <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.mobileNumber.message}</span>
                </p>
              )}
            </div>

            {/* 4. Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                aria-required="true"
                aria-invalid={errors.email ? 'true' : 'false'}
                className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50/20'
                    : 'border-slate-300 focus:ring-slate-900 focus:border-slate-900 bg-white'
                }`}
                placeholder="name@company.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.email.message}</span>
                </p>
              )}
            </div>

            {/* 5. Certification Required */}
            <div className="space-y-1.5">
              <label htmlFor="certificationRequired" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Certification Required <span className="text-red-500">*</span>
              </label>
              <select
                id="certificationRequired"
                aria-required="true"
                aria-invalid={errors.certificationRequired ? 'true' : 'false'}
                className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors text-slate-900 bg-white focus:outline-none focus:ring-2 ${
                  errors.certificationRequired
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50/20'
                    : 'border-slate-300 focus:ring-slate-900 focus:border-slate-900'
                }`}
                {...register('certificationRequired')}
              >
                <option value="">Select a certification standard...</option>
                {SERVICES_MEGA_MENU.map((category) => (
                  <optgroup key={category.title} label={category.title}>
                    {category.certifications.map((cert) => (
                      <option key={cert.name} value={cert.name}>
                        {cert.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              {errors.certificationRequired && (
                <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.certificationRequired.message}</span>
                </p>
              )}
            </div>

            {/* 6. Message */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                rows={4}
                aria-required="true"
                aria-invalid={errors.message ? 'true' : 'false'}
                className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  errors.message
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50/20'
                    : 'border-slate-300 focus:ring-slate-900 focus:border-slate-900 bg-white'
                }`}
                placeholder="Describe your certification scope and requirements..."
                {...register('message')}
              />
              {errors.message && (
                <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.message.message}</span>
                </p>
              )}
            </div>

            {/* Standard Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" aria-hidden="true" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-white" aria-hidden="true" />
                  <span>Submit Application</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { sendEmailNotification } from '@/lib/emailService'
import { SEO } from '@/components/common/SEO'
import { MAIN_PAGES_SEO } from '@/constants/seoData'
import { generateContactPageSchema, generateBreadcrumbSchema } from '@/utils/schemaGenerator'

const supportSchema = z.object({
  firstName: z.string().min(1, { message: 'First Name is required' }),
  lastName: z.string().min(1, { message: 'Last Name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),
  department: z.enum(
    [
      'Certification Services',
      'Training Programs',
      'Inspection & Verification',
      'General Enquiry',
      'Other',
    ],
    { message: 'Please select a department' }
  ),
  subject: z.string().min(1, { message: 'Subject is required' }),
  message: z.string().min(1, { message: 'Message is required' }),
})

type SupportFormValues = z.infer<typeof supportSchema>

export const SupportPage: React.FC = () => {
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupportFormValues>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  const onSubmit = async (data: SupportFormValues) => {
    setIsSubmitting(true)
    setSubmissionStatus('idle')

    try {
      // 1. Save to Supabase emc_support_messages table FIRST
      const { error } = await supabase.from('emc_support_messages').insert([
        {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          department: data.department,
          subject: data.subject,
          message: data.message,
        },
      ])

      if (error) {
        setSubmissionStatus('error')
      } else {
        setSubmissionStatus('success')
        reset()

        // 2. Non-blocking asynchronous SMTP notification call
        sendEmailNotification('support', {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          department: data.department,
          subject: data.subject,
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

  const departments = [
    'Certification Services',
    'Training Programs',
    'Inspection & Verification',
    'General Enquiry',
    'Other',
  ] as const

  return (
    <div className="w-full bg-slate-50 text-slate-900 py-10 sm:py-14 md:py-18 min-h-screen flex items-center justify-center">
      <SEO
        {...MAIN_PAGES_SEO.support}
        schemas={[
          generateContactPageSchema(),
          generateBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Support', url: '/support' },
          ]),
        ]}
      />
      <div className="max-w-2xl mx-auto w-full px-4 sm:px-6">
        {/* Header */}
        <div className="text-center space-y-3 mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Support
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
            <span className="text-sm font-semibold">
              Your request has been submitted successfully.
            </span>
          </div>
        )}

        {submissionStatus === 'error' && (
          <div
            role="alert"
            className="mb-6 p-4 rounded-xl bg-red-50 border border-red-300 text-red-900 flex items-center gap-3 shadow-md animate-in fade-in slide-in-from-top-2 duration-300"
          >
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" aria-hidden="true" />
            <span className="text-sm font-semibold">
              Unable to submit your request. Please try again.
            </span>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-slate-200/80">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            {/* 1. Name: First Name & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* First Name */}
              <div className="space-y-1.5">
                <label htmlFor="firstName" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  aria-required="true"
                  aria-invalid={errors.firstName ? 'true' : 'false'}
                  className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                    errors.firstName
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50/20'
                      : 'border-slate-300 focus:ring-slate-900 focus:border-slate-900 bg-white'
                  }`}
                  placeholder="John"
                  {...register('firstName')}
                />
                {errors.firstName && (
                  <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.firstName.message}</span>
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-1.5">
                <label htmlFor="lastName" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  aria-required="true"
                  aria-invalid={errors.lastName ? 'true' : 'false'}
                  className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                    errors.lastName
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50/20'
                      : 'border-slate-300 focus:ring-slate-900 focus:border-slate-900 bg-white'
                  }`}
                  placeholder="Doe"
                  {...register('lastName')}
                />
                {errors.lastName && (
                  <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.lastName.message}</span>
                  </p>
                )}
              </div>
            </div>

            {/* 2. Email */}
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

            {/* 3. Department */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Department <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {departments.map((dept) => (
                  <label
                    key={dept}
                    className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-slate-400 cursor-pointer transition-colors bg-white hover:bg-slate-50"
                  >
                    <input
                      type="radio"
                      value={dept}
                      className="w-4 h-4 text-slate-900 border-slate-300 focus:ring-slate-900"
                      {...register('department')}
                    />
                    <span className="text-xs font-semibold text-slate-800">{dept}</span>
                  </label>
                ))}
              </div>
              {errors.department && (
                <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.department.message}</span>
                </p>
              )}
            </div>

            {/* 4. Subject */}
            <div className="space-y-1.5">
              <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                id="subject"
                type="text"
                aria-required="true"
                aria-invalid={errors.subject ? 'true' : 'false'}
                className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  errors.subject
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50/20'
                    : 'border-slate-300 focus:ring-slate-900 focus:border-slate-900 bg-white'
                }`}
                placeholder="Brief summary of your inquiry"
                {...register('subject')}
              />
              {errors.subject && (
                <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.subject.message}</span>
                </p>
              )}
            </div>

            {/* 5. Message */}
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
                placeholder="Detailed description of your support request..."
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
                  <span>Submit Request</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

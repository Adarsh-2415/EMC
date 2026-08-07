import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SERVICES_DATA } from '@/data/servicesData'
import { ShieldCheck, CheckCircle2, ChevronRight, ArrowRight, Building2 } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { SERVICE_SLUGS_SEO, MAIN_PAGES_SEO } from '@/constants/seoData'
import {
  generateServiceSchema,
  generateFaqSchema,
  generateBreadcrumbSchema,
} from '@/utils/schemaGenerator'

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()

  // If no slug, default to iso-9001-2015
  const currentSlug = slug || 'iso-9001-2015'
  const service = SERVICES_DATA[currentSlug]

  if (!service) {
    return <Navigate to="/services/iso-9001-2015" replace />
  }

  const seoConfig = SERVICE_SLUGS_SEO[currentSlug] || {
    ...MAIN_PAGES_SEO.services,
    title: `${service.title} | Excel Management Certifications`,
    description: service.subtitle,
    canonical: `https://www.emcindia.org/services/${currentSlug}`,
  }

  const schemas: Record<string, unknown>[] = [
    generateServiceSchema(service.title, service.subtitle, currentSlug),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: service.title, url: `/services/${currentSlug}` },
    ]),
  ]

  if (service.applicableItems && service.applicableItems.length > 0) {
    schemas.push(
      generateFaqSchema([
        {
          question: `Who is ${service.title} ${service.applicableHeading.replace(':', '').trim()}?`,
          answer: service.applicableItems.join(', '),
        },
      ])
    )
  }

  return (
    <div className="w-full bg-slate-50 text-slate-900">
      <SEO {...seoConfig} schemas={schemas} />
      {/* Section 1: Pure Typography Enterprise Header (No Images) */}
      <section className="w-full relative bg-slate-950 text-white overflow-hidden py-12 sm:py-16 md:py-20 border-b border-slate-800">
        {/* Micro-grid background texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-4 max-w-3xl"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 flex-wrap">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-slate-400">Services Offered</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-emerald-400 font-semibold">{service.title}</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wider uppercase backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>{service.category}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {service.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
              {service.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Executive 2-Column Asymmetric Content Grid */}
      <section className="w-full py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Overview & Description (8 Cols) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-slate-200/80 space-y-6"
            >
              <div className="space-y-2 border-b border-slate-100 pb-4">
                <span className="text-xs uppercase tracking-wider font-bold text-slate-500">
                  Certification Overview
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Overview & Scope
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-slate-800 rounded-full" />
              </div>

              {/* Description Paragraphs */}
              <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
                {service.description.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Sub Points if present */}
              {service.subPoints && service.subPoints.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Key Outcomes & Coverage
                  </h3>
                  <div className="space-y-2.5">
                    {service.subPoints.map((point, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-slate-800 text-sm sm:text-base font-medium leading-snug"
                      >
                        <CheckCircle2
                          className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Right Column: Applicable For Card (4 Cols) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
              className="lg:col-span-4"
            >
              <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-800 space-y-6 sticky top-24">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Building2 className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
                      Target Eligibility
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-white">
                      {service.applicableHeading}
                    </h3>
                  </div>
                </div>

                <ul className="space-y-3.5">
                  {service.applicableItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2
                        className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-slate-200 font-medium leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <Link
                    to="/apply"
                    className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    <span>Apply For This Certification</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <p className="text-center text-xs text-slate-400">
                    Autonomous R&D, Audit & Certification Body
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

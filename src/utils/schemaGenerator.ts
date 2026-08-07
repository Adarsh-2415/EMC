import { BASE_URL, DEFAULT_OG_IMAGE, SITE_NAME } from '@/constants/seoData'

/**
 * Organization Schema.org JSON-LD
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    alternateName: 'EMC',
    url: BASE_URL,
    logo: DEFAULT_OG_IMAGE,
    foundingDate: '2015-05-01',
    description:
      'Autonomous research and development consultancy organization delivering independent auditing, assessment, and ISO management system certifications.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [],
  }
}

/**
 * WebSite Schema.org JSON-LD
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/certification-search?certNo={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * Service Schema.org JSON-LD
 */
export function generateServiceSchema(serviceName: string, description: string, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    name: serviceName,
    description: description,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
    },
    areaServed: 'Worldwide',
    url: `${BASE_URL}/services/${slug}`,
  }
}

/**
 * FAQPage Schema.org JSON-LD
 */
export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * BreadcrumbList Schema.org JSON-LD
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  }
}

/**
 * ContactPage Schema.org JSON-LD
 */
export function generateContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact & Support - ${SITE_NAME}`,
    url: `${BASE_URL}/support`,
    description: 'Get in touch with Excel Management Certifications customer support team.',
  }
}

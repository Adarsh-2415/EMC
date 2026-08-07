import React from 'react'
import { BASE_URL, DEFAULT_OG_IMAGE, SITE_NAME, type PageSeoConfig } from '@/constants/seoData'

interface SEOProps extends Partial<PageSeoConfig> {
  schemas?: Record<string, unknown>[]
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Excel Management Certifications | ISO Certification Body in India',
  description = 'Excel Management Certifications (EMC) is a premier autonomous assessment and consultancy organization in India offering ISO 9001, ISO 14001, ISO 45001, ISO 27001 & CE Marking certifications.',
  keywords = 'ISO Certification Body India, Excel Management Certifications, EMC, ISO 9001, ISO 14001, ISO 45001, ISO 27001',
  canonical = BASE_URL,
  ogTitle,
  ogDescription,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
  schemas = [],
}) => {
  const finalTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  const finalOgTitle = ogTitle || finalTitle
  const finalOgDescription = ogDescription || description
  const robotsDirective = noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

  return (
    <>
      {/* 1. Basic Document Title & Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robotsDirective} />
      <meta name="googlebot" content={robotsDirective} />

      {/* 2. Canonical Link */}
      <link rel="canonical" href={canonical} />

      {/* 3. Open Graph Protocols */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_US" />

      {/* 4. Twitter Card Metadata */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalOgTitle} />
      <meta name="twitter:description" content={finalOgDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* 5. JSON-LD Structured Data Injection */}
      {schemas.map((schema, idx) => (
        <script
          key={`schema-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}

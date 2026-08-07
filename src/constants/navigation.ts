export interface NavItem {
  label: string
  href: string
  hasMegaMenu?: boolean
}

export interface CertificationCategory {
  title: string
  certifications: {
    name: string
    href: string
  }[]
}

export const PRIMARY_NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About EMC', href: '/about' },
  { label: 'Services Offered', href: '/services', hasMegaMenu: true },
  { label: 'Certification Search', href: '/certification-search' },
  { label: 'Online Application Form', href: '/application-form' },
  { label: 'Training', href: '/training' },
  { label: 'Support', href: '/support' },
]

export const SERVICES_MEGA_MENU: CertificationCategory[] = [
  {
    title: 'Management Systems',
    certifications: [
      { name: 'ISO 9001:2015 QMS', href: '/services/iso-9001-2015' },
      { name: 'ISO 14001:2004 EMS', href: '/services/iso-14001-2004' },
      { name: 'ISO 18001:2007 OHSAS', href: '/services/iso-18001-2007' },
      { name: 'ISO 45001:2018 OHSMS', href: '/services/iso-45001-2018' },
      { name: 'ISO 50001:2011', href: '/services/iso-50001-2011' },
    ],
  },
  {
    title: 'Food & Manufacturing',
    certifications: [
      { name: 'ISO 22000:2005 FSMS', href: '/services/iso-22000-2005' },
      { name: 'WHO-GMP', href: '/services/who-gmp' },
      { name: 'ORGANIC CERTIFICATION', href: '/services/organic-certification' },
    ],
  },
  {
    title: 'Information & IT',
    certifications: [
      { name: 'ISO/IEC 27001:2005', href: '/services/iso-27001-2005' },
      { name: 'ISO/IEC 20000-1:2018', href: '/services/iso-20000-1-2018' },
    ],
  },
  {
    title: 'Laboratory & Testing',
    certifications: [{ name: 'ISO/IEC 17025:2005', href: '/services/iso-17025-2005' }],
  },
  {
    title: 'Automotive',
    certifications: [{ name: 'ISO/TS 16949', href: '/services/iso-ts-16949' }],
  },
  {
    title: 'Medical Devices',
    certifications: [{ name: 'ISO 13485:2016', href: '/services/iso-13485-2016' }],
  },
  {
    title: 'Social Responsibility',
    certifications: [{ name: 'SA 8000', href: '/services/sa-8000' }],
  },
]

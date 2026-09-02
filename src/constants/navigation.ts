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
      { name: 'ISO 14001:2015 EMS', href: '/services/iso-14001-2015' },
      { name: 'ISO 45001:2018 OHSMS', href: '/services/iso-45001-2018' },
      { name: 'ISO 50001:2018 EnMS', href: '/services/iso-50001-2018' },
    ],
  },
  {
    title: 'Food & Manufacturing',
    certifications: [
      { name: 'ISO 22000:2018 FSMS', href: '/services/iso-22000-2018' },
      { name: 'WHO-GMP', href: '/services/who-gmp' },
      { name: 'ORGANIC CERTIFICATION', href: '/services/organic-certification' },
    ],
  },
  {
    title: 'Information & IT',
    certifications: [
      { name: 'ISO/IEC 27001:2022 ISMS', href: '/services/iso-27001-2022' },
      { name: 'ISO/IEC 20000-1:2018', href: '/services/iso-20000-1-2018' },
    ],
  },
  {
    title: 'Laboratory & Testing',
    certifications: [{ name: 'ISO/IEC 17025:2017', href: '/services/iso-17025-2017' }],
  },
  {
    title: 'Automotive',
    certifications: [{ name: 'IATF 16949:2016', href: '/services/iatf-16949-2016' }],
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

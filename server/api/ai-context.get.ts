import { navItems, phone, phoneLabel } from '~/data/site'

export default defineEventHandler(() => ({
  name: 'Багатур BJJ Burgas',
  type: 'Brazilian Jiu-Jitsu academy',
  location: 'Burgas, Bulgaria',
  languages: ['bg', 'en'],
  primaryLanguage: 'bg',
  phone,
  phoneLabel,
  audiences: ['kids 4-7', 'kids 8-13', 'adults'],
  programs: ['Brazilian Jiu-Jitsu', 'functional training', 'trial class', 'events', 'GYMNASIUM CAMP'],
  pages: navItems.map((item) => item.to),
  notes: 'Address, email, coach biography and final schedule are placeholders and will be added later.'
}))

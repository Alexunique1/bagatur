import { footerNav, nav, phone, phoneLabel, programs, routes } from '~/data/content'

export default defineEventHandler(() => ({
  name: 'Багатур BJJ Burgas',
  type: 'Brazilian Jiu-Jitsu academy',
  location: 'Burgas, Bulgaria',
  languages: ['bg', 'en'],
  primaryLanguage: 'bg',
  phone,
  phoneLabel,
  audiences: ['kids 4-7', 'kids 8-13', 'adults'],
  programs: programs.map((program) => program.en.title),
  navigation: nav.map((item) => item.path),
  footerNavigation: footerNav.map((item) => item.path),
  pages: routes,
  notes: 'Address, email, coach biography and final schedule are placeholders and will be added later.',
  aiSummary: 'Bagatur is a new BJJ academy in Burgas with Bulgarian as the primary website language, English as secondary language, trial classes, programs for kids and adults, events and GYMNASIUM CAMP.'
}))

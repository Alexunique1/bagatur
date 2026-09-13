import { mapUrl, scheduleRows, sitePhone, sitePhoneLabel } from '~/data/site'

export default defineEventHandler(() => ({
  name: 'Багатур BJJ Burgas',
  type: 'Brazilian Jiu-Jitsu academy',
  location: 'Burgas, Bulgaria',
  address: 'ул. Одрин 2, 8000 Бургас',
  map: mapUrl,
  languages: ['bg', 'ru', 'en'],
  primaryLanguage: 'bg',
  phone: sitePhone,
  phoneLabel: sitePhoneLabel,
  audiences: ['kids 4-7', 'kids 8-14', 'adults 14+'],
  schedule: scheduleRows,
  contentSections: ['programs', 'mission', 'trainer', 'achievements', 'schedule', 'gallery', 'news', 'faq', 'contact'],
  notes: 'Coach biography, verified student achievements and final academy photographs are awaiting owner-supplied content. The public address and schedule are current project inputs.',
  aiSummary: 'Bagatur is a Brazilian Jiu-Jitsu academy in Burgas. The website is Bulgarian-first with Russian and English translations, direct phone booking, exact weekly schedule, news and gallery sections.'
}))

import { mapUrl, scheduleRows, siteCopy, sitePhone, sitePhoneLabel } from '~/data/site'

const publicBase = 'https://bagaturbjj.com'
const groupNames = {
  kids47: { bg: 'Деца 4–7', ru: 'Дети 4–7', en: 'Children 4–7' },
  kids814: { bg: 'Деца 8–14', ru: 'Дети 8–14', en: 'Children 8–14' },
  adults: { bg: 'Възрастни 14+', ru: 'Взрослые 14+', en: 'Adults 14+' }
} as const

export default defineEventHandler(() => ({
  schemaVersion: 1,
  entity: {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    '@id': publicBase + '/#academy',
    name: 'Bagatur BJJ Burgas',
    alternateName: ['Багатур BJJ Бургас', 'Багатур BJJ Бургас'],
    url: publicBase + '/',
    description: siteCopy.en.metaDescription,
    sport: 'Brazilian Jiu-Jitsu',
    telephone: sitePhone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Одрин 2',
      addressLocality: 'Бургас',
      postalCode: '8000',
      addressCountry: 'BG'
    },
    hasMap: mapUrl,
    areaServed: { '@type': 'City', name: 'Burgas' },
    availableLanguage: ['Bulgarian', 'Russian', 'English']
  },
  facts: {
    primaryLanguage: 'bg',
    languages: ['bg', 'ru', 'en'],
    coach: {
      name: 'Yordan Petrov',
      nameBg: 'Йордан Петров',
      role: 'Brazilian Jiu-Jitsu coach',
      profile: siteCopy.en.trainerText
    },
    mission: siteCopy.en.missionText,
    audiences: Object.values(groupNames),
    schedule: scheduleRows.map(row => ({
      group: groupNames[row.group],
      sessions: row.slots
    })),
    contact: {
      phone: sitePhone,
      phoneLabel: sitePhoneLabel,
      trialClass: 'Call the coach at ' + sitePhoneLabel,
      address: 'ул. Одрин 2, 8000 Бургас, България',
      map: mapUrl
    }
  },
  externalCoverage: [{
    publisher: 'Flagman.bg',
    headline: 'Багатур с 43 медала и 4 отборни титли в Пловдив',
    datePublished: '2026-09-14T21:30:00+03:00',
    url: 'https://www.flagman.bg/article/389904',
    summary: 'Flagman.bg reports that the Burgas academy won 43 medals and four first-place team titles at the AGF Plovdiv Championships.'
  }],
  discovery: {
    home: publicBase + '/',
    achievements: publicBase + '/achievements/',
    sitemap: publicBase + '/sitemap.xml',
    llms: publicBase + '/llms.txt',
    llmsFull: publicBase + '/llms-full.txt',
    publishedContentApi: publicBase + '/api/collections/content_items/records?filter=published%20%3D%20true&sort=sort_order%2C-event_date&perPage=200'
  }
}))
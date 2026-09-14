<script setup lang="ts">
import type { Locale } from '~/data/content'
import type { CmsItem } from '~/types/cms'
import { galleryCategoryOrder, mapUrl, scheduleRows, siteCopy, sitePhone, sitePhoneLabel } from '~/data/site'

const config = useRuntimeConfig()
const { locale } = useLocale()
const { news, gallery, results, loading } = useCmsContent()
const t = computed(() => siteCopy[locale.value])
const scheduleDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const

type ScheduleDay = typeof scheduleDays[number]
type ScheduleRow = typeof scheduleRows[number]

const slotFor = (row: ScheduleRow, day: ScheduleDay) => row.slots.find(slot => slot.day === day)
const slotsForDay = (day: ScheduleDay) => scheduleRows.flatMap((row) => {
  const slot = slotFor(row, day)
  return slot ? [{ group: row.group, time: slot.time }] : []
})

const assetPath = (path: string) => {
  if (/^https?:\/\//.test(path)) return path
  const base = config.app.baseURL.endsWith('/') ? config.app.baseURL : config.app.baseURL + '/'
  return base + path.replace(/^\//, '')
}
const localized = (item: CmsItem, field: 'title' | 'body') => {
  const key = (field + '_' + locale.value) as keyof CmsItem
  const fallback = (field + '_bg') as keyof CmsItem
  return String(item[key] || item[fallback] || '')
}

const programImage = (key: string) => assetPath(
  key === 'adults'
    ? '/images/placeholders/programs-adults.jpg'
    : '/images/placeholders/programs-kids.jpg'
)
const galleryCategories = computed(() => galleryCategoryOrder.flatMap((slug) => {
  const items = gallery.value.filter((item) => (item.category_slug || item.slug) === slug)
  const cover = items[0]
  return cover ? [{ slug, cover, count: items.length }] : []
}))
const achievementsRoute = computed(() => ({
  path: '/achievements/',
  query: locale.value === 'bg' ? {} : { lang: locale.value }
}))
const resultTimestamp = (item: CmsItem) => {
  if (!item.event_date) return 0
  const normalized = item.event_date.includes(' ') ? item.event_date.replace(' ', 'T') : item.event_date
  const value = new Date(normalized).getTime()
  return Number.isNaN(value) ? 0 : value
}
const latestResults = computed(() => [...results.value]
  .sort((a, b) => resultTimestamp(b) - resultTimestamp(a) || Number(a.sort_order || 0) - Number(b.sort_order || 0))
  .slice(0, 10))
const activeResultIndex = ref(0)
const resultDirection = ref<'next' | 'previous'>('next')
const activeResult = computed(() => latestResults.value[activeResultIndex.value])
const achievementStatus = computed(() => t.value.achievementsNav.status
  .replace('{current}', String(activeResultIndex.value + 1))
  .replace('{total}', String(latestResults.value.length)))

watch(() => latestResults.value.map(item => item.id).join('|'), () => {
  activeResultIndex.value = 0
})

const showPreviousResult = () => {
  if (activeResultIndex.value === 0) return
  resultDirection.value = 'previous'
  activeResultIndex.value -= 1
}
const showNextResult = () => {
  if (activeResultIndex.value >= latestResults.value.length - 1) return
  resultDirection.value = 'next'
  activeResultIndex.value += 1
}
const handleResultKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    showPreviousResult()
  }
  if (event.key === 'ArrowRight') {
    event.preventDefault()
    showNextResult()
  }
}

let resultSwipeStart: number | null = null
const startResultSwipe = (event: TouchEvent) => {
  resultSwipeStart = event.changedTouches[0]?.clientX ?? null
}
const finishResultSwipe = (event: TouchEvent) => {
  if (resultSwipeStart === null) return
  const distance = (event.changedTouches[0]?.clientX ?? resultSwipeStart) - resultSwipeStart
  resultSwipeStart = null
  if (Math.abs(distance) < 48) return
  if (distance > 0) showPreviousResult()
  else showNextResult()
}

const localeUrl = computed(() => locale.value === 'bg'
  ? config.public.siteUrl + '/'
  : config.public.siteUrl + '/?lang=' + locale.value)
const ogLocale = computed(() => locale.value === 'bg' ? 'bg_BG' : locale.value === 'ru' ? 'ru_RU' : 'en_US')

useHead({
  title: () => t.value.metaTitle,
  htmlAttrs: () => ({ lang: locale.value }),
  link: [
    { rel: 'canonical', href: () => localeUrl.value },
    { rel: 'alternate', hreflang: 'bg', href: () => config.public.siteUrl + '/' },
    { rel: 'alternate', hreflang: 'ru', href: () => config.public.siteUrl + '/?lang=ru' },
    { rel: 'alternate', hreflang: 'en', href: () => config.public.siteUrl + '/?lang=en' },
    { rel: 'alternate', hreflang: 'x-default', href: () => config.public.siteUrl + '/' }
  ],
  meta: [
    { name: 'description', content: () => t.value.metaDescription },
    { property: 'og:title', content: () => t.value.metaTitle },
    { property: 'og:description', content: () => t.value.metaDescription },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: () => localeUrl.value },
    { property: 'og:site_name', content: 'Bagatur BJJ Burgas' },
    { property: 'og:locale', content: () => ogLocale.value },
    { property: 'og:image', content: () => config.public.siteUrl + '/images/bagatur-logo-main.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: () => t.value.metaTitle },
    { name: 'twitter:description', content: () => t.value.metaDescription },
    { name: 'twitter:image', content: () => config.public.siteUrl + '/images/bagatur-logo-main.jpg' }
  ],
  script: [{
    type: 'application/ld+json',
    innerHTML: () => JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': config.public.siteUrl + '/#website',
          name: 'Bagatur BJJ Burgas',
          alternateName: ['Багатур BJJ Бургас', 'Багатур BJJ Бургас'],
          url: config.public.siteUrl + '/',
          inLanguage: ['bg', 'ru', 'en'],
          description: t.value.metaDescription
        },
        {
          '@type': 'SportsActivityLocation',
          '@id': config.public.siteUrl + '/#academy',
          name: 'Bagatur BJJ Burgas',
          alternateName: ['Багатур BJJ Бургас', 'Багатур BJJ Бургас'],
          url: config.public.siteUrl + '/',
          logo: config.public.siteUrl + '/images/bagatur-logo-main.jpg',
          image: config.public.siteUrl + '/images/bagatur-logo-main.jpg',
          description: t.value.metaDescription,
          slogan: t.value.missionTitle,
          telephone: sitePhone,
          sport: 'Brazilian Jiu-Jitsu',
          knowsAbout: ['Brazilian Jiu-Jitsu', 'BJJ for children', 'BJJ for adults'],
          availableLanguage: ['Bulgarian', 'Russian', 'English'],
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'ул. Одрин 2',
            addressLocality: 'Бургас',
            postalCode: '8000',
            addressCountry: 'BG'
          },
          areaServed: { '@type': 'City', name: 'Burgas' },
          hasMap: mapUrl,
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: sitePhone,
            contactType: 'trial class booking',
            availableLanguage: ['Bulgarian', 'Russian', 'English']
          },
          employee: {
            '@type': 'Person',
            name: 'Yordan Petrov',
            alternateName: 'Йордан Петров',
            jobTitle: 'Brazilian Jiu-Jitsu coach'
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: t.value.programSection,
            itemListElement: t.value.programs.map((program: { title: string, text: string }) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: program.title,
                description: program.text,
                areaServed: { '@type': 'City', name: 'Burgas' }
              }
            }))
          },
          subjectOf: {
            '@type': 'NewsArticle',
            headline: 'Багатур с 43 медала и 4 отборни титли в Пловдив',
            datePublished: '2026-09-14T21:30:00+03:00',
            url: 'https://www.flagman.bg/article/389904',
            publisher: { '@type': 'Organization', name: 'Flagman.bg' }
          }
        }
      ]
    })
  }]
})
</script>

<template>
  <div class="home-page">
    <!--
    THESIS: Bagatur sells calm confidence through visible practice, not fight-club spectacle.
    OWN-WORLD: charcoal training hall, bone editorial pages, antique-gold rules, red phone actions.
    STORY: choose an age group, trust the coach, see the exact schedule, call directly.
    FIRST VIEWPORT: monumental wordmark behind a coach-and-children photograph; offer and phone at left.
    FORM: approved Training Hall composition, photo-led bands and alternating proof fields.
    -->
    <section class="hero" id="top">
      <img class="hero__photo" :src="assetPath('/images/placeholders/hero-training.jpg')" alt="">
      <div class="hero__shade" />
      <div class="hero__wordmark" aria-hidden="true">{{ t.brandName }}</div>
      <div class="page-shell hero__inner">
        <p class="hero__kicker">{{ t.heroKicker }}</p>
        <h1>{{ t.heroTitle }}</h1>
        <p class="hero__lead">{{ t.heroText }}</p>
        <a class="call-button call-button--hero" :href="'tel:' + sitePhone">
          <span aria-hidden="true">☎</span>
          <span><small>{{ t.callAction }}</small><strong>{{ sitePhoneLabel }}</strong></span>
        </a>
      </div>
    </section>

    <section class="programs" id="programs" :aria-label="t.programSection">
      <a v-for="program in t.programs" :key="program.key" class="program-band" :href="program.href">
        <img :src="programImage(program.key)" alt="">
        <span class="program-band__shade" />
        <span class="program-band__copy">
          <strong>{{ program.title }}</strong>
          <small>{{ program.text }}</small>
          <i aria-hidden="true">→</i>
        </span>
      </a>
    </section>

    <section class="mission section-bone" id="mission">
      <div class="page-shell mission__grid">
        <div class="crest-stage">
          <img :src="assetPath('/images/bagatur-logo-main.jpg')" alt="Bagatur">
        </div>
        <div class="mission__copy">
          <p class="section-label">{{ t.missionLabel }}</p>
          <h2>{{ t.missionTitle }}</h2>
          <p class="section-lead">{{ t.missionText }}</p>
          <ul class="mission-points">
            <li v-for="point in t.missionPoints" :key="point">{{ point }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="trainer section-dark" id="trainer">
      <div class="trainer__photo">
        <img :src="assetPath('/images/placeholders/coach-kids.jpg')" alt="">
      </div>
      <div class="trainer__copy">
        <p class="section-label">{{ t.trainerLabel }}</p>
        <h2>{{ t.trainerTitle }}</h2>
        <p>{{ t.trainerText }}</p>
      </div>
    </section>

    <section class="achievements section-bone" id="achievements">
      <div class="page-shell">
        <div class="achievements__grid">
          <div>
            <p class="section-label">{{ t.achievementsLabel }}</p>
            <h2>{{ t.achievementsTitle }}</h2>
          </div>
          <p class="section-lead">{{ t.achievementsText }}</p>
        </div>
        <div
          v-if="latestResults.length"
          class="achievement-results achievement-carousel"
          :class="[{ loading }, 'is-' + resultDirection]"
          role="region"
          :aria-roledescription="t.achievementsNav.carousel"
          :aria-label="t.achievementsTitle"
          :tabindex="latestResults.length > 1 ? 0 : undefined"
          @keydown="handleResultKeydown"
          @touchstart.passive="startResultSwipe"
          @touchend.passive="finishResultSwipe"
        >
          <div class="achievement-carousel__toolbar">
            <NuxtLink :to="achievementsRoute" class="achievement-carousel__archive">{{ t.achievementsNav.all }}</NuxtLink>
            <div v-if="latestResults.length > 1" class="achievement-carousel__navigation">
              <p class="achievement-carousel__counter" aria-live="polite">
                <span class="sr-only">{{ achievementStatus }}</span>
                <span aria-hidden="true">{{ String(activeResultIndex + 1).padStart(2, '0') }} / {{ String(latestResults.length).padStart(2, '0') }}</span>
              </p>
              <div class="achievement-carousel__buttons">
                <button type="button" :aria-label="t.achievementsNav.previous" :disabled="activeResultIndex === 0" @click="showPreviousResult">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7" /></svg>
                </button>
                <button type="button" :aria-label="t.achievementsNav.next" :disabled="activeResultIndex === latestResults.length - 1" @click="showNextResult">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 5 7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>
          <Transition name="achievement-slide" mode="out-in">
            <AchievementResultCard
              v-if="activeResult"
              :key="activeResult.id"
              :result="activeResult"
              :locale="locale"
              :medals="t.medals"
            />
          </Transition>
        </div>
      </div>
    </section>

    <section class="schedule section-dark" id="schedule">
      <div class="page-shell">
        <div class="section-heading">
          <div>
            <p class="section-label">{{ t.scheduleLabel }}</p>
            <h2>{{ t.scheduleTitle }}</h2>
          </div>
          <a class="text-link" :href="'tel:' + sitePhone">{{ t.callAction }} →</a>
        </div>
        <div class="schedule-table-wrap">
          <table class="schedule-table">
            <caption class="sr-only">{{ t.scheduleLabel }}</caption>
            <thead>
              <tr>
                <th scope="col">{{ t.groupLabel }}</th>
                <th v-for="day in scheduleDays" :key="day" scope="col">
                  <span class="schedule-day-full">{{ t.days[day] }}</span>
                  <span class="schedule-day-short" aria-hidden="true">{{ t.dayShort[day] }}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in scheduleRows" :key="row.group">
                <th scope="row">{{ t.groups[row.group] }}</th>
                <td v-for="day in scheduleDays" :key="day" :class="{ 'has-class': slotFor(row, day) }">
                  <strong v-if="slotFor(row, day)">{{ slotFor(row, day)?.time }}</strong>
                  <template v-else>
                    <span class="schedule-empty" aria-hidden="true">—</span>
                    <span class="sr-only">{{ t.noClass }}</span>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="schedule-mobile">
          <section v-for="day in scheduleDays" :key="day" class="schedule-mobile__day">
            <h3>{{ t.days[day] }}</h3>
            <div v-if="slotsForDay(day).length" class="schedule-mobile__slots">
              <div v-for="slot in slotsForDay(day)" :key="slot.group + slot.time">
                <span>{{ t.groups[slot.group] }}</span>
                <strong>{{ slot.time }}</strong>
              </div>
            </div>
            <p v-else class="schedule-mobile__empty">{{ t.noClass }}</p>
          </section>
        </div>
      </div>
    </section>

    <section class="gallery section-bone" id="gallery">
      <div class="page-shell">
        <div class="section-heading">
          <div>
            <p class="section-label">{{ t.galleryLabel }}</p>
            <h2>{{ t.galleryTitle }}</h2>
          </div>
          <p>{{ t.galleryText }}</p>
        </div>
        <div class="gallery-grid" :class="{ loading }">
          <NuxtLink
            v-for="(category, index) in galleryCategories"
            :key="category.slug"
            :class="'gallery-item gallery-item--' + ((index % 4) + 1)"
            :to="{ path: `/gallery/${category.slug}/`, query: locale === 'bg' ? {} : { lang: locale } }"
          >
            <img :src="assetPath(category.cover.image_url)" :alt="t.galleryCategories[category.slug].title" loading="lazy">
            <span class="gallery-item__caption">
              <strong>{{ t.galleryCategories[category.slug].title }}</strong>
              <small>{{ t.galleryOpen }} <i aria-hidden="true">→</i></small>
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="news section-dark" id="news">
      <div class="page-shell">
        <div class="section-heading">
          <div>
            <p class="section-label">{{ t.newsLabel }}</p>
            <h2>{{ t.newsTitle }}</h2>
          </div>
        </div>
        <div class="news-list" :class="{ loading }">
          <article v-for="item in news.slice(0, 3)" :key="item.id" class="news-item">
            <img :src="assetPath(item.image_url)" alt="">
            <div>
              <h3>{{ localized(item, 'title') }}</h3>
              <p>{{ localized(item, 'body') }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="faq section-bone" id="faq">
      <div class="page-shell faq__grid">
        <div>
          <p class="section-label">{{ t.faqLabel }}</p>
          <h2>{{ t.faqLabel }}</h2>
        </div>
        <div class="faq-list">
          <details v-for="item in t.faqs" :key="item.q">
            <summary>{{ item.q }}<span aria-hidden="true">+</span></summary>
            <p>{{ item.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <section class="contact section-dark" id="contact">
      <div class="contact__map">
        <iframe
          title="Bagatur BJJ Burgas map"
          src="https://www.google.com/maps?q=42.5053506,27.4609776&z=16&output=embed"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
      <div class="contact__copy">
        <p class="section-label">{{ t.locationLabel }}</p>
        <h2>{{ t.locationTitle }}</h2>
        <p>{{ t.address }}</p>
        <a class="text-link" :href="mapUrl" target="_blank" rel="noopener">{{ t.directions }} →</a>
        <div class="contact__final">
          <h3>{{ t.finalTitle }}</h3>
          <p>{{ t.finalText }}</p>
          <a class="call-button" :href="'tel:' + sitePhone">
            <span aria-hidden="true">☎</span>
            <span><small>{{ t.callAction }}</small><strong>{{ sitePhoneLabel }}</strong></span>
          </a>
        </div>
      </div>
    </section>

    <a class="mobile-sticky-call" :href="'tel:' + sitePhone">☎ {{ t.callShort }}</a>
  </div>
</template>

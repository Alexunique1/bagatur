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
const formatResultDate = (value: string | null) => {
  if (!value) return ''
  const normalized = value.includes(' ') ? value.replace(' ', 'T') : value
  const date = new Date(normalized)
  if (Number.isNaN(date.getTime())) return value.slice(0, 10)
  const language = locale.value === 'bg' ? 'bg-BG' : locale.value === 'ru' ? 'ru-RU' : 'en-GB'
  return new Intl.DateTimeFormat(language, { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
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

useHead({
  title: () => t.value.metaTitle,
  htmlAttrs: () => ({ lang: locale.value }),
  meta: [
    { name: 'description', content: () => t.value.metaDescription },
    { property: 'og:title', content: () => t.value.metaTitle },
    { property: 'og:description', content: () => t.value.metaDescription },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: () => config.public.siteUrl + '/images/bagatur-logo-main.jpg' }
  ],
  script: [{
    type: 'application/ld+json',
    innerHTML: () => JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SportsActivityLocation',
      name: 'Bagatur BJJ Burgas',
      url: config.public.siteUrl,
      telephone: sitePhone,
      sport: 'Brazilian Jiu-Jitsu',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2 Odrin Street',
        addressLocality: 'Burgas',
        postalCode: '8000',
        addressCountry: 'BG'
      },
      hasMap: mapUrl
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

    <section class="achievements section-bone">
      <div class="page-shell">
        <div class="achievements__grid">
          <div>
            <p class="section-label">{{ t.achievementsLabel }}</p>
            <h2>{{ t.achievementsTitle }}</h2>
          </div>
          <p class="section-lead">{{ t.achievementsText }}</p>
        </div>
        <div v-if="results.length" class="achievement-results" :class="{ loading }">
          <article v-for="result in results" :key="result.id" class="achievement-result">
            <div class="achievement-result__copy">
              <time v-if="result.event_date" :datetime="result.event_date">{{ formatResultDate(result.event_date) }}</time>
              <h3>{{ result.competition_name || localized(result, 'title') }}</h3>
              <p v-if="result.competition_location" class="achievement-result__location">{{ result.competition_location }}</p>
              <p v-if="localized(result, 'body')">{{ localized(result, 'body') }}</p>
            </div>
            <div class="achievement-result__medals">
              <p>{{ t.medals.children }}</p>
              <dl class="medal-tally">
                <div class="medal-tally__gold"><dt>{{ t.medals.gold }}</dt><dd>{{ result.gold_count || 0 }}</dd></div>
                <div class="medal-tally__silver"><dt>{{ t.medals.silver }}</dt><dd>{{ result.silver_count || 0 }}</dd></div>
                <div class="medal-tally__bronze"><dt>{{ t.medals.bronze }}</dt><dd>{{ result.bronze_count || 0 }}</dd></div>
              </dl>
            </div>
          </article>
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

<script setup lang="ts">
import type { Locale } from '~/data/content'

const { locale } = useLocale()

const copy: Record<Locale, {
  metaTitle: string
  metaDescription: string
  heroTitle: string
  heroText: string
  primaryCta: string
  secondaryCta: string
  missionTitle: string
  missionText: string
  skills: string[]
  missionNote: string
  introTitle: string
  introSubtitle: string
  introText: string[]
  stats: { value: string; label: string }[]
  programsTitle: string
  programsSubtitle: string
  viewAll: string
  programs: { href: string; tag: string; title: string; text: string; image?: 'grips' | 'child' }[]
  scheduleTitle: string
  scheduleText: string
  quote: string
  quoteFooter: string
  trialTitle: string
  trialText: string
  namePlaceholder: string
  emailPlaceholder: string
  trialButton: string
}> = {
  bg: {
    metaTitle: 'Bagatur BJJ Burgas',
    metaDescription: 'Академия по бразилско джиу-джицу в Бургас за деца и възрастни.',
    heroTitle: 'BAGATUR BJJ ACADEMY',
    heroText: 'Овладейте изкуството на бразилското джиу-джицу. Изградете дисциплина, сила и техника в премиум среда за фокусирана практика.',
    primaryCta: 'ЗАПОЧНЕТЕ СВОЯ ПЪТ',
    secondaryCta: 'ЗАПИШЕТЕ СЕ ЗА ПРОБНА',
    missionTitle: 'Нашата мисия',
    missionText: 'BAGATUR - това не е просто спортен клуб, а цялостна система, изградена около бразилското джиу-джицу (BJJ). Благодарение на уникалната методика на обучение децата развиват чрез спорта целия спектър от меки умения, необходими за самореализацията:',
    skills: ['Отговорност', 'Целенаправленост', 'Стресоустойчивост', 'Самоорганизация', 'Емоционална гъвкавост', 'Навици за работа в отбор', 'Ефективна комуникация', 'Критическо и креативно мислене'],
    missionNote: 'Тези умения се затвърждават по време на тренировъчния процес, подготовката и участието в състезания, както и в нашите спортно-развиващи лагери, екипни и семейни пътувания.',
    introTitle: 'Изковани в дисциплина',
    introSubtitle: 'Изградени чрез практика',
    introText: [
      'Разположена в Бургас, Bagatur BJJ е пространство за хора, посветени на изкуството на джиу-джицу. Фокусираме се върху техническо качество, дисциплина и силна общност.',
      'Независимо дали стъпвате на татамито за първи път или се подготвяте за състезание, структурираната програма помага за развитие на всяко ниво.'
    ],
    stats: [
      { value: '500+', label: 'Часа на татамито месечно' },
      { value: '3', label: 'Инструктори с черен пояс' }
    ],
    programsTitle: 'Основни програми',
    programsSubtitle: 'Нашите Програми',
    viewAll: 'ВИЖ ВСИЧКИ',
    programs: [
      { href: '/kids/4-7', tag: 'Основи', title: 'Деца 4-7 г', text: 'Основи, движение, дисциплина и безопасна работа с партньор.', image: 'grips' },
      { href: '/kids/8-13', tag: '8-13 години', title: 'Деца 8-13 г', text: 'Техника, социализация, увереност и контролирана практика.', image: 'child' },
      { href: '/adults/bjj', tag: 'Син пояс +', title: 'Напреднали', text: 'Интензивна техническа работа, спаринг и подготовка за практикуващи.' }
    ],
    scheduleTitle: 'ВИЖ ПЪЛНИЯ ГРАФИК',
    scheduleText: 'Предвидени са сутрешни, вечерни и уикенд групи.',
    quote: 'Джиу-джицу не е само победа над противника; то е победа над слабостта вътре в нас. Ефективност, търпение и пълен контрол.',
    quoteFooter: 'Философия OSSU',
    trialTitle: 'Стъпете на татамито',
    trialText: 'Почувствайте подхода Bagatur. Първата тренировка е от нас.',
    namePlaceholder: 'ИМЕ И ФАМИЛИЯ',
    emailPlaceholder: 'ИМЕЙЛ',
    trialButton: 'ЗАПИШЕТЕ СЕ ЗА ПРОБНА'
  },
  en: {
    metaTitle: 'Bagatur BJJ Burgas',
    metaDescription: 'Brazilian Jiu-Jitsu academy in Burgas for kids and adults.',
    heroTitle: 'BAGATUR BJJ ACADEMY',
    heroText: 'Master the art of Brazilian Jiu-Jitsu. Build discipline, strength, and technique in a premium, focused environment designed for true practitioners.',
    primaryCta: 'START YOUR JOURNEY',
    secondaryCta: 'BOOK A FREE TRIAL',
    missionTitle: 'Our Mission',
    missionText: 'BAGATUR is not just a sports club, but a complete system built around Brazilian Jiu-Jitsu (BJJ). Through a unique teaching methodology, children develop the full spectrum of soft skills needed for self-realization:',
    skills: ['Responsibility', 'Goal orientation', 'Stress resilience', 'Self-organization', 'Emotional flexibility', 'Teamwork habits', 'Effective communication', 'Critical and creative thinking'],
    missionNote: 'These skills are reinforced during training, preparation and participation in competitions, as well as through our sports development camps, team trips and family events.',
    introTitle: 'Forged in Discipline',
    introSubtitle: 'Built through practice',
    introText: [
      'Located in Burgas, Bagatur BJJ is a focused space for people dedicated to the gentle art. We focus on technical excellence, disciplined training and a strong community.',
      'Whether you are stepping onto the mats for the first time or preparing for competition, our structured curriculum supports progression at every level.'
    ],
    stats: [
      { value: '500+', label: 'Mat Hours per Month' },
      { value: '3', label: 'Black Belt Instructors' }
    ],
    programsTitle: 'Featured Programs',
    programsSubtitle: 'Our Programs',
    viewAll: 'VIEW ALL',
    programs: [
      { href: '/kids/4-7', tag: 'Fundamentals', title: 'Kids 4-7', text: 'Foundations, movement, discipline and safe partner work.', image: 'grips' },
      { href: '/kids/8-13', tag: 'Ages 8-13', title: 'Kids 8-13', text: 'Technique, social growth, confidence and controlled practice.', image: 'child' },
      { href: '/adults/bjj', tag: 'Blue Belt +', title: 'Advanced', text: 'High-intensity technical work, sparring and preparation for practitioners.' }
    ],
    scheduleTitle: 'VIEW FULL SCHEDULE',
    scheduleText: 'Morning, Evening, and Weekend classes available.',
    quote: 'Jiu-Jitsu is not just about defeating your opponent; it is about defeating the weakness within yourself. Efficiency, patience, and absolute control.',
    quoteFooter: 'OSSU Philosophy',
    trialTitle: 'Step on the Mats',
    trialText: 'Experience the Bagatur difference. First class is on us.',
    namePlaceholder: 'FULL NAME',
    emailPlaceholder: 'EMAIL',
    trialButton: 'BOOK A FREE TRIAL'
  },
  ru: {
    metaTitle: 'Bagatur BJJ Burgas',
    metaDescription: 'Академия бразильского джиу-джитсу в Бургасе для детей и взрослых.',
    heroTitle: 'BAGATUR BJJ ACADEMY',
    heroText: 'Освойте искусство бразильского джиу-джитсу. Развивайте дисциплину, силу и технику в сфокусированной академической среде.',
    primaryCta: 'НАЧАТЬ ПУТЬ',
    secondaryCta: 'ЗАПИСАТЬСЯ НА ПРОБНУЮ',
    missionTitle: 'Наша миссия',
    missionText: 'BAGATUR - это не просто спортивный клуб, а целостная система, построенная вокруг бразильского джиу-джитсу (BJJ). Благодаря методике обучения дети через спорт развивают полный спектр мягких навыков, необходимых для самореализации:',
    skills: ['Ответственность', 'Целеустремленность', 'Стрессоустойчивость', 'Самоорганизация', 'Эмоциональная гибкость', 'Навыки командной работы', 'Эффективная коммуникация', 'Критическое и креативное мышление'],
    missionNote: 'Эти навыки закрепляются во время тренировок, подготовки и участия в соревнованиях, а также в спортивно-развивающих лагерях, командных и семейных поездках.',
    introTitle: 'Закаленные дисциплиной',
    introSubtitle: 'Закаленные дисциплиной',
    introText: [
      'Bagatur BJJ в Бургасе - это пространство для тех, кто хочет осознанно изучать искусство джиу-джитсу. Мы фокусируемся на технике, дисциплине и сильном сообществе.',
      'Неважно, выходите ли вы на татами впервые или готовитесь к соревнованиям: структурированная программа помогает расти на каждом уровне.'
    ],
    stats: [
      { value: '500+', label: 'Часов на татами в месяц' },
      { value: '3', label: 'Инструктора с черным поясом' }
    ],
    programsTitle: 'Основные программы',
    programsSubtitle: 'Наши программы',
    viewAll: 'СМОТРЕТЬ ВСЕ',
    programs: [
      { href: '/kids/4-7', tag: 'Основы', title: 'Дети 4-7 лет', text: 'Основы, движение, дисциплина и безопасная работа с партнером.', image: 'grips' },
      { href: '/kids/8-13', tag: '8-13 лет', title: 'Дети 8-13 лет', text: 'Техника, социализация, уверенность и контролируемая практика.', image: 'child' },
      { href: '/adults/bjj', tag: 'Синий пояс +', title: 'Продвинутые', text: 'Интенсивная техническая работа, спарринг и подготовка практикующих.' }
    ],
    scheduleTitle: 'СМОТРЕТЬ ПОЛНОЕ РАСПИСАНИЕ',
    scheduleText: 'Доступны утренние, вечерние и группы выходного дня.',
    quote: 'Джиу-джитсу - это не только победа над соперником; это победа над слабостью внутри себя. Эффективность, терпение и абсолютный контроль.',
    quoteFooter: 'Философия OSSU',
    trialTitle: 'Выйти на татами',
    trialText: 'Почувствуйте подход Bagatur. Первая тренировка за наш счет.',
    namePlaceholder: 'ИМЯ И ФАМИЛИЯ',
    emailPlaceholder: 'ЭЛЕКТРОННАЯ ПОЧТА',
    trialButton: 'ЗАПИСАТЬСЯ НА ПРОБНУЮ'
  }
}

const t = computed(() => copy[locale.value])
const config = useRuntimeConfig()
const assetPath = (path: string) => {
  const baseURL = config.app.baseURL.endsWith('/') ? config.app.baseURL : `${config.app.baseURL}/`
  return `${baseURL}${path.replace(/^\//, '')}`
}

useHead({
  title: () => t.value.metaTitle,
  htmlAttrs: () => ({ lang: locale.value }),
  meta: [
    { name: 'description', content: () => t.value.metaDescription },
    { property: 'og:title', content: () => t.value.metaTitle },
    { property: 'og:description', content: () => t.value.metaDescription },
    { property: 'og:type', content: 'website' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SportsActivityLocation',
        name: 'Bagatur BJJ Burgas',
        url: config.public.siteUrl,
        telephone: '+359877069665',
        sport: ['Brazilian Jiu-Jitsu', 'Functional training'],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Burgas',
          addressCountry: 'BG'
        },
        areaServed: 'Burgas, Bulgaria'
      })
    }
  ]
})

const image = {
  hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxnDFQ6KUOsJFSGeOB4DFprGddD4w1Z1BNQgerO9TUiobsIKGFG8QkKtZGTVfMN0qy7jfaMPFJqb18FlpfpsInOTgu06QhVACIlw38Y6LB3SqQuY-3vJssbJfjHQN9NE8G9uP22sURTo7M8qww8lVWPOuUtCWjvMSElSsnuIF7ccDaBRjbwHTVuFM0PAxffggr9ELcVFZ4NOCfqsJGoUEXmR0iYDAqy-857vQC15RdOHRSnH8TP4w2WYHAQaRZTD2i469yxz1q7PAb',
  mission: assetPath('/images/bagatur-mission3.png'),
  mats: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdLgZP3tMaj7rTWO_zChYu90dqpQ12MDKGa-iO8QEgYoF2uQgttmEfwZtfUdSdCErYq9aM8OC--TBT9FojiRGcoGpptxTcqwEc6dDmRgWdocPSumuDtTnkVoqxNdnXnzdaHr3uCm4K1ZrMHpLzOm2UWK7JxdyI2IE8_1_5gSiYbQ4FFJxDxGMr46QpMr2V-9Py-qjQM52C5vIvVrBgM5rVEZaGnTJxxFVc-pOE6eMLb4w2PIgD6iuSozxnIGB6n_gJKSqEXMhotTnd',
  grips: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoRtGpwvS9Jkolvt_ix8uYZGZuOTraglowhGLfat0knLQz2cjrbpeb7oyvaVxbDR8k9vYRBNCIN2HXXMAA64yYtlRQj4GBbdyqr0ZzcDYAqdfYbkKKn6vhpR0dimLS-X44qJ_mdspkj84_1cM_1403eMneXw4uLFR7sqhjQ1bu3nWBttFdlf9Ax7smxuoCjQOHVm8np45Ai08-WVBjodBY2ci6hI4MV2qpRcndtzA53xfMGoz8Zfgci9eAwFeLCGMW9tI2csd2s_YB',
  child: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1GG04qa_rU358XL-qQ2q3rdlra7pL1TnT564RnET268-W0L-jvkHC7TrD6mSoEWSz3Vg_GHGu0C8q4urUvllPiP049r5irxDV7eKDYYrDdv6LGkas9e93y9XRbxyw5loYHX8qgJeIIzjLWyVBYjVOO00jYQLwWm0dlNJ8KKXJSa2BcS1kOX2u2DqXxHiuyTWdt3-JRPKzX5M9DMf4d2PDswt7L9kFtkzEKLomSg26tkqbxb22phbhD-3ZOvjaU4U5VA44j8xDqTbz'
}
</script>

<template>
  <div>
    <section class="stitch-hero">
      <div class="stitch-hero__media">
        <img :src="image.hero" alt="BJJ Training Background">
      </div>
      <div class="stitch-container stitch-hero__content">
        <div class="stitch-hero__copy">
          <h1 class="stitch-h1">{{ t.heroTitle }}</h1>
          <p class="stitch-lead">{{ t.heroText }}</p>
          <div class="stitch-actions">
            <a class="btn-primary" href="#trial">{{ t.trialButton }}</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-white">
      <div class="stitch-container">
        <h2 class="stitch-h2 section-title">{{ t.missionTitle }}</h2>
        <p class="mission-text">{{ t.missionText }}</p>
        <div class="mission-grid">
          <div v-for="skill in t.skills" :key="skill" class="mission-skill">
            <span class="mission-icon">•</span>
            <span>{{ skill }}</span>
          </div>
        </div>
        <div class="mission-media">
          <div class="mission-photo">
            <img :src="image.mission" alt="Bagatur BJJ mission training scene">
          </div>
          <p class="mission-note">{{ t.missionNote }}</p>
        </div>
      </div>
    </section>

    <section class="section section-dark" id="instructors">
      <div class="stitch-container intro-grid">
        <div>
          <h2 class="stitch-h3 section-title">
            {{ t.introTitle }} <br>
            <span class="section-subtitle">{{ t.introSubtitle }}</span>
          </h2>
          <div class="intro-copy">
            <p v-for="paragraph in t.introText" :key="paragraph">{{ paragraph }}</p>
          </div>
          <div class="intro-stats">
            <div v-for="stat in t.stats" :key="stat.label">
              <div class="stat-number">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
        <div class="academy-photo">
          <img :src="image.mats" alt="Academy Mats">
        </div>
      </div>
    </section>

    <section class="section section-white" id="programs">
      <div class="stitch-container">
        <div class="program-heading">
          <h2 class="stitch-h3 section-title">
            {{ t.programsTitle }} <br>
            <span class="section-subtitle">{{ t.programsSubtitle }}</span>
          </h2>
          <a class="view-all" href="#programs">{{ t.viewAll }} <span aria-hidden="true">-></span></a>
        </div>

        <div class="program-grid">
          <NuxtLink
            v-for="(program, index) in t.programs"
            :key="program.href"
            class="program-card"
            :class="{ 'program-card--wide': index === 0 }"
            :to="program.href"
          >
            <img v-if="program.image" :src="image[program.image]" :alt="program.title">
            <div v-else class="program-placeholder">✦</div>
            <div class="program-card__body">
              <div class="program-tag" :class="{ 'program-tag--red': index > 0 }">{{ program.tag }}</div>
              <h3>{{ program.title }}</h3>
              <p>{{ program.text }}</p>
            </div>
          </NuxtLink>

          <NuxtLink class="schedule-cta" id="schedule" to="/schedule">
            <div>
              <h3 class="stitch-h3">{{ t.scheduleTitle }}</h3>
              <p>{{ t.scheduleText }}</p>
            </div>
            <span class="schedule-cta__icon" aria-hidden="true">▦</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="section quote-section">
      <div class="stitch-container">
        <div class="quote-icon">“</div>
        <blockquote>
          <p>"{{ t.quote }}"</p>
          <footer>{{ t.quoteFooter }}</footer>
        </blockquote>
      </div>
    </section>

    <section class="section trial-section" id="trial">
      <div class="stitch-container">
        <div class="trial-box">
          <div class="trial-glow" />
          <h2 class="stitch-h2">{{ t.trialTitle }}</h2>
          <p>{{ t.trialText }}</p>
          <form class="trial-form">
            <input :placeholder="t.namePlaceholder" type="text">
            <input :placeholder="t.emailPlaceholder" type="email">
            <button class="btn-primary" type="submit">{{ t.trialButton }}</button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

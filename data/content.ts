export type Locale = 'bg' | 'en' | 'ru'

export const defaultLocale: Locale = 'bg'
export const locales = [
  { code: 'bg', label: 'BG', name: 'Български' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ru', label: 'RU', name: 'Русский' }
] as const
export const phone = '+359877069665'
export const phoneLabel = '+359 877 069 665'

export const routes = [
  '/',
  '/about',
  '/methodology',
  '/mentors',
  '/blog',
  '/kids/4-7',
  '/kids/8-13',
  '/adults/bjj',
  '/adults/functional-training',
  '/events/calendar',
  '/events/gymnasium-camp',
  '/schedule',
  '/vacancies',
  '/privacy',
  '/offer',
  '/terms'
]

export const nav = [
  { path: '/about', key: 'about' },
  { path: '/methodology', key: 'methodology' },
  { path: '/mentors', key: 'mentors' },
  { path: '/kids/4-7', key: 'kids47' },
  { path: '/kids/8-13', key: 'kids813' },
  { path: '/adults/bjj', key: 'adultBjj' },
  { path: '/schedule', key: 'schedule' }
] as const

export const footerNav = [
  { path: '/vacancies', key: 'vacancies' },
  { path: '/privacy', key: 'privacy' },
  { path: '/offer', key: 'offer' },
  { path: '/terms', key: 'terms' }
] as const

export const ui = {
  bg: {
    brand: 'Багатур',
    subBrand: 'BJJ Burgas',
    menu: 'Меню',
    close: 'Затвори',
    call: 'Обади се',
    trial: 'Пробна тренировка',
    mapSoon: 'Карта и точен адрес ще бъдат добавени скоро.',
    emailSoon: 'Имейл ще бъде добавен скоро.',
    nav: {
      about: 'Проект',
      methodology: 'Методология',
      mentors: 'Наставници',
      kids47: '4-7 години',
      kids813: '8-13 години',
      adultBjj: 'BJJ възрастни',
      schedule: 'Разписание',
      vacancies: 'Вакансии',
      privacy: 'Поверителност',
      offer: 'Публична оферта',
      terms: 'Споразумение'
    }
  },
  en: {
    brand: 'Bagatur',
    subBrand: 'BJJ Burgas',
    menu: 'Menu',
    close: 'Close',
    call: 'Call',
    trial: 'Trial class',
    mapSoon: 'Map and exact address will be added soon.',
    emailSoon: 'Email will be added soon.',
    nav: {
      about: 'Project',
      methodology: 'Methodology',
      mentors: 'Mentors',
      kids47: 'Ages 4-7',
      kids813: 'Ages 8-13',
      adultBjj: 'Adult BJJ',
      schedule: 'Schedule',
      vacancies: 'Vacancies',
      privacy: 'Privacy',
      offer: 'Public offer',
      terms: 'Terms'
    }
  }
} as const

export const home = {
  bg: {
    title: 'Бразилско джиу-джицу в Бургас',
    description: 'Багатур е нова академия по BJJ в Бургас за деца 4-7, 8-13 и възрастни.',
    slides: [
      {
        kicker: 'Нова академия в Бургас',
        title: 'Багатур BJJ Academy',
        text: 'Джиу-джицу, дисциплина и увереност за деца и възрастни.',
        cta: 'Запиши пробна тренировка'
      },
      {
        kicker: 'BJJ · EQ · Soft Skills',
        title: 'Спорт като система за развитие',
        text: 'Техника, емоционална устойчивост, работа в екип и спокойствие под напрежение.',
        cta: 'Виж методологията'
      }
    ],
    missionTitle: 'Мисия',
    missionText: 'Багатур създава среда, в която бразилското джиу-джицу е повече от тренировка. Това е практична система за самодисциплина, уважение, отговорност и уверен контакт с предизвикателствата.',
    skills: ['Отговорност', 'Целенасоченост', 'Стресоустойчивост', 'Самоорганизация', 'Емоционална гъвкавост', 'Работа в отбор', 'Ефективна комуникация', 'Критическо мислене'],
    programsTitle: 'Програми',
    scheduleTitle: 'Разписание',
    scheduleText: 'Точната седмична сетка ще бъде добавена след финализиране на групите. Предвидени са групи 4-7 години, 8-13 години и възрастни.',
    trialTitle: 'Пробна тренировка',
    trialText: 'Елате на татамито, запознайте се с треньора и вижте как BJJ изгражда дисциплина, самозащита и спокойствие.'
  },
  en: {
    title: 'Brazilian Jiu-Jitsu in Burgas',
    description: 'Bagatur is a new BJJ academy in Burgas for kids ages 4-7, 8-13 and adults.',
    slides: [
      {
        kicker: 'New academy in Burgas',
        title: 'Bagatur BJJ Academy',
        text: 'Jiu-jitsu, discipline and confidence for kids and adults.',
        cta: 'Book a trial class'
      },
      {
        kicker: 'BJJ · EQ · Soft Skills',
        title: 'Sport as a development system',
        text: 'Technique, emotional resilience, teamwork and calm under pressure.',
        cta: 'View methodology'
      }
    ],
    missionTitle: 'Mission',
    missionText: 'Bagatur creates an environment where Brazilian Jiu-Jitsu is more than training. It is a practical system for discipline, respect, responsibility and confident contact with challenges.',
    skills: ['Responsibility', 'Goal setting', 'Stress resilience', 'Self-organization', 'Emotional flexibility', 'Teamwork', 'Effective communication', 'Critical thinking'],
    programsTitle: 'Programs',
    scheduleTitle: 'Schedule',
    scheduleText: 'The exact weekly schedule will be added after groups are finalized. Planned groups: ages 4-7, ages 8-13 and adults.',
    trialTitle: 'Trial class',
    trialText: 'Step on the mats, meet the coach and see how BJJ builds discipline, self-defense and calm.'
  }
} as const

export const programs = [
  {
    path: '/kids/4-7',
    key: 'kids47',
    age: '4-7',
    bg: {
      title: 'Деца 4-7 години',
      description: 'Основи на джиу-джицу, дисциплина, движение и емоционална интелигентност.',
      heading: 'Първи стъпки чрез игра',
      body: 'Тренировките развиват баланс, координация, слушане, контрол на емоциите и уважение към партньора. Техниката се поднася чрез ясни, безопасни и игрови задачи.',
      points: ['движение на татамито', 'правила и дисциплина', 'емоционална саморегулация', 'уверен контакт с партньор']
    },
    en: {
      title: 'Kids ages 4-7',
      description: 'Jiu-jitsu foundations, discipline, movement and emotional intelligence.',
      heading: 'First steps through play',
      body: 'Training develops balance, coordination, listening, emotional control and respect for partners. Technique is taught through clear, safe and playful tasks.',
      points: ['mat movement', 'rules and discipline', 'emotional self-regulation', 'confident partner contact']
    }
  },
  {
    path: '/kids/8-13',
    key: 'kids813',
    age: '8-13',
    bg: {
      title: 'Деца 8-13 години',
      description: 'Продвинати тренировки, социализация, самозащита и подготовка за събития.',
      heading: 'Повече техника и отговорност',
      body: 'Групата работи с по-ясна техническа програма, ситуационни задачи и контролирана борба. Децата се учат да поставят цели, да губят достойно и да печелят с уважение.',
      points: ['позиционна игра', 'лични цели', 'работа в екип', 'подготовка за срещи и турнири']
    },
    en: {
      title: 'Kids ages 8-13',
      description: 'Advanced training, social growth, self-defense and event preparation.',
      heading: 'More technique and responsibility',
      body: 'The group follows a clearer technical program, situational tasks and controlled sparring. Children learn to set goals, lose with dignity and win with respect.',
      points: ['positional play', 'personal goals', 'teamwork', 'preparation for meets and tournaments']
    }
  },
  {
    path: '/adults/bjj',
    key: 'adultBjj',
    age: 'BJJ',
    bg: {
      title: 'Бразилско джиу-джицу за възрастни',
      description: 'Техника, контрол, самозащита и физическа устойчивост.',
      heading: 'Спокойствие под напрежение',
      body: 'BJJ учи как да използвате позиция, лостове и движение вместо груба сила. Подходящо е за начинаещи, за хора със спортен опит и за всеки, който търси практична самозащита.',
      points: ['основи за начинаещи', 'позиционен контрол', 'безопасен спаринг', 'самозащита и кондиция']
    },
    en: {
      title: 'Brazilian Jiu-Jitsu for adults',
      description: 'Technique, control, self-defense and physical resilience.',
      heading: 'Calm under pressure',
      body: 'BJJ teaches how to use position, leverage and movement instead of brute strength. It works for beginners, experienced athletes and anyone seeking practical self-defense.',
      points: ['beginner foundations', 'positional control', 'safe sparring', 'self-defense and conditioning']
    }
  },
  {
    path: '/adults/functional-training',
    key: 'functional',
    age: 'FIT',
    bg: {
      title: 'Функционален тренинг',
      description: 'Сила, мобилност, стабилност и превенция на травми.',
      heading: 'Физическа база за по-добро движение',
      body: 'Функционалният тренинг подпомага BJJ чрез мобилност, сила, стабилност и издръжливост. Подходящ е и като самостоятелна програма.',
      points: ['мобилност', 'силова издръжливост', 'превенция на травми', 'индивидуален прогрес']
    },
    en: {
      title: 'Functional training',
      description: 'Strength, mobility, stability and injury prevention.',
      heading: 'A physical base for better movement',
      body: 'Functional training supports BJJ through mobility, strength, stability and endurance. It also works as a standalone program.',
      points: ['mobility', 'strength endurance', 'injury prevention', 'individual progress']
    }
  }
] as const

export const pages = {
  about: {
    bg: {
      title: 'О проекта и мисията',
      description: 'Философия, ценности и цели на академия Багатур в Бургас.',
      heading: 'Характер, уважение и системно развитие',
      body: 'Багатур е академия за деца и възрастни, в която спортът се използва като инструмент за личностно развитие. Целта е учениците да изграждат техника, увереност, дисциплина и умение да действат спокойно.',
      points: ['уважение към партньора', 'последователност', 'безопасна среда', 'силна общност']
    },
    en: {
      title: 'About the project and mission',
      description: 'Philosophy, values and goals of Bagatur academy in Burgas.',
      heading: 'Character, respect and systematic growth',
      body: 'Bagatur is an academy for kids and adults where sport is used as a tool for personal development. The goal is to build technique, confidence, discipline and calm action.',
      points: ['respect for partners', 'consistency', 'safe environment', 'strong community']
    }
  },
  methodology: {
    bg: {
      title: 'Програма за развитие',
      description: 'Методика на тренировките: техника, игра, EQ, наставничество и контролирана борба.',
      heading: 'Методика с ясна структура',
      body: 'Всяка тренировка комбинира движение, техника, ситуационни задачи и контролирана практика. При децата добавяме игрови блокове, емоционална интелигентност и навици за работа в група.',
      points: ['загряване и координация', 'технически блок', 'контролирана борба', 'рефлексия и цел']
    },
    en: {
      title: 'Development program',
      description: 'Training methodology: technique, play, EQ, mentorship and controlled sparring.',
      heading: 'A method with clear structure',
      body: 'Each class combines movement, technique, situational tasks and controlled practice. Kids add play-based blocks, emotional intelligence and group skills.',
      points: ['warm-up and coordination', 'technical block', 'controlled sparring', 'reflection and goal']
    }
  },
  mentors: {
    bg: {
      title: 'Наставници',
      description: 'Информация за треньорския състав на Багатур.',
      heading: 'Треньорът като наставник',
      body: 'Снимка, име, пояс и биография на треньора ще бъдат добавени допълнително. Временно оставяме чиста заглушка, подготвена за реалното съдържание.',
      points: ['тренерско фото скоро', 'биография скоро', 'спортен опит скоро']
    },
    en: {
      title: 'Mentors',
      description: 'Information about the Bagatur coaching team.',
      heading: 'The coach as a mentor',
      body: 'Coach photo, name, belt and biography will be added later. For now this section is prepared as a clean placeholder.',
      points: ['coach photo soon', 'biography soon', 'sports background soon']
    }
  },
  blog: {
    bg: {
      title: 'Наш блог',
      description: 'Статии и новини на академията.',
      heading: 'Статии, новини и полезни материали',
      body: 'Тук ще публикуваме материали за първа тренировка, детско развитие чрез BJJ, подготовка за турнири, лагери и клубни новини.',
      points: ['новини на академията', 'полезни статии', 'истории от татамито']
    },
    en: {
      title: 'Our blog',
      description: 'Articles and academy news.',
      heading: 'Articles, news and useful materials',
      body: 'Here we will publish materials about first classes, child development through BJJ, tournament preparation, camps and club news.',
      points: ['academy news', 'useful articles', 'stories from the mats']
    }
  },
  calendar: {
    bg: {
      title: 'Календар на мероприятията',
      description: 'График на турнири, срещи и клубни събития.',
      heading: 'Състезания, срещи и клубни дни',
      body: 'Календарът ще бъде попълнен с турнири, открити тренировки, срещи с родители и вътрешни технически дни.',
      points: ['турнири', 'отворени тренировки', 'клубни срещи']
    },
    en: {
      title: 'Events calendar',
      description: 'Schedule of tournaments, meetings and club events.',
      heading: 'Competitions, meetings and club days',
      body: 'The calendar will be filled with tournaments, open classes, parent meetings and internal technical days.',
      points: ['tournaments', 'open classes', 'club meetings']
    }
  },
  camp: {
    bg: {
      title: 'GYMNASIUM CAMP',
      description: 'Спортно-развиващи лагери за деца и младежи.',
      heading: 'Лагери за спорт, характер и екипност',
      body: 'GYMNASIUM CAMP комбинира тренировки, игри, работа в екип и лични предизвикателства. Форматът ще бъде адаптиран за групите на Багатур в Бургас.',
      points: ['спорт', 'екипност', 'лични предизвикателства']
    },
    en: {
      title: 'GYMNASIUM CAMP',
      description: 'Sports development camps for children and teens.',
      heading: 'Camps for sport, character and teamwork',
      body: 'GYMNASIUM CAMP combines training, games, teamwork and personal challenges. The format will be adapted for Bagatur groups in Burgas.',
      points: ['sport', 'teamwork', 'personal challenges']
    }
  },
  schedule: {
    bg: {
      title: 'Разписание',
      description: 'Обща седмична сетка за групите на Багатур.',
      heading: 'Седмична сетка',
      body: 'Разписанието ще бъде добавено отделно. Предвидени са групи за деца 4-7 години, деца 8-13 години и възрастни. Пробна тренировка има.',
      points: ['4-7 години', '8-13 години', 'възрастни']
    },
    en: {
      title: 'Schedule',
      description: 'Weekly schedule for Bagatur groups.',
      heading: 'Weekly schedule',
      body: 'The schedule will be added separately. Planned groups are kids 4-7, kids 8-13 and adults. Trial class is available.',
      points: ['ages 4-7', 'ages 8-13', 'adults']
    }
  },
  vacancies: {
    bg: {
      title: 'Вакансии',
      description: 'Работа в екипа на Багатур.',
      heading: 'Работа в екипа',
      body: 'Разделът е подготвен като заглушка. По-късно ще добавим актуални позиции и условия за кандидатстване.',
      points: ['треньори', 'асистенти', 'администрация']
    },
    en: {
      title: 'Vacancies',
      description: 'Work with the Bagatur team.',
      heading: 'Work with the team',
      body: 'This section is prepared as a placeholder. Current roles and application details will be added later.',
      points: ['coaches', 'assistants', 'administration']
    }
  },
  privacy: {
    bg: {
      title: 'Политика за поверителност',
      description: 'Заглушка за политика за поверителност.',
      heading: 'Политика за поверителност',
      body: 'Юридическият текст ще бъде добавен допълнително. Засега страницата служи като техническа заглушка.',
      points: ['лични данни', 'контакти', 'права на потребителя']
    },
    en: {
      title: 'Privacy policy',
      description: 'Privacy policy placeholder.',
      heading: 'Privacy policy',
      body: 'The legal text will be added later. For now this page acts as a technical placeholder.',
      points: ['personal data', 'contacts', 'user rights']
    }
  },
  offer: {
    bg: {
      title: 'Публична оферта',
      description: 'Заглушка за публична оферта.',
      heading: 'Публична оферта',
      body: 'Условията за услуги, плащания и абонаменти ще бъдат добавени след подготовка на юридическия текст.',
      points: ['услуги', 'плащания', 'абонаменти']
    },
    en: {
      title: 'Public offer',
      description: 'Public offer placeholder.',
      heading: 'Public offer',
      body: 'Service, payment and membership terms will be added after the legal text is prepared.',
      points: ['services', 'payments', 'memberships']
    }
  },
  terms: {
    bg: {
      title: 'Потребителско споразумение',
      description: 'Заглушка за потребителско споразумение.',
      heading: 'Потребителско споразумение',
      body: 'Правилата за използване на сайта и посещение на тренировките ще бъдат добавени допълнително.',
      points: ['сайт', 'тренировки', 'правила']
    },
    en: {
      title: 'Terms of use',
      description: 'Terms of use placeholder.',
      heading: 'Terms of use',
      body: 'Rules for using the website and attending training sessions will be added later.',
      points: ['website', 'classes', 'rules']
    }
  }
} as const

export const pageMap = {
  '/about': pages.about,
  '/methodology': pages.methodology,
  '/mentors': pages.mentors,
  '/blog': pages.blog,
  '/events/calendar': pages.calendar,
  '/events/gymnasium-camp': pages.camp,
  '/schedule': pages.schedule,
  '/vacancies': pages.vacancies,
  '/privacy': pages.privacy,
  '/offer': pages.offer,
  '/terms': pages.terms
} as const

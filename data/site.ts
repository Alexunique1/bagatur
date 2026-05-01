export type Locale = 'bg' | 'en'

export const phone = '+359877069665'
export const phoneLabel = '+359 877 069 665'

export const navItems = [
  { to: '/about', key: 'about' },
  { to: '/methodology', key: 'methodology' },
  { to: '/mentors', key: 'mentors' },
  { to: '/kids/4-7', key: 'kids47' },
  { to: '/kids/8-13', key: 'kids813' },
  { to: '/adults/bjj', key: 'adultBjj' },
  { to: '/schedule', key: 'schedule' }
]

export const footerItems = [
  { to: '/vacancies', key: 'vacancies' },
  { to: '/privacy', key: 'privacy' },
  { to: '/offer', key: 'offer' },
  { to: '/terms', key: 'terms' }
]

export const ui = {
  bg: {
    trial: 'Пробна тренировка',
    call: 'Обадете се',
    menu: 'Меню',
    close: 'Затвори менюто',
    logoAlt: 'Лого на Багатур',
    nav: {
      about: 'За проекта',
      methodology: 'Методология',
      mentors: 'Наставници',
      kids47: '4-7 години',
      kids813: '8-13 години',
      adultBjj: 'BJJ възрастни',
      schedule: 'Расписание',
      vacancies: 'Вакансии',
      privacy: 'Поверителност',
      offer: 'Публична оферта',
      terms: 'Споразумение'
    },
    footer: {
      title: 'Багатур BJJ Burgas',
      copy: 'Бразилско джиу-джицу, функционален тренинг и спортно развитие в Бургас.',
      map: 'Карта и точен адрес ще бъдат добавени скоро.',
      email: 'Имейл ще бъде добавен скоро.'
    }
  },
  en: {
    trial: 'Trial class',
    call: 'Call',
    menu: 'Menu',
    close: 'Close menu',
    logoAlt: 'Bagatur logo',
    nav: {
      about: 'About',
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
    },
    footer: {
      title: 'Bagatur BJJ Burgas',
      copy: 'Brazilian Jiu-Jitsu, functional training and sports development in Burgas.',
      map: 'Map and exact address will be added soon.',
      email: 'Email will be added soon.'
    }
  }
} as const

export const pages = {
  home: {
    bg: {
      title: 'Бразилско джиу-джицу за деца и възрастни в Бургас',
      description: 'Багатур е нова академия в Бургас с програми за деца 4-7, 8-13 и възрастни. Пробна тренировка, BJJ, функционален тренинг и лагери.',
      heroEyebrow: 'Нова академия в Бургас',
      heroTitle: 'Багатур: джиу-джицу, характер и увереност',
      heroCopy: 'Развиваме тяло, мислене и емоционална устойчивост чрез бразилско джиу-джицу, наставничество и безопасна тренировъчна среда.',
      slideTwoTitle: 'Пробна тренировка за деца и възрастни',
      slideTwoCopy: 'Елате на татамито, запознайте се с треньора и вижте как BJJ помага за дисциплина, самозащита и спокойствие под напрежение.',
      softTitle: 'BJJ като школа за живот',
      softCopy: 'В тренировките съчетаваме техника, игрови задачи, EQ и работа в екип. Децата учат концентрация и отговорност, а възрастните развиват контрол, мобилност и устойчивост.',
      scheduleTitle: 'Расписание',
      scheduleCopy: 'Точната седмична сетка ще бъде добавена след финализиране на групите. Предвидени са групи 4-7 години, 8-13 години и възрастни.',
      donorNote: 'Методологично сайтът стъпва върху близки блокове: BJJ, soft skills, емоционална интелигентност, наставничество, събития и лагери.'
    },
    en: {
      title: 'Brazilian Jiu-Jitsu for kids and adults in Burgas',
      description: 'Bagatur is a new academy in Burgas with programs for ages 4-7, 8-13 and adults. Trial class, BJJ, functional training and camps.',
      heroEyebrow: 'New academy in Burgas',
      heroTitle: 'Bagatur: jiu-jitsu, character and confidence',
      heroCopy: 'We develop body, thinking and emotional resilience through Brazilian Jiu-Jitsu, mentorship and a safe training environment.',
      slideTwoTitle: 'Trial class for kids and adults',
      slideTwoCopy: 'Step on the mats, meet the coach and see how BJJ builds discipline, self-defense and calm under pressure.',
      softTitle: 'BJJ as a school for life',
      softCopy: 'Training combines technique, games, EQ and teamwork. Children build focus and responsibility, while adults develop control, mobility and resilience.',
      scheduleTitle: 'Schedule',
      scheduleCopy: 'The exact weekly schedule will be added after groups are finalized. Planned groups: ages 4-7, ages 8-13 and adults.',
      donorNote: 'The methodology follows similar blocks: BJJ, soft skills, emotional intelligence, mentorship, events and camps.'
    }
  },
  about: {
    bg: {
      title: 'О проекта и мисията',
      description: 'Философия, ценности и цели на академия Багатур в Бургас.',
      heading: 'Хармонично развитие чрез спорт и наставничество',
      body: 'Багатур създава среда, в която бразилското джиу-джицу е повече от единоборство. То е инструмент за самодисциплина, уважение, отговорност, устойчивост и умение за действие под напрежение.',
      bullets: ['уважение към партньора и правилата', 'целенасоченост и постоянство', 'емоционална гъвкавост', 'работа в екип и ефективна комуникация']
    },
    en: {
      title: 'About the project and mission',
      description: 'Philosophy, values and goals of Bagatur academy in Burgas.',
      heading: 'Balanced development through sport and mentorship',
      body: 'Bagatur creates an environment where Brazilian Jiu-Jitsu is more than a martial art. It is a tool for discipline, respect, responsibility, resilience and calm action under pressure.',
      bullets: ['respect for partners and rules', 'goal setting and consistency', 'emotional flexibility', 'teamwork and effective communication']
    }
  },
  methodology: {
    bg: {
      title: 'Програма за развитие',
      description: 'Методика на тренировките: игрови, технически и бойни раундове, EQ и наставничество.',
      heading: 'Методика с ясни раундове и измерим прогрес',
      body: 'Тренировката е структурирана около движение, техника и контролирана борба. При децата добавяме игрови блокове и задачи за емоционална интелигентност; при възрастните - технически цикли, позиционна игра и функционална подготовка.',
      bullets: ['игрови раунд за внимание и координация', 'технически раунд за базови позиции', 'контролирана борба за увереност', 'четвърти раунд: разговор, цел и рефлексия']
    },
    en: {
      title: 'Development program',
      description: 'Training methodology: play, technical and sparring rounds, EQ and mentorship.',
      heading: 'Clear training rounds and measurable progress',
      body: 'Training is structured around movement, technique and controlled grappling. Kids add play-based tasks and emotional intelligence work; adults focus on technical cycles, positional play and functional preparation.',
      bullets: ['play round for attention and coordination', 'technical round for core positions', 'controlled sparring for confidence', 'fourth round: conversation, goal and reflection']
    }
  },
  mentors: {
    bg: {
      title: 'Наставници',
      description: 'Информация за треньорския състав на Багатур. Снимка и биография ще бъдат добавени.',
      heading: 'Треньорът като наставник',
      body: 'Наставникът помага на ученика да разбере не само техниката, но и поведението зад нея: спокойствие, уважение, честност и готовност да се учи. Снимка, име, пояс и биография на треньора ще бъдат добавени допълнително.',
      placeholder: 'Снимка на треньора'
    },
    en: {
      title: 'Mentors',
      description: 'Coach information for Bagatur. Photo and biography will be added.',
      heading: 'The coach as a mentor',
      body: 'A mentor helps the student understand not only technique, but the behavior behind it: calmness, respect, honesty and willingness to learn. Coach photo, name, belt and biography will be added later.',
      placeholder: 'Coach photo'
    }
  }
} as const

export const programs = {
  kids47: {
    path: '/kids/4-7',
    bg: {
      title: 'Деца 4-7 години',
      description: 'BJJ за деца 4-7 години: дисциплина, движение, безопасност и емоционална интелигентност.',
      heading: 'Първи стъпки в джиу-джицу чрез игра',
      body: 'Групата 4-7 години развива баланс, координация, слушане, контрол на емоциите и уважение към партньора. Техниката се поднася през ясни, безопасни и игрови задачи.',
      points: ['основни движения на татамито', 'правила и дисциплина без натиск', 'емоционална саморегулация', 'уверен контакт с партньор']
    },
    en: {
      title: 'Kids ages 4-7',
      description: 'BJJ for ages 4-7: discipline, movement, safety and emotional intelligence.',
      heading: 'First steps in jiu-jitsu through play',
      body: 'The 4-7 group develops balance, coordination, listening, emotional control and respect for partners. Technique is taught through clear, safe and playful tasks.',
      points: ['basic mat movement', 'rules and discipline without pressure', 'emotional self-regulation', 'confident partner contact']
    }
  },
  kids813: {
    path: '/kids/8-13',
    bg: {
      title: 'Деца 8-13 години',
      description: 'BJJ за деца 8-13 години: техника, социализация, самозащита и подготовка за събития.',
      heading: 'Повече техника, отговорност и социализация',
      body: 'Групата 8-13 години работи с по-ясна техническа програма, ситуационни задачи и контролирана борба. Децата се учат да поставят цели, да губят достойно и да печелят с уважение.',
      points: ['позиционна игра и самозащита', 'концентрация и лични цели', 'работа в екип', 'подготовка за срещи и турнири']
    },
    en: {
      title: 'Kids ages 8-13',
      description: 'BJJ for ages 8-13: technique, social skills, self-defense and event preparation.',
      heading: 'More technique, responsibility and social growth',
      body: 'The 8-13 group follows a clearer technical program, situational tasks and controlled sparring. Children learn to set goals, lose with dignity and win with respect.',
      points: ['positional play and self-defense', 'focus and personal goals', 'teamwork', 'preparation for meets and tournaments']
    }
  },
  adultBjj: {
    path: '/adults/bjj',
    bg: {
      title: 'Бразилско джиу-джицу за възрастни',
      description: 'BJJ за възрастни в Бургас: техника, контрол, самозащита и физическа устойчивост.',
      heading: 'Практична техника и спокойствие под напрежение',
      body: 'BJJ учи как да използвате позиция, лостове и движение вместо груба сила. Подходящо е за начинаещи, за хора с предишен спортен опит и за всеки, който търси реална самозащита.',
      points: ['основи за начинаещи', 'позиционен контрол', 'безопасен спаринг', 'самозащита и кондиция']
    },
    en: {
      title: 'Brazilian Jiu-Jitsu for adults',
      description: 'Adult BJJ in Burgas: technique, control, self-defense and physical resilience.',
      heading: 'Practical technique and calm under pressure',
      body: 'BJJ teaches how to use position, leverage and movement instead of brute strength. It works for beginners, people with previous sports experience and anyone seeking real self-defense.',
      points: ['beginner foundations', 'positional control', 'safe sparring', 'self-defense and conditioning']
    }
  },
  functional: {
    path: '/adults/functional-training',
    bg: {
      title: 'Функционален тренинг',
      description: 'Функционални тренировки за сила, мобилност и превенция на травми.',
      heading: 'Физическа база за по-добро движение',
      body: 'Функционалният тренинг подпомага BJJ чрез мобилност, сила, стабилност и издръжливост. Подходящ е и като самостоятелна програма за хора, които искат да се движат по-добре.',
      points: ['мобилност и стабилност', 'силова издръжливост', 'превенция на травми', 'индивидуален прогрес']
    },
    en: {
      title: 'Functional training',
      description: 'Functional training for strength, mobility and injury prevention.',
      heading: 'A physical base for better movement',
      body: 'Functional training supports BJJ through mobility, strength, stability and endurance. It also works as a standalone program for people who want to move better.',
      points: ['mobility and stability', 'strength endurance', 'injury prevention', 'individual progress']
    }
  }
} as const

export const simplePages = {
  blog: {
    bg: {
      title: 'Наш блог',
      description: 'Статии, новини и полезни материали от академия Багатур.',
      heading: 'Статии и новини',
      body: 'Тук ще публикуваме материали за първа тренировка, детско развитие чрез BJJ, подготовка за състезания, лагери и клубни новини.'
    },
    en: {
      title: 'Our blog',
      description: 'Articles, news and useful materials from Bagatur academy.',
      heading: 'Articles and news',
      body: 'Here we will publish materials about first classes, child development through BJJ, competition preparation, camps and club news.'
    }
  },
  calendar: {
    bg: {
      title: 'Календар на мероприятията',
      description: 'График на турнири, срещи, клубни дни и събития.',
      heading: 'Събития, турнири и клубни срещи',
      body: 'Календарът ще бъде попълнен с турнири, открити тренировки, срещи с родители и вътрешни технически дни.'
    },
    en: {
      title: 'Events calendar',
      description: 'Schedule of tournaments, meetings, club days and events.',
      heading: 'Events, tournaments and club meetings',
      body: 'The calendar will be filled with tournaments, open classes, parent meetings and internal technical days.'
    }
  },
  camp: {
    bg: {
      title: 'GYMNASIUM CAMP',
      description: 'Спортно-развиващи лагери за деца и младежи.',
      heading: 'Лагери за спорт, характер и екипност',
      body: 'GYMNASIUM CAMP комбинира тренировки, игри, работа в екип и лични предизвикателства. Форматът ще бъде адаптиран за групите на Багатур в Бургас.'
    },
    en: {
      title: 'GYMNASIUM CAMP',
      description: 'Sports development camps for children and teens.',
      heading: 'Camps for sport, character and teamwork',
      body: 'GYMNASIUM CAMP combines training, games, teamwork and personal challenges. The format will be adapted for Bagatur groups in Burgas.'
    }
  },
  schedule: {
    bg: {
      title: 'Расписание',
      description: 'Обща седмична сетка за групите на Багатур. Точното расписание ще бъде добавено.',
      heading: 'Седмична сетка',
      body: 'Расписанието ще бъде добавено отделно. Предвидени са групи за деца 4-7 години, деца 8-13 години и възрастни. Пробна тренировка има.'
    },
    en: {
      title: 'Schedule',
      description: 'Weekly schedule for Bagatur groups. The exact schedule will be added.',
      heading: 'Weekly schedule',
      body: 'The schedule will be added separately. Planned groups are kids 4-7, kids 8-13 and adults. Trial class is available.'
    }
  },
  vacancies: {
    bg: {
      title: 'Вакансии',
      description: 'Работа в екипа на Багатур.',
      heading: 'Работа в екипа',
      body: 'Разделът е подготвен като заглушка. По-късно тук ще добавим актуални позиции и условия за кандидатстване.'
    },
    en: {
      title: 'Vacancies',
      description: 'Work with the Bagatur team.',
      heading: 'Work with the team',
      body: 'This section is prepared as a placeholder. Current roles and application details will be added later.'
    }
  },
  privacy: {
    bg: {
      title: 'Политика за поверителност',
      description: 'Заглушка за политика за поверителност.',
      heading: 'Политика за поверителност',
      body: 'Юридическият текст ще бъде добавен допълнително. Засега страницата служи като техническа заглушка за структурата на сайта.'
    },
    en: {
      title: 'Privacy policy',
      description: 'Privacy policy placeholder.',
      heading: 'Privacy policy',
      body: 'The legal text will be added later. For now this page acts as a technical placeholder for the site structure.'
    }
  },
  offer: {
    bg: {
      title: 'Публична оферта',
      description: 'Заглушка за публична оферта.',
      heading: 'Публична оферта',
      body: 'Условията за услуги, плащания и абонаменти ще бъдат добавени след подготовка на юридическия текст.'
    },
    en: {
      title: 'Public offer',
      description: 'Public offer placeholder.',
      heading: 'Public offer',
      body: 'Service, payment and membership terms will be added after the legal text is prepared.'
    }
  },
  terms: {
    bg: {
      title: 'Потребителско споразумение',
      description: 'Заглушка за потребителско споразумение.',
      heading: 'Потребителско споразумение',
      body: 'Правилата за използване на сайта и посещение на тренировките ще бъдат добавени допълнително.'
    },
    en: {
      title: 'Terms of use',
      description: 'Terms of use placeholder.',
      heading: 'Terms of use',
      body: 'Rules for using the website and attending training sessions will be added later.'
    }
  }
} as const

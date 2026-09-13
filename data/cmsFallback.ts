import type { CmsItem } from '~/types/cms'

export const fallbackNews: CmsItem[] = [
  {
    id: 'demo-first-class', kind: 'news', slug: 'first-class',
    title_bg: 'Как протича първата тренировка', title_ru: 'Как проходит первая тренировка', title_en: 'What happens in the first class',
    body_bg: 'Кратко запознаване с треньора, правилата на татамито и подходящата група.',
    body_ru: 'Знакомство с тренером, правилами татами и подходящей возрастной группой.',
    body_en: 'Meet the coach, learn the mat rules and find the right age group.',
    image_url: '/images/placeholders/coach-kids.jpg', event_date: null, published: true, sort_order: 10, is_demo: true
  },
  {
    id: 'demo-schedule', kind: 'news', slug: 'weekly-schedule',
    title_bg: 'Новото седмично разписание', title_ru: 'Актуальное недельное расписание', title_en: 'The current weekly schedule',
    body_bg: 'Три възрастови групи с делнични и неделни тренировки.',
    body_ru: 'Три возрастные группы с тренировками по будням и воскресеньям.',
    body_en: 'Three age groups with weekday and Sunday sessions.',
    image_url: '/images/placeholders/programs-kids.jpg', event_date: null, published: true, sort_order: 20, is_demo: true
  },
  {
    id: 'demo-gallery', kind: 'news', slug: 'competition-gallery',
    title_bg: 'Скоро: новини и резултати от турнири', title_ru: 'Скоро: новости и результаты турниров', title_en: 'Coming soon: tournament news and results',
    body_bg: 'Потвърдените резултати ще бъдат публикувани от треньора.',
    body_ru: 'Подтверждённые результаты будет публиковать тренер.',
    body_en: 'Verified results will be published by the coach.',
    image_url: '/images/placeholders/programs-adults.jpg', event_date: null, published: true, sort_order: 30, is_demo: true
  }
]

export const fallbackGallery: CmsItem[] = [
  {
    id: 'demo-gallery-1', kind: 'gallery', slug: 'training-hall', category_slug: 'training',
    title_bg: 'Тренировка в залата', title_ru: 'Тренировка в зале', title_en: 'Training in the academy',
    body_bg: '', body_ru: '', body_en: '', image_url: '/images/placeholders/hero-training.jpg',
    event_date: null, published: true, sort_order: 10, is_demo: true
  },
  {
    id: 'demo-gallery-2', kind: 'gallery', slug: 'tournaments-and-competitions', category_slug: 'tournaments',
    title_bg: 'Турнири и състезания', title_ru: 'Турниры и соревнования', title_en: 'Tournaments and competitions',
    body_bg: '', body_ru: '', body_en: '', image_url: '/images/placeholders/tournaments-competition.jpg',
    event_date: null, published: true, sort_order: 20, is_demo: true
  },
  {
    id: 'demo-gallery-3', kind: 'gallery', slug: 'kids-program', category_slug: 'kids',
    title_bg: 'Детска тренировка', title_ru: 'Детская тренировка', title_en: 'Kids training',
    body_bg: '', body_ru: '', body_en: '', image_url: '/images/placeholders/programs-kids.jpg',
    event_date: null, published: true, sort_order: 30, is_demo: true
  },
  {
    id: 'demo-gallery-5', kind: 'gallery', slug: 'kids-with-coach', category_slug: 'kids',
    title_bg: 'Работа с треньора', title_ru: 'Работа с тренером', title_en: 'Working with the coach',
    body_bg: '', body_ru: '', body_en: '', image_url: '/images/placeholders/coach-kids.jpg',
    event_date: null, published: true, sort_order: 35, is_demo: true
  },
  {
    id: 'demo-gallery-4', kind: 'gallery', slug: 'adult-program', category_slug: 'adults',
    title_bg: 'Тренировка за възрастни', title_ru: 'Тренировка для взрослых', title_en: 'Adult training',
    body_bg: '', body_ru: '', body_en: '', image_url: '/images/placeholders/programs-adults.jpg',
    event_date: null, published: true, sort_order: 40, is_demo: true
  }
]

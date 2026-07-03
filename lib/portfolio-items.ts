export interface PortfolioItem {
  id: number
  src: string
  alt: string
  title: string
  category: string
  year: string
  note: string
  focus: string
  width: number
  height: number
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    src: '/images/portfolio-classic/point-of-light.webp',
    alt: 'Точка света',
    title: 'Точка света',
    category: 'Архитектура',
    year: '2024',
    note: 'Свет ведет взгляд.',
    focus: 'object-center',
    width: 4284,
    height: 5008,
  },
  {
    id: 2,
    src: '/images/portfolio-classic/mask.webp',
    alt: 'Маска',
    title: 'Маска',
    category: 'Арт',
    year: '2023',
    note: 'Тихий жест внутри кадра.',
    focus: 'object-center',
    width: 3024,
    height: 4032,
  },
  {
    id: 3,
    src: '/images/portfolio-classic/my-cross.webp',
    alt: 'Мой крест',
    title: 'Мой крест',
    category: 'Still Life',
    year: '2024',
    note: 'Предмет становится образом.',
    focus: 'object-center',
    width: 3024,
    height: 4032,
  },
  {
    id: 4,
    src: '/images/portfolio-classic/eye.webp',
    alt: 'Глаз',
    title: 'Глаз',
    category: 'Портрет',
    year: '2024',
    note: 'Внутренний свет остаётся.',
    focus: 'object-top',
    width: 3024,
    height: 4032,
  },
  {
    id: 5,
    src: '/images/portfolio-classic/childhood.webp',
    alt: 'Детство',
    title: 'Детство',
    category: 'Портрет',
    year: '2023',
    note: 'Пауза, в которой слышно время.',
    focus: 'object-top',
    width: 2850,
    height: 4032,
  },
  {
    id: 6,
    src: '/images/portfolio-classic/fall.webp',
    alt: 'Падение',
    title: 'Падение',
    category: 'Арт',
    year: '2024',
    note: 'Движение удержано в равновесии.',
    focus: 'object-top',
    width: 4078,
    height: 4111,
  },
]

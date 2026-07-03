'use client'

import Image from 'next/image'
import { useState } from 'react'
import { FadeIn } from './fade-in'

const portfolioItems = [
  {
    id: 1,
    src: '/images/portfolio-1.jpg',
    title: 'Точка света',
    category: 'Архитектура',
    year: '2024',
    width: 1711,
    height: 2000,
    layout: 'md:col-span-1 lg:col-span-5',
  },
  {
    id: 2,
    src: '/images/portfolio-2.jpg',
    title: 'Маска',
    category: 'Арт',
    year: '2023',
    width: 1500,
    height: 2000,
    layout: 'md:col-span-1 md:pt-20 lg:col-span-4 lg:col-start-8 lg:pt-24',
  },
  {
    id: 3,
    src: '/images/portfolio-3.jpg',
    title: 'Мой крест',
    category: 'Still Life',
    year: '2024',
    width: 1500,
    height: 2000,
    layout: 'md:col-span-1 lg:col-span-4 lg:col-start-2',
  },
  {
    id: 4,
    src: '/images/portfolio-4.jpg',
    title: 'Глаз',
    category: 'Портрет',
    year: '2024',
    width: 1500,
    height: 2000,
    layout: 'md:col-span-1 md:pt-12 lg:col-span-4 lg:col-start-8 lg:pt-10',
  },
  {
    id: 5,
    src: '/images/portfolio-5.jpg',
    title: 'Детство',
    category: 'Портрет',
    year: '2023',
    width: 1413,
    height: 2000,
    layout: 'md:col-span-1 lg:col-span-4',
  },
  {
    id: 6,
    src: '/images/portfolio-6.jpg',
    title: 'Падение',
    category: 'Арт',
    year: '2024',
    width: 1984,
    height: 2000,
    layout: 'md:col-span-1 md:pt-16 lg:col-span-5 lg:col-start-7 lg:pt-16',
  },
]

export function PortfolioSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section
      id="portfolio"
      className="relative py-32 md:py-48 bg-[#0D0D0D]"
      aria-label="Портфолио"
    >
      {/* Section header */}
      <div className="px-8 md:px-16 mb-20">
        <div className="max-w-7xl mx-auto flex items-end justify-between">
          <FadeIn direction="up">
            <div>
              <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#7A7060] mb-4">
                02 — Портфолио
              </p>
              <h2 className="font-serif text-[48px] md:text-[64px] font-light text-[#F5F2E9] leading-[1.0] tracking-[-0.01em]">
                Избранные работы
              </h2>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={200}>
            <p className="hidden md:block font-mono text-[11px] tracking-[0.2em] text-[#7A7060] uppercase mb-2">
              2015 – 2026
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Portfolio gallery */}
      <div className="px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-18 md:gap-y-24 lg:gap-y-32 md:gap-x-6 lg:gap-x-8">
          {portfolioItems.map((item, index) => (
            <FadeIn key={item.id} direction="up" delay={(index % 2) * 120} className={item.layout}>
              <figure
                className="group"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative border border-[#1A1A1A] bg-[#10100F] transition-colors duration-700 group-hover:border-[#3D2B1A]">
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={item.width}
                    height={item.height}
                    sizes="(max-width: 767px) calc(100vw - 64px), (max-width: 1279px) 42vw, 34vw"
                    className={`h-auto w-full object-contain transition duration-700 ${
                      hoveredId === item.id ? 'brightness-110' : 'brightness-95'
                    }`}
                  />
                </div>
                <figcaption className="mt-4 flex items-start justify-between gap-6 border-t border-[#1A1A1A] pt-4">
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#E6D2A2]/55 mb-2">
                      {item.category}
                    </p>
                    <h3 className="font-serif text-[24px] md:text-[28px] font-light leading-none text-[#F5F2E9]">
                      {item.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-[#7A7060] pt-1">
                    {item.year}
                  </span>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Decorative separator */}
      <div className="px-8 md:px-16 mt-28">
        <div className="max-w-7xl mx-auto">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#2E2820] to-transparent" />
        </div>
      </div>
    </section>
  )
}

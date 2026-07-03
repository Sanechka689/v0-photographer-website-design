'use client'

import Image from 'next/image'
import { useState } from 'react'
import { portfolioItems } from '@/lib/portfolio-items'
import { FadeIn } from './fade-in'

const MOBILE_INITIAL_COUNT = 10
const MOBILE_LOAD_MORE_COUNT = 20

const verticalPerforation = `repeating-linear-gradient(180deg, rgba(13,13,13,0.96) 0 12px, transparent 12px 24px)`

function MobileFilmFrame({
  title,
  year,
  src,
  alt,
  width,
  height,
}: (typeof portfolioItems)[number]) {
  return (
    <div className="relative overflow-hidden rounded-[2px] border border-[#35231B] bg-[#070707]">
      <div style={{ aspectRatio: `${width} / ${height}` }} className="relative">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 719px) calc(100vw - 92px), 320px"
          className="object-contain"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/78 to-transparent px-4 pb-4 pt-10">
          <div className="flex items-end justify-between gap-4">
            <h3 className="font-serif text-[20px] font-light leading-none text-[#F5F2E9]">
              {title}
            </h3>
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#8A7B66]">
              {year}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PortfolioSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [visibleMobileCount, setVisibleMobileCount] = useState(MOBILE_INITIAL_COUNT)

  const mobileItems = portfolioItems.slice(0, visibleMobileCount)
  const hasMoreMobileItems = visibleMobileCount < portfolioItems.length

  return (
    <section
      id="portfolio"
      className="relative py-32 md:py-48 bg-[#0D0D0D]"
      aria-label="Портфолио"
    >
      <div className="px-8 md:px-16 mb-16 md:mb-20">
        <div className="max-w-7xl mx-auto flex items-end justify-between gap-8">
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
            <div className="portfolio-meta-desktop">
              <p className="font-mono text-[11px] tracking-[0.2em] text-[#7A7060] uppercase">
                2015 – 2026
              </p>
              <p className="mt-2 font-mono text-[10px] tracking-[0.28em] text-[#4D4338] uppercase">
                {portfolioItems.length} работ
              </p>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="portfolio-mobile px-5 sm:px-8">
        <div className="max-w-[26rem] mx-auto">
          <FadeIn direction="up">
            <div className="relative overflow-hidden rounded-[12px] bg-[#241811] px-[18px] py-[20px] shadow-[0_18px_40px_rgba(0,0,0,0.36)] ring-1 ring-[#3D2A22]">
              <div
                aria-hidden="true"
                className="absolute bottom-[16px] left-[7px] top-[16px] w-[8px]"
                style={{ backgroundImage: verticalPerforation }}
              />
              <div
                aria-hidden="true"
                className="absolute bottom-[16px] right-[7px] top-[16px] w-[8px]"
                style={{ backgroundImage: verticalPerforation }}
              />

              <div className="space-y-4">
                {mobileItems.map((item) => (
                  <MobileFilmFrame key={item.id} {...item} />
                ))}
              </div>
            </div>
          </FadeIn>

          {hasMoreMobileItems ? (
            <FadeIn direction="up" delay={120}>
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleMobileCount((currentCount) =>
                      Math.min(currentCount + MOBILE_LOAD_MORE_COUNT, portfolioItems.length)
                    )
                  }
                  className="inline-flex items-center justify-center rounded-full border border-[#3A2B22] bg-[#16110D] px-8 py-3 font-serif text-[26px] font-light leading-none text-[#B59C79] transition duration-300 hover:border-[#514036] hover:text-[#D5C1A2]"
                >
                  Показать ещё
                </button>
              </div>
            </FadeIn>
          ) : null}
        </div>
      </div>

      <div className="portfolio-desktop px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <div
              className="relative group overflow-hidden mb-4 cursor-pointer"
              onMouseEnter={() => setHoveredId(1)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ height: 'clamp(320px, 55vw, 680px)' }}
            >
              <Image
                src={portfolioItems[0].src}
                alt={portfolioItems[0].title}
                fill
                className={`object-cover ${portfolioItems[0].focus} transition-all duration-1000 ${
                  hoveredId === 1 ? 'scale-105' : 'scale-100'
                }`}
              />
              <div className={`absolute inset-0 bg-[#0D0D0D] transition-opacity duration-700 ${
                hoveredId === 1 ? 'opacity-20' : 'opacity-42'
              }`} />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/70 to-transparent px-8 pb-8 pt-20">
                <div className="flex items-end justify-between gap-8">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#E6D2A2]/60 mb-2">
                      {portfolioItems[0].category}
                    </p>
                    <h3 className="font-serif text-[28px] md:text-[36px] font-light text-[#F5F2E9]">
                      {portfolioItems[0].title}
                    </h3>
                    <p className="mt-3 max-w-md font-mono text-[11px] tracking-[0.12em] uppercase text-[#A59478]">
                      {portfolioItems[0].note}
                    </p>
                  </div>
                  <span className="font-mono text-[11px] text-[#7A7060]">
                    {portfolioItems[0].year}
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {portfolioItems.slice(1, 3).map((item, index) => (
              <FadeIn key={item.id} direction="up" delay={index * 120}>
                <div
                  className="relative group overflow-hidden cursor-pointer"
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{ height: 'clamp(240px, 30vw, 480px)' }}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className={`object-cover ${item.focus} transition-all duration-1000 ${
                      hoveredId === item.id ? 'scale-105' : 'scale-100'
                    }`}
                  />
                  <div className={`absolute inset-0 bg-[#0D0D0D] transition-opacity duration-700 ${
                    hoveredId === item.id ? 'opacity-15' : 'opacity-46'
                  }`} />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/72 to-transparent px-6 pb-6 pt-16">
                    <div className="flex items-end justify-between gap-6">
                      <div>
                        <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#E6D2A2]/60 mb-1">
                          {item.category}
                        </p>
                        <h3 className="font-serif text-[22px] font-light text-[#F5F2E9]">
                          {item.title}
                        </h3>
                        <p className="mt-2 font-mono text-[10px] tracking-[0.12em] uppercase text-[#A59478]">
                          {item.note}
                        </p>
                      </div>
                      <span className="font-mono text-[10px] text-[#7A7060]">{item.year}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {portfolioItems.slice(3, 6).map((item, index) => (
              <FadeIn key={item.id} direction="up" delay={index * 100}>
                <div
                  className="relative group overflow-hidden cursor-pointer"
                  onMouseEnter={() => setHoveredId(item.id + 100)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{ height: 'clamp(220px, 22vw, 360px)' }}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className={`object-cover ${item.focus} transition-all duration-1000 ${
                      hoveredId === item.id + 100 ? 'scale-105' : 'scale-100'
                    }`}
                  />
                  <div className={`absolute inset-0 bg-[#0D0D0D] transition-opacity duration-700 ${
                    hoveredId === item.id + 100 ? 'opacity-15' : 'opacity-52'
                  }`} />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/74 to-transparent px-5 pb-5 pt-14">
                    <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#E6D2A2]/50 mb-1">
                      {item.category}
                    </p>
                    <div className="flex items-end justify-between gap-5">
                      <div>
                        <h3 className="font-serif text-[18px] font-light text-[#F5F2E9]">
                          {item.title}
                        </h3>
                        <p className="mt-2 font-mono text-[10px] tracking-[0.12em] uppercase text-[#A59478]">
                          {item.note}
                        </p>
                      </div>
                      <span className="font-mono text-[10px] text-[#7A7060]">
                        {item.year}
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      <div className="px-8 md:px-16 mt-20 md:mt-28">
        <div className="max-w-7xl mx-auto">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#2E2820] to-transparent" />
        </div>
      </div>

      <style jsx>{`
        .portfolio-meta-desktop {
          display: none;
        }

        .portfolio-desktop {
          display: none;
        }

        .portfolio-mobile {
          display: block;
        }

        @media (min-width: 720px) {
          .portfolio-meta-desktop {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
          }

          .portfolio-desktop {
            display: block;
          }

          .portfolio-mobile {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}

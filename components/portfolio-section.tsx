'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { portfolioItems, type PortfolioItem } from '@/lib/portfolio-items'
import { FadeIn } from './fade-in'

const MOBILE_INITIAL_COUNT = 10
const MOBILE_LOAD_MORE_COUNT = 20

const desktopPerRow = 4
const tabletPerRow = 3

const filmHoleBackground = '#0D0D0D'
const horizontalPerforation = `repeating-linear-gradient(90deg, ${filmHoleBackground} 0 10px, transparent 10px 19px)`
const verticalPerforation = `repeating-linear-gradient(180deg, ${filmHoleBackground} 0 12px, transparent 12px 24px)`

function chunkItems(items: PortfolioItem[], size: number) {
  const chunks: PortfolioItem[][] = []

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size))
  }

  return chunks
}

function HorizontalFilmFrame({ item, priority = false }: { item: PortfolioItem; priority?: boolean }) {
  const flexRatio = item.width / item.height

  return (
    <div className="min-w-0" style={{ flexGrow: flexRatio, flexBasis: 0 }}>
      <figure className="relative overflow-hidden rounded-[6px] bg-[#3B281C] px-[10px] pb-[14px] pt-[14px] shadow-[0_14px_32px_rgba(0,0,0,0.28)] ring-1 ring-[#5B3E2B]/35">
        <div
          aria-hidden="true"
          className="absolute left-[10px] right-[10px] top-[4px] h-[6px] opacity-95"
          style={{ backgroundImage: horizontalPerforation }}
        />
        <div
          aria-hidden="true"
          className="absolute bottom-[4px] left-[10px] right-[10px] h-[6px] opacity-95"
          style={{ backgroundImage: horizontalPerforation }}
        />
        <div
          className="relative overflow-hidden rounded-[2px] bg-[#060606]"
          style={{ aspectRatio: `${item.width} / ${item.height}` }}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            priority={priority}
            sizes="(max-width: 1023px) 30vw, 24vw"
            className="object-cover"
          />
        </div>
      </figure>
    </div>
  )
}

function VerticalFilmFrame({ item, priority = false }: { item: PortfolioItem; priority?: boolean }) {
  return (
    <figure className="relative mx-auto w-full max-w-[25rem] overflow-hidden rounded-[8px] bg-[#4B3122] px-[18px] py-[18px] shadow-[0_18px_36px_rgba(0,0,0,0.3)] ring-1 ring-[#6A4A34]/45">
      <div
        aria-hidden="true"
        className="absolute bottom-[18px] left-[7px] top-[18px] w-[7px] opacity-95"
        style={{ backgroundImage: verticalPerforation }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[18px] right-[7px] top-[18px] w-[7px] opacity-95"
        style={{ backgroundImage: verticalPerforation }}
      />
      <div
        className="relative overflow-hidden rounded-[2px] border border-[#2A170F] bg-[#090909]"
        style={{ aspectRatio: `${item.width} / ${item.height}` }}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          priority={priority}
          sizes="(max-width: 767px) calc(100vw - 88px), 340px"
          className="object-cover"
        />
      </div>
    </figure>
  )
}

export function PortfolioSection() {
  const [visibleMobileCount, setVisibleMobileCount] = useState(MOBILE_INITIAL_COUNT)

  const tabletRows = useMemo(() => chunkItems(portfolioItems, tabletPerRow), [])
  const desktopRows = useMemo(() => chunkItems(portfolioItems, desktopPerRow), [])

  const mobileItems = portfolioItems.slice(0, visibleMobileCount)
  const hasMoreMobileItems = visibleMobileCount < portfolioItems.length

  return (
    <section
      id="portfolio"
      className="relative py-32 md:py-48 bg-[#0D0D0D]"
      aria-label="Портфолио"
    >
      <div className="px-8 md:px-16 mb-16 md:mb-20">
        <div className="max-w-[96rem] mx-auto flex items-end justify-between gap-8">
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
            <div className="hidden md:flex flex-col items-end gap-2 mb-2">
              <p className="font-mono text-[11px] tracking-[0.2em] text-[#7A7060] uppercase">
                2015 – 2026
              </p>
              <p className="font-mono text-[10px] tracking-[0.28em] text-[#4D4338] uppercase">
                {portfolioItems.length} кадров
              </p>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="px-5 sm:px-8 md:px-16">
        <div className="max-w-[96rem] mx-auto">
          <div className="md:hidden space-y-5">
            {mobileItems.map((item, index) => (
              <FadeIn key={item.id} direction="up" delay={(index % 4) * 60}>
                <VerticalFilmFrame item={item} priority={index < 2} />
              </FadeIn>
            ))}

            {hasMoreMobileItems ? (
              <FadeIn direction="up" delay={120}>
                <div className="flex justify-center pt-4">
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleMobileCount((currentCount) =>
                        Math.min(currentCount + MOBILE_LOAD_MORE_COUNT, portfolioItems.length)
                      )
                    }
                    className="inline-flex items-center justify-center rounded-full border border-[#5B3E2B] bg-[#241811] px-7 py-3 font-mono text-[10px] tracking-[0.28em] uppercase text-[#E6D2A2] transition duration-300 hover:border-[#8B5E3C] hover:bg-[#2E1E15] hover:text-[#F5F2E9]"
                  >
                    Показать ещё
                  </button>
                </div>
              </FadeIn>
            ) : null}
          </div>

          <div className="hidden md:block lg:hidden space-y-3">
            {tabletRows.map((row, rowIndex) => (
              <FadeIn key={`tablet-row-${rowIndex}`} direction="up" delay={rowIndex * 80}>
                <div className="flex items-stretch gap-3">
                  {row.map((item) => (
                    <HorizontalFilmFrame key={item.id} item={item} priority={rowIndex === 0} />
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="hidden lg:block space-y-3">
            {desktopRows.map((row, rowIndex) => (
              <FadeIn key={`desktop-row-${rowIndex}`} direction="up" delay={rowIndex * 70}>
                <div className="flex items-stretch gap-3">
                  {row.map((item) => (
                    <HorizontalFilmFrame key={item.id} item={item} priority={rowIndex === 0} />
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      <div className="px-8 md:px-16 mt-20 md:mt-28">
        <div className="max-w-[96rem] mx-auto">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#2E2820] to-transparent" />
        </div>
      </div>
    </section>
  )
}

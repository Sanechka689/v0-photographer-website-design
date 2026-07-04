'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { portfolioItems, type PortfolioItem } from '@/lib/portfolio-items'
import { FadeIn } from './fade-in'

const MOBILE_INITIAL_COUNT = 10
const MOBILE_LOAD_MORE_COUNT = 20

const TABLET_PATTERN = [1, 2, 2, 1, 2, 2]
const DESKTOP_PATTERN = [1, 2, 3, 2, 3]

const filmCutout = '#0D0D0D'
const verticalPerforation = `repeating-linear-gradient(180deg, ${filmCutout} 0 11px, transparent 11px 25px)`

function buildRows(items: PortfolioItem[], pattern: number[]) {
  const rows: PortfolioItem[][] = []
  let cursor = 0
  let patternIndex = 0

  while (cursor < items.length) {
    const plannedCount = pattern[patternIndex % pattern.length]
    const count = Math.min(plannedCount, items.length - cursor)

    rows.push(items.slice(cursor, cursor + count))
    cursor += count
    patternIndex += 1
  }

  return rows
}

function getTabletRowHeight(count: number, rowIndex: number) {
  if (count === 1) return 'clamp(320px, 54vw, 520px)'
  return rowIndex % 3 === 1 ? 'clamp(260px, 34vw, 390px)' : 'clamp(290px, 37vw, 430px)'
}

function getDesktopRowHeight(count: number, rowIndex: number) {
  if (count === 1) return rowIndex % 2 === 0 ? 'clamp(360px, 42vw, 620px)' : 'clamp(330px, 39vw, 560px)'
  if (count === 2) return rowIndex % 2 === 0 ? 'clamp(290px, 27vw, 430px)' : 'clamp(320px, 29vw, 470px)'
  return rowIndex % 2 === 0 ? 'clamp(230px, 20vw, 330px)' : 'clamp(255px, 21vw, 350px)'
}

function getSizesByCount(count: number) {
  if (count === 1) return '(max-width: 719px) 100vw, (max-width: 1023px) 88vw, 92vw'
  if (count === 2) return '(max-width: 719px) 100vw, (max-width: 1023px) 44vw, 46vw'
  return '(max-width: 719px) 100vw, (max-width: 1023px) 44vw, 30vw'
}

function DesktopGalleryCard({
  item,
  count,
  centerSolo = false,
  priority = false,
}: {
  item: PortfolioItem
  count: number
  centerSolo?: boolean
  priority?: boolean
}) {
  const ratio = item.width / item.height
  const soloWidth = `${Math.min(82, Math.max(46, ratio * 58))}%`

  return (
    <figure
      className="group flex min-w-0 flex-1 flex-col overflow-hidden rounded-[8px] border border-[#24201B] bg-[#11100F] transition duration-300 hover:border-[#3B342C]"
      style={
        count === 1 && centerSolo
          ? { width: soloWidth, flex: '0 1 auto' }
          : { flexGrow: Math.max(ratio, 0.72), flexBasis: 0 }
      }
    >
      <div className="relative min-h-0 flex-1 overflow-hidden bg-[#151412]">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          priority={priority}
          sizes={getSizesByCount(count)}
          className="object-contain transition duration-500 group-hover:scale-[1.01]"
        />
      </div>
      <figcaption className="flex min-h-[84px] items-end justify-between gap-5 border-t border-[#24201B] px-5 py-4">
        <div className="min-w-0">
          <p className="font-mono text-[9px] tracking-[0.28em] uppercase text-[#7F7568]">
            {item.category}
          </p>
          <h3 className="mt-2 truncate font-serif text-[22px] font-light leading-none text-[#F5F2E9] md:text-[24px]">
            {item.title}
          </h3>
        </div>
        <span className="shrink-0 font-mono text-[10px] tracking-[0.16em] uppercase text-[#4E473F]">
          {String(item.id).padStart(2, '0')}
        </span>
      </figcaption>
    </figure>
  )
}

function MobileFilmCard({ item, priority = false }: { item: PortfolioItem; priority?: boolean }) {
  return (
    <article className="relative px-5 py-5">
      <div className="relative overflow-hidden rounded-[3px] border border-[#8A7968]/20 bg-[#0A0A0A]/90">
        <div className="relative" style={{ aspectRatio: `${item.width} / ${item.height}` }}>
          <Image
            src={item.src}
            alt={item.alt}
            fill
            priority={priority}
            sizes="(max-width: 719px) calc(100vw - 104px), 320px"
            className="object-contain"
          />
        </div>
      </div>
      <div className="flex items-end justify-between gap-4 px-1 pt-3">
        <div className="min-w-0">
          <p className="font-mono text-[9px] tracking-[0.26em] uppercase text-[#8E816F]">
            {item.category}
          </p>
          <h3 className="mt-2 truncate font-serif text-[22px] font-light leading-none text-[#F5F2E9]">
            {item.title}
          </h3>
        </div>
        <span className="shrink-0 font-mono text-[10px] tracking-[0.16em] uppercase text-[#655B4F]">
          {String(item.id).padStart(2, '0')}
        </span>
      </div>
    </article>
  )
}

export function PortfolioSection() {
  const [visibleMobileCount, setVisibleMobileCount] = useState(MOBILE_INITIAL_COUNT)

  const tabletRows = useMemo(() => buildRows(portfolioItems, TABLET_PATTERN), [])
  const desktopRows = useMemo(() => buildRows(portfolioItems, DESKTOP_PATTERN), [])

  const mobileItems = portfolioItems.slice(0, visibleMobileCount)
  const hasMoreMobileItems = visibleMobileCount < portfolioItems.length

  return (
    <section
      id="portfolio"
      className="relative bg-[#0D0D0D] py-32 md:py-48"
      aria-label="Портфолио"
    >
      <div className="mb-16 px-8 md:mb-20 md:px-16">
        <div className="mx-auto flex max-w-[96rem] items-end justify-between gap-8">
          <FadeIn direction="up">
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-[#7A7060]">
                02 — Портфолио
              </p>
              <h2 className="font-serif text-[48px] font-light leading-[1] tracking-[-0.01em] text-[#F5F2E9] md:text-[64px]">
                Избранные работы
              </h2>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={200}>
            <div className="portfolio-meta-desktop flex-col items-end gap-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7A7060]">
                2015 – 2026
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#4D4338]">
                {portfolioItems.length} работ
              </p>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="portfolio-mobile px-5 sm:px-8">
        <div className="mx-auto max-w-[27rem]">
          <FadeIn direction="up">
            <div className="relative overflow-hidden rounded-[16px] border border-[#5C4D40]/16 bg-[linear-gradient(180deg,rgba(65,48,39,0.32),rgba(24,19,17,0.2))] shadow-[0_22px_48px_rgba(0,0,0,0.22)]">
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-[10px] top-0 w-[9px] opacity-45"
                style={{ backgroundImage: verticalPerforation }}
              />
              <div
                aria-hidden="true"
                className="absolute bottom-0 right-[10px] top-0 w-[9px] opacity-45"
                style={{ backgroundImage: verticalPerforation }}
              />

              <div className="relative py-2">
                {mobileItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`relative ${index === 0 ? '' : 'border-t border-[#86725F]/10'}`}
                  >
                    <FadeIn direction="up" delay={(index % 4) * 60}>
                      <MobileFilmCard item={item} priority={index < 2} />
                    </FadeIn>
                  </div>
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
                  className="inline-flex items-center justify-center rounded-full border border-[#42362E] bg-[#171311]/82 px-8 py-3 font-serif text-[24px] font-light leading-none text-[#B9A489] transition duration-300 hover:border-[#56463B] hover:text-[#D1C0A8]"
                >
                  Показать ещё
                </button>
              </div>
            </FadeIn>
          ) : null}
        </div>
      </div>

      <div className="portfolio-tablet px-8">
        <div className="mx-auto max-w-[96rem] space-y-4">
          {tabletRows.map((row, rowIndex) => (
            <FadeIn key={`tablet-row-${rowIndex}`} direction="up" delay={rowIndex * 50}>
              <div
                className="flex flex-col gap-4"
                style={{ height: getTabletRowHeight(row.length, rowIndex) }}
              >
                <div className="flex h-full items-stretch gap-4">
                  {row.map((item, itemIndex) => (
                    <DesktopGalleryCard
                      key={item.id}
                      item={item}
                      count={row.length}
                      centerSolo={false}
                      priority={rowIndex === 0 && itemIndex < 2}
                    />
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <div className="portfolio-desktop px-8 md:px-16">
        <div className="mx-auto max-w-[96rem] space-y-4">
          {desktopRows.map((row, rowIndex) => (
            <FadeIn key={`desktop-row-${rowIndex}`} direction="up" delay={rowIndex * 50}>
              <div
                className={`flex items-stretch gap-4 ${row.length === 1 ? 'justify-center' : ''}`}
                style={{ height: getDesktopRowHeight(row.length, rowIndex) }}
              >
                {row.map((item, itemIndex) => (
                  <DesktopGalleryCard
                    key={item.id}
                    item={item}
                    count={row.length}
                    centerSolo={true}
                    priority={rowIndex === 0 && itemIndex < 2}
                  />
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <div className="mt-20 px-8 md:mt-28 md:px-16">
        <div className="mx-auto max-w-[96rem]">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#2E2820] to-transparent" />
        </div>
      </div>

      <style jsx>{`
        .portfolio-meta-desktop,
        .portfolio-tablet,
        .portfolio-desktop {
          display: none;
        }

        .portfolio-mobile {
          display: block;
        }

        @media (min-width: 720px) and (max-width: 1023px) {
          .portfolio-meta-desktop {
            display: flex;
          }

          .portfolio-mobile,
          .portfolio-desktop {
            display: none;
          }

          .portfolio-tablet {
            display: block;
          }
        }

        @media (min-width: 1024px) {
          .portfolio-meta-desktop {
            display: flex;
          }

          .portfolio-mobile,
          .portfolio-tablet {
            display: none;
          }

          .portfolio-desktop {
            display: block;
          }
        }
      `}</style>
    </section>
  )
}

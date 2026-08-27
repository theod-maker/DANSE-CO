'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import AppNavbar from '@/src/components/layout/AppNavbar'
import AppFooter from '@/src/components/layout/AppFooter'
import FreeBlockRenderer from '@/src/components/page-blocks/FreeBlockRenderer'
import TimelineEventBlock from '@/src/components/page-blocks/TimelineEventBlock'
import type { PageTextsContent } from '@/src/lib/fallbackContent'
import type { ResolvedBlock, ResolvedFreeBlock, TimelineEventBlockContent } from '@/src/lib/content/pageBlocks'

const EASING = [0.25, 0.46, 0.45, 0.94] as const

interface Props {
  pageTexts: PageTextsContent
  blocks: ResolvedBlock[]
}

interface TimelineGroup {
  type: 'timeline'
  blocks: { id: string; content: TimelineEventBlockContent }[]
}

interface OtherGroup {
  type: 'other'
  block: ResolvedFreeBlock
}

function groupBlocks(blocks: ResolvedBlock[]): (TimelineGroup | OtherGroup)[] {
  const groups: (TimelineGroup | OtherGroup)[] = []

  for (const block of blocks) {
    if (block.kind === 'fixed') continue

    if (block.kind === 'timelineEvent' && block.content) {
      const content = block.content as TimelineEventBlockContent
      const last = groups[groups.length - 1]
      if (last && last.type === 'timeline') {
        last.blocks.push({ id: block.id, content })
      } else {
        groups.push({ type: 'timeline', blocks: [{ id: block.id, content }] })
      }
      continue
    }

    groups.push({ type: 'other', block })
  }

  return groups
}

export default function HistoireContent({ pageTexts, blocks }: Props) {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  const groups = groupBlocks(blocks)

  return (
    <div className="min-h-screen overflow-x-hidden">
      <AppNavbar />
      <main className="max-w-5xl mx-auto px-6 pt-40 pb-32 relative">
        <div
          className="absolute pointer-events-none [animation:orb-drift-alt_14s_ease-in-out_infinite]"
          style={{ width: 450, height: 450, top: '0', left: '-120px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(107,33,168,0.05) 0%, transparent 70%)', filter: 'blur(55px)' }}
        />

        <div ref={headerRef} className="mb-24 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[#18102E]/40 text-xs tracking-widest uppercase font-ui mb-6"
          >
            L'Histoire
          </motion.p>
          <h1
            style={{ fontFamily: "'Instrument Serif', serif", perspective: '1200px' }}
            className="text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.05] text-[#18102E] mb-8"
          >
            {['Notre', 'Histoire'].map((word, i) => (
              <motion.span
                key={i}
                style={{ display: 'inline-block', marginRight: '0.3em' }}
                initial={{ opacity: 0, y: 36, rotateX: 14 }}
                animate={headerInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: EASING }}
                className={i === 1 ? 'text-[#6C5CA8] italic' : ''}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35, ease: EASING }}
            className="text-[#18102E]/50 text-base leading-relaxed max-w-sm mx-auto"
          >
            {pageTexts.histoireSubtitle}
          </motion.p>
        </div>

        {groups.map((group, groupIndex) => {
          if (group.type === 'other') {
            return <FreeBlockRenderer key={group.block.id} block={group.block} />
          }

          return (
            <div key={`timeline-${groupIndex}`} className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-[#6C5CA8]/30 via-[#6C5CA8]/15 to-transparent" />
              <div className="flex flex-col gap-16 relative z-10">
                {group.blocks.map((event, index) => (
                  <TimelineEventBlock key={event.id} index={index} {...event.content} />
                ))}
              </div>
            </div>
          )
        })}
      </main>
      <AppFooter />
    </div>
  )
}

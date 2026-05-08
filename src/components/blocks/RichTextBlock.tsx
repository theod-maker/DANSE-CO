import React from 'react'
import type { RichTextBlockType, PortableTextBlock } from '../../lib/pageBuilderTypes'

const renderBlock = (block: PortableTextBlock) => {
  const children = block.children.map((child, i) => {
    let node: React.ReactNode = child.text

    if (child.marks.includes('strong')) {
      node = <strong key={i}>{node}</strong>
    }
    if (child.marks.includes('em')) {
      node = <em key={i}>{node}</em>
    }

    const linkMark = child.marks.find((m) => {
      const def = block.markDefs.find((d) => d._key === m)
      return def?._type === 'link'
    })
    if (linkMark) {
      const def = block.markDefs.find((d) => d._key === linkMark)
      node = (
        <a key={i} href={def?.href} target="_blank" rel="noopener noreferrer" className="text-[#6C5CA8] underline hover:opacity-80">
          {node}
        </a>
      )
    }

    return <span key={i}>{node}</span>
  })

  switch (block.style) {
    case 'h2':
      return (
        <h2 key={block._key} style={{ fontFamily: "'Instrument Serif', serif" }} className="text-3xl md:text-4xl text-[#18102E] tracking-tight mb-4 mt-8">
          {children}
        </h2>
      )
    case 'h3':
      return (
        <h3 key={block._key} style={{ fontFamily: "'Instrument Serif', serif" }} className="text-2xl text-[#18102E] tracking-tight mb-3 mt-6">
          {children}
        </h3>
      )
    default:
      return (
        <p key={block._key} className="text-[#18102E]/65 text-base leading-relaxed mb-4">
          {children}
        </p>
      )
  }
}

const RichTextBlock: React.FC<RichTextBlockType> = ({ content }) => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="max-w-2xl">
        {content.map(renderBlock)}
      </div>
    </div>
  )
}

export default RichTextBlock

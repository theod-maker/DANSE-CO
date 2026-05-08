import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { ImageBlockType } from '../../lib/pageBuilderTypes'

const EASING = [0.25, 0.46, 0.45, 0.94] as const

const ImageBlock: React.FC<ImageBlockType> = ({ imageUrl, caption, fullWidth }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const containerClass = fullWidth !== false
    ? 'max-w-6xl mx-auto px-6 py-10'
    : 'max-w-2xl mx-auto px-6 py-10'

  return (
    <div className={containerClass} ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASING }}
        className="rounded-3xl overflow-hidden"
      >
        <img src={imageUrl} alt={caption || ''} className="w-full h-auto object-cover" />
      </motion.div>
      {caption && (
        <p className="text-[#18102E]/40 text-sm text-center mt-3">{caption}</p>
      )}
    </div>
  )
}

export default ImageBlock

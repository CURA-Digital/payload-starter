import React from 'react'

import type { BoxRevealBlockType } from '@/payload-types'

import { BoxReveal } from '@/components/ui/box-reveal'
import RichText from '@/components/RichText'

export const BoxRevealBlock: React.FC<BoxRevealBlockType> = ({ title, content }) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        {title && (
          <BoxReveal>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">{title}</h2>
          </BoxReveal>
        )}

        {content && (
          <BoxReveal>
            <div className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              <RichText data={content} enableGutter={false} />
            </div>
          </BoxReveal>
        )}
      </div>
    </div>
  )
}

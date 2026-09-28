'use client'

import { useState } from 'react'
import { Heart, Music, Star, Users, Zap, type LucideProps } from 'lucide-react'
import { FieldError } from '../_shared/fields'
import { DISCIPLINE_ICONS, type DisciplineIconName } from './validation'

type IconComponent = React.ComponentType<LucideProps>

const ICON_MAP: Record<DisciplineIconName, IconComponent> = { Zap, Star, Heart, Music, Users }

export function IconPicker({
  name,
  defaultValue,
  error,
}: {
  name: string
  defaultValue: DisciplineIconName
  error?: string
}) {
  const [selected, setSelected] = useState<DisciplineIconName>(defaultValue)

  return (
    <div>
      <span className="mb-1 block text-sm text-neutral-700">Icône</span>
      <p className="mb-2 text-xs text-neutral-500">
        Elle apparaît sur la carte de la discipline, sur le site.
      </p>

      <input type="hidden" name={name} value={selected} />

      <div role="radiogroup" aria-label="Icône de la discipline" className="flex flex-wrap gap-2">
        {DISCIPLINE_ICONS.map((iconName) => {
          const Icon = ICON_MAP[iconName]
          const isSelected = selected === iconName

          return (
            <button
              key={iconName}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={iconName}
              onClick={() => setSelected(iconName)}
              className={
                isSelected
                  ? 'flex h-14 w-14 items-center justify-center rounded-md bg-[#6C5CA8] text-white'
                  : 'flex h-14 w-14 items-center justify-center rounded-md border border-neutral-300 text-neutral-500 transition-colors hover:border-[#6C5CA8] hover:text-[#6C5CA8]'
              }
            >
              <Icon size={22} aria-hidden="true" />
            </button>
          )
        })}
      </div>

      <FieldError message={error} />
    </div>
  )
}

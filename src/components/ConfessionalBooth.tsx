'use client'

import { useState } from 'react'
import { SinCategory } from '@/types/confession'

const sinCategories: SinCategory[] = [
  'Pride', 'Greed', 'Lust', 'Envy', 'Gluttony', 'Wrath', 'Sloth'
]

const sinCategoryNames: Record<SinCategory, string> = {
  Pride: 'Kibir',
  Greed: 'Açgözlülük', 
  Lust: 'Şehvet',
  Envy: 'Kıskançlık',
  Gluttony: 'Oburluk',
  Wrath: 'Öfke',
  Sloth: 'Tembellik'
}

interface ConfessionalBoothProps {
  onSubmit: (content: string, sinCategory: SinCategory) => void
}

export default function ConfessionalBooth({ onSubmit }: ConfessionalBoothProps) {
  const [content, setContent] = useState('')
  const [selectedSin, setSelectedSin] = useState<SinCategory | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!content.trim() || !selectedSin) return

    setIsSubmitting(true)
    try {
      await onSubmit(content.trim(), selectedSin)
      setContent('')
      setSelectedSin(null)
    } catch (error) {
      console.error('Error submitting confession:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-black border border-gray-900 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-lg font-light tracking-widest uppercase mb-2">günah anlat</h2>
        <div className="w-8 h-px bg-gray-800 mx-auto"></div>
      </div>

      {/* Sin Category Selection */}
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-2">
          {sinCategories.map((sin) => (
            <button
              key={sin}
              onClick={() => setSelectedSin(sin)}
              className={`px-3 py-2 text-xs uppercase tracking-widest border transition-colors ${
                selectedSin === sin
                  ? 'bg-white text-black border-white'
                  : 'border-gray-800 text-gray-400 hover:border-gray-600 hover:text-gray-200'
              }`}
            >
              {sinCategoryNames[sin]}
            </button>
          ))}
        </div>
      </div>

      {/* Confession Text Area */}
      <div className="mb-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Günahını anlat..."
          className="w-full h-32 px-0 py-2 bg-transparent border-b border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-gray-600 resize-none text-sm"
          disabled={!selectedSin}
        />
      </div>

      {/* Action Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!content.trim() || !selectedSin || isSubmitting}
          className="px-4 py-1 text-xs uppercase tracking-widest bg-white text-black disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? '...' : 'gönder'}
        </button>
      </div>
    </div>
  )
}

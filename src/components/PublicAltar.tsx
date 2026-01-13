'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ConfessionWithReactions, SinCategory, ReactionType } from '@/types/confession'

interface PublicAltarProps {
  confessions: ConfessionWithReactions[]
  onReaction: (confessionId: string, reactionType: ReactionType) => void
  loading?: boolean
}

const sinCategoryColors: Record<SinCategory, string> = {
  Pride: 'border-gray-800',
  Greed: 'border-gray-800',
  Lust: 'border-gray-800',
  Envy: 'border-gray-800',
  Gluttony: 'border-gray-800',
  Wrath: 'border-gray-800',
  Sloth: 'border-gray-800'
}

const sinCategoryNames: Record<SinCategory, string> = {
  Pride: 'Kibir',
  Greed: 'Açgözlülük',
  Lust: 'Şehvet',
  Envy: 'Kıskançlık',
  Gluttony: 'Oburluk',
  Wrath: 'Öfke',
  Sloth: 'Tembellik'
}

const sinCategoryIcons: Record<SinCategory, string> = {
  Pride: 'K',
  Greed: 'A',
  Lust: 'Ş',
  Envy: 'Kı',
  Gluttony: 'O',
  Wrath: 'Ö',
  Sloth: 'T'
}

export default function PublicAltar({ confessions, onReaction, loading }: PublicAltarProps) {
  const [userReactions, setUserReactions] = useState<Record<string, ReactionType>>({})

  const handleReaction = (confessionId: string, reactionType: ReactionType) => {
    setUserReactions(prev => {
      const newReactions = { ...prev }
      if (prev[confessionId] === reactionType) {
        delete newReactions[confessionId]
      } else {
        newReactions[confessionId] = reactionType
      }
      return newReactions
    })
    onReaction(confessionId, reactionType)
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-xl font-light tracking-widest uppercase mb-2">günahlar</h2>
        <div className="w-12 h-px bg-gray-800 mx-auto"></div>
      </div>

      {/* Confessions List */}
      <div className="space-y-8">
        <AnimatePresence>
          {loading ? (
            // Loading skeleton
            Array.from({ length: 2 }).map((_, i) => (
              <motion.div
                key={`skeleton-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border-b border-gray-900 pb-8"
              >
                <div className="animate-pulse">
                  <div className="h-3 bg-gray-900 rounded w-16 mb-4"></div>
                  <div className="h-16 bg-gray-900 rounded mb-4"></div>
                  <div className="flex gap-8">
                    <div className="h-4 bg-gray-900 rounded w-12"></div>
                    <div className="h-4 bg-gray-900 rounded w-12"></div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : confessions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-sm tracking-wide">henüz günah yok</p>
            </motion.div>
          ) : (
            confessions.map((confession, index) => (
              <motion.div
                key={confession.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`border-b border-gray-900 pb-8`}
              >
                {/* Sin Category */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs uppercase tracking-widest text-gray-500">
                    {sinCategoryIcons[confession.sin_category]}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-gray-400">
                    {sinCategoryNames[confession.sin_category]}
                  </span>
                  <span className="text-xs text-gray-600 ml-auto">
                    {new Date(confession.created_at).toLocaleDateString('tr-TR', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>

                {/* Confession Content */}
                <p className="text-white text-sm leading-relaxed mb-6 whitespace-pre-wrap">
                  {confession.content}
                </p>

                {/* Reactions */}
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => handleReaction(confession.id, 'like')}
                    className={`flex items-center gap-2 text-xs uppercase tracking-widest transition-colors ${
                      userReactions[confession.id] === 'like'
                        ? 'text-white'
                        : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    <span>beğen</span>
                    <span className="text-gray-600">
                      {confession.like_count || 0}
                    </span>
                  </button>

                  <button
                    onClick={() => handleReaction(confession.id, 'dislike')}
                    className={`flex items-center gap-2 text-xs uppercase tracking-widest transition-colors ${
                      userReactions[confession.id] === 'dislike'
                        ? 'text-white'
                        : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    <span>beğenme</span>
                    <span className="text-gray-600">
                      {confession.dislike_count || 0}
                    </span>
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

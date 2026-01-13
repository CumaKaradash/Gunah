'use client'

import { useState, useEffect } from 'react'
import ConfessionalBooth from '@/components/ConfessionalBooth'
import PublicAltar from '@/components/PublicAltar'
import { ConfessionWithReactions, SinCategory, ReactionType } from '@/types/confession'

export default function Home() {
  const [confessions, setConfessions] = useState<ConfessionWithReactions[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchConfessions()
  }, [])

  const fetchConfessions = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/confessions')
      if (response.ok) {
        const data = await response.json()
        setConfessions(data)
      }
    } catch (error) {
      console.error('Günahlar alınırken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitConfession = async (content: string, sinCategory: SinCategory) => {
    try {
      const response = await fetch('/api/confessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          sin_category: sinCategory,
          is_anonymous: true
        }),
      })

      if (response.ok) {
        fetchConfessions() // Listeyi yenile
      }
    } catch (error) {
      console.error('Günah gönderilirken hata:', error)
    }
  }

  const handleReaction = async (confessionId: string, reactionType: ReactionType) => {
    try {
      const response = await fetch(`/api/confessions/${confessionId}/reactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reaction_type: reactionType,
          user_id: 'anonymous' // Gerçek uygulamada bu, kimlik doğrulanmış kullanıcı ID'si olur
        }),
      })

      if (response.ok) {
        fetchConfessions() // Listeyi güncellemek için yenile
      }
    } catch (error) {
      console.error('Tepki eklenirken hata:', error)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-light tracking-widest uppercase text-center">günah çıkar</h1>
        </div>
      </header>

      {/* Main Content - Split Layout */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Confession Writing */}
          <div className="order-2 lg:order-1">
            <ConfessionalBooth
              onSubmit={handleSubmitConfession}
            />
          </div>

          {/* Right Side - Confession Reading */}
          <div className="order-1 lg:order-2">
            <PublicAltar
              confessions={confessions}
              onReaction={handleReaction}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

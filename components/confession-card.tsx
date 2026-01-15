"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye } from "lucide-react"
import { getTranslation, type Locale } from "@/lib/i18n"
import { Confession } from "@/lib/types"

interface ConfessionCardProps {
  confession: Confession
  locale: Locale
  onWitness: (id: number) => void
  index: number
}

export function ConfessionCard({ confession, locale, onWitness, index }: ConfessionCardProps) {
  const [hasWitnessed, setHasWitnessed] = useState(false)
  const [isGlowing, setIsGlowing] = useState(false)

  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(locale, key)

  const handleWitness = () => {
    if (hasWitnessed) return

    setHasWitnessed(true)
    setIsGlowing(true)
    onWitness(confession.id)

    setTimeout(() => setIsGlowing(false), 2000)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.2,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative max-w-3xl mx-auto"
    >
      <div className="bg-void-deep/30 backdrop-blur-sm border border-void-border/50 p-10 md:p-16 transition-all duration-700 hover:bg-void-deep/40 hover:border-void-border">
        <motion.p
          className="font-serif text-xl md:text-2xl text-void-text leading-loose mb-8 text-balance"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.15 + 0.3, duration: 1 }}
        >
          {confession.text}
        </motion.p>

        <div className="flex items-center justify-between">
          <motion.button
            onClick={handleWitness}
            disabled={hasWitnessed}
            className="group/witness flex items-center gap-3 text-sm text-void-muted hover:text-void-silver transition-colors duration-500 disabled:cursor-default"
            whileHover={{ scale: !hasWitnessed ? 1.05 : 1 }}
            whileTap={{ scale: !hasWitnessed ? 0.95 : 1 }}
          >
            <motion.div
              animate={
                isGlowing
                  ? {
                      boxShadow: [
                        "0 0 0px rgba(148, 163, 184, 0)",
                        "0 0 20px rgba(148, 163, 184, 0.6)",
                        "0 0 0px rgba(148, 163, 184, 0)",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 2, ease: "easeInOut" }}
              className="rounded-full"
            >
              <Eye
                className={`w-5 h-5 transition-all duration-700 ${
                  hasWitnessed ? "fill-void-muted/30" : "group-hover/witness:fill-void-muted/20"
                }`}
              />
            </motion.div>
            <span className="tracking-wider">{hasWitnessed ? t("card.witnessed") : t("card.witness")}</span>
          </motion.button>

          {/* Hidden witness count to prevent popularity contests */}
          <span className="opacity-0 text-xs">{confession.witnesses}</span>
        </div>
      </div>
    </motion.article>
  )
}

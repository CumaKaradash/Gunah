"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getTranslation, type Locale } from "@/lib/i18n"

interface ConfessionInputProps {
  locale: Locale
  onSubmit: (text: string) => void
  onCancel: () => void
}

export function ConfessionInput({ locale, onSubmit, onCancel }: ConfessionInputProps) {
  const [text, setText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(locale, key)

  const handleSubmit = async () => {
    if (!text.trim()) return

    setIsSubmitting(true)

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1200))

    onSubmit(text)
    setText("")
    setIsSubmitting(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-8"
    >
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl md:text-4xl text-void-silver mb-4">{t("input.title")}</h2>
        <p className="text-void-muted">{t("input.subtitle")}</p>
      </div>

      <motion.textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t("input.placeholder")}
        className="w-full h-80 bg-void-deep/50 backdrop-blur-sm border border-void-border rounded-none p-8 text-void-text font-serif text-xl leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-void-muted/30 transition-all duration-700 placeholder:text-void-muted/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        disabled={isSubmitting}
      />

      <div className="flex justify-center gap-6">
        <motion.button
          onClick={onCancel}
          className="px-8 py-3 text-sm tracking-widest uppercase text-void-muted hover:text-void-silver transition-colors duration-500"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting}
        >
          {t("input.cancel")}
        </motion.button>

        <motion.button
          onClick={handleSubmit}
          disabled={!text.trim() || isSubmitting}
          className="relative px-12 py-3 bg-void-deep/70 border border-void-border text-sm tracking-widest uppercase text-void-silver hover:bg-void-deep/90 transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed overflow-hidden"
          whileHover={{ scale: text.trim() && !isSubmitting ? 1.02 : 1 }}
          whileTap={{ scale: text.trim() && !isSubmitting ? 0.98 : 1 }}
        >
          <AnimatePresence mode="wait">
            {isSubmitting ? (
              <motion.span
                key="submitting"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {t("input.submitting")}
              </motion.span>
            ) : (
              <motion.span
                key="submit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {t("input.submit")}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  )
}

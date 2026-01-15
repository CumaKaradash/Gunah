"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import { getTranslation, type Locale } from "@/lib/i18n"

interface TutorialOverlayProps {
  locale: Locale
  onClose: () => void
}

export function TutorialOverlay({ locale, onClose }: TutorialOverlayProps) {
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(locale, key)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-void/95 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="relative max-w-2xl w-full bg-void-deep/70 border border-void-border p-12 md:p-16"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-void-muted hover:text-void-silver transition-colors duration-500"
          aria-label="Close tutorial"
        >
          <X size={24} />
        </button>

        <div className="space-y-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-void-silver mb-4">{t("tutorial.welcome")}</h2>
            <p className="text-void-muted text-sm tracking-[0.3em] uppercase">{t("tutorial.subtitle")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="space-y-8 text-left"
          >
            <div>
              <h3 className="font-serif text-xl text-void-silver mb-2">{t("tutorial.whatTitle")}</h3>
              <p className="text-void-muted leading-relaxed">{t("tutorial.whatText")}</p>
            </div>

            <div>
              <h3 className="font-serif text-xl text-void-silver mb-2">{t("tutorial.howTitle")}</h3>
              <p className="text-void-muted leading-relaxed">{t("tutorial.howText")}</p>
            </div>

            <div>
              <h3 className="font-serif text-xl text-void-silver mb-2">{t("tutorial.rememberTitle")}</h3>
              <p className="text-void-muted leading-relaxed">{t("tutorial.rememberText")}</p>
            </div>
          </motion.div>

          <motion.button
            onClick={onClose}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="px-12 py-4 bg-void-deep/70 border border-void-border text-sm tracking-widest uppercase text-void-silver hover:bg-void-deep/90 transition-all duration-500"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t("tutorial.enterButton")}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

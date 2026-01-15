"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { StarsBackground } from "@/components/stars-background"
import { ConfessionInput } from "@/components/confession-input"
import { ConfessionCard } from "@/components/confession-card"
import { TutorialOverlay } from "@/components/tutorial-overlay"
import { LanguageSelector } from "@/components/language-selector"
import { getTranslation, type Locale } from "@/lib/i18n"
import { getConfessions, submitConfession, witnessConfession } from "@/app/actions"
import { Confession } from "@/lib/types"

export default function TheVoid() {
  const [locale, setLocale] = useState<Locale>("en")
  const [showInput, setShowInput] = useState(false)
  const [confessions, setConfessions] = useState<Confession[]>([])
  const [showTutorial, setShowTutorial] = useState(false)

  useEffect(() => {
    // Load saved locale
    const savedLocale = localStorage.getItem("voidLocale") as Locale
    if (savedLocale && ["en", "es", "tr"].includes(savedLocale)) {
      setLocale(savedLocale)
    }

    // Check if user has seen tutorial before
    const hasSeenTutorial = localStorage.getItem("hasSeenVoidTutorial")
    if (!hasSeenTutorial) {
      setShowTutorial(true)
    }

    // Load initial confessions
    loadConfessions()
  }, [])

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem("voidLocale", newLocale)
  }

  const handleCloseTutorial = () => {
    setShowTutorial(false)
    localStorage.setItem("hasSeenVoidTutorial", "true")
  }

  const loadConfessions = async () => {
    const data = await getConfessions()
    setConfessions(data)
  }

  const handleSubmit = async (text: string) => {
    const newConfession = await submitConfession(text)
    if (newConfession) {
      setConfessions([newConfession, ...confessions])
      setShowInput(false)
    }
  }

  const handleWitness = async (id: number) => {
    const success = await witnessConfession(id)
    if (success) {
      setConfessions(confessions.map((c) => (c.id === id ? { ...c, witnesses: c.witnesses + 1 } : c)))
    }
  }

  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(locale, key)

  return (
    <div className="relative min-h-screen bg-void text-void-text overflow-hidden">
      <StarsBackground />

      <AnimatePresence>
        {showTutorial && <TutorialOverlay locale={locale} onClose={handleCloseTutorial} />}
      </AnimatePresence>

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          className="fixed top-0 left-0 right-0 p-8 flex justify-between items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-serif text-2xl tracking-wide text-void-silver">{t("header.title")}</h1>

          <div className="flex items-center gap-6">
            <LanguageSelector currentLocale={locale} onLocaleChange={handleLocaleChange} />

            <motion.button
              onClick={() => setShowInput(!showInput)}
              className="text-sm tracking-widest uppercase text-void-muted hover:text-void-silver transition-colors duration-700"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {showInput ? t("header.closeButton") : t("header.writeButton")}
            </motion.button>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
          <AnimatePresence mode="wait">
            {showInput ? (
              <motion.div
                key="input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto"
              >
                <ConfessionInput locale={locale} onSubmit={handleSubmit} onCancel={() => setShowInput(false)} />
              </motion.div>
            ) : (
              <motion.div
                key="confessions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Intro Text */}
                <motion.div
                  className="text-center mb-32 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-void-muted text-sm tracking-[0.3em] uppercase mb-6">{t("main.tagline")}</p>
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-void-silver leading-tight mb-8 text-balance">
                    {t("main.headline")}
                  </h2>
                  <p className="text-void-muted text-lg leading-relaxed">{t("main.subheadline")}</p>
                </motion.div>

                {/* Confessions Grid */}
                {confessions.length === 0 ? (
                  <motion.div
                    className="text-center py-32"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                  >
                    <p className="text-void-muted text-lg font-serif italic">{t("main.emptyState")}</p>
                  </motion.div>
                ) : (
                  <div className="max-w-6xl mx-auto space-y-12">
                    {confessions.map((confession, index) => (
                      <ConfessionCard
                        key={confession.id}
                        confession={confession}
                        locale={locale}
                        onWitness={handleWitness}
                        index={index}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <motion.footer
          className="fixed bottom-0 left-0 right-0 p-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          <p className="text-void-muted text-xs tracking-widest uppercase">{t("footer.text")}</p>
        </motion.footer>
      </div>
    </div>
  )
}

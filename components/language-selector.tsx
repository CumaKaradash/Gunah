"use client"

import { motion } from "framer-motion"
import { Globe } from "lucide-react"
import { useState } from "react"
import type { Locale } from "@/lib/i18n"

interface LanguageSelectorProps {
  currentLocale: Locale
  onLocaleChange: (locale: Locale) => void
}

export function LanguageSelector({ currentLocale, onLocaleChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: "en" as Locale, label: "English" },
    { code: "es" as Locale, label: "Español" },
    { code: "tr" as Locale, label: "Türkçe" },
  ]

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-void-muted hover:text-void-silver transition-colors duration-500"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe size={18} />
        <span className="uppercase tracking-wider">{languages.find((l) => l.code === currentLocale)?.label}</span>
      </motion.button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full right-0 mt-2 bg-void-deep/95 backdrop-blur-sm border border-void-border z-50"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onLocaleChange(lang.code)
                  setIsOpen(false)
                }}
                className={`block w-full px-6 py-3 text-left text-sm transition-colors duration-300 ${
                  currentLocale === lang.code
                    ? "text-void-silver bg-void-border/20"
                    : "text-void-muted hover:text-void-silver hover:bg-void-border/10"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </motion.div>
        </>
      )}
    </div>
  )
}

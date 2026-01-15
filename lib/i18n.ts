export type Locale = "en" | "es" | "tr"

export const translations = {
  en: {
    // Header
    "header.title": "The Void",
    "header.writeButton": "Write into the Void",
    "header.closeButton": "Close",

    // Tutorial
    "tutorial.welcome": "Welcome to The Void",
    "tutorial.subtitle": "A sanctuary for the unspoken",
    "tutorial.whatTitle": "What is this place?",
    "tutorial.whatText":
      "The Void is a space for anonymous confessions. Release your thoughts without judgment, metrics, or social validation.",
    "tutorial.howTitle": "How does it work?",
    "tutorial.howText":
      'Click "Write into the Void" to share your thoughts anonymously. Others can witness your confession by clicking "I hear you" — not as validation, but as presence.',
    "tutorial.rememberTitle": "Remember",
    "tutorial.rememberText":
      "There are no likes, no followers, no counts to chase. Just honest words floating in the digital darkness, acknowledged but never measured.",
    "tutorial.enterButton": "Enter the Void",

    // Main Page
    "main.tagline": "A digital sanctuary",
    "main.headline": "Release your thoughts into the vastness",
    "main.subheadline": "No judgment. No metrics. No performance. Just presence.",
    "main.emptyState": "The void awaits your words...",

    // Confession Input
    "input.title": "Speak into the darkness",
    "input.subtitle": "Your words will drift into the void, anonymous and free",
    "input.placeholder": "Let it all out...",
    "input.cancel": "Cancel",
    "input.submit": "Release",
    "input.submitting": "Releasing...",

    // Confession Card
    "card.witness": "I hear you",
    "card.witnessed": "Witnessed",

    // Footer
    "footer.text": "Everything fades. Nothing is permanent.",
  },
  es: {
    // Header
    "header.title": "El Vacío",
    "header.writeButton": "Escribir en el Vacío",
    "header.closeButton": "Cerrar",

    // Tutorial
    "tutorial.welcome": "Bienvenido a El Vacío",
    "tutorial.subtitle": "Un santuario para lo no dicho",
    "tutorial.whatTitle": "¿Qué es este lugar?",
    "tutorial.whatText":
      "El Vacío es un espacio para confesiones anónimas. Libera tus pensamientos sin juicio, métricas o validación social.",
    "tutorial.howTitle": "¿Cómo funciona?",
    "tutorial.howText":
      'Haz clic en "Escribir en el Vacío" para compartir tus pensamientos de forma anónima. Otros pueden presenciar tu confesión haciendo clic en "Te escucho" — no como validación, sino como presencia.',
    "tutorial.rememberTitle": "Recuerda",
    "tutorial.rememberText":
      "No hay likes, ni seguidores, ni números que perseguir. Solo palabras honestas flotando en la oscuridad digital, reconocidas pero nunca medidas.",
    "tutorial.enterButton": "Entrar al Vacío",

    // Main Page
    "main.tagline": "Un santuario digital",
    "main.headline": "Libera tus pensamientos en la inmensidad",
    "main.subheadline": "Sin juicio. Sin métricas. Sin actuación. Solo presencia.",
    "main.emptyState": "El vacío espera tus palabras...",

    // Confession Input
    "input.title": "Habla en la oscuridad",
    "input.subtitle": "Tus palabras flotarán en el vacío, anónimas y libres",
    "input.placeholder": "Déjalo salir...",
    "input.cancel": "Cancelar",
    "input.submit": "Liberar",
    "input.submitting": "Liberando...",

    // Confession Card
    "card.witness": "Te escucho",
    "card.witnessed": "Presenciado",

    // Footer
    "footer.text": "Todo se desvanece. Nada es permanente.",
  },
  tr: {
    // Header
    "header.title": "Boşluk",
    "header.writeButton": "Boşluğa Yaz",
    "header.closeButton": "Kapat",

    // Tutorial
    "tutorial.welcome": "Boşluğa Hoş Geldiniz",
    "tutorial.subtitle": "Söylenmeyenler için bir sığınak",
    "tutorial.whatTitle": "Burası neresi?",
    "tutorial.whatText":
      "Boşluk, anonim itiraflar için bir alan. Düşüncelerinizi yargı, metrik veya sosyal onay olmadan serbest bırakın.",
    "tutorial.howTitle": "Nasıl çalışır?",
    "tutorial.howText":
      'Düşüncelerinizi anonim olarak paylaşmak için "Boşluğa Yaz"a tıklayın. Diğerleri "Seni duyuyorum"a tıklayarak itirafınıza tanıklık edebilir — onay olarak değil, bir varlık olarak.',
    "tutorial.rememberTitle": "Unutma",
    "tutorial.rememberText":
      "Beğeni yok, takipçi yok, kovalanacak sayı yok. Sadece dijital karanlıkta süzülen dürüst sözler, kabul edilmiş ama asla ölçülmemiş.",
    "tutorial.enterButton": "Boşluğa Gir",

    // Main Page
    "main.tagline": "Dijital bir sığınak",
    "main.headline": "Düşüncelerinizi uçsuz bucaksızlığa bırakın",
    "main.subheadline": "Yargı yok. Metrik yok. Performans yok. Sadece varlık.",
    "main.emptyState": "Boşluk sözlerinizi bekliyor...",

    // Confession Input
    "input.title": "Karanlığa konuş",
    "input.subtitle": "Sözleriniz boşlukta süzülecek, anonim ve özgür",
    "input.placeholder": "Hepsini dök...",
    "input.cancel": "İptal",
    "input.submit": "Serbest Bırak",
    "input.submitting": "Serbest bırakılıyor...",

    // Confession Card
    "card.witness": "Seni duyuyorum",
    "card.witnessed": "Tanık olundu",

    // Footer
    "footer.text": "Her şey solar. Hiçbir şey kalıcı değil.",
  },
}

export function getTranslation(locale: Locale, key: keyof typeof translations.en): string {
  return translations[locale][key] || translations.en[key]
}

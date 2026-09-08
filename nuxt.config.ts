// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  telemetry: false,

  experimental: {
    appManifest: false,
  },

  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxt/icon",
    "@nuxt/content",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "@nuxtjs/google-fonts",
  ],

  googleFonts: {
    families: {
      "Plus+Jakarta+Sans": [400, 600, 700],
      "JetBrains+Mono": [400],
    },
    display: "swap",
    preload: true,
    download: true,
  },

  content: {
    highlight: {
      theme: {
        default: "github-light",
        dark: "github-dark",
      },
      preload: [
        "typescript",
        "javascript",
        "vue",
        "bash",
        "yaml",
        "json",
        "html",
        "css",
        "dockerfile",
        "markdown",
      ],
    },
  },

  features: {
    inlineStyles: true,
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || "https://vigarp.id",
    name: "vigarp Digital Garden",
    description:
      "Personal homepage, writings, and digital directory of Vigar. Software engineering, web technologies, and self-hosted infrastructure.",
    defaultLocale: "id",
  },

  sitemap: {
    exclude: ["/hub", "/links"],
  },

  robots: {
    disallow: ["/hub", "/links", "/api/*"],
    sitemap: "https://vigarp.id/sitemap.xml",
  },

  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "dark",
  },

  css: ["~/assets/css/main.css"],

  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "id",
      },
      title: "vigarp Digital Garden",
      titleTemplate: "%s",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Personal homepage, writings, and digital directory of Vigar. Software engineering, web technologies, and self-hosted infrastructure.",
        },
        { name: "theme-color", content: "#09090b" },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "alternate icon", type: "image/x-icon", href: "/favicon.ico" },
      ],
    },
  },

  runtimeConfig: {
    hubSecretPasscode:
      process.env.NUXT_HUB_SECRET_PASSCODE ||
      process.env.HUB_SECRET_PASSCODE ||
      "",
    hubServices: {
      actualBudget:
        process.env.HUB_ACTUAL_BUDGET_URL || "https://budget.vigarp.id",
      beszelMonitor: process.env.HUB_BESZEL_URL || "https://beszel.vigarp.id",
      traefikDashboard:
        process.env.HUB_TRAEFIK_URL || "https://traefik.vigarp.id",
      portainerManager:
        process.env.HUB_PORTAINER_URL || "https://portainer.vigarp.id",
    },
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://vigarp.id",
      googleCalendarDirectUrl:
        process.env.NUXT_PUBLIC_GOOGLE_CALENDAR_DIRECT_URL ||
        "https://calendar.google.com/calendar/u/0/r?cid=MTM3NzgzMjA3Yzc3MGUxMTQ2YjUyNWFiNzZmZDY4NGM0ZjY5NjEzYjEyYjkwNzc4ZjFhMmQ3ODdkNWYxMTA0YkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
    },
  },
});

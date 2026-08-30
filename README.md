# vigarp.id 🌿

> **Personal Digital Garden, Technical Notes & Private Command Workspace**  
> Built with **Nuxt 3**, **Vue 3**, **Tailwind CSS**, and **TypeScript**.

---

## 🌟 Overview

**`vigarp.id`** is a personal digital garden and self-hosted infrastructure portal. It combines an editorial personal homepage, technical writings, curated public resources, and an authenticated command hub for private VPS services.

---

## ✨ Features

- 🌿 **Digital Garden & Writings (`/blog`)**:
  - Markdown-driven articles powered by `@nuxt/content`.
  - Client-side real-time article search and topic filtering.
  - Automatic Table of Contents (TOC), reading time estimation, and Previous/Next post navigation.
  - Dual-theme syntax-highlighted code blocks (`github-light` / `github-dark`) with copy-to-clipboard button.

- 📂 **Curated Public Directory (`/links`)**:
  - Centralized shortcuts to GitHub profiles, code gists, s.id shortlinks, and direct email.
  - Integrated academic course timetable and Google Calendar feed.

- 🔒 **Private Workspace & Command Hub (`/hub`)**:
  - 6-digit PIN-protected security gate with brute-force rate limiting (max 5 failed attempts / 5 mins).
  - Virtual & physical keyboard numeric keypad with vibration feedback on error.
  - Shielded access to self-hosted utilities: **Actual Budget**, **Beszel Telemetry**, **Traefik Edge Proxy**, and **Portainer CE**.
  - Quick easter-egg shortcut: Triple-click the brand logo in the navigation bar to navigate to `/hub`.

- 🌓 **Dual-Theme & Accessibility**:
  - Dark mode by default with system preference synchronization and seamless toggle.
  - W3C-aligned editorial typography using **Plus Jakarta Sans** and **JetBrains Mono**.
  - SonarQube-compliant semantic HTML and ARIA accessibility standards.

- 🛡️ **Selective SEO Strategy**:
  - Search engines index only the **Homepage** and **Blog** articles (`/`, `/blog/*`).
  - `/links`, `/hub`, and `/api/*` are strictly protected with `noindex, nofollow` meta tags and `robots.txt` exclusion.

---

## 🛠️ Tech Stack

| Category           | Technology                                                     |
| :----------------- | :------------------------------------------------------------- |
| **Framework**      | [Nuxt 3](https://nuxt.com/) (Vue 3, Nitro Engine, Vite)        |
| **Language**       | [TypeScript](https://www.typescriptlang.org/)                  |
| **Styling**        | [Tailwind CSS](https://tailwindcss.com/), `@nuxtjs/color-mode` |
| **Content Engine** | `@nuxt/content` v2, [Shiki](https://shiki.style/) Highlighter  |
| **Icons & Fonts**  | `@nuxt/icon` (Lucide Icons), `@nuxtjs/google-fonts`            |
| **SEO & Crawler**  | `@nuxtjs/sitemap`, `@nuxtjs/robots`                            |
| **Testing**        | [Vitest](https://vitest.dev/), `@nuxt/test-utils`              |
| **Code Quality**   | ESLint (`@nuxt/eslint`), Prettier, `vue-tsc`                   |
| **Deployment**     | Docker, Docker Compose, Traefik Reverse Proxy                  |

---

## 🚀 Quick Start

### 1. Prerequisites

- **Node.js** >= `20.x`
- **npm** >= `10.x` (or `pnpm` / `bun`)

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/vigarp/vigarp.id.git
cd vigarp.id

# Install dependencies
npm install
```

### 3. Environment Configuration

Copy the template and adjust environment variables:

```bash
cp .env.example .env
```

| Variable                                 | Default Value                     | Description                                   |
| :--------------------------------------- | :-------------------------------- | :-------------------------------------------- |
| `NUXT_PUBLIC_SITE_URL`                   | `https://vigarp.id`               | Canonical production site URL                 |
| `NUXT_PUBLIC_GOOGLE_CALENDAR_DIRECT_URL` | `https://calendar.google.com/...` | Direct URL for Academic Class Calendar        |
| `HUB_SECRET_PASSCODE`                    | `123456`                          | 6-digit passcode for Private Workspace access |
| `HUB_ACTUAL_BUDGET_URL`                  | `https://budget.vigarp.id`        | URL for Actual Budget instance                |
| `HUB_BESZEL_URL`                         | `https://beszel.vigarp.id`        | URL for Beszel Server Monitoring              |
| `HUB_TRAEFIK_URL`                        | `https://traefik.vigarp.id`       | URL for Traefik Ingress Dashboard             |
| `HUB_PORTAINER_URL`                      | `https://portainer.vigarp.id`     | URL for Portainer CE Dashboard                |

### 4. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Code Quality

```bash
# Run unit & component test suite (Vitest)
npm run test

# Run TypeScript typecheck
npm run typecheck

# Lint & automatic fix
npm run lint:fix

# Format code with Prettier
npm run format
```

---

## 📦 Production & Deployment

### Standalone Node.js Build

```bash
# Build production bundle with static prerendering
npm run build

# Preview / run production server
npm run preview
# or: node .output/server/index.mjs
```

### Docker Deployment

```bash
# Build and run containerized server in background
docker compose up -d --build
```

---

## 📂 Project Structure

```txt
vigarp.id/
├── assets/css/            # Global styles and typography resets
├── components/            # Reusable Vue components (Navbar, Footer, Cards, etc.)
│   └── content/           # Nuxt Content custom prose overrides (ProsePre.vue)
├── content/blog/          # Markdown blog articles and metadata
├── layouts/               # Default application layout wrapper
├── pages/                 # File-based routing
│   ├── blog/              # Blog archive and dynamic article reader ([slug].vue)
│   ├── hub.vue            # PIN-authenticated Private Workspace
│   ├── index.vue          # Editorial Homepage & Explore cards
│   └── links.vue          # Public Directory & Academic Calendar
├── server/api/hub/        # Nitro server endpoint for passcode verification & rate limiting
├── tests/                 # Vitest component, unit, and page test suites
├── app.config.ts          # Centralized website & social media configuration
├── nuxt.config.ts         # Nuxt modules, build features, runtimeConfig, and SEO rules
└── package.json           # Scripts and project dependencies
```

---

## 📄 License

Open-source under the [MIT License](LICENSE).

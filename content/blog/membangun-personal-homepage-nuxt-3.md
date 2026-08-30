---
title: "Membangun Personal Homepage Berperforma Tinggi dengan Nuxt 3"
description: "Catatan arsitektur di balik pengembangan vigarp.id menggunakan Nuxt 3, Tailwind CSS, estetika minimalis W3C, dan optimasi Core Web Vitals hingga meraih skor 100 di Lighthouse."
date: "2026-08-28"
readingTime: "5 min read"
tags: ["Nuxt 3", "Tailwind CSS", "Web Performance", "Architecture"]
---

# Membangun Personal Homepage Berperforma Tinggi dengan Nuxt 3

Personal homepage bukan sekadar kartu nama digital, melainkan sebuah ruang kreasi (_digital garden_) di mana ide, eksperimen, dan infrastruktur mandiri bertemu.

## Mengapa Memilih Nuxt 3?

Dalam merancang `vigarp.id`, beberapa kriteria utama menjadi pertimbangan utama:

1. **Full-Stack Flexibility**: Menggabungkan frontend Vue 3 yang reaktif dengan Nitro server engine yang sangat ringan.
2. **Static Prerendering & Edge Readiness**: Halaman dapat di-prerender secara statis sehingga menghasilkan _Time to First Byte (TTFB)_ mendekati 0ms.
3. **Content Module (`@nuxt/content`)**: Mengelola tulisan teknis menggunakan Markdown dan syntax highlighting Shiki tanpa perlu database eksternal yang berat.

## Estetika W3C: Minimalis dan Mengutamakan Konten

Terinspirasi dari desain situs World Wide Web Consortium ([w3.org](https://www.w3.org)), tata letak situs ini menekankan:

- Tipografi bersih menggunakan **Plus Jakarta Sans** dan **JetBrains Mono**.
- Aksen tautan klasik (_blue underline_) yang tegas dan mudah diakses.
- Struktur semantik HTML5 dan rasio kontras WCAG AAA.

```ts
// Nuxt 3 Configuration Highlights
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxt/content", "@nuxtjs/google-fonts"],
  nitro: {
    compressPublicAssets: true,
  },
});
```

## Kesimpulan

Dengan kombinasi prerendering statis dan arsitektur modular, situs ini membuktikan bahwa website modern bisa tetap kaya fitur tanpa mengorbankan kesederhanaan dan kecepatan.

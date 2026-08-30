---
title: "Panduan Self-Hosting Aplikasi Mandiri dengan Docker dan Traefik di VPS"
description: "Bagaimana saya mengelola infrastruktur mandiri untuk Actual Budget, Beszel Monitoring, dan Uptime Kuma menggunakan Traefik reverse proxy dan SSL otomatis di VPS Linux."
date: "2026-08-25"
readingTime: "7 min read"
tags: ["Docker", "Traefik", "Self-Hosted", "Linux", "DevOps"]
---

# Panduan Self-Hosting Aplikasi Mandiri dengan Docker dan Traefik di VPS

Self-hosting memberikan kendali penuh atas data pribadi dan layanan produktivitas kita. Dengan arsitektur yang tepat, memelihara beberapa aplikasi di satu VPS Linux menjadi sangat efisien dan aman.

## Arsitektur Layanan

Infrastruktur mandiri `vigarp.id` terbagi menjadi dua ranah:

1. **Ranah Publik**:
   - `vigarp.id` — Personal Homepage & Blog (Nuxt 3).
   - `status.vigarp.id` — Uptime Kuma monitoring publik.

2. **Ranah Privat**:
   - `actual.vigarp.id` — Actual Budget server untuk pencatatan keuangan pribadi.
   - `beszel.vigarp.id` — Beszel lightweight system & container monitor.

## Mengapa Menggunakan Traefik?

Traefik bekerja sebagai _edge router / reverse proxy_ yang membaca label Docker secara dinamis:

```yaml
services:
  app:
    image: my-app:latest
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.app.rule=Host(`app.vigarp.id`)"
      - "traefik.http.routers.app.tls=true"
      - "traefik.http.routers.app.tls.certresolver=letsencrypt"
```

Setiap kali container baru dinyalakan, Traefik langsung membuatkan sertifikat SSL Let's Encrypt dan merutekan traffic tanpa perlu me-reload konfigurasi manual.

<script setup lang="ts">
const appConfig = useAppConfig();
</script>

<template>
  <div class="space-y-10">
    <!-- Hero / Intro -->
    <section class="space-y-4" aria-labelledby="hero-heading">
      <div class="space-y-1">
        <h1
          id="hero-heading"
          class="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl"
        >
          {{ appConfig.site.name }}
        </h1>
        <p class="text-lg font-medium text-zinc-700 dark:text-zinc-300">
          {{ appConfig.site.tagline }}
        </p>
      </div>

      <p
        class="w-full text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-lg"
      >
        {{ appConfig.site.fullBio }}
      </p>

      <div class="flex flex-wrap items-center gap-3 pt-2">
        <NuxtLink to="/blog" class="btn-pill-primary">
          <span>Read Writings</span>
          <Icon name="lucide:arrow-right" class="h-4 w-4" aria-hidden="true" />
        </NuxtLink>
        <NuxtLink to="/schedule" class="btn-pill">
          <Icon name="lucide:calendar" class="h-4 w-4" aria-hidden="true" />
          <span>Class Schedule</span>
        </NuxtLink>
        <NuxtLink to="/links" class="btn-pill">
          <Icon name="lucide:layers" class="h-4 w-4" aria-hidden="true" />
          <span>Directory & Links</span>
        </NuxtLink>
      </div>
    </section>

    <hr class="border-zinc-200 dark:border-zinc-800/80" aria-hidden="true" >

    <!-- Phase 1 Placeholder -->
    <section class="space-y-3" aria-labelledby="foundation-heading">
      <h2
        id="foundation-heading"
        class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
      >
        Personal Homepage Foundation
      </h2>
      <p class="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        Phase 1 setup complete: Nuxt 3, Tailwind CSS, Color Mode, and
        W3C-inspired typography are initialized and active.
      </p>
    </section>
  </div>
</template>

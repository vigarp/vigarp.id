<script setup lang="ts">
const appConfig = useAppConfig();
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer
    class="mt-auto w-full border-t border-zinc-200 py-8 text-xs text-zinc-600 dark:border-zinc-800/80 dark:text-zinc-400"
  >
    <div
      class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row sm:px-10 lg:px-16"
    >
      <!-- Copyright & Stack -->
      <div
        class="flex flex-col items-center gap-1 text-center sm:flex-row sm:gap-3 sm:text-left"
      >
        <span
          >© {{ currentYear }} {{ appConfig.site.name }} ({{
            appConfig.site.handle
          }})</span
        >
        <span
          class="hidden text-zinc-400 dark:text-zinc-600 sm:inline"
          aria-hidden="true"
          >•</span
        >
        <span class="text-zinc-600 dark:text-zinc-400"
          >Built with Nuxt 3 & Tailwind CSS</span
        >
      </div>

      <!-- Social Links with optimal tap targets and contrast -->
      <div
        class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-zinc-700 dark:text-zinc-300"
      >
        <a
          :href="appConfig.socials.github"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 py-1 transition-colors hover:text-brand-600 dark:hover:text-brand-400"
          aria-label="GitHub Profile (opens in new tab)"
        >
          <Icon name="lucide:github" class="h-4 w-4" aria-hidden="true" />
          <span>GitHub</span>
        </a>
        <a
          :href="appConfig.socials.gists"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 py-1 transition-colors hover:text-brand-600 dark:hover:text-brand-400"
          aria-label="GitHub Gists (opens in new tab)"
        >
          <Icon name="lucide:code-2" class="h-4 w-4" aria-hidden="true" />
          <span>Gists</span>
        </a>
        <a
          :href="appConfig.socials.sId"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 py-1 transition-colors hover:text-brand-600 dark:hover:text-brand-400"
          aria-label="Shortlinks Directory (opens in new tab)"
        >
          <Icon name="lucide:link" class="h-4 w-4" aria-hidden="true" />
          <span>s.id</span>
        </a>
        <a
          :href="appConfig.socials.email"
          class="inline-flex items-center gap-1.5 py-1 transition-colors hover:text-brand-600 dark:hover:text-brand-400"
          aria-label="Send email to Vigar"
        >
          <Icon name="lucide:mail" class="h-4 w-4" aria-hidden="true" />
          <span>Email</span>
        </a>
      </div>
    </div>
  </footer>
</template>

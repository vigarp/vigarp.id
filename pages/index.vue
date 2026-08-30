<script setup lang="ts">
const appConfig = useAppConfig();

useSeoMeta({
  title: `${appConfig.site.title} — ${appConfig.site.name}`,
  description: appConfig.site.description || appConfig.site.shortBio,
  ogTitle: `${appConfig.site.title} — ${appConfig.site.name}`,
  ogDescription: appConfig.site.description || appConfig.site.shortBio,
});

// Query the latest 3 articles from @nuxt/content
const { data: recentArticles } = await useAsyncData("recent-articles", () =>
  queryContent("/blog").sort({ date: -1 }).limit(3).find(),
);
</script>

<template>
  <div class="space-y-16 pb-8">
    <!-- Hero / Editorial Bio Section -->
    <section class="pt-4" aria-label="About">
      <h1 class="sr-only">
        {{ appConfig.site.title }}
      </h1>

      <div
        class="prose prose-zinc max-w-none text-base leading-relaxed text-zinc-700 sm:text-lg dark:text-zinc-300"
      >
        <p>
          Welcome to my digital garden. I design and build resilient web
          applications, distributed systems, and maintain
          <NuxtLink to="/links" class="w3c-link">
            self-hosted infrastructure </NuxtLink
          >.
        </p>
        <p>
          Here, I share technical notes, architecture thoughts, system guides,
          and directories of services running on my personal Linux VPS.
        </p>
      </div>
    </section>

    <!-- W3C Style Subtle Divider -->
    <hr class="border-zinc-200 dark:border-zinc-800" aria-hidden="true" />

    <!-- Recent Writings Section -->
    <section class="space-y-6" aria-labelledby="writings-heading">
      <div class="flex items-center justify-between">
        <h2
          id="writings-heading"
          class="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-100"
        >
          Recent Writings
        </h2>
        <NuxtLink
          to="/blog"
          class="group hidden items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 sm:inline-flex dark:text-brand-400 dark:hover:text-brand-300"
        >
          <span>All writings</span>
          <Icon
            name="lucide:arrow-right"
            class="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </NuxtLink>
      </div>

      <!-- Articles Grid -->
      <div
        v-if="recentArticles && recentArticles.length > 0"
        class="grid gap-4 sm:grid-cols-1 md:grid-cols-3"
      >
        <ArticleCard
          v-for="article in recentArticles"
          :key="article._path"
          :article="article"
        />
      </div>

      <div
        v-else
        class="rounded-xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400"
      >
        No writings published yet.
      </div>

      <div class="pt-2 sm:hidden">
        <NuxtLink
          to="/blog"
          class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400"
        >
          <span>View all writings</span>
          <Icon name="lucide:arrow-right" class="h-4 w-4" aria-hidden="true" />
        </NuxtLink>
      </div>
    </section>

    <!-- W3C Style Subtle Divider -->
    <hr class="border-zinc-200 dark:border-zinc-800" aria-hidden="true" />

    <!-- Explore & Services Directory Section -->
    <section class="space-y-6" aria-labelledby="explore-heading">
      <h2
        id="explore-heading"
        class="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-100"
      >
        Explore
      </h2>

      <div class="grid gap-4 sm:grid-cols-2">
        <!-- Card 1: Public Directory -->
        <NuxtLink
          to="/links"
          class="group rounded-xl border border-zinc-200/80 bg-white p-5 transition-all duration-200 hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
        >
          <div
            class="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
          >
            <Icon name="lucide:layers" class="h-5 w-5" aria-hidden="true" />
          </div>
          <h3
            class="text-base font-bold text-zinc-900 transition-colors group-hover:text-emerald-600 dark:text-zinc-100 dark:group-hover:text-emerald-400"
          >
            Public Directory
          </h3>
          <p
            class="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400"
          >
            Developer profiles, academic calendar, GitHub gists, and curated
            resources.
          </p>
        </NuxtLink>

        <!-- Card 2: Private Workspace -->
        <NuxtLink
          to="/hub"
          class="group rounded-xl border border-zinc-200/80 bg-white p-5 transition-all duration-200 hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
        >
          <div
            class="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          >
            <Icon name="lucide:lock" class="h-5 w-5" aria-hidden="true" />
          </div>
          <h3
            class="text-base font-bold text-zinc-900 transition-colors group-hover:text-brand-600 dark:text-zinc-100 dark:group-hover:text-brand-400"
          >
            Private Workspace
          </h3>
          <p
            class="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400"
          >
            Personal cloud tools and server monitoring dashboards.
          </p>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

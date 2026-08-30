<script setup lang="ts">
interface ArticleSummary {
  _path?: string;
  title?: string;
  description?: string;
}

defineProps<{
  prev?: ArticleSummary | null;
  next?: ArticleSummary | null;
}>();
</script>

<template>
  <nav
    v-if="prev || next"
    aria-label="Adjacent articles navigation"
    class="grid gap-4 pt-6 sm:grid-cols-2"
  >
    <!-- Previous Article Card -->
    <NuxtLink
      v-if="prev && prev._path"
      :to="prev._path"
      class="group flex flex-col justify-between rounded-xl border border-zinc-200/80 bg-white p-4 transition-all duration-200 hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
    >
      <div
        class="mb-2 inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400"
      >
        <Icon
          name="lucide:arrow-left"
          class="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
          aria-hidden="true"
        />
        <span>Previous Article</span>
      </div>
      <span
        class="text-sm font-bold text-zinc-900 transition-colors group-hover:text-brand-600 dark:text-zinc-100 dark:group-hover:text-brand-400"
      >
        {{ prev.title }}
      </span>
    </NuxtLink>
    <div v-else class="hidden sm:block" />

    <!-- Next Article Card -->
    <NuxtLink
      v-if="next && next._path"
      :to="next._path"
      class="group flex flex-col justify-between rounded-xl border border-zinc-200/80 bg-white p-4 text-left transition-all duration-200 hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:hover:border-zinc-700 sm:text-right"
    >
      <div
        class="mb-2 inline-flex items-center justify-start gap-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400 sm:justify-end"
      >
        <span>Next Article</span>
        <Icon
          name="lucide:arrow-right"
          class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </div>
      <span
        class="text-sm font-bold text-zinc-900 transition-colors group-hover:text-brand-600 dark:text-zinc-100 dark:group-hover:text-brand-400"
      >
        {{ next.title }}
      </span>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();

useSeoMeta({
  title: `Command Hub — ${appConfig.site.title}`,
  description: "Private administration hub for self-hosted services.",
  robots: "noindex, nofollow",
});
</script>

<template>
  <div class="space-y-6">
    <div class="space-y-1">
      <h1
        class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
      >
        Private Command Hub
      </h1>
      <p class="text-sm text-zinc-600 dark:text-zinc-400">
        Pusat kontrol dan pintasan layanan pribadi terenkripsi.
      </p>
    </div>
  </div>
</template>

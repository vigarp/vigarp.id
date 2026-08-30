<script setup lang="ts">
const appConfig = useAppConfig();

useSeoMeta({
  title: appConfig.site.title,
  ogTitle: appConfig.site.title,
  description: appConfig.site.shortBio,
  ogDescription: appConfig.site.shortBio,
  ogType: "website",
  ogUrl: "https://vigarp.id",
  twitterCard: "summary_large_image",
  twitterTitle: appConfig.site.title,
  twitterDescription: appConfig.site.shortBio,
});

useHead({
  htmlAttrs: {
    lang: "id",
  },
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: appConfig.site.name,
        url: "https://vigarp.id",
        sameAs: [appConfig.socials.github, appConfig.socials.sId],
        jobTitle: "Software Engineer",
        description: appConfig.site.shortBio,
      }),
    },
  ],
});
</script>

<template>
  <div
    class="flex min-h-screen flex-col bg-stone-50/50 text-zinc-900 transition-colors duration-200 dark:bg-zinc-950 dark:text-zinc-100"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

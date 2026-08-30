<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;

const { data: article } = await useAsyncData(`blog-${slug}`, () =>
  queryContent("blog", slug).findOne(),
);

useSeoMeta({
  title: computed(() =>
    article.value?.title ? `${article.value.title} — vigarp.id` : "Article",
  ),
  description: computed(() => article.value?.description || ""),
});
</script>

<template>
  <div v-if="article" class="space-y-8 pb-12">
    <div class="space-y-3">
      <NuxtLink
        to="/blog"
        class="w3c-link inline-flex items-center gap-1 text-sm font-medium"
      >
        <Icon name="lucide:arrow-left" class="h-4 w-4" aria-hidden="true" />
        <span>Back to all writings</span>
      </NuxtLink>

      <h1
        class="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50"
      >
        {{ article.title }}
      </h1>

      <div
        class="flex flex-wrap items-center gap-2 font-mono text-xs text-zinc-500 dark:text-zinc-400"
      >
        <time v-if="article.date" :datetime="article.date">{{
          article.date
        }}</time>
        <span v-if="article.date && article.readingTime">•</span>
        <span v-if="article.readingTime">{{ article.readingTime }}</span>
      </div>
    </div>

    <hr class="border-zinc-200 dark:border-zinc-800" aria-hidden="true" >

    <div class="prose prose-zinc max-w-none dark:prose-invert">
      <ContentRenderer :value="article" />
    </div>
  </div>

  <div v-else class="py-12 text-center text-zinc-500">Article not found.</div>
</template>

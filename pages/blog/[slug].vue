<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;

// Fetch article content
const { data: article } = await useAsyncData(`blog-${slug}`, () =>
  queryContent("blog", slug).findOne(),
);

// Fetch previous and next articles
const { data: surround } = await useAsyncData(`surround-${slug}`, () =>
  queryContent("blog")
    .only(["_path", "title", "description"])
    .sort({ date: -1 })
    .findSurround(article.value?._path || `/blog/${slug}`),
);

const prevArticle = computed(() => surround.value?.[0] || null);
const nextArticle = computed(() => surround.value?.[1] || null);

useSeoMeta({
  title: computed(() =>
    article.value?.title ? `${article.value.title} — vigarp.id` : "Article",
  ),
  description: computed(() => article.value?.description || ""),
  ogTitle: computed(() =>
    article.value?.title ? `${article.value.title} — vigarp.id` : "Article",
  ),
  ogDescription: computed(() => article.value?.description || ""),
});
</script>

<template>
  <div class="pb-16">
    <article v-if="article" class="space-y-8">
      <!-- Header -->
      <header class="space-y-4 pt-2">
        <NuxtLink
          to="/blog"
          class="w3c-link inline-flex items-center gap-1.5 text-sm font-medium"
        >
          <Icon name="lucide:arrow-left" class="h-4 w-4" aria-hidden="true" />
          <span>Back to all writings</span>
        </NuxtLink>

        <h1
          class="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-zinc-50"
        >
          {{ article.title }}
        </h1>

        <p
          v-if="article.description"
          class="text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400"
        >
          {{ article.description }}
        </p>

        <!-- Metadata & Tags -->
        <div
          class="flex flex-wrap items-center justify-between gap-3 border-y border-zinc-200/80 py-3 font-mono text-xs text-zinc-500 dark:border-zinc-800/80 dark:text-zinc-400"
        >
          <div class="flex flex-wrap items-center gap-2">
            <time v-if="article.date" :datetime="article.date">
              {{ article.date }}
            </time>
            <span v-if="article.date && article.readingTime" aria-hidden="true"
              >•</span
            >
            <span v-if="article.readingTime">
              {{ article.readingTime }}
            </span>
          </div>

          <div
            v-if="article.tags && article.tags.length > 0"
            class="flex flex-wrap gap-1.5"
          >
            <span
              v-for="tag in article.tags"
              :key="tag"
              class="inline-flex items-center rounded-md bg-zinc-100 px-2 py-0.5 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </header>

      <!-- Table of Contents (if 2 or more headings exist) -->
      <TableOfContents
        v-if="article.body?.toc?.links && article.body.toc.links.length > 0"
        :links="article.body.toc.links"
      />

      <!-- Main Markdown Content -->
      <main class="prose prose-zinc max-w-none dark:prose-invert">
        <ContentRenderer :value="article" />
      </main>

      <!-- W3C Style Subtle Divider -->
      <hr class="border-zinc-200 dark:border-zinc-800" aria-hidden="true" >

      <!-- Previous / Next Article Navigation -->
      <PrevNext :prev="prevArticle" :next="nextArticle" />
    </article>

    <!-- Fallback / Not Found -->
    <div v-else class="py-16 text-center">
      <h2 class="text-xl font-bold text-zinc-900 dark:text-zinc-100">
        Article not found
      </h2>
      <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        The writing you are looking for might have been moved or deleted.
      </p>
      <NuxtLink to="/blog" class="btn-pill mt-6">
        Back to all writings
      </NuxtLink>
    </div>
  </div>
</template>

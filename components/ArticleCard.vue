<script setup lang="ts">
interface ArticleProps {
  title?: string;
  description?: string;
  date?: string;
  readingTime?: string;
  tags?: string[];
  _path?: string;
}

const props = defineProps<{
  article: ArticleProps;
}>();

const formattedDate = computed(() => {
  if (!props.article.date) return "";
  try {
    const d = new Date(props.article.date);
    return d.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return props.article.date;
  }
});
</script>

<template>
  <article
    class="group relative rounded-xl border border-zinc-200/80 bg-white p-5 transition-all duration-200 hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
  >
    <div
      class="mb-2.5 flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400"
    >
      <time v-if="article.date" :datetime="article.date" class="font-mono">
        {{ formattedDate }}
      </time>
      <span v-if="article.date && article.readingTime" aria-hidden="true"
        >•</span
      >
      <span v-if="article.readingTime" class="font-mono">
        {{ article.readingTime }}
      </span>
    </div>

    <h3
      class="text-lg font-bold tracking-tight text-zinc-900 transition-colors group-hover:text-brand-600 dark:text-zinc-100 dark:group-hover:text-brand-400"
    >
      <NuxtLink :to="article._path || '#'" class="focus:outline-none">
        <span class="absolute inset-0" aria-hidden="true" />
        {{ article.title }}
      </NuxtLink>
    </h3>

    <p
      v-if="article.description"
      class="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
    >
      {{ article.description }}
    </p>

    <div
      v-if="article.tags && article.tags.length > 0"
      class="relative z-10 mt-4 flex flex-wrap gap-1.5"
    >
      <span
        v-for="tag in article.tags"
        :key="tag"
        class="inline-flex items-center rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
      >
        #{{ tag }}
      </span>
    </div>
  </article>
</template>

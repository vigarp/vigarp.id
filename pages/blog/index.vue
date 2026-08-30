<script setup lang="ts">
const appConfig = useAppConfig();

useSeoMeta({
  title: `Writings & Notes — ${appConfig.site.title}`,
  description:
    "Technical writings, system architecture notes, and software engineering explorations.",
  ogTitle: `Writings & Notes — ${appConfig.site.title}`,
  ogDescription:
    "Technical writings, system architecture notes, and software engineering explorations.",
});

// Query all blog articles sorted by newest first
const { data: articles } = await useAsyncData("all-blog-articles", () =>
  queryContent("/blog").sort({ date: -1 }).find(),
);

const searchQuery = ref("");
const selectedTag = ref("All");

// Extract unique tags from articles
const allTags = computed(() => {
  if (!articles.value) return ["All"];
  const tagSet = new Set<string>();
  articles.value.forEach((art) => {
    if (Array.isArray(art.tags)) {
      art.tags.forEach((t: string) => tagSet.add(t));
    }
  });
  return ["All", ...Array.from(tagSet)];
});

// Filter articles based on search query and selected tag
const filteredArticles = computed(() => {
  if (!articles.value) return [];

  return articles.value.filter((art) => {
    const matchesTag =
      selectedTag.value === "All" ||
      (Array.isArray(art.tags) && art.tags.includes(selectedTag.value));

    const query = searchQuery.value.toLowerCase().trim();
    const matchesSearch =
      !query ||
      art.title?.toLowerCase().includes(query) ||
      art.description?.toLowerCase().includes(query) ||
      (Array.isArray(art.tags) &&
        art.tags.some((t: string) => t.toLowerCase().includes(query)));

    return matchesTag && matchesSearch;
  });
});

function clearFilters() {
  searchQuery.value = "";
  selectedTag.value = "All";
}
</script>

<template>
  <div class="space-y-10 pb-12">
    <!-- Header -->
    <header class="space-y-3 pt-4">
      <h1
        class="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50"
      >
        Writings
      </h1>
      <p class="text-base text-zinc-700 sm:text-lg dark:text-zinc-300">
        Articles, architecture notes, and technical essays.
      </p>
    </header>

    <!-- Controls: Search Input & Tag Filter Pills -->
    <div class="space-y-4">
      <!-- Search Input -->
      <div class="relative max-w-md">
        <div
          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400"
        >
          <Icon name="lucide:search" class="h-4 w-4" aria-hidden="true" />
        </div>
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search writings by keyword or tag..."
          class="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100 dark:placeholder-zinc-500"
          aria-label="Search writings"
        />
        <button
          v-if="searchQuery"
          type="button"
          class="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          aria-label="Clear search query"
          @click="searchQuery = ''"
        >
          <Icon name="lucide:x" class="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <!-- Tag Filter Pills -->
      <fieldset v-if="allTags.length > 1" class="m-0 border-0 p-0">
        <legend class="sr-only">Filter writings by topic</legend>
        <div class="flex flex-wrap items-center gap-1.5 pt-1">
          <button
            v-for="tag in allTags"
            :key="tag"
            type="button"
            :class="[
              selectedTag === tag
                ? 'bg-brand-600 text-white dark:bg-brand-500'
                : 'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:bg-zinc-800',
              'rounded-full px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/30',
            ]"
            :aria-pressed="selectedTag === tag"
            @click="selectedTag = tag"
          >
            {{ tag === "All" ? "All Topics" : `#${tag}` }}
          </button>
        </div>
      </fieldset>
    </div>

    <!-- W3C Style Subtle Divider -->
    <hr class="border-zinc-200 dark:border-zinc-800" aria-hidden="true" />

    <!-- Articles Grid -->
    <div
      v-if="filteredArticles.length > 0"
      class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      <ArticleCard
        v-for="article in filteredArticles"
        :key="article._path"
        :article="article"
      />
    </div>

    <!-- Empty Search State -->
    <div
      v-else
      class="rounded-xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-800"
    >
      <div
        class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 dark:bg-zinc-800"
      >
        <Icon name="lucide:search-x" class="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 class="mt-4 text-base font-bold text-zinc-900 dark:text-zinc-100">
        No writings found
      </h3>
      <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        No articles matched your query "{{ searchQuery }}"{{
          selectedTag !== "All" ? ` in #${selectedTag}` : ""
        }}.
      </p>
      <button type="button" class="btn-pill mt-4" @click="clearFilters">
        Clear filters
      </button>
    </div>
  </div>
</template>

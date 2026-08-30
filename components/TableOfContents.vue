<script setup lang="ts">
interface TocLink {
  id: string;
  text: string;
  depth: number;
  children?: TocLink[];
}

defineProps<{
  links: TocLink[];
}>();
</script>

<template>
  <nav
    v-if="links && links.length > 0"
    aria-label="Table of contents"
    class="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 text-sm dark:border-zinc-800/80 dark:bg-zinc-900/40"
  >
    <div
      class="mb-3 flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100"
    >
      <Icon
        name="lucide:list"
        class="h-4 w-4 text-brand-600 dark:text-brand-400"
        aria-hidden="true"
      />
      <span>Table of Contents</span>
    </div>

    <ul class="space-y-2 text-zinc-600 dark:text-zinc-400">
      <li v-for="link in links" :key="link.id" class="space-y-1.5">
        <a
          :href="`#${link.id}`"
          class="inline-block transition-colors hover:text-brand-600 dark:hover:text-brand-400"
        >
          {{ link.text }}
        </a>

        <!-- Sub-headings (h3) -->
        <ul
          v-if="link.children && link.children.length > 0"
          class="ml-4 space-y-1.5 border-l border-zinc-200 pl-3 dark:border-zinc-800"
        >
          <li v-for="child in link.children" :key="child.id">
            <a
              :href="`#${child.id}`"
              class="inline-block text-xs transition-colors hover:text-brand-600 dark:hover:text-brand-400"
            >
              {{ child.text }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

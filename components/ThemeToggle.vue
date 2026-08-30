<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

function toggleTheme() {
  isDark.value = !isDark.value;
}
</script>

<template>
  <button
    type="button"
    aria-label="Toggle color theme"
    title="Toggle color theme"
    class="inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-200/70 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-50"
    @click="toggleTheme"
  >
    <ClientOnly>
      <Icon
        v-if="colorMode.value === 'dark'"
        name="lucide:sun"
        class="h-4 w-4"
        aria-hidden="true"
      />
      <Icon v-else name="lucide:moon" class="h-4 w-4" aria-hidden="true" />
      <template #fallback>
        <span class="inline-block h-4 w-4" aria-hidden="true" />
      </template>
    </ClientOnly>
  </button>
</template>

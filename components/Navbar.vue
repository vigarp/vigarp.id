<script setup lang="ts">
const router = useRouter();
const clickCount = ref(0);
let clickTimer: ReturnType<typeof setTimeout> | null = null;

function handleLogoClick() {
  clickCount.value++;
  if (clickTimer) clearTimeout(clickTimer);

  if (clickCount.value >= 3) {
    clickCount.value = 0;
    router.push("/hub");
    return;
  }

  clickTimer = setTimeout(() => {
    clickCount.value = 0;
  }, 1000);
}

const navLinks = [
  { name: "Blog", path: "/blog" },
  { name: "Schedule", path: "/schedule" },
  { name: "Links", path: "/links" },
];
</script>

<template>
  <header
    class="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/90"
  >
    <div
      class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-10 lg:px-16"
    >
      <!-- Brand Logo / Name -->
      <div class="flex items-center gap-3">
        <NuxtLink
          to="/"
          class="group inline-flex items-center gap-2.5 py-1 text-lg font-bold tracking-tight text-zinc-900 transition-colors hover:text-brand-600 dark:text-zinc-100 dark:hover:text-brand-400"
          aria-label="vigarp.id Homepage"
          @click="handleLogoClick"
        >
          <span
            aria-hidden="true"
            class="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 font-mono text-xs font-bold text-white transition-colors group-hover:bg-brand-600 dark:bg-zinc-100 dark:text-zinc-900 dark:group-hover:bg-brand-400"
          >
            v
          </span>
          <span
            >vigarp<span class="text-brand-600 dark:text-brand-400"
              >.id</span
            ></span
          >
        </NuxtLink>
      </div>

      <!-- Navigation Links & Theme Toggle -->
      <nav
        aria-label="Main Navigation"
        class="flex items-center gap-2 sm:gap-4 text-sm font-medium"
      >
        <NuxtLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="inline-flex items-center rounded-md px-3 py-2 text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
          active-class="!text-brand-600 dark:!text-brand-400 !font-semibold bg-zinc-100/80 dark:bg-zinc-900/80"
        >
          {{ link.name }}
        </NuxtLink>

        <div
          class="mx-1 h-4 w-px bg-zinc-200 dark:bg-zinc-800"
          aria-hidden="true"
        />

        <ThemeToggle />
      </nav>
    </div>
  </header>
</template>

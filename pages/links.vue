<script setup lang="ts">
const appConfig = useAppConfig();
const config = useRuntimeConfig();

useSeoMeta({
  title: `Public Directory — ${appConfig.site.title}`,
  robots: "noindex, nofollow",
});

interface LinkItem {
  title: string;
  description: string;
  url: string;
  icon: string;
  category: string;
  badge: string;
  isExternal: boolean;
}

const publicLinks = computed<LinkItem[]>(() => [
  {
    title: "Class Schedule (UNPAM 20261)",
    description:
      "Academic course timetable, weekly lecture schedule, and calendar feed.",
    url:
      (config.public.googleCalendarDirectUrl as string) ||
      "https://calendar.google.com",
    icon: "lucide:calendar-days",
    category: "Academic & Schedule",
    badge: "Google Calendar",
    isExternal: true,
  },
  {
    title: "GitHub Profile",
    description:
      "Open source repositories, software experiments, and code contributions.",
    url: appConfig.socials.github,
    icon: "lucide:github",
    category: "Code & Development",
    badge: "github.com/vigarp",
    isExternal: true,
  },
  {
    title: "GitHub Gists",
    description:
      "Code snippets, server configuration files, and utility shell scripts.",
    url: appConfig.socials.gists,
    icon: "lucide:code-2",
    category: "Code & Development",
    badge: "gist.github.com/vigarp",
    isExternal: true,
  },
  {
    title: "s.id Shortlinks Directory",
    description:
      "Curated collection of personal shortlinks, digital bookmarks, and shared resources.",
    url: appConfig.socials.sId,
    icon: "lucide:link",
    category: "Shortlinks & Bookmarks",
    badge: "s.id/vigarp",
    isExternal: true,
  },
  {
    title: "Email Contact",
    description:
      "Direct inbox for collaborations, technical inquiries, and project discussions.",
    url: appConfig.socials.email,
    icon: "lucide:mail",
    category: "Contact",
    badge: "me@vigarp.id",
    isExternal: false,
  },
]);
</script>

<template>
  <div class="space-y-10 pb-12">
    <!-- Header -->
    <header class="space-y-3 pt-4">
      <h1
        class="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50"
      >
        Public Directory
      </h1>
      <p class="text-base text-zinc-700 sm:text-lg dark:text-zinc-300">
        Developer profiles, academic calendar, GitHub gists, and curated
            resources.
      </p>
    </header>

    <!-- W3C Style Subtle Divider -->
    <hr class="border-zinc-200 dark:border-zinc-800" aria-hidden="true" >

    <!-- Links Grid -->
    <div class="grid gap-4 sm:grid-cols-2">
      <a
        v-for="link in publicLinks"
        :key="link.title"
        :href="link.url"
        :target="link.isExternal ? '_blank' : undefined"
        :rel="link.isExternal ? 'noopener noreferrer' : undefined"
        class="group flex flex-col justify-between rounded-xl border border-zinc-200/90 bg-white p-5 transition-all duration-200 hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800/90 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
      >
        <div>
          <div class="mb-3 flex items-center justify-between">
            <div
              class="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              <Icon :name="link.icon" class="h-5 w-5" aria-hidden="true" />
            </div>

            <span
              class="inline-flex items-center gap-1 font-mono text-xs text-zinc-500 group-hover:text-brand-600 dark:text-zinc-400 dark:group-hover:text-brand-400"
            >
              <span class="truncate max-w-[140px] sm:max-w-[180px]">{{
                link.badge
              }}</span>
              <Icon
                v-if="link.isExternal"
                name="lucide:external-link"
                class="h-3.5 w-3.5 shrink-0"
                aria-hidden="true"
              />
            </span>
          </div>

          <h2
            class="text-base font-bold text-zinc-900 transition-colors group-hover:text-brand-600 dark:text-zinc-100 dark:group-hover:text-brand-400"
          >
            {{ link.title }}
          </h2>

          <p
            class="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400"
          >
            {{ link.description }}
          </p>
        </div>

        <div class="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/60">
          <span
            class="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400"
          >
            <span>Visit link</span>
            <Icon
              name="lucide:arrow-right"
              class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </a>
    </div>

    <!-- Private Workspace Banner -->
    <div
      class="flex flex-col items-start justify-between gap-4 rounded-xl border border-zinc-200/90 bg-zinc-50/80 p-5 sm:flex-row sm:items-center dark:border-zinc-800 dark:bg-zinc-900/60"
    >
      <div class="flex items-start gap-3.5">
        <div
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-200/70 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
        >
          <Icon name="lucide:lock" class="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h2 class="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Private Workspace
          </h2>
          <p class="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
            Personal cloud tools and server monitoring dashboards.
          </p>
        </div>
      </div>

      <NuxtLink
        to="/hub"
        class="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-xs font-bold text-zinc-800 shadow-sm transition-all hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
      >
        <span>Authenticate</span>
        <Icon
          name="lucide:arrow-right"
          class="h-3.5 w-3.5"
          aria-hidden="true"
        />
      </NuxtLink>
    </div>
  </div>
</template>

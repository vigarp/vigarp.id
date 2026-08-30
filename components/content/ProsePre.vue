<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    code?: string;
    language?: string;
    filename?: string;
    highlights?: number[];
    meta?: string;
    class?: string;
  }>(),
  {
    code: "",
    language: "",
    filename: "",
    highlights: () => [],
    meta: "",
    class: "",
  },
);

const copied = ref(false);
let copyTimeout: ReturnType<typeof setTimeout> | null = null;

async function copyCode() {
  if (!props.code) return;

  try {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    if (copyTimeout) clearTimeout(copyTimeout);
    copyTimeout = setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch {
    // Fallback if clipboard API fails
  }
}
</script>

<template>
  <div
    class="group relative my-6 overflow-hidden rounded-xl border border-zinc-200 bg-[#f6f8fa] dark:border-zinc-800 dark:bg-[#0d1117]"
  >
    <!-- Code Header Bar (Language / Filename & Copy Button) -->
    <div
      class="flex h-10 items-center justify-between border-b border-zinc-200/80 bg-zinc-100/90 px-4 text-xs font-mono text-zinc-600 dark:border-zinc-800/80 dark:bg-zinc-900/90 dark:text-zinc-400"
    >
      <span class="flex items-center gap-1.5 font-medium">
        <span
          class="inline-block h-2 w-2 rounded-full bg-zinc-400 dark:bg-zinc-600"
          aria-hidden="true"
        />
        <span>{{ filename || language || "code" }}</span>
      </span>

      <!-- Copy Button -->
      <button
        type="button"
        class="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-200/70 hover:text-zinc-900 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
        :aria-label="
          copied ? 'Copied code to clipboard' : 'Copy code to clipboard'
        "
        @click="copyCode"
      >
        <Icon
          :name="copied ? 'lucide:check' : 'lucide:copy'"
          class="h-3.5 w-3.5"
          :class="copied ? 'text-emerald-600 dark:text-emerald-400' : ''"
          aria-hidden="true"
        />
        <span>{{ copied ? "Copied!" : "Copy" }}</span>
      </button>
    </div>

    <!-- Code Block Content -->
    <pre
      :class="[
        props.class,
        'overflow-x-auto p-4 font-mono text-sm leading-relaxed text-zinc-800 dark:text-zinc-200',
      ]"
    ><slot /></pre>
  </div>
</template>

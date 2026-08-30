<script setup lang="ts">
import type { HubServiceItem } from "~/server/api/hub/verify.post";

const appConfig = useAppConfig();

useSeoMeta({
  title: `Private Workspace — ${appConfig.site.title}`,
  robots: "noindex, nofollow",
});

const isAuthenticated = ref(false);
const pin = ref("");
const services = ref<HubServiceItem[]>([]);
const isLoading = ref(false);
const errorMessage = ref("");
const isShaking = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

const PIN_LENGTH = 6;

// Auto check session on mount
onMounted(() => {
  if (import.meta.client) {
    const cachedServices = sessionStorage.getItem("vigarp_hub_services");
    if (cachedServices) {
      try {
        services.value = JSON.parse(cachedServices);
        isAuthenticated.value = true;
        return;
      } catch {
        sessionStorage.removeItem("vigarp_hub_services");
      }
    }
    focusInput();
  }
});

function focusInput() {
  nextTick(() => {
    inputRef.value?.focus();
  });
}

async function handleVerify(pinToVerify: string) {
  if (pinToVerify.length !== PIN_LENGTH || isLoading.value) return;

  isLoading.value = true;
  errorMessage.value = "";

  try {
    const response = await $fetch<{
      success: boolean;
      services: HubServiceItem[];
    }>("/api/hub/verify", {
      method: "POST",
      body: { pin: pinToVerify },
    });

    if (response.success && response.services) {
      services.value = response.services;
      isAuthenticated.value = true;
      pin.value = "";
      if (import.meta.client) {
        sessionStorage.setItem(
          "vigarp_hub_services",
          JSON.stringify(response.services),
        );
      }
    }
  } catch (err: unknown) {
    pin.value = "";
    isShaking.value = true;
    setTimeout(() => {
      isShaking.value = false;
    }, 500);

    const fetchErr = err as {
      data?: { statusMessage?: string };
      statusMessage?: string;
      message?: string;
    };
    errorMessage.value =
      fetchErr?.data?.statusMessage ||
      fetchErr?.statusMessage ||
      fetchErr?.message ||
      "Invalid passcode. Access denied.";

    focusInput();
  } finally {
    isLoading.value = false;
  }
}

function appendDigit(digit: string) {
  if (pin.value.length < PIN_LENGTH) {
    pin.value += digit;
    if (pin.value.length === PIN_LENGTH) {
      handleVerify(pin.value);
    }
  }
}

function handleBackspace() {
  if (pin.value.length > 0) {
    pin.value = pin.value.slice(0, -1);
    errorMessage.value = "";
  }
}

function clearPin() {
  pin.value = "";
  errorMessage.value = "";
  focusInput();
}

function handleKeydown(event: KeyboardEvent) {
  if (isAuthenticated.value) return;

  if (event.key >= "0" && event.key <= "9") {
    event.preventDefault();
    appendDigit(event.key);
  } else if (event.key === "Backspace") {
    event.preventDefault();
    handleBackspace();
  } else if (event.key === "Escape") {
    clearPin();
  }
}

function lockWorkspace() {
  isAuthenticated.value = false;
  services.value = [];
  pin.value = "";
  errorMessage.value = "";
  if (import.meta.client) {
    sessionStorage.removeItem("vigarp_hub_services");
  }
  focusInput();
}
</script>

<template>
  <div class="pb-12" @keydown="handleKeydown">
    <!-- Unlocked State: Private Workspace Dashboard -->
    <div v-if="isAuthenticated" class="space-y-8 animate-fadeIn">
      <!-- Header -->
      <header class="flex flex-wrap items-center justify-between gap-4 pt-4">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <h1
              class="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50"
            >
              Private Workspace
            </h1>
            <span
              class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
            >
              <span
                class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"
              />
              Authenticated
            </span>
          </div>
          <p class="text-sm text-zinc-600 dark:text-zinc-400">
            Personal cloud tools and server monitoring dashboards.
          </p>
        </div>

        <!-- Lock Button -->
        <button
          type="button"
          class="btn-pill hover:!border-rose-300 hover:!bg-rose-50 hover:!text-rose-700 dark:hover:!border-rose-900/60 dark:hover:!bg-rose-950/40 dark:hover:!text-rose-400"
          aria-label="Lock Private Workspace and end session"
          @click="lockWorkspace"
        >
          <Icon name="lucide:lock-keyhole" class="h-4 w-4" aria-hidden="true" />
          <span>Lock Workspace</span>
        </button>
      </header>

      <!-- W3C Style Subtle Divider -->
      <hr class="border-zinc-200 dark:border-zinc-800" aria-hidden="true" />

      <!-- Private Services Grid -->
      <div class="grid gap-4 sm:grid-cols-2">
        <a
          v-for="service in services"
          :key="service.id"
          :href="service.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex flex-col justify-between rounded-xl border border-zinc-200/90 bg-white p-5 transition-all duration-200 hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800/90 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
        >
          <div>
            <div class="mb-3 flex items-center justify-between">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
              >
                <Icon :name="service.icon" class="h-5 w-5" aria-hidden="true" />
              </div>

              <span
                class="inline-flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-xs text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-400"
              >
                {{ service.statusBadge }}
              </span>
            </div>

            <span
              class="font-mono text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400"
            >
              {{ service.category }}
            </span>

            <h2
              class="mt-1 text-base font-bold text-zinc-900 transition-colors group-hover:text-brand-600 dark:text-zinc-100 dark:group-hover:text-brand-400"
            >
              {{ service.title }}
            </h2>

            <p
              class="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400"
            >
              {{ service.description }}
            </p>
          </div>

          <div
            class="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800/60"
          >
            <span
              class="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400"
            >
              <span>Launch Dashboard</span>
              <Icon
                name="lucide:external-link"
                class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
            <span class="font-mono text-xs text-zinc-400 dark:text-zinc-500">
              HTTPS TLS
            </span>
          </div>
        </a>
      </div>
    </div>

    <!-- Locked State: PIN Entry Keypad -->
    <div
      v-else
      class="mx-auto flex max-w-sm flex-col items-center justify-center pt-8 sm:pt-14"
    >
      <!-- Invisible Input to Capture Physical Keyboard and Mobile Autofill -->
      <input
        ref="inputRef"
        type="password"
        inputmode="numeric"
        pattern="[0-9]*"
        maxlength="6"
        :value="pin"
        class="sr-only"
        aria-label="Enter 6-digit access passcode"
        autocomplete="off"
        @input="
          (e) => {
            const val = (e.target as HTMLInputElement).value.replace(/\D/g, '');
            pin = val.slice(0, PIN_LENGTH);
            if (pin.length === PIN_LENGTH) handleVerify(pin);
          }
        "
      />

      <div
        class="w-full space-y-6 rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800/90 dark:bg-zinc-900/80"
        :class="{ 'animate-shake': isShaking }"
        @click="focusInput"
      >
        <!-- Icon & Title -->
        <div class="flex flex-col items-center text-center">
          <div
            class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
          >
            <Icon name="lucide:lock" class="h-6 w-6" aria-hidden="true" />
          </div>
          <h1
            class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
          >
            Private Workspace
          </h1>
          <p class="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Enter the 6-digit access passcode to unlock.
          </p>
        </div>

        <!-- 6-Digit Visual Indicator Dots -->
        <fieldset
          class="m-0 flex items-center justify-center gap-3 border-0 p-0 py-2"
          aria-label="Passcode digits entered"
        >
          <legend class="sr-only">Passcode digits entered</legend>
          <div
            v-for="index in PIN_LENGTH"
            :key="index"
            class="flex h-10 w-10 items-center justify-center rounded-xl border font-mono text-lg font-bold transition-all duration-150"
            :class="[
              pin.length >= index
                ? 'border-brand-500 bg-brand-50/50 text-brand-600 shadow-sm dark:border-brand-400 dark:bg-brand-950/40 dark:text-brand-400'
                : 'border-zinc-200 bg-zinc-50 text-transparent dark:border-zinc-800 dark:bg-zinc-900/50',
              pin.length === index - 1 && !isLoading
                ? 'ring-2 ring-brand-500/30 dark:ring-brand-400/30'
                : '',
            ]"
          >
            <span v-if="pin.length >= index">•</span>
          </div>
        </fieldset>

        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="rounded-lg bg-rose-50 px-3 py-2 text-center text-xs font-medium text-rose-700 dark:bg-rose-950/40 dark:text-rose-400"
          role="alert"
        >
          {{ errorMessage }}
        </div>

        <!-- Loading State -->
        <div
          v-if="isLoading"
          class="flex items-center justify-center gap-2 py-1 text-xs text-zinc-500 dark:text-zinc-400"
        >
          <Icon
            name="lucide:loader-2"
            class="h-4 w-4 animate-spin text-brand-600 dark:text-brand-400"
            aria-hidden="true"
          />
          <span>Authenticating passcode...</span>
        </div>

        <!-- Virtual Keypad -->
        <div class="grid grid-cols-3 gap-2 pt-2">
          <button
            v-for="num in ['1', '2', '3', '4', '5', '6', '7', '8', '9']"
            :key="num"
            type="button"
            class="flex h-12 items-center justify-center rounded-xl border border-zinc-200/80 bg-zinc-50/70 font-mono text-base font-semibold text-zinc-800 transition-all hover:bg-zinc-100 active:scale-95 dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:text-zinc-200 dark:hover:bg-zinc-800"
            :disabled="isLoading"
            @click.stop="appendDigit(num)"
          >
            {{ num }}
          </button>

          <!-- Clear / Escape -->
          <button
            type="button"
            class="flex h-12 items-center justify-center rounded-xl border border-zinc-200/80 bg-zinc-50/70 text-xs font-medium text-zinc-500 transition-all hover:bg-zinc-100 active:scale-95 dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:text-zinc-400 dark:hover:bg-zinc-800"
            :disabled="isLoading"
            aria-label="Clear passcode"
            @click.stop="clearPin"
          >
            Clear
          </button>

          <!-- 0 -->
          <button
            type="button"
            class="flex h-12 items-center justify-center rounded-xl border border-zinc-200/80 bg-zinc-50/70 font-mono text-base font-semibold text-zinc-800 transition-all hover:bg-zinc-100 active:scale-95 dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:text-zinc-200 dark:hover:bg-zinc-800"
            :disabled="isLoading"
            @click.stop="appendDigit('0')"
          >
            0
          </button>

          <!-- Backspace -->
          <button
            type="button"
            class="flex h-12 items-center justify-center rounded-xl border border-zinc-200/80 bg-zinc-50/70 text-zinc-600 transition-all hover:bg-zinc-100 active:scale-95 dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:text-zinc-400 dark:hover:bg-zinc-800"
            :disabled="isLoading"
            aria-label="Delete last digit"
            @click.stop="handleBackspace"
          >
            <Icon name="lucide:delete" class="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20%,
  60% {
    transform: translateX(-8px);
  }
  40%,
  80% {
    transform: translateX(8px);
  }
}

.animate-shake {
  animation: shake 0.4s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>

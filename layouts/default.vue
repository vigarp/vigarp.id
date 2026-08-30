<template>
  <div class="flex min-h-screen flex-col">
    <!-- Accessible Skip to Main Content Link -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none"
    >
      Skip to main content
    </a>

    <Navbar />
    <main
      id="main-content"
      class="mx-auto w-full max-w-6xl flex-1 px-6 py-12 sm:px-10 sm:py-16 lg:px-16"
    >
      <slot />
    </main>
    <Footer />
  </div>
</template>

<template>
  <header
    class="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-8"
  >
    <NuxtLink to="/" class="font-black hover:text-[#A555EC] transition">
      ← Exit Case
    </NuxtLink>

    <div class="flex flex-wrap gap-3 text-sm font-black">
      <div
        class="border-2 border-black bg-white px-4 py-2 shadow-[3px_3px_0px_#000]"
      >
        Time: {{ formattedTime }}
      </div>

      <div
        class="border-2 border-black bg-white px-4 py-2 shadow-[3px_3px_0px_#000]"
      >
        Score: {{ score }}
      </div>

      <div
        class="border-2 border-black bg-white px-4 py-2 shadow-[3px_3px_0px_#000]"
      >
        Streak: {{ streak }}
      </div>

      <div
        class="border-2 border-black bg-white px-4 py-2 shadow-[3px_3px_0px_#000]"
      >
        Case {{ currentIndex + 1 }} / {{ totalRounds }}
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  score: Number,
  streak: Number,
  currentIndex: Number,
  totalRounds: Number,
  formattedTime: String,
});
</script>

<template>
  <section
    class="max-w-3xl mx-auto border-2 border-black bg-[#FFF8B8] p-6 md:p-10 shadow-[6px_6px_0px_#000] md:shadow-[10px_10px_0px_#000] text-center"
  >
    <p class="text-[#A555EC] font-black uppercase mb-3">Case Closed</p>

    <h1 class="text-4xl md:text-6xl font-black mb-4">
      {{ resultTitle }}
    </h1>

    <div class="mx-auto mb-6 h-1 w-28 bg-black"></div>

    <p class="text-xl md:text-2xl font-black mb-2">
      Investigation Score: {{ score }} / {{ totalRounds }}
    </p>

    <p class="text-neutral-700 mb-8">
      You identified {{ score }} out of {{ totalRounds }} suspicious images.
    </p>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      <StatCard :value="`${accuracyPercent}%`" label="Accuracy" />
      <StatCard :value="score" label="Caught" />
      <StatCard :value="formattedTime" label="Time" />
      <StatCard :value="totalRounds - score" label="Escaped" />
    </div>

    <div
      class="border-2 border-black bg-white p-5 text-neutral-700 mb-8 shadow-[4px_4px_0px_#000]"
    >
      <p class="text-xs font-black uppercase text-[#A555EC] mb-2">
        Detective Report
      </p>

      <p>{{ resultMessage }}</p>
    </div>

    <div
      class="border-2 border-black bg-white p-5 mb-8 shadow-[4px_4px_0px_#000]"
    >
      <p class="text-xs font-black uppercase text-[#A555EC] mb-3">
        Investigation Log
      </p>

      <div class="flex justify-center flex-wrap gap-2 text-sm font-black">
        <div
          v-for="(result, index) in results"
          :key="index"
          class="border-2 border-black px-3 py-2"
          :class="result ? 'bg-green-200 text-black' : 'bg-red-200 text-black'"
        >
          Case {{ index + 1 }}
          {{ result ? "✓" : "✕" }}
        </div>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        @click="$emit('restart')"
        class="border-2 border-black bg-black text-white px-7 py-3 font-black uppercase shadow-[4px_4px_0px_#A555EC] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#A555EC] transition"
      >
        Reopen Case
      </button>

      <button
        type="button"
        @click="$emit('share')"
        class="border-2 border-black bg-[#A555EC] text-white px-7 py-3 font-black uppercase shadow-[4px_4px_0px_#000]"
      >
        Share Report
      </button>

      <NuxtLink
        to="/"
        class="border-2 border-black bg-white text-black px-7 py-3 font-black uppercase shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] transition"
      >
        Case Files
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
defineProps({
  resultTitle: String,
  score: Number,
  totalRounds: Number,
  accuracyPercent: Number,
  formattedTime: String,
  resultMessage: String,
  results: Array,
});

defineEmits(["restart", "share"]);
</script>

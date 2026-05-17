<template>
  <section
    v-if="hasSelected"
    class="mt-6 border-2 border-black bg-white p-5 md:p-6 shadow-[5px_5px_0px_#000]"
  >
    <h2
      class="text-3xl font-black mb-3"
      :class="isCorrect ? 'text-green-600' : 'text-red-600'"
    >
      {{ isCorrect ? "Correct" : "Wrong" }}
    </h2>

    <p class="text-neutral-700 mb-3">
      The AI-generated image was
      <span class="font-black text-black">Image {{ correctAnswer }}</span
      >.
    </p>

    <p class="text-neutral-700 mb-6">
      {{ explanation }}
    </p>

    <button
      @click="$emit('next')"
      class="border-2 border-black bg-black text-white px-7 py-3 font-black uppercase shadow-[4px_4px_0px_#A555EC] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#A555EC] transition"
    >
      {{ isLastRound ? "Finish Game" : "Next Case" }}
    </button>
  </section>
</template>

<script setup>
defineProps({
  hasSelected: Boolean,
  isCorrect: Boolean,
  correctAnswer: String,
  explanation: String,
  isLastRound: Boolean,
});

defineEmits(["next"]);
</script>

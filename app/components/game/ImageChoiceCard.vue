<template>
  <button
    @click="$emit('choose', side)"
    :disabled="hasSelected"
    class="group relative border-2 border-black bg-white p-3 text-left transition disabled:cursor-not-allowed"
    :class="cardClass"
  >
    <img
      :src="image"
      class="w-full h-[280px] md:h-[440px] object-cover border-2 border-black transition duration-300 group-hover:scale-[1.01]"
    />

    <p class="mt-3 font-black uppercase">Image {{ side }}</p>

    <div
      v-if="hasSelected && correctAnswer === side"
      class="absolute top-5 left-5 bg-green-500 text-white border-2 border-black px-4 py-2 font-black"
    >
      AI GENERATED
    </div>
    <button
      v-if="isPending"
      class="mt-4 w-full border-2 border-black bg-[#A555EC] px-4 py-3 font-black uppercase text-white shadow-[4px_4px_0px_#000]"
      @click.stop="$emit('confirm')"
    >
      Confirm Choice
    </button>
  </button>
</template>

<script setup>
defineProps({
  image: String,
  side: String,
  hasSelected: Boolean,
  isPending: Boolean,
  cardClass: String,
});

defineEmits(["choose", "confirm"]);
</script>

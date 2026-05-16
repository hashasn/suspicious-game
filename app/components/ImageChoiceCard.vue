<script setup lang="ts">
defineProps<{
  image: string;
  label: string;
  disabled: boolean;
}>();

defineEmits<{
  select: [];
}>();
</script>

<template>
  <button
    :disabled="disabled"
    @click="$emit('select')"
    class="group relative overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-emerald-400 transition disabled:cursor-not-allowed"
  >
    <img
      :src="image"
      class="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500"
    />

    <div
      class="absolute top-4 left-4 px-4 py-2 rounded-full bg-black/60 backdrop-blur text-white text-sm"
    >
      {{ label }}
    </div>
  </button>
</template>

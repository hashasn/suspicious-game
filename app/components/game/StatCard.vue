<template>
  <div class="border-2 border-black bg-white p-4 shadow-[3px_3px_0px_#000]">
    <p class="text-2xl font-black">{{ value }}</p>
    <p class="text-xs font-bold uppercase text-neutral-500">{{ label }}</p>
  </div>
</template>

<script setup>
defineProps({
  value: [String, Number],
  label: String,
});
</script>

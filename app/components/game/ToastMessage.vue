<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed top-6 left-1/2 -translate-x-1/2 z-[99999] border-2 border-black bg-black text-white px-6 py-3 font-black uppercase tracking-wide shadow-[4px_4px_0px_#A555EC]"
      >
        {{ message }}
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  show: Boolean,
  message: String,
});
</script>

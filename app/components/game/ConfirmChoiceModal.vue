<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="show"
        class="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 px-4"
      >
        <div
          class="w-full max-w-md border-2 border-black bg-[#FFF8B8] p-6 shadow-[10px_10px_0px_#000]"
        >
          <p
            class="mb-3 inline-block border-2 border-black bg-[#A555EC] px-3 py-1 text-xs font-black uppercase text-white rotate-[-2deg]"
          >
            Evidence Review
          </p>

          <h2 class="text-4xl font-black mb-4">Lock in suspect?</h2>

          <p class="text-neutral-700 mb-6">
            You are about to mark
            <span class="font-black text-black">Image {{ pendingChoice }}</span>
            as the AI-generated image. Once submitted, this case cannot be
            changed.
          </p>

          <div class="flex flex-col sm:flex-row gap-3">
            <button
              @click="$emit('cancel')"
              class="flex-1 border-2 border-black bg-white px-5 py-3 font-black uppercase shadow-[4px_4px_0px_#000]"
            >
              Review Again
            </button>

            <button
              @click="$emit('confirm')"
              class="flex-1 border-2 border-black bg-black px-5 py-3 font-black uppercase text-white shadow-[4px_4px_0px_#A555EC]"
            >
              Lock In
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  show: Boolean,
  pendingChoice: String,
});

defineEmits(["cancel", "confirm"]);
</script>

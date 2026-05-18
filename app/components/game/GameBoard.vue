<template>
  <section
    class="border-2 border-black bg-[#FFF8B8] p-4 md:p-8 shadow-[6px_6px_0px_#000] md:shadow-[10px_10px_0px_#000]"
  >
    <div class="mb-8">
      <div
        class="flex justify-between items-center mb-3 text-sm font-black uppercase"
      >
        <p class="text-[#A555EC]">
          Case No. {{ currentRound.id.toString().padStart(3, "0") }}
        </p>

        <p>{{ currentRound.category }} · {{ currentRound.difficulty }}</p>
      </div>

      <div class="h-3 border-2 border-black bg-white">
        <div
          class="h-full bg-[#A555EC] transition-all duration-500 ease-out"
          :style="{ width: progressPercent + '%' }"
        ></div>
      </div>

      <h1 class="text-3xl md:text-5xl font-black tracking-tight mt-6">
        Pick the suspicious image
      </h1>
    </div>

    <div class="grid md:grid-cols-2 gap-5 md:gap-6">
      <GameImageChoiceCard
        side="A"
        :image="displayedRound.imageA"
        :has-selected="hasSelected"
        :is-pending="pendingChoice === 'A'"
        :correct-answer="displayedRound.correctAnswer"
        :card-class="cardClassA"
        @choose="$emit('choose', $event)"
        @confirm="$emit('confirm')"
      />

      <GameImageChoiceCard
        side="B"
        :image="displayedRound.imageB"
        :has-selected="hasSelected"
        :is-pending="pendingChoice === 'B'"
        :correct-answer="displayedRound.correctAnswer"
        :card-class="cardClassB"
        @choose="$emit('choose', $event)"
        @confirm="$emit('confirm')"
      />
    </div>
  </section>
</template>

<script setup>
defineProps({
  currentRound: Object,
  displayedRound: Object,
  hasSelected: Boolean,
  progressPercent: Number,
  cardClassA: String,
  cardClassB: String,
  pendingChoice: String,
});

defineEmits(["choose", "confirm"]);
</script>

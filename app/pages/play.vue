<template>
  <main class="min-h-screen bg-[#FFFFD0] text-black px-5 py-8">
    <section
      v-if="gameFinished"
      class="border-2 border-black bg-white p-8 shadow-[10px_10px_0px_#000] text-center"
    >
      <p class="text-[#A555EC] font-black uppercase mb-3">Case Closed</p>

      <h1 class="text-4xl md:text-6xl font-black mb-4">
        Final Score: {{ score }} / {{ rounds.length }}
      </h1>

      <p class="text-neutral-600 mb-8">
        You correctly identified {{ score }} suspicious images.
      </p>

      <button
        @click="restartGame"
        class="border-2 border-black bg-black text-white px-7 py-3 font-black uppercase shadow-[5px_5px_0px_#A555EC]"
      >
        Play Again
      </button>
    </section>
    <div v-else class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <NuxtLink to="/" class="font-bold hover:text-[#A555EC] transition">
          ← Exit
        </NuxtLink>

        <div class="flex gap-3 text-sm font-bold">
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
        </div>
      </div>

      <section
        class="border-2 border-black bg-[#FFF8B8] p-5 md:p-8 shadow-[10px_10px_0px_#000]"
      >
        <div class="flex justify-between items-start mb-8">
          <div>
            <p class="text-[#A555EC] font-black uppercase">
              Case No. {{ currentRound.id.toString().padStart(3, "0") }}
            </p>
            <h1 class="text-3xl md:text-5xl font-black tracking-tight mt-2">
              Pick the suspicious image
            </h1>
          </div>

          <div class="hidden md:block text-right text-sm font-bold">
            <p>{{ currentRound.category }}</p>
            <p>{{ currentRound.difficulty }}</p>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <button
            @click="chooseImage('A')"
            :disabled="hasSelected"
            class="relative border-2 border-black bg-white p-3 text-left transition disabled:cursor-not-allowed"
            :class="{
              'shadow-[6px_6px_0px_#000] hover:-translate-y-1': !hasSelected,
              'border-green-500': hasSelected && currentRound.aiImage === 'A',
              'border-red-500': hasSelected && selected === 'A' && !isCorrect,
            }"
          >
            <img
              :src="currentRound.imageA"
              class="w-full h-[320px] md:h-[440px] object-cover border-2 border-black"
            />
            <p class="mt-3 font-black uppercase">Image A</p>

            <div
              v-if="hasSelected && currentRound.aiImage === 'A'"
              class="absolute top-5 left-5 bg-green-500 text-white border-2 border-black px-4 py-2 font-black"
            >
              AI GENERATED
            </div>
          </button>

          <button
            @click="chooseImage('B')"
            :disabled="hasSelected"
            class="relative border-2 border-black bg-white p-3 text-left transition disabled:cursor-not-allowed"
            :class="{
              'shadow-[6px_6px_0px_#000] hover:-translate-y-1': !hasSelected,
              'border-green-500': hasSelected && currentRound.aiImage === 'B',
              'border-red-500': hasSelected && selected === 'B' && !isCorrect,
            }"
          >
            <img
              :src="currentRound.imageB"
              class="w-full h-[320px] md:h-[440px] object-cover border-2 border-black"
            />
            <p class="mt-3 font-black uppercase">Image B</p>

            <div
              v-if="hasSelected && currentRound.aiImage === 'B'"
              class="absolute top-5 left-5 bg-green-500 text-white border-2 border-black px-4 py-2 font-black"
            >
              AI GENERATED
            </div>
          </button>
        </div>
      </section>

      <section
        v-if="hasSelected"
        class="mt-8 border-2 border-black bg-white p-6 shadow-[6px_6px_0px_#000]"
      >
        <h2
          class="text-3xl font-black mb-3"
          :class="isCorrect ? 'text-green-600' : 'text-red-600'"
        >
          {{ isCorrect ? "Correct." : "Wrong." }}
        </h2>

        <p class="text-neutral-700 mb-6">
          {{ currentRound.explanation }}
        </p>

        <button
          @click="nextRound"
          class="border-2 border-black bg-black text-white px-7 py-3 font-black uppercase shadow-[5px_5px_0px_#A555EC] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#A555EC] transition"
        >
          {{ isLastRound ? "Finish Game" : "Next Case" }}
        </button>
      </section>
    </div>
  </main>
</template>

<script setup>
import { rounds } from "~/data/rounds";

const score = ref(0);
const streak = ref(0);
const currentIndex = ref(0);
const selected = ref(null);
const gameFinished = ref(false);

const currentRound = computed(() => rounds[currentIndex.value]);
const hasSelected = computed(() => selected.value !== null);
const isCorrect = computed(() => selected.value === currentRound.value.aiImage);
const isLastRound = computed(() => currentIndex.value === rounds.length - 1);

function chooseImage(choice) {
  if (hasSelected.value) return;

  selected.value = choice;

  if (choice === currentRound.value.aiImage) {
    score.value++;
    streak.value++;
  } else {
    streak.value = 0;
  }
}

function nextRound() {
  if (isLastRound.value) {
    // currentIndex.value = 0;
    // score.value = 0;
    // streak.value = 0;
    gameFinished.value = true;
  }
  currentIndex.value++;
  selected.value = null;
}

function restartGame() {
  currentIndex.value = 0;
  score.value = 0;
  streak.value = 0;
  selected.value = null;
  gameFinished.value = false;
}
</script>

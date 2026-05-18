<template>
  <main
    class="min-h-screen bg-[#FFFFD0] text-black px-4 py-8 overflow-x-hidden"
  >
    <GameFinishedCase
      v-if="gameFinished"
      :result-title="resultTitle"
      :score="score"
      :total-rounds="caseRounds.length"
      :accuracy-percent="accuracyPercent"
      :formatted-time="formattedTime"
      :result-message="resultMessage"
      :results="results"
      @restart="restartGame"
      @share="shareResult"
    />

    <div v-else-if="displayedRound" class="max-w-6xl mx-auto">
      <GameHeader
        :score="score"
        :streak="streak"
        :current-index="currentIndex"
        :total-rounds="caseRounds.length"
        :formatted-time="formattedTime"
      />

      <GameBoard
        :current-round="currentRound"
        :displayed-round="displayedRound"
        :has-selected="hasSelected"
        :pending-choice="pendingChoice"
        :progress-percent="progressPercent"
        :card-class-a="cardClass('A')"
        :card-class-b="cardClass('B')"
        @choose="chooseImage"
        @confirm="confirmChoice"
      />

      <GameResultPanel
        :has-selected="hasSelected"
        :is-correct="isCorrect"
        :correct-answer="displayedRound.correctAnswer"
        :explanation="currentRound.explanation"
        :is-last-round="isLastRound"
        @next="nextRound"
      />
    </div>

    <!-- <GameConfirmChoiceModal
      :show="showConfirmModal"
      :pending-choice="pendingChoice"
      @cancel="cancelChoice"
      @confirm="confirmChoice"
    /> -->

    <GameBriefingModal :show="showBriefing" @close="closeBriefing" />

    <GameToastMessage :show="showToast" :message="toastMessage" />
  </main>
</template>

<script setup>
definePageMeta({
  key: (route) => route.fullPath,
});
const route = useRoute();
const { todaysCase, getCaseById } = useCases();

// const selectedCase = computed(() => {
//   const caseId = Number(route.params.caseId);
//   return getCaseById(caseId) || todaysCase.value;
// });
const selectedCase = computed(() => {
  const caseId = route.params.caseId;
  return getCaseById(caseId);
});

if (!selectedCase.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Case not found",
  });
}
// console.log(route.params.caseId);
// console.log(selectedCase.value);
// const storageKey = computed(() => {
//   return `suspicious-save-case-${selectedCase.value.id}`;
// });

const caseRounds = computed(() => {
  return selectedCase.value.rounds;
});

const gameFinished = ref(false);

const { elapsedSeconds, formattedTime, startTimer, stopTimer } =
  useGameTimer(gameFinished);

// const { leaderboard, latestRank, saveLeaderboardResult } = useLeaderboard();
const game = useGameState({
  caseRounds,
  elapsedSeconds,
  startTimer,
  stopTimer,
  // storageKey,
});

gameFinished.value = game.gameFinished.value;

watch(game.gameFinished, (value) => {
  gameFinished.value = value;
});

const {
  score,
  streak,
  currentIndex,
  displayedRound,
  results,
  pendingChoice,
  showConfirmModal,
  currentRound,
  hasSelected,
  isLastRound,
  isCorrect,
  progressPercent,
  accuracyPercent,
  resultTitle,
  resultMessage,
  chooseImage,
  cancelChoice,
  confirmChoice,
  nextRound,
  restartGame,
  cardClass,
} = game;

const { showToast, toastMessage, triggerToast } = useToast();

const { shareResult } = useShareResult({
  todaysCase: selectedCase,
  caseRounds,
  score,
  results,
  formattedTime,
  resultTitle,
  triggerToast,
});

const showBriefing = ref(false);

onMounted(() => {
  const briefingSeen = localStorage.getItem("suspicious-briefing-seen");

  if (!briefingSeen) {
    showBriefing.value = true;
  }
});

function closeBriefing() {
  showBriefing.value = false;
  localStorage.setItem("suspicious-briefing-seen", "true");
}
</script>

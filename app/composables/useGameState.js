export function useGameState({
  caseRounds,
  elapsedSeconds,
  startTimer,
  stopTimer,
  storageKey = "suspicious-save",
}) {
  const score = ref(0);
  const streak = ref(0);
  const currentIndex = ref(0);
  const selected = ref(null);
  const gameFinished = ref(false);
  const displayedRound = ref(null);
  const results = ref([]);

  const pendingChoice = ref(null);
  const showConfirmModal = ref(false);

  const isRestoring = ref(false);

  const currentRound = computed(() => {
    return caseRounds.value[currentIndex.value];
  });

  const hasSelected = computed(() => selected.value !== null);

  const isLastRound = computed(() => {
    return currentIndex.value === caseRounds.value.length - 1;
  });

  const isCorrect = computed(() => {
    return selected.value === displayedRound.value?.correctAnswer;
  });

  const progressPercent = computed(() => {
    return ((currentIndex.value + 1) / caseRounds.value.length) * 100;
  });

  const accuracyPercent = computed(() => {
    return Math.round((score.value / caseRounds.value.length) * 100);
  });

  const resultTitle = computed(() => {
    const percent = score.value / caseRounds.value.length;
    const time = elapsedSeconds.value;

    if (percent === 1 && time <= 90) return "Elite Detective";
    if (percent === 1) return "Master Detective";
    if (percent >= 0.85) return "Sharp Investigator";
    if (percent >= 0.7) return "Case Solver";
    if (percent >= 0.5) return "Rookie Detective";
    return "Easily Fooled";
  });

  const resultMessage = computed(() => {
    const percent = score.value / caseRounds.value.length;

    if (percent === 1) {
      return "Perfect investigation. Every AI-generated image was correctly exposed.";
    }

    if (percent >= 0.75) {
      return "Strong detective work. Most of the suspicious images were caught before they slipped through.";
    }

    if (percent >= 0.5) {
      return "A decent investigation. Some fakes were exposed, but a few managed to escape detection.";
    }

    return "The evidence fooled you this time. Look closer at lighting, textures, reflections, and strange details.";
  });

  function prepareRound() {
    const round = currentRound.value;
    if (!round) return;

    const aiOnA = Math.random() < 0.5;

    displayedRound.value = {
      imageA: aiOnA ? round.aiImage : round.realImage,
      imageB: aiOnA ? round.realImage : round.aiImage,
      correctAnswer: aiOnA ? "A" : "B",
    };
  }

  function resetGame() {
    score.value = 0;
    streak.value = 0;
    currentIndex.value = 0;
    selected.value = null;
    gameFinished.value = false;
    displayedRound.value = null;
    results.value = [];
    elapsedSeconds.value = 0;

    prepareRound();
  }

  function resetState() {
    score.value = 0;
    streak.value = 0;
    currentIndex.value = 0;
    selected.value = null;
    gameFinished.value = false;
    displayedRound.value = null;
    results.value = [];
    elapsedSeconds.value = 0;
    pendingChoice.value = null;
    showConfirmModal.value = false;

    prepareRound();
  }

  function saveGame() {
    if (isRestoring.value) return;

    localStorage.setItem(
      unref(storageKey),
      JSON.stringify({
        score: score.value,
        streak: streak.value,
        currentIndex: currentIndex.value,
        selected: selected.value,
        gameFinished: gameFinished.value,
        displayedRound: displayedRound.value,
        results: results.value,
        elapsedSeconds: elapsedSeconds.value,
      }),
    );
  }

  function loadGameForCurrentCase() {
    isRestoring.value = true;

    const saved = localStorage.getItem(unref(storageKey));

    if (saved) {
      const data = JSON.parse(saved);

      score.value = data.score ?? 0;
      streak.value = data.streak ?? 0;
      currentIndex.value = data.currentIndex ?? 0;
      selected.value = data.selected ?? null;
      gameFinished.value = data.gameFinished ?? false;
      displayedRound.value = data.displayedRound ?? null;
      results.value = data.results ?? [];
      elapsedSeconds.value = data.elapsedSeconds ?? 0;

      if (!displayedRound.value) {
        prepareRound();
      }
    } else {
      resetState();
    }

    nextTick(() => {
      isRestoring.value = false;
    });
  }

  function preloadImage(src) {
    const img = new Image();
    img.src = src;
  }

  function preloadRound(index) {
    const round = caseRounds.value[index];
    if (!round) return;

    preloadImage(round.realImage);
    preloadImage(round.aiImage);
  }

  function chooseImage(choice) {
    if (hasSelected.value) return;

    pendingChoice.value = choice;
    // showConfirmModal.value = true;
  }

  function cancelChoice() {
    pendingChoice.value = null;
    showConfirmModal.value = false;
  }

  function confirmChoice() {
    if (!pendingChoice.value || hasSelected.value) return;

    selected.value = pendingChoice.value;
    showConfirmModal.value = false;

    if (selected.value === displayedRound.value.correctAnswer) {
      score.value++;
      streak.value++;
      results.value.push(true);
    } else {
      streak.value = 0;
      results.value.push(false);
    }

    pendingChoice.value = null;
    preloadRound(currentIndex.value + 1);
  }

  async function nextRound() {
    if (isLastRound.value) {
      gameFinished.value = true;
      stopTimer();

      await nextTick();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    currentIndex.value++;
    selected.value = null;

    prepareRound();
    preloadRound(currentIndex.value + 1);

    await nextTick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function restartGame() {
    localStorage.removeItem(unref(storageKey));

    resetState();

    stopTimer();
    startTimer();
  }

  function cardClass(side) {
    if (!hasSelected.value) {
      return "shadow-[5px_5px_0px_#000] hover:-translate-y-1";
    }

    if (displayedRound.value?.correctAnswer === side) {
      return "border-green-500 shadow-[5px_5px_0px_#22C55E]";
    }

    if (selected.value === side && !isCorrect.value) {
      return "border-red-500 shadow-[5px_5px_0px_#EF4444]";
    }

    return "opacity-70";
  }

  onMounted(() => {
    preloadRound(0);
    preloadRound(1);

    resetGame();

    startTimer();
  });

  onUnmounted(() => {
    resetGame();
    stopTimer();
  });

  watch(
    () => unref(storageKey),
    () => {
      stopTimer();

      loadGameForCurrentCase();

      if (!gameFinished.value) {
        startTimer();
      }
    },
  );

  watch(
    [
      score,
      streak,
      currentIndex,
      selected,
      gameFinished,
      displayedRound,
      results,
      elapsedSeconds,
    ],
    saveGame,
    { deep: true },
  );

  return {
    score,
    streak,
    currentIndex,
    selected,
    gameFinished,
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
  };
}

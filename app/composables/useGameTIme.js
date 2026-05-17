export function useGameTimer(gameFinished) {
  const elapsedSeconds = ref(0);
  const timerInterval = ref(null);

  const formattedTime = computed(() => {
    const minutes = Math.floor(elapsedSeconds.value / 60);
    const seconds = elapsedSeconds.value % 60;

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  });

  function startTimer() {
    if (timerInterval.value) return;

    timerInterval.value = setInterval(() => {
      if (!gameFinished.value) {
        elapsedSeconds.value++;
      }
    }, 1000);
  }

  function stopTimer() {
    if (!timerInterval.value) return;

    clearInterval(timerInterval.value);
    timerInterval.value = null;
  }

  onUnmounted(() => {
    stopTimer();
  });

  return {
    elapsedSeconds,
    formattedTime,
    startTimer,
    stopTimer,
  };
}

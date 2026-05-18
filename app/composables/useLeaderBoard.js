export function useLeaderboard() {
  const leaderboard = ref([]);
  const latestEntryId = ref(null);

  function loadLeaderboard() {
    leaderboard.value = JSON.parse(
      localStorage.getItem("suspicious-leaderboard") || "[]",
    );
  }

  function sortLeaderboard(entries) {
    return entries.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.timeSeconds - b.timeSeconds;
    });
  }

  function saveLeaderboardResult({
    todaysCase,
    score,
    totalRounds,
    accuracy,
    timeSeconds,
    timeFormatted,
    rankTitle,
  }) {
    const entry = {
      id: crypto.randomUUID(),
      caseId: todaysCase.id,
      caseDate: todaysCase.date,
      caseTitle: todaysCase.title,
      score,
      totalRounds,
      accuracy,
      timeSeconds,
      timeFormatted,
      rankTitle,
      completedAt: new Date().toISOString(),
    };

    const saved = JSON.parse(
      localStorage.getItem("suspicious-leaderboard") || "[]",
    );

    const updated = sortLeaderboard([...saved, entry]).slice(0, 20);

    localStorage.setItem("suspicious-leaderboard", JSON.stringify(updated));

    leaderboard.value = updated;
    latestEntryId.value = entry.id;
  }

  const latestRank = computed(() => {
    if (!latestEntryId.value) return null;

    const index = leaderboard.value.findIndex(
      (entry) => entry.id === latestEntryId.value,
    );

    return index === -1 ? null : index + 1;
  });

  onMounted(() => {
    loadLeaderboard();
  });

  return {
    leaderboard,
    latestRank,
    loadLeaderboard,
    saveLeaderboardResult,
  };
}

export function useShareResult({
  todaysCase,
  caseRounds,
  score,
  results,
  formattedTime,
  resultTitle,
  triggerToast,
}) {
  const shareGrid = computed(() => {
    return results.value.map((result) => (result ? "🟩" : "🟥")).join("");
  });

  const shareText = computed(() => {
    return `Suspicious Case #${todaysCase.value.id.toString().padStart(3, "0")}
${shareGrid.value}
Score: ${score.value}/${caseRounds.value.length}
Time: ${formattedTime.value}
Rank: ${resultTitle.value}

Can you spot the fake?`;
  });

  async function shareResult() {
    const text = `${shareText.value}\n${window.location.href}`;

    try {
      await navigator.clipboard.writeText(text);
      triggerToast("Results copied");
    } catch {
      triggerToast("Unable to share");
    }
  }

  return {
    shareText,
    shareGrid,
    shareResult,
  };
}

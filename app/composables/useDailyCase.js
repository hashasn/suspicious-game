import { rounds } from "~/data/rounds";

export function useDailyCase() {
  const today = new Date();

  const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}/${today.getFullYear()}`;

  const todaysCase = computed(() => {
    return (
      rounds.find((caseFile) => caseFile.date === formattedDate) || rounds[0]
    );
  });

  const caseRounds = computed(() => {
    return todaysCase.value.rounds;
  });

  return {
    todaysCase,
    caseRounds,
  };
}

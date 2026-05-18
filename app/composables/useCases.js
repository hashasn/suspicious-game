import { rounds } from "~/data/rounds";

export function useCases() {
  const today = new Date();

  const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}/${today.getFullYear()}`;

  const allCases = computed(() => rounds);

  const todaysCase = computed(() => {
    return (
      rounds.find((caseFile) => caseFile.date === formattedDate) || rounds[0]
    );
  });

  const archivedCases = computed(() => {
    return rounds.filter((caseFile) => caseFile.date !== formattedDate);
  });

  function getCaseById(id) {
    return rounds.find((caseFile) => String(caseFile.id) === String(id));
  }

  return {
    allCases,
    todaysCase,
    archivedCases,
    getCaseById,
  };
}

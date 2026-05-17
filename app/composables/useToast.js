export function useToast() {
  const showToast = ref(false);
  const toastMessage = ref("");

  function triggerToast(message) {
    toastMessage.value = message;
    showToast.value = true;

    setTimeout(() => {
      showToast.value = false;
    }, 2000);
  }

  return {
    showToast,
    toastMessage,
    triggerToast,
  };
}

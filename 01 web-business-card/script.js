const card = document.querySelector(".business-card");
const toast = document.querySelector(".toast");
const copyButtons = document.querySelectorAll("[data-copy]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy;

    try {
      await navigator.clipboard.writeText(value);
      showToast(`${value} 복사 완료!`);
    } catch {
      showToast("복사하지 못했어요. 다시 시도해 주세요.");
    }
  });
});

card.addEventListener("pointermove", (event) => {
  if (reduceMotion.matches || window.innerWidth <= 760) return;

  const bounds = card.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;

  card.style.transform = `perspective(1200px) rotateX(${-y * 2.5}deg) rotateY(${x * 2.5}deg)`;
});

card.addEventListener("pointerleave", () => {
  card.style.transform = "";
});

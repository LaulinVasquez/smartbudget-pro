document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".flash-messages");

    if (!container) return;

    setTimeout(() => {
        container.remove();
    }, 5000);
});
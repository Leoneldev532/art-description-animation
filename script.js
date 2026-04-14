window.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    let currentIndex = 0;
    let prevIndex = 0;

    const sections = document.querySelectorAll(".reveal-slide");
    const images = document.querySelectorAll(".slide-bg-image");
    const cards = document.querySelectorAll(".slide-card");
    const next = document.querySelector(".nav-next");
    const prev = document.querySelector(".nav-prev");

    // ─── Setup initial state ───────────────────────────────────────────────
    gsap.set(sections, {
        zIndex: (x) => -x + 1,
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        transformOrigin: "center",
    });
    gsap.set(sections[0], {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    });

    // ─── Navigation ────────────────────────────────────────────────────────
    next.addEventListener("click", () => {
        prevIndex = currentIndex;
        currentIndex = (currentIndex + 1) % cards.length;
        RevealAnimations.transitionAnimation(cards, sections, prevIndex, currentIndex, "forward");
        RevealAnimations.animateCard(cards, images, currentIndex);
    });

    prev.addEventListener("click", () => {
        prevIndex = currentIndex;
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        RevealAnimations.transitionAnimation(cards, sections, prevIndex, currentIndex, "backward");
        RevealAnimations.animateCard(cards, images, currentIndex);
    });

    // ─── Init ──────────────────────────────────────────────────────────────
    RevealAnimations.animateCard(cards, images, 0);
});
window.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    let currentIndex = 0;
    let prevIndex = 0;

    const sections = document.querySelectorAll(".section");
    const images = document.querySelectorAll(".card-img");
    const cards    = document.querySelectorAll(".card");
    const next     = document.querySelector(".next");
    const prev     = document.querySelector(".prev");

    // ─── Setup initial state ───────────────────────────────────────────────
    gsap.set(sections, {
        zIndex: (x) => -x + 1,
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        transformOrigin: "center",
    });
    gsap.set(sections[0], {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    });

    // ─── Helpers ───────────────────────────────────────────────────────────
    const getNodeData = (index) => {
        const titleSection = cards[index].querySelector(".title-section");
        const split = new SplitText(titleSection, { type: "chars" });
        return { titleSection, chars: split.chars };
    };

    // ─── Card entrance animation ───────────────────────────────────────────
    const animateCard = (index) => {
        const { titleSection, chars } = getNodeData(index);

        chars.forEach((char) => {
            gsap.set(char, {
                position: "absolute",
                y: Math.random() * 500 - 100,
                x: Math.random() * 1000,
                opacity: 1,
            });
        });

        const tl = gsap.timeline();

        tl.from(cards[index], { scale: 0.3, opacity: 0, duration: 1.5 })
          .to(cards[index], { duration: 0.5, ease: "expo.out" })
          .to(cards[index], {
              clipPath: "inset(21% 19% 16% 17%)",
              duration: 1.2,
              ease: "expo.inOut",
          })
          .to(titleSection, { opacity: 1, duration: 0.1, ease: "expo.out" }, "-=1.5")
          .to(chars, { position: "relative", y: 0, x: 0, duration: 1.5, ease: "expo.inOut" }, "<")
          .to(images[index], {
                delay: 0.2,
                filter: "grayscale(100%)",
                duration: 1.2,
                ease: "expo.inOut",
            }, "-=0.5")
          .to(cards[index], {
              delay: 0.1,
              filter: "grayscale(0%)",
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1,
              ease: "sine.inOut",
          }, "-=0.5");
    };

    // ─── Transition between sections ──────────────────────────────────────
    const transitionAnimation = (prev, current, direction) => {
        const { chars: charsPrev } = getNodeData(prev);
        const goingForward = direction === "forward";
        const tl = gsap.timeline();

        tl.to(cards[prev], {
            delay: 0.2,
            ease: "expo.inOut",
            onComplete: () => {
                charsPrev.forEach((char) => {
                    gsap.to(char, {
                        position: "absolute",
                        y: -Math.random() * 500 - 100,
                        x: -Math.random() * 1000,
                        duration: 0.7,
                        ease: "expo.inOut",
                    });
                });
            },
        }, "-=1.5");

        const others = Array.from(sections).filter((_, idx) => idx !== current);

        if (goingForward) {
            tl.to(others, {
                delay: 0.2,
                clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                transformOrigin: "center",
                duration: 1.2,
            }, "-=0.5")
            .to(sections[current], {
                delay: 0.2,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                transformOrigin: "center",
                duration:  1,
            }, "-=1.2")
        } else {
            tl.to(others, {
                delay: 0.2,
                clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
                transformOrigin: "center",
                duration:  1,
            }, "-=0.5")
            .to(sections[current], {
                delay: 0.2,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                transformOrigin: "center",
                duration:  1,
            }, "-=1");
        }
    };

    // ─── Navigation ────────────────────────────────────────────────────────
    next.addEventListener("click", () => {
        prevIndex    = currentIndex;
        currentIndex = (currentIndex + 1) % cards.length;
        transitionAnimation(prevIndex, currentIndex, "forward");
        animateCard(currentIndex);
    });

    prev.addEventListener("click", () => {
        prevIndex    = currentIndex;
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        transitionAnimation(prevIndex, currentIndex, "backward");
        animateCard(currentIndex);
    });

    // ─── Init ──────────────────────────────────────────────────────────────
    animateCard(0);
});
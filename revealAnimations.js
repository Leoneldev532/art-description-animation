

window.RevealAnimations = {

    getNodeData: function(cards, index) {
        const titleSection = cards[index].querySelector(".slide-title");
        const split = new SplitText(titleSection, { type: "chars" });
        return { titleSection, chars: split.chars };
    },

    animateCard: function(cards, images, index) {
        const { titleSection, chars } = this.getNodeData(cards, index);

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
                filter: "grayscale(100%)",
                duration: 1.2,
                ease: "expo.inOut",
            }, "-=0.5")
          .to(cards[index], {
              delay: 0.1,
              filter: "grayscale(0%)",
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.8,
              ease: "expo.inOut",
          }, "-=0.5");

        return tl;
    },

    // Transition between slides
    transitionAnimation: function(cards, sections, prev, current, direction) {
        const { chars: charsPrev } = this.getNodeData(cards, prev);
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
                delay: 0.5,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                transformOrigin: "center",
                duration: 1,
            }, "-=1.2")
        } else {
            tl.to(others, {
                delay: 0.2,
                clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
                transformOrigin: "center",
                duration: 1,
            }, "-=0.5")
            .to(sections[current], {
                delay: 0.5,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                transformOrigin: "center",
                duration: 1,
            }, "-=1");
        }

        return tl;
    }
};
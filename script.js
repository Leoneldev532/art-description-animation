
window.addEventListener("DOMContentLoaded", function () {

    gsap.registerPlugin(ScrollTrigger);
    let currentIndex = 0;

    const cardTexts = [
        "Explore our new feature set designed to help teams collaborate faster and stay organized in real time.",
        "Discover powerful analytics and insights that transform raw data into clear actions and measurable growth.",
        "Streamline your workflow with automated tasks, smart notifications, and effortless integration across tools.",
        "Bring your ideas to life with polished templates, easy customization, and responsive layouts for every device.",
        "Stay ahead with secure performance, instant updates, and a unified dashboard built for modern work."
    ]
    
    const cards = document.querySelectorAll(".card");
    const titleSection = document.querySelector(".title-section");



    // gsap.set(cards, { opacity: 0 });

    // cards.forEach((card) => {

    //     tl.fromTo(card, {
    //         y: 100, opacity: 0,
    //     }, {
    //         opacity: 1,
    //         y: 0,
    //         scrollTrigger: {
    //             trigger: card,
    //             start: "top 80%",
    //             end: "+=200",
    //             markers: true,
    //             toggleActions: "play none none reverse",
    //             // pin: true
    //         }

    //     }, "-=0.5");


    // })


    // const colors = [
    //     "#FFFFFF",
    //     "#000000"
        
    // ]


    const caracterTitle = document.querySelector(".caracter-title");


    const caracdispacch = new SplitText(caracterTitle, { type: "chars" });

    caracdispacch.chars.forEach((char, index) => {
        gsap.set(char, { 
        position: "absolute",
      
        // backgroundColor: colors[index % colors.length],
        y:Math.random() * 200 - 100,
        x:Math.random() * 700 ,
        opacity:1
     });
    });

    gsap.to(caracdispacch.chars, {
        position: "relative",
        delay:0.9,
        duration: 1.5,
          ease:"power4.out",
        y: 0,
        x: 0,  
    }).to(caracdispacch.chars, {
        //  position: "absolute",
        y:Math.random() * 200 - 100,
        x:Math.random() * 200 ,
        opacity:1
    });

    


    const tl =  gsap.timeline({ scrollTrigger: {
        trigger: ".all-card",
        start: "top top",
        bottom: `+=${cards.length * 2000}`,
        pin:true,
        pinSpacing:true,
        anticipatePin:1,
        toggleActions:"play none none reverse"
       
    }});

   

      cards.forEach((card,index) => {

       tl.fromTo(card,{
            y: index * 150,
            opacity: 0,
            onComplete: () => {
                currentIndex = (currentIndex % cards.length) - 1;
                titleSection.textContent = cardTexts[currentIndex - 1];
            }
       }, {
           y:0,
            opacity:1,
            scrollTrigger: {
                trigger: card,
                start: "top 40%",
                end: `+=${index}00`,
                scrub: 1,
                markers: true,
                toggleActions: "play none none reverse",
            },
            onComplete: () => {
                currentIndex = (currentIndex % cards.length) + 1;
                titleSection.textContent = cardTexts[currentIndex - 1];
            }
        });



    })



});
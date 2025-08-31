document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Initialize Smooth Scrolling (Lenis) ---
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Integrate GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // --- 2. Register GSAP Plugin ---
    gsap.registerPlugin(ScrollTrigger);
    
    // --- 3. Preloader Animation ---
    const loader = document.querySelector('.loader');
    const loaderText = document.querySelector('.loader-text');

    const loaderTl = gsap.timeline();
    loaderTl.to(loaderText, {
        opacity: 0,
        duration: 1,
        delay: 1.5,
        ease: "power2.inOut"
    }).to(loader, {
        y: "-100%",
        duration: 1.5,
        ease: "power2.inOut"
    }, "-=0.5");

    // --- 4. Hero Section Intro Animation ---
    const heroTl = gsap.timeline({ delay: 2.5 }); // Delay to start after loader
    heroTl.from(".main-headline .line span", {
        y: "100%",
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
    }).from(".hero-intro", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.5");
    
    // --- 5. Parallax Hero on Scroll ---
    gsap.to(".hero-text", {
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        y: 300 // Move text down as we scroll
    });

    // --- 6. About Section Reveal Animation ---
    const aboutSection = document.querySelector("#about");
    gsap.from(aboutSection.querySelector(".about-image"), {
        scrollTrigger: {
            trigger: aboutSection,
            start: "top 80%",
            end: "top 30%",
            scrub: 1
        },
        x: -100,
        opacity: 0
    });
    gsap.from(aboutSection.querySelectorAll(".about-text p, .about-text h2"), {
        scrollTrigger: {
            trigger: aboutSection,
            start: "top 70%",
            end: "top 40%",
            scrub: 1
        },
        x: 100,
        opacity: 0,
        stagger: 0.2
    });

    // --- 7. Horizontal Scroll Projects Section ---
    const track = document.querySelector(".project-track");
    const container = document.querySelector("#projects");

    // Calculate the total scrollable width
    let trackWidth = track.offsetWidth - window.innerWidth;

    gsap.to(track, {
        x: () => `-${trackWidth}px`,
        ease: "none", // Linear scroll
        scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${trackWidth}`,
            scrub: true,
            pin: true, // Pins the section while scrolling horizontally
            invalidateOnRefresh: true,
            anticipatePin: 1
        }
    });
    
    // Animate cards within the horizontal scroll
    const cards = gsap.utils.toArray(".project-card");
    cards.forEach(card => {
        gsap.from(card, {
            y: 100,
            opacity: 0,
            scrollTrigger: {
                trigger: card,
                containerAnimation: gsap.getTweensOf(track)[0], // Link to the horizontal scroll animation
                start: "left 90%",
                end: "left 60%",
                scrub: true
            }
        });
    });

    // --- 8. Contact Section Reveal ---
     gsap.from(".contact-section > *", {
        scrollTrigger: {
            trigger: ".contact-section",
            start: "top 80%",
            end: "top 50%",
            scrub: 1
        },
        y: 50,
        opacity: 0,
        stagger: 0.2
    });

});
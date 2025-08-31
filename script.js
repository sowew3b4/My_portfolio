// Wait for the DOM to be fully loaded before running scripts
window.addEventListener('DOMContentLoaded', (event) => {

    // --- SMOOTH SCROLL (LENIS) ---
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    // --- GSAP & SCROLLTRIGGER SETUP ---
    gsap.registerPlugin(ScrollTrigger);

    // Sync Lenis scroll with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // --- 1. PRELOADER ANIMATION ---
    const loaderText = document.querySelector('.loader-text');
    const loader = document.querySelector('.loader');

    const loaderTl = gsap.timeline();
    loaderTl.to(loaderText, {
        opacity: 1,
        duration: 1,
        ease: "power2.inOut"
    }).to(loaderText, {
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.inOut"
    }).to(loader, {
        y: "-100%",
        duration: 1.5,
        ease: "power3.inOut"
    }, "-=0.5");

    // --- 2. HERO SECTION INTRO ---
    const heroTl = gsap.timeline({ delay: 3 }); // Delay to start after loader
    heroTl.to(".main-headline .line span", {
        y: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "power4.out"
    }).to(".hero-intro", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=0.8");

    // --- 3. ABOUT SECTION REVEAL ---
    const aboutSection = document.querySelector("#about");
    gsap.from(aboutSection.querySelector(".about-image img"), {
        scale: 1.2,
        scrollTrigger: {
            trigger: aboutSection,
            start: "top 80%",
            end: "bottom top",
            scrub: true,
        },
    });
    gsap.from(aboutSection.querySelectorAll(".section-title, .about-text p"), {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: aboutSection,
            start: "top 60%",
        }
    });

    // --- 4. HORIZONTAL SCROLL PROJECTS ---
    const track = document.querySelector(".project-track");
    const projectsContainer = document.querySelector("#projects");

    // Ensure the track exists before trying to access its properties
    if (track) {
        // Calculate the total scrollable width
        const scrollWidth = track.scrollWidth - document.documentElement.clientWidth + window.innerWidth;

        gsap.to(track, {
            x: -scrollWidth,
            ease: "none",
            scrollTrigger: {
                trigger: projectsContainer,
                start: "top top",
                end: () => `+=${scrollWidth}`,
                scrub: 1,
                pin: true,
                invalidateOnRefresh: true,
                anticipatePin: 1
            }
        });
    }

    // --- 5. CONTACT SECTION REVEAL ---
    gsap.from(".contact-section > *", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".contact-section",
            start: "top 70%",
        }
    });
});
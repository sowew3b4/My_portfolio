document.addEventListener('DOMContentLoaded', function() {

    // --- Initialize Particles.js ---
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#ffffff" },
            "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" } },
            "opacity": { "value": 0.5, "random": false, "anim": { "enable": false } },
            "size": { "value": 3, "random": true, "anim": { "enable": false } },
            "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8 }, "repulse": { "distance": 200 }, "push": { "particles_nb": 4 } }
        },
        "retina_detect": true
    });

    // --- Initialize Vanilla-Tilt.js ---
    VanillaTilt.init(document.querySelectorAll(".project-card"), {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
    });

    // --- Typing Animation (Existing Code) ---
    var typed = new Typed('.typing', {
        strings: ["Web Developer.", "Designer.", "Creator."],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // --- Scroll Fade-in Animation (Existing Code) ---
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });

});
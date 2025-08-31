document.addEventListener('DOMContentLoaded', function() {

    // --- New Headline Letter Animation ---
    const headline = document.getElementById('main-headline');
    if (headline) {
        const text = headline.textContent;
        const letters = text.split('');
        headline.innerHTML = ''; // Clear original text
        letters.forEach((letter, index) => {
            const span = document.createElement('span');
            span.textContent = letter === ' ' ? '\u00A0' : letter; // Handle spaces
            span.style.animationDelay = `${index * 0.05}s`;
            headline.appendChild(span);
        });
        headline.classList.add('is-ready');
    }

    // --- New Custom Cursor & Magnetic Effect ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    document.querySelectorAll('[data-magnetic]').forEach(el => {
        el.addEventListener('mousemove', function(e) {
            const { clientX, clientY } = e;
            const { left, top, width, height } = this.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            cursorOutline.style.transform = `translate(-50%, -50%) scale(1.5)`;
            cursorOutline.style.backgroundColor = 'rgba(0, 198, 255, 0.5)';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
            cursorOutline.style.transform = `translate(-50%, -50%) scale(1)`;
            cursorOutline.style.backgroundColor = 'rgba(0, 198, 255, 0.2)';
        });
    });

    // --- Initialize Particles.js (Existing Code) ---
    particlesJS("particles-js", { /* ... (paste the same particlesJS config from the previous version) ... */
        "particles": { "number": { "value": 60, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": false }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 4, "direction": "none", "out_mode": "out" } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" } }, "modes": { "repulse": { "distance": 150 }, "push": { "particles_nb": 4 } } }, "retina_detect": true
    });

    // --- Initialize Vanilla-Tilt.js (Existing Code) ---
    VanillaTilt.init(document.querySelectorAll(".project-card"), {
        max: 20, speed: 400, glare: true, "max-glare": 0.3,
    });

    // --- Typing Animation (Existing Code) ---
    var typed = new Typed('.typing', {
        strings: ["Web Developer.", "Designer.", "Creator."], typeSpeed: 100, backSpeed: 60, loop: true
    });

    // --- Scroll Animations (Existing Code) ---
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.content-section').forEach(section => {
        observer.observe(section);
    });

});
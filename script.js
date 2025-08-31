document.addEventListener('DOMContentLoaded', function() {

    // --- Typing Animation ---
    // This uses the Typed.js library to create a typing effect.
    // The library is included via a CDN in the HTML file.
    var typed = new Typed('.typing', {
        strings: ["Web Developer.", "Designer.", "Creator."],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });


    // --- Scroll Fade-in Animation ---
    // This function adds a 'visible' class to sections when they enter the viewport.
    const sections = document.querySelectorAll('.content-section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the section is visible
    });

    sections.forEach(section => {
        observer.observe(section);
    });

});
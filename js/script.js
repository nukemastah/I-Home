// Mobile Navigation Toggle
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Typing Animation
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize Typed.js if the element exists
    if (document.querySelector('.typed-text')) {
        const typed = new Typed('.typed-text', {
            strings: ['security', 'comfort', 'efficiency', 'convenience'],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
    }

    // Animated Counters
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }

    // Start counters when section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (counters.length > 0) {
        observer.observe(document.querySelector('.hero'));
    }

    // Interactive Cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });

    // Auto-scrolling Testimonials
    const carousel = document.querySelector('.testimonial-carousel');
    if (carousel) {
        let scrollAmount = 0;
        const scrollWidth = carousel.scrollWidth - carousel.clientWidth;

        function autoScroll() {
            if (scrollAmount < scrollWidth) {
                scrollAmount += 1;
                carousel.scrollLeft = scrollAmount;
            } else {
                scrollAmount = 0;
                carousel.scrollLeft = 0;
            }
            setTimeout(autoScroll, 20);
        }

        // Start auto-scroll after 3 seconds
        setTimeout(autoScroll, 3000);

        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            scrollAmount = carousel.scrollLeft;
            carousel.style.scrollBehavior = 'auto';
        });

        carousel.addEventListener('mouseleave', () => {
            carousel.style.scrollBehavior = 'smooth';
            autoScroll();
        });
    }

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Sticky navigation on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    } else {
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});
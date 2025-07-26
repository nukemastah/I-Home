// Wait for DOM ready
document.addEventListener('DOMContentLoaded', function () {
  // === Mobile Navigation Toggle ===
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
  }

  // === Typed.js (Typing Effect) ===
  const typedText = document.querySelector('.typed-text');
  if (typedText) {
    new Typed('.typed-text', {
      strings: ['security', 'comfort', 'efficiency', 'convenience'],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true
    });
  }

  // === Animated Counters ===
  const counters = document.querySelectorAll('.counter');
  const speed = 200;

  function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    let count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => animateCounter(counter), 10);
    } else {
      counter.innerText = target;
    }
  }

  function startCounters() {
    counters.forEach(counter => animateCounter(counter));
  }

  if (counters.length > 0) {
    const observerTarget = document.querySelector('.stats-section') || document.querySelector('.hero');
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    if (observerTarget) observer.observe(observerTarget);
  }

  // === Interactive Cards (e.g. .card, .team-card) ===
  document.querySelectorAll('.card, .team-card').forEach(card => {
    card.addEventListener('click', function () {
      this.classList.toggle('active');
    });
  });

  // === Auto-scrolling Testimonials ===
  const carousel = document.querySelector('.testimonial-carousel');
  let scrollAmount = 0;
  let scrollInterval;

  function autoScroll() {
    if (!carousel) return;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;

    scrollInterval = setInterval(() => {
      scrollAmount += 1;
      if (scrollAmount < maxScroll) {
        carousel.scrollLeft = scrollAmount;
      } else {
        scrollAmount = 0;
        carousel.scrollLeft = 0;
      }
    }, 20);
  }

  if (carousel) {
    setTimeout(autoScroll, 3000);

    carousel.addEventListener('mouseenter', () => {
      clearInterval(scrollInterval);
    });

    carousel.addEventListener('mouseleave', () => {
      autoScroll();
    });
  }

  // === Smooth Scrolling for Anchor Links ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

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

// === Sticky Navigation Shadow ===
window.addEventListener('scroll', function () {
  const nav = document.querySelector('.navbar');
  if (nav) {
    if (window.scrollY > 100) {
      nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    } else {
      nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
  }
});

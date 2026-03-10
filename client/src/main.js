import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ===== Falling Petals Animation =====
function createPetals() {
  const container = document.getElementById('petal-container');
  const dustCount = window.innerWidth < 768 ? 20 : 40;

  for (let i = 0; i < dustCount; i++) {
    const dust = document.createElement('div');
    dust.classList.add('petal'); // Keeping class name for simplicity, but it's gold dust now

    const size = 2 + Math.random() * 4;
    dust.style.width = `${size}px`;
    dust.style.height = `${size}px`;
    dust.style.background = 'var(--color-primary-light)';
    dust.style.borderRadius = '50%';
    dust.style.filter = 'blur(1px)';
    dust.style.boxShadow = '0 0 10px var(--color-primary)';

    container.appendChild(dust);
    animateDust(dust);
  }
}

function animateDust(dust) {
  const startX = Math.random() * window.innerWidth;
  const duration = 15 + Math.random() * 20;
  const delay = Math.random() * 10;

  gsap.set(dust, {
    x: startX,
    y: -20,
    opacity: 0,
  });

  gsap.to(dust, {
    y: window.innerHeight + 20,
    x: `+=${(Math.random() - 0.5) * 200}`,
    opacity: 0.4,
    duration: duration,
    delay: delay,
    ease: 'none',
    onComplete: () => animateDust(dust),
  });
}

// ===== Navbar =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');

      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Update active link on scroll
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ===== Hero Animations =====
function initHeroAnimations() {
  const tl = gsap.timeline({ delay: 0.5 });

  tl.from('.hero-subtitle', {
    y: 20,
    opacity: 0,
    duration: 1.5,
    ease: 'power2.out',
  })
    .to('.hero-subtitle', {
      opacity: 1,
      duration: 0.01,
    }, '<')
    .from('.title-line:first-child', {
      y: 40,
      opacity: 0,
      duration: 1.8,
      ease: 'power3.out',
    }, '-=0.8')
    .to('.title-line:first-child', {
      opacity: 1,
      duration: 0.01,
    }, '<')
    .from('.title-line.accent', {
      y: 40,
      opacity: 0,
      duration: 2,
      ease: 'power4.out',
    }, '-=1.2')
    .to('.title-line.accent', {
      opacity: 1,
      duration: 0.01,
    }, '<')
    .from('.hero-divider', {
      scaleX: 0,
      duration: 1.5,
      ease: 'power2.inOut',
    }, '-=1')
    .to('.hero-divider', {
      opacity: 1,
      duration: 1,
    }, '<')
    .from('#hero-date', {
      y: 20,
      opacity: 0,
      duration: 1.2,
      ease: 'power2.out',
    }, '-=0.5')
    .to('#hero-date', {
      opacity: 1,
      duration: 0.01,
    }, '<')
    .from('#scroll-indicator', {
      opacity: 0,
      y: 20,
      duration: 1.5,
      ease: 'power2.out',
    }, '-=0.5')
    .to('#scroll-indicator', {
      opacity: 1,
      duration: 0.01,
    }, '<');
}

// ===== Wish Section Animations =====
function initWishAnimations() {
  gsap.to('#wish-card', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#wish-card',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  gsap.utils.toArray('.wish-text').forEach((text, i) => {
    gsap.to(text, {
      opacity: 1,
      duration: 0.8,
      delay: 0.3 * (i + 1),
      ease: 'power2.out',
      scrollTrigger: {
        trigger: text,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from(text, {
      y: 30,
      duration: 0.8,
      delay: 0.3 * (i + 1),
      ease: 'power2.out',
      scrollTrigger: {
        trigger: text,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });
}

// ===== Gallery Animations =====
function initGalleryAnimations() {
  gsap.utils.toArray('.gallery-item').forEach((item, i) => {
    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: i * 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });
}

// ===== Lightbox =====
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const galleryItems = document.querySelectorAll('.gallery-item');

  let currentIndex = 0;

  const images = Array.from(galleryItems).map(item => ({
    src: item.querySelector('img').src,
    caption: item.querySelector('.gallery-caption').textContent,
  }));

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[index].src;
    lightboxCaption.textContent = images[index].caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    gsap.from('.lightbox-content', {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(1.5)',
    });
  }

  function closeLightbox() {
    gsap.to('.lightbox-content', {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
  }

  function updateLightbox() {
    gsap.to(lightboxImg, {
      opacity: 0,
      x: -20,
      duration: 0.2,
      onComplete: () => {
        lightboxImg.src = images[currentIndex].src;
        lightboxCaption.textContent = images[currentIndex].caption;
        gsap.fromTo(lightboxImg, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.3 });
      }
    });
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

// ===== Timeline Animations =====
function initTimelineAnimations() {
  gsap.utils.toArray('.timeline-item').forEach((item) => {
    const isLeft = item.classList.contains('left');
    gsap.to(item, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Card hover sparkle
    const card = item.querySelector('.timeline-card');
    if (card) {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          boxShadow: '0 0 40px rgba(232, 116, 154, 0.3), 0 10px 40px rgba(0,0,0,0.3)',
          duration: 0.3,
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
          duration: 0.3,
        });
      });
    }
  });
}

// ===== Video Animations =====
function initVideoAnimations() {
  gsap.utils.toArray('.video-card').forEach((item, i) => {
    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: i * 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Play button pulse
  document.querySelectorAll('.video-play-btn').forEach(btn => {
    gsap.to(btn, {
      boxShadow: '0 0 0 15px rgba(232, 116, 154, 0)',
      repeat: -1,
      duration: 1.5,
      ease: 'power2.out',
    });
  });
}

// ===== Section Header Animations =====
function initSectionHeaderAnimations() {
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  gsap.utils.toArray('.section-subtitle').forEach(sub => {
    gsap.from(sub, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sub,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });
}

// ===== Footer Animation =====
function initFooterAnimation() {
  gsap.from('.footer-content', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });
}

// ===== Parallax Effects =====
function initParallax() {
  gsap.to('.hero-overlay', {
    y: 100,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  });

  gsap.to('.hero-content', {
    y: 80,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: '60% top',
      scrub: 1,
    },
  });
}

// ===== Smooth Cursor Trail (Hearts) =====
function initCursorTrail() {
  if (window.innerWidth < 768) return;

  let lastTime = 0;

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTime < 100) return;
    lastTime = now;

    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = `${e.clientX}px`;
    particle.style.top = `${e.clientY}px`;
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'var(--color-primary-light)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '99999';
    particle.style.boxShadow = '0 0 10px var(--color-primary)';
    document.body.appendChild(particle);

    gsap.to(particle, {
      y: (Math.random() - 0.5) * 50,
      x: (Math.random() - 0.5) * 50,
      opacity: 0,
      scale: 0,
      duration: 1.5,
      ease: 'power2.out',
      onComplete: () => particle.remove(),
    });
  });
}

// ===== Music Toggle (Placeholder) =====
function initMusicToggle() {
  const btn = document.getElementById('music-toggle');
  let isPlaying = false;

  btn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    btn.querySelector('.music-icon').textContent = isPlaying ? '🔇' : '🎵';

    gsap.to(btn, {
      scale: 0.8,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });
  });
}

// ===== Initialize Everything =====
function init() {
  createPetals();
  initNavbar();
  initHeroAnimations();
  initWishAnimations();
  initGalleryAnimations();
  initLightbox();
  initTimelineAnimations();
  initVideoAnimations();
  initSectionHeaderAnimations();
  initFooterAnimation();
  initParallax();
  initCursorTrail();
  initMusicToggle();
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

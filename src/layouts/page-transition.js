import gsap from 'gsap';

import { startSketch, stopSketch } from '../header-sketch.js';

window.addEventListener('astro:beforeNavigate', () => {
  stopSketch();
});

document.addEventListener('astro:page-load', () => {
  requestAnimationFrame(() => {
    if (document.getElementById('header')) {
      startSketch();
    }
  });
});

function initTransitions() {
  const overlay = document.getElementById('transition-overlay');
  if (!overlay) return;

  // Define animations
  const fadeIn = () => {
    gsap.to(overlay, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
      onStart: () => overlay.style.backdropFilter = 'blur(0px)',
      onUpdate: () => {
        const progress = gsap.getProperty(overlay, 'opacity');
        overlay.style.backdropFilter = `blur(${progress * 12}px)`; // max blur at opacity 1
      }
    });
  };

  const fadeOut = () => {
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.6,
      delay: 0.1,
      ease: 'power2.in',
      onUpdate: () => {
        const progress = gsap.getProperty(overlay, 'opacity');
        overlay.style.backdropFilter = `blur(${progress * 12}px)`;
      },
      onComplete: () => {
        overlay.style.backdropFilter = 'blur(0px)';
      }
    });
  };

  // Clean and re-bind
  window.removeEventListener('astro:beforeNavigate', fadeIn);
  window.removeEventListener('astro:afterNavigate', fadeOut);

  window.addEventListener('astro:beforeNavigate', fadeIn);
  window.addEventListener('astro:afterNavigate', fadeOut);
}

initTransitions();
document.addEventListener('astro:page-load', initTransitions);
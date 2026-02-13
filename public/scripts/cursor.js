// Custom cursor with physics-based following
// Only active on desktop (non-touch devices)
// Handles Astro view transitions

const cursor = {
  dot: null,
  circle: null,
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0,
  circleX: 0,
  circleY: 0,
  isHovering: false,
  isHidden: false,
  animating: false,
  eventsbound: false,

  init() {
    // Check for touch device using media query (more reliable)
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasHover) return;

    // Check if elements exist, create if not
    this.dot = document.querySelector('.cursor-dot');
    this.circle = document.querySelector('.cursor-circle');

    if (!this.dot || !this.circle) {
      this.createElements();
    }

    // Only bind events once
    if (!this.eventsbound) {
      this.bindEvents();
      this.eventsbound = true;
    }

    // Start animation if not already running
    if (!this.animating) {
      this.animating = true;
      this.animate();
    }
  },

  createElements() {
    // Remove any existing elements first
    document.querySelectorAll('.cursor-dot, .cursor-circle').forEach(el => el.remove());

    // Small dot (precise position)
    this.dot = document.createElement('div');
    this.dot.className = 'cursor-dot';
    document.body.appendChild(this.dot);

    // Larger circle (follows with delay)
    this.circle = document.createElement('div');
    this.circle.className = 'cursor-circle';
    document.body.appendChild(this.circle);
  },

  bindEvents() {
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
      this.targetX = e.clientX;
      this.targetY = e.clientY;

      // Dot follows immediately
      this.x = e.clientX;
      this.y = e.clientY;

      if (this.isHidden) {
        this.show();
      }
    });

    // Hide when mouse leaves window
    document.addEventListener('mouseleave', () => this.hide());
    document.addEventListener('mouseenter', () => this.show());

    // Hover states for interactive elements
    const interactiveElements = 'a, button, [role="button"], input, textarea, select, .card, [data-cursor-hover]';

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveElements)) {
        this.setHover(true);
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveElements)) {
        this.setHover(false);
      }
    });

    // Click effect
    document.addEventListener('mousedown', () => this.setClick(true));
    document.addEventListener('mouseup', () => this.setClick(false));
  },

  setHover(isHovering) {
    this.isHovering = isHovering;
    if (!this.dot || !this.circle) return;

    if (isHovering) {
      this.dot.classList.add('hovering');
      this.circle.classList.add('hovering');
    } else {
      this.dot.classList.remove('hovering');
      this.circle.classList.remove('hovering');
    }
  },

  setClick(isClicking) {
    if (!this.dot || !this.circle) return;

    if (isClicking) {
      this.dot.classList.add('clicking');
      this.circle.classList.add('clicking');
    } else {
      this.dot.classList.remove('clicking');
      this.circle.classList.remove('clicking');
    }
  },

  hide() {
    this.isHidden = true;
    if (!this.dot || !this.circle) return;
    this.dot.classList.add('hidden');
    this.circle.classList.add('hidden');
  },

  show() {
    this.isHidden = false;
    if (!this.dot || !this.circle) return;
    this.dot.classList.remove('hidden');
    this.circle.classList.remove('hidden');
  },

  animate() {
    // Re-check for elements (they might be removed during transitions)
    if (!this.dot || !document.body.contains(this.dot)) {
      this.dot = document.querySelector('.cursor-dot');
    }
    if (!this.circle || !document.body.contains(this.circle)) {
      this.circle = document.querySelector('.cursor-circle');
    }

    // Smooth easing for the circle
    const ease = 0.15;

    this.circleX += (this.targetX - this.circleX) * ease;
    this.circleY += (this.targetY - this.circleY) * ease;

    // Apply positions if elements exist
    if (this.dot) {
      this.dot.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
    if (this.circle) {
      this.circle.style.transform = `translate(${this.circleX}px, ${this.circleY}px)`;
    }

    requestAnimationFrame(() => this.animate());
  }
};

// Initialize on first load
function initCursor() {
  cursor.init();
}

// Run on initial load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCursor);
} else {
  initCursor();
}

// Re-initialize after Astro page transitions
document.addEventListener('astro:page-load', initCursor);

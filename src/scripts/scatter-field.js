const GAP = 10; // minimum px between items
const PADDING = 10; // inset from field edges
const INFLUENCE_RADIUS = 250; // mouse influence radius in px
const MAX_DISPLACEMENT = 10; // max push in px
const LERP_FACTOR = 0.08; // spring smoothing (lower = smoother/slower)
const MAX_PLACEMENT_ATTEMPTS = 300;

let cleanupFn = null;

function initScatterField() {
  // Clean up previous instance
  if (cleanupFn) {
    cleanupFn();
    cleanupFn = null;
  }

  const field = document.getElementById("scatter-field");
  if (!field) return;

  const items = Array.from(field.querySelectorAll(".scatter-item"));
  if (items.length === 0) return;

  // State for each item
  const state = items.map(() => ({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    offsetX: 0,
    offsetY: 0,
    targetOffsetX: 0,
    targetOffsetY: 0,
  }));

  // Measure item dimensions (they're already in the DOM with width set by CSS)
  items.forEach((item, i) => {
    const rect = item.getBoundingClientRect();
    state[i].w = rect.width;
    state[i].h = rect.height;
  });

  const fieldRect = field.getBoundingClientRect();
  const fieldW = fieldRect.width;
  const fieldH = fieldRect.height;

  // Place items randomly without overlap
  const placed = [];

  // Sort: larger items first for easier placement
  const indices = items.map((_, i) => i);
  indices.sort((a, b) => state[b].w * state[b].h - state[a].w * state[a].h);

  for (const i of indices) {
    const { w, h } = state[i];
    let found = false;

    for (let attempt = 0; attempt < MAX_PLACEMENT_ATTEMPTS; attempt++) {
      const x = PADDING + Math.random() * (fieldW - w - PADDING * 2);
      const y = PADDING + Math.random() * (fieldH - h - PADDING * 2);

      if (!overlapsAny(x, y, w, h, placed)) {
        state[i].x = x;
        state[i].y = y;
        placed.push({ x, y, w, h });
        found = true;
        break;
      }
    }

    // Fallback: grid position if random placement failed
    if (!found) {
      const cols = Math.ceil(Math.sqrt(items.length));
      const cellW = fieldW / cols;
      const cellH = fieldH / Math.ceil(items.length / cols);
      const idx = placed.length;
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      state[i].x = col * cellW + (cellW - w) / 2;
      state[i].y = row * cellH + (cellH - h) / 2;
      placed.push({ x: state[i].x, y: state[i].y, w, h });
    }
  }

  // Apply positions and fade in with stagger
  items.forEach((item, i) => {
    item.style.left = `${state[i].x}px`;
    item.style.top = `${state[i].y}px`;
    item.style.transform = "translate(0, 0)";

    // Stagger the fade-in
    setTimeout(() => {
      item.style.opacity = "1";
    }, i * 40);
  });

  // Mouse interaction
  let mouseX = -1000;
  let mouseY = -1000;
  let animating = false;
  let rafId = null;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function animate() {
    let needsUpdate = false;

    items.forEach((item, i) => {
      const s = state[i];
      const centerX = s.x + s.w / 2;
      const centerY = s.y + s.h / 2;

      const dx = centerX - mouseX;
      const dy = centerY - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < INFLUENCE_RADIUS && dist > 0) {
        const strength = (1 - dist / INFLUENCE_RADIUS) * MAX_DISPLACEMENT;
        const angle = Math.atan2(dy, dx);
        s.targetOffsetX = Math.cos(angle) * strength;
        s.targetOffsetY = Math.sin(angle) * strength;
      } else {
        s.targetOffsetX = 0;
        s.targetOffsetY = 0;
      }

      // Lerp toward target
      s.offsetX += (s.targetOffsetX - s.offsetX) * LERP_FACTOR;
      s.offsetY += (s.targetOffsetY - s.offsetY) * LERP_FACTOR;

      // Snap to zero if close enough
      if (
        Math.abs(s.offsetX) < 0.05 &&
        Math.abs(s.offsetY) < 0.05 &&
        s.targetOffsetX === 0 &&
        s.targetOffsetY === 0
      ) {
        s.offsetX = 0;
        s.offsetY = 0;
      } else {
        needsUpdate = true;
      }

      // Clamp so item stays within field bounds (with padding)
      const clampedX = Math.max(PADDING - s.x, Math.min(s.offsetX, fieldW - s.x - s.w - PADDING));
      const clampedY = Math.max(PADDING - s.y, Math.min(s.offsetY, fieldH - s.y - s.h - PADDING));

      item.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
    });

    if (needsUpdate) {
      rafId = requestAnimationFrame(animate);
    } else {
      animating = false;
    }
  }

  function startAnimating() {
    if (!animating) {
      animating = true;
      rafId = requestAnimationFrame(animate);
    }
  }

  function onMouseMove(e) {
    const rect = field.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    startAnimating();
  }

  function onMouseLeave() {
    mouseX = -1000;
    mouseY = -1000;
    startAnimating();
  }

  if (!prefersReducedMotion) {
    field.addEventListener("mousemove", onMouseMove);
    field.addEventListener("mouseleave", onMouseLeave);
  }

  // Handle resize: recalculate positions
  let resizeTimer;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      initScatterField();
    }, 200);
  }
  window.addEventListener("resize", onResize);

  // Cleanup function
  cleanupFn = () => {
    if (rafId) cancelAnimationFrame(rafId);
    field.removeEventListener("mousemove", onMouseMove);
    field.removeEventListener("mouseleave", onMouseLeave);
    window.removeEventListener("resize", onResize);
    clearTimeout(resizeTimer);
  };
}

function overlapsAny(x, y, w, h, placed) {
  for (const p of placed) {
    if (
      x < p.x + p.w + GAP &&
      x + w + GAP > p.x &&
      y < p.y + p.h + GAP &&
      y + h + GAP > p.y
    ) {
      return true;
    }
  }
  return false;
}

document.addEventListener("DOMContentLoaded", initScatterField);
document.addEventListener("astro:after-swap", initScatterField);
document.addEventListener("astro:page-load", initScatterField);

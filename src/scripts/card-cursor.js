// A floating, fully-rounded follower that appears next to the pointer while it
// is over a project card and tracks the mouse. Only enabled for fine pointers
// (mouse/trackpad), not touch.

function initCardCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const cards = document.querySelectorAll('.card');
  if (!cards.length) return;

  // Clean up any follower left over from a previous page (view transitions
  // swap the body, so we recreate it on every navigation).
  document
    .querySelectorAll('.card-cursor[data-cursor="card"]')
    .forEach((el) => el.remove());

  const follower = document.createElement('div');
  follower.className = 'card-cursor';
  follower.dataset.cursor = 'card';
  follower.textContent = 'View project';
  document.body.appendChild(follower);

  // Eased trailing motion: the pill interpolates toward the pointer each frame.
  const ease = 0.18;
  let targetX = 0;
  let targetY = 0;
  let curX = 0;
  let curY = 0;
  let active = false;
  let rafId = null;

  function render() {
    curX += (targetX - curX) * ease;
    curY += (targetY - curY) * ease;
    // Anchored to the bottom-right of the pointer (offset handled in CSS).
    follower.style.transform = `translate(${curX}px, ${curY}px)`;
    rafId = active ? requestAnimationFrame(render) : null;
  }

  function move(e) {
    targetX = e.clientX;
    targetY = e.clientY;
  }

  function show(e) {
    // "View" in the other-projects section, "View project" elsewhere.
    follower.textContent = e.currentTarget.closest('#gallery-other')
      ? 'View'
      : 'View project';
    // Snap to the pointer on entry so it doesn't glide in from a corner.
    targetX = curX = e.clientX;
    targetY = curY = e.clientY;
    follower.classList.add('is-visible');
    if (!active) {
      active = true;
      if (rafId === null) rafId = requestAnimationFrame(render);
    }
  }

  function hide() {
    follower.classList.remove('is-visible');
    active = false; // loop parks itself on the next frame
  }

  cards.forEach((card) => {
    card.addEventListener('pointerenter', show);
    card.addEventListener('pointermove', move);
    card.addEventListener('pointerleave', hide);
  });
}

// Runs on the initial load and after every view-transition navigation.
document.addEventListener('astro:page-load', initCardCursor);

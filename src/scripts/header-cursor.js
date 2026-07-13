// Reuses the .card-cursor pill in the header to hint that clicking changes the
// sketch. It trails the pointer while hovering the header and is dismissed for
// good once the visitor clicks for the first time.

// Module-scoped so the hint stays dismissed across view-transition navigations
// (the module runs once; only the astro:page-load handler re-runs).
let dismissed = false;

function initHeaderCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const header = document.getElementById('header');
  if (!header) return;

  // View transitions swap the body, so recreate the follower each navigation.
  document
    .querySelectorAll('.card-cursor[data-cursor="header"]')
    .forEach((el) => el.remove());

  const follower = document.createElement('div');
  follower.className = 'card-cursor';
  follower.dataset.cursor = 'header';
  follower.textContent = 'Click to cycle sketch';
  document.body.appendChild(follower);

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
    follower.style.transform = `translate(${curX}px, ${curY}px)`;
    rafId = active ? requestAnimationFrame(render) : null;
  }

  function move(e) {
    targetX = e.clientX;
    targetY = e.clientY;
  }

  function show(e) {
    if (dismissed) return;
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
    active = false;
  }

  function dismiss() {
    dismissed = true;
    hide();
  }

  header.addEventListener('pointerenter', show);
  header.addEventListener('pointermove', move);
  header.addEventListener('pointerleave', hide);
  header.addEventListener('click', dismiss);
}

// Runs on the initial load and after every view-transition navigation.
document.addEventListener('astro:page-load', initHeaderCursor);

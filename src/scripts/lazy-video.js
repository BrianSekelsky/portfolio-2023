// Gallery card videos rest on their first frame and only play while the user is
// engaging with the card: hovering it with a fine pointer, or focusing it with
// the keyboard. Nothing starts on its own, which keeps looping motion under the
// user's control (WCAG 2.2.2 Pause, Stop, Hide) and avoids spending bandwidth on
// clips nobody looks at.

function initCardVideos() {
  const videos = document.querySelectorAll('video[data-lazy-video]');
  if (!videos.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Pull in just enough of each clip to paint its first frame once it nears the
  // viewport. Several cards have no `poster`, so without this they would sit
  // blank until hovered.
  const primer =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const video = entry.target;
              if (video.preload === 'none') {
                video.preload = 'metadata';
                video.load();
              }
              obs.unobserve(video);
            });
          },
          { rootMargin: '200px 0px', threshold: 0 }
        )
      : null;

  videos.forEach((video) => {
    // astro:page-load and DOMContentLoaded can both fire for one document, and
    // view transitions re-run this on every navigation. Bind each video once.
    if (video.dataset.cardVideoBound) return;
    video.dataset.cardVideoBound = 'true';

    if (primer) primer.observe(video);
    else if (video.preload === 'none') video.preload = 'metadata';

    // Anyone asking for reduced motion keeps the still frame and nothing else.
    if (reduceMotion) return;

    // Hovering the whole card is far more forgiving than hovering the video box
    // itself, and it is exactly where the keyboard focus ring lands.
    const trigger = video.closest('.card') || video;

    const play = () => {
      video.play().catch(() => {});
    };

    const stop = () => {
      video.pause();
      // Seeking before metadata exists throws, so only rewind once it is safe.
      if (video.readyState > 0) video.currentTime = 0;
    };

    if (canHover) {
      trigger.addEventListener('pointerenter', play);
      trigger.addEventListener('pointerleave', stop);
    }

    // Keyboard parity: each card is a link, so it takes focus on tab.
    trigger.addEventListener('focusin', play);
    trigger.addEventListener('focusout', stop);
  });
}

document.addEventListener('DOMContentLoaded', initCardVideos);
document.addEventListener('astro:page-load', initCardVideos);

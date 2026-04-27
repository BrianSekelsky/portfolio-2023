function initLazyVideos() {
  const videos = document.querySelectorAll('video[data-lazy-video]');
  if (!videos.length) return;

  if (!('IntersectionObserver' in window)) {
    videos.forEach((v) => {
      v.preload = 'auto';
      v.play().catch(() => {});
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          if (video.preload === 'none') {
            video.preload = 'auto';
            video.load();
          }
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { rootMargin: '200px 0px', threshold: 0 }
  );

  videos.forEach((v) => observer.observe(v));
}

document.addEventListener('DOMContentLoaded', initLazyVideos);
document.addEventListener('astro:page-load', initLazyVideos);

  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    let rafId;

    card.addEventListener('mousemove', (e) => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -(y - centerY) / 50;
        const rotateY = (x - centerX) / 50;

        const shadowX = (x - centerX) / 30;
        const shadowY = (y - centerY) / 30;

        card.style.transform = `rotateX(${-rotateX}deg) rotateY(${-rotateY}deg)`;
        card.style.boxShadow = `${-shadowX}px ${-shadowY}px 10px 5px oklch(87.1% 0.006 286.286)`;        
      });
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
      card.style.boxShadow = '0px 0px 0px 0px oklch(87.1% 0.006 286.286)';
    });
  });
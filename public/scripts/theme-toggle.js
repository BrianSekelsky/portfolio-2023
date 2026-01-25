// Theme toggle functionality
function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    console.log("theme change")
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');

    // Save preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // Dispatch custom event for canvas and other JS listeners
    window.dispatchEvent(new CustomEvent('theme-change', {
      detail: { isDark }
    }));
  });

  // Listen for system preference changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (e) => {
    // Only auto-switch if user hasn't set a preference
    if (localStorage.getItem('theme') === null) {
      document.documentElement.classList.toggle('dark', e.matches);
      window.dispatchEvent(new CustomEvent('theme-change', {
        detail: { isDark: e.matches }
      }));
    }
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initThemeToggle);

// Re-initialize after Astro page transitions
document.addEventListener('astro:page-load', initThemeToggle);

// Persist theme across Astro transitions
document.addEventListener('astro:after-swap', () => {
  const stored = localStorage.getItem('theme');
  const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = stored === 'dark' || (stored === null && systemPreference);

  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

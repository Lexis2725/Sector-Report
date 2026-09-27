document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close the mobile menu after a nav link is tapped
    siteNav.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Smooth scroll to top
  document.querySelectorAll('a[href="#top"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      history.replaceState(null, '', '#top');
    });
  });

  // Footer year 
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Dark mode toggle 
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  // Reflect the current theme
  const setIcon = () => {
    themeToggle.textContent = root.getAttribute('data-theme') === 'dark' ? 'Light Mode' : 'Dark Mode';
  };

  if (themeToggle) {
    setIcon();
    themeToggle.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      if (isDark) {
        root.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
      setIcon();
    });
  }
  
    // Section jumper: highlight active dot on scroll 
  const jumperDots = document.querySelectorAll('.jumper-dot');
  const jumperSections = Array.from(jumperDots).map((dot) =>
    dot.dataset.section === 'top' ? document.body : document.getElementById(dot.dataset.section)
  );

  function updateActiveDot() {
    const scrollPos = window.scrollY + window.innerHeight * 0.4; 
    let activeIndex = 0;
    jumperSections.forEach((section, i) => {
      if (section && section.offsetTop <= scrollPos) {
        activeIndex = i;
      }
    });
    jumperDots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
  }

  if (jumperDots.length) {
    window.addEventListener('scroll', updateActiveDot, { passive: true });
    updateActiveDot(); 
  }
});

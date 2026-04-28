import { gsap, ScrollTrigger } from '../utils/register-plugins.js';

export function initNav() {
  const header = document.querySelector('.header');
  const hamburger = document.querySelector('.header__hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const heroHeight = document.querySelector('.hero')?.offsetHeight || 600;

  let lastScroll = 0;

  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
      const scrollY = self.scroll();

      // Switch from light (on red hero) to dark (on cream)
      if (scrollY > heroHeight - 100) {
        header.classList.remove('on-red');
        header.classList.add('scrolled');
      } else {
        header.classList.add('on-red');
        header.classList.remove('scrolled');
      }

      // Hide on scroll down, show on scroll up
      if (scrollY > lastScroll && scrollY > 300) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }

      lastScroll = scrollY;
    },
  });

  // Mobile hamburger
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

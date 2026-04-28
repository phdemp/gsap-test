import { gsap } from '../utils/register-plugins.js';

export function initCursor() {
  const cursor = document.querySelector('.cursor');
  if (!cursor) return;

  if (!window.matchMedia('(hover: hover)').matches) {
    cursor.style.display = 'none';
    return;
  }

  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power2.out' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power2.out' });

  window.addEventListener('mousemove', (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });

  const interactives = document.querySelectorAll('a, button, .project-card');
  interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });

  document.addEventListener('mouseleave', () => {
    gsap.to(cursor, { opacity: 0, duration: 0.2 });
  });
  document.addEventListener('mouseenter', () => {
    gsap.to(cursor, { opacity: 1, duration: 0.2 });
  });
}

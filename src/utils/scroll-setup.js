import { ScrollSmoother } from './register-plugins.js';

let smoother;

export function initSmoothScroll() {
  try {
    smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.2,
      effects: true,
      smoothTouch: 0.1,
    });
  } catch (e) {
    console.warn('ScrollSmoother failed, using native scroll:', e);
    // Fallback: make wrapper scrollable natively
    const wrapper = document.querySelector('#smooth-wrapper');
    if (wrapper) {
      wrapper.style.position = 'relative';
      wrapper.style.height = 'auto';
      wrapper.style.overflow = 'visible';
    }
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  return smoother;
}

export function getSmoother() {
  return smoother;
}

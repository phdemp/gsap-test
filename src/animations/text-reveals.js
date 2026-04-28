import { gsap, SplitText, ScrollTrigger } from '../utils/register-plugins.js';

export function initTextReveals() {
  const elements = document.querySelectorAll('.reveal-text');

  elements.forEach((el) => {
    const split = new SplitText(el, { type: 'lines,words' });

    split.lines.forEach((line) => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = 'hidden';
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    gsap.from(split.lines, {
      yPercent: 100,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
    });
  });
}

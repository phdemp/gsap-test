import { gsap, SplitText } from '../utils/register-plugins.js';

export function initLoader() {
  return new Promise((resolve) => {
    const loader = document.querySelector('.loader');
    const brand = document.querySelector('.loader__brand');
    const counter = document.querySelector('.loader__counter');
    const barFill = document.querySelector('.loader__bar-fill');

    const split = new SplitText(brand, { type: 'chars' });
    const chars = split.chars;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loader, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power4.inOut',
          onComplete: () => {
            loader.style.display = 'none';
            resolve();
          },
        });
      },
    });

    tl.from(chars, {
      y: 80,
      opacity: 0,
      rotateX: -90,
      duration: 0.7,
      stagger: 0.05,
      ease: 'back.out(1.7)',
    });

    tl.to(counter, {
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: function () {
        const progress = Math.round(this.progress() * 100);
        counter.textContent = progress;
      },
    }, '-=0.3');

    tl.to(barFill, {
      width: '100%',
      duration: 1.2,
      ease: 'power2.inOut',
    }, '<');

    tl.to({}, { duration: 0.2 });
  });
}

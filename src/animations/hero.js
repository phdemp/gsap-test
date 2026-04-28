import { gsap, ScrollTrigger, SplitText } from '../utils/register-plugins.js';

export function initHero() {
  const hero = document.querySelector('.hero');
  const brand = document.querySelector('.hero__brand');
  const tagline = document.querySelector('.hero__tagline');
  const scrollHint = document.querySelector('.hero__scroll-hint');
  const floatImgs = document.querySelectorAll('.hero__float-img');

  // Brand text reveal
  const split = new SplitText(brand, { type: 'chars' });
  gsap.from(split.chars, {
    y: 80,
    opacity: 0,
    rotateX: -90,
    duration: 1,
    stagger: 0.05,
    ease: 'back.out(1.7)',
    delay: 0.1,
  });

  // Tagline fade in
  gsap.from(tagline, {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    delay: 0.8,
  });

  // Floating images animate in with rotation
  floatImgs.forEach((img, i) => {
    gsap.from(img, {
      scale: 0,
      opacity: 0,
      rotation: (i % 2 === 0 ? -15 : 15),
      duration: 1,
      ease: 'elastic.out(1, 0.6)',
      delay: 0.4 + i * 0.15,
    });

    // Gentle floating animation
    gsap.to(img, {
      y: `random(-15, 15)`,
      x: `random(-8, 8)`,
      rotation: `+=${(i % 2 === 0 ? 3 : -3)}`,
      duration: `random(3, 5)`,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: i * 0.3,
    });
  });

  // Scroll hint pulse
  gsap.to(scrollHint, {
    opacity: 0,
    y: 10,
    duration: 1.5,
    ease: 'power2.inOut',
    repeat: -1,
    yoyo: true,
  });

  // Parallax on scroll — images move at different speeds
  floatImgs.forEach((img, i) => {
    gsap.to(img, {
      yPercent: -30 - i * 15,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  // Brand scales down on scroll
  gsap.to(brand, {
    scale: 0.8,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: '60% top',
      scrub: true,
    },
  });
}

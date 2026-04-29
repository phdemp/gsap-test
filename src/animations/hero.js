import { gsap, ScrollTrigger, SplitText } from '../utils/register-plugins.js';
import { Application } from '@splinetool/runtime';

// ← SWAP THIS URL to your food scene from Spline community
const SPLINE_SCENE_URL = 'https://prod.spline.design/U7NpjSjPmO6PuZVW/scene.splinecode';

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

  // Init Spline 3D scene
  const canvas = document.getElementById('spline-canvas');
  if (canvas) {
    const splineLoader = document.querySelector('.hero__spline-loader');
    const app = new Application(canvas);

    app.load(SPLINE_SCENE_URL).then(() => {
      // Hide loader
      if (splineLoader) {
        gsap.to(splineLoader, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => splineLoader.style.display = 'none',
        });
      }

      // Force transparent background — Spline resets clear alpha every frame,
      // so we monkey-patch setClearColor to always force alpha=0
      const renderer = app._renderer;
      if (renderer) {
        const origSetClearColor = renderer.setClearColor.bind(renderer);
        renderer.setClearColor = function (color, _alpha) {
          origSetClearColor(color, 0);
        };
        renderer.setClearAlpha(0);
      }

      // Make the burger bigger via Spline zoom
      app.setZoom(1.3);

      // Scroll-driven burger explode: spread ingredients apart on scroll
      const ingredientNames = ['BUN TOP', 'TOMATTOS', 'CHEESE', 'BURGER', 'SALAD 2', 'BOTTOM BUN'];
      const ingredients = ingredientNames.map(name => {
        const obj = app.findObjectByName(name);
        return obj ? { obj, originalY: obj.position.y } : null;
      }).filter(Boolean);

      if (ingredients.length) {
        const centerY = ingredients.reduce((sum, i) => sum + i.originalY, 0) / ingredients.length;

        ScrollTrigger.create({
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            const spread = self.progress * 4;
            ingredients.forEach(item => {
              const offset = item.originalY - centerY;
              item.obj.position.y = item.originalY + offset * spread;
            });
          },
        });
      }
    }).catch(err => {
      console.warn('Spline failed to load:', err);
      if (splineLoader) splineLoader.textContent = '3D scene unavailable';
    });
  }
}

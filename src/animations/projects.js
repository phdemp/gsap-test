import { gsap, ScrollTrigger } from '../utils/register-plugins.js';

export function initProjects() {
  // Food spread hero image
  const spreadImg = document.querySelector('.food-spread__hero-img img');
  if (spreadImg) {
    gsap.from(spreadImg, {
      scale: 1.2,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.food-spread',
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });

    gsap.to(spreadImg, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.food-spread',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // Marquee strip animation
  const track = document.querySelector('.product-strip__track');
  if (track) {
    gsap.to(track, {
      xPercent: -50,
      ease: 'none',
      duration: 20,
      repeat: -1,
    });
  }

  // Project cards
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card) => {
    const imageWrapper = card.querySelector('.project-card__image-wrapper');
    const image = card.querySelector('.project-card__image');
    const info = card.querySelector('.project-card__info');

    // Card slides up with opacity
    gsap.from(card, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Image zoom-out on scroll
    gsap.fromTo(image,
      { scale: 1.15 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    );

    // Info fade
    gsap.from(info, {
      y: 15,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 65%',
        toggleActions: 'play none none none',
      },
    });
  });
}

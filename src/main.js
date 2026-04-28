import './styles/index.css';
import './utils/register-plugins.js';
import { initSmoothScroll } from './utils/scroll-setup.js';
import { initLoader } from './animations/loader.js';
import { initHero } from './animations/hero.js';
import { initProjects } from './animations/projects.js';
import { initTextReveals } from './animations/text-reveals.js';
import { initCursor } from './animations/cursor.js';
import { initNav } from './animations/nav.js';

async function boot() {
  try {
    await initLoader();
  } catch (e) {
    console.warn('Loader failed, continuing:', e);
    const loader = document.querySelector('.loader');
    if (loader) loader.style.display = 'none';
  }

  initSmoothScroll();
  initHero();
  initProjects();
  initTextReveals();
  initCursor();
  initNav();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

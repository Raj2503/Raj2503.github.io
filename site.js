import { SITE } from './content/site-data.js';

const motionPreference = window.matchMedia?.('(prefers-reduced-motion: reduce)');
const motionTargets = document.querySelectorAll('.hero .eyebrow, .hero h1, .hero .lede, .hero .button-row, .hero .availability, .hero-network-frame, .section-head, .metric, .work-card, .expertise-card, .service, .article-card, .lab-card, .service-detail, .case-study section, .contact-links, .contact-form, .portrait, .quote, .work-canvas');

const pointerHaloQuery = window.matchMedia?.('(hover: hover) and (pointer: fine)');

function startPointerHalo() {
  if (motionPreference?.matches || !pointerHaloQuery?.matches) return;

  const halo = document.createElement('div');
  halo.className = 'pointer-halo';
  halo.setAttribute('aria-hidden', 'true');
  document.body.append(halo);

  let animationFrame = 0;
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight * 0.48;

  const renderPointerHalo = () => {
    animationFrame = 0;
    halo.style.transform = `translate3d(${pointerX - 180}px, ${pointerY - 180}px, 0)`;
    halo.dataset.ready = 'true';
  };

  renderPointerHalo();

  const handlePointerMove = (event) => {
    if (event.pointerType === 'touch') return;
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (!animationFrame) animationFrame = window.requestAnimationFrame(renderPointerHalo);
  };

  document.addEventListener('pointermove', handlePointerMove, { passive: true });
}

startPointerHalo();

if (!motionPreference?.matches && 'IntersectionObserver' in window && motionTargets.length) {
  document.documentElement.classList.add('js-motion');
  const revealObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });

  motionTargets.forEach((target, index) => {
    target.classList.add('motion-reveal');
    target.style.setProperty('--motion-index', String(index % 6));
    revealObserver.observe(target);
  });
}

const menuButton = document.querySelector('[data-nav-toggle]');
const navigation = document.querySelector('[data-site-nav]');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const open = navigation.dataset.open === 'true';
    navigation.dataset.open = String(!open);
    menuButton.setAttribute('aria-expanded', String(!open));
    menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  });
}

document.querySelectorAll('[data-track]').forEach((element) => {
  element.addEventListener('click', () => {
    window.portfolioAnalytics?.track?.(element.dataset.track, { path: window.location.pathname });
  });
});

const form = document.querySelector('[data-contact-form]');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    if (data.get('website')) return;
    const subject = `Portfolio enquiry from ${data.get('name') || 'a visitor'}`;
    const body = [
      `Name: ${data.get('name') || ''}`,
      `Work email: ${data.get('email') || ''}`,
      `Company: ${data.get('company') || ''}`,
      `Team or role: ${data.get('role') || ''}`,
      `Stack: ${data.get('stack') || ''}`,
      `Traffic scale: ${data.get('scale') || ''}`,
      `Primary problem: ${data.get('problem') || ''}`,
      `Desired outcome: ${data.get('outcome') || ''}`,
    ].join('\n');
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

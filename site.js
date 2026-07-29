import { SITE } from './content/site-data.js';

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

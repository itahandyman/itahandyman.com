// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

siteNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// WhatsApp number (international format, no + or leading 0)
const WHATSAPP_NUMBER = '447741755413';

// Quote form -> builds a WhatsApp message and opens wa.me
const quoteForm = document.getElementById('quote-form');

quoteForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('q-name').value.trim();
  const area = document.getElementById('q-area').value.trim();
  const service = document.getElementById('q-service').value;
  const details = document.getElementById('q-details').value.trim();

  const message =
    `Hi ItaHandyman, I'd like a quote.\n\n` +
    `Name: ${name}\n` +
    `Area/postcode: ${area}\n` +
    `Job type: ${service}\n` +
    `Details: ${details}`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener');
});

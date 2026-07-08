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
const CONTACT_EMAIL = 'itahandyman@outlook.com';

// Formspree endpoint — replace YOUR_FORM_ID once you've created a form at formspree.io
// (see README.md, "Email backup for the quote form"). Optional — leave as-is to skip it.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xojozyeo';

const quoteForm = document.getElementById('quote-form');
const quoteStatus = document.getElementById('quote-status');
const whatsappBtn = document.getElementById('q-submit-whatsapp');
const emailBtn = document.getElementById('q-submit-email');

function getQuoteFields() {
  return {
    name: document.getElementById('q-name').value.trim(),
    area: document.getElementById('q-area').value.trim(),
    service: document.getElementById('q-service').value,
    details: document.getElementById('q-details').value.trim()
  };
}

function buildMessage({ name, area, service, details }) {
  return (
    `Hi ItaHandyman, I'd like a quote.\n\n` +
    `Name: ${name}\n` +
    `Area/postcode: ${area}\n` +
    `Job type: ${service}\n` +
    `Details: ${details}`
  );
}

// Best-effort email backup via Formspree — never blocks either send path
async function notifyFormspree(fields) {
  if (FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) return; // not configured yet
  try {
    await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    });
  } catch (err) {
    console.warn('Formspree submission failed:', err);
  }
}

// Path 1: Send via WhatsApp (default form submit)
quoteForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!quoteForm.reportValidity()) return;

  const fields = getQuoteFields();
  const originalLabel = whatsappBtn.textContent;
  whatsappBtn.disabled = true;
  whatsappBtn.textContent = 'Sending…';

  await notifyFormspree(fields);

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage(fields))}`;
  window.open(url, '_blank', 'noopener');

  whatsappBtn.disabled = false;
  whatsappBtn.textContent = originalLabel;
  quoteStatus.textContent = "Opening WhatsApp now. If it didn't open, message me directly using the button above.";
  quoteForm.reset();
});

// Path 2: Send via Email (mailto — opens the visitor's own email app, pre-filled)
emailBtn.addEventListener('click', async () => {
  if (!quoteForm.reportValidity()) return;

  const fields = getQuoteFields();
  emailBtn.disabled = true;

  await notifyFormspree(fields);

  const subject = `Quote request: ${fields.service || 'handyman job'}`;
  const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage(fields))}`;
  window.location.href = mailtoUrl;

  emailBtn.disabled = false;
  quoteStatus.textContent = "Opening your email app now, addressed to " + CONTACT_EMAIL + ".";
  quoteForm.reset();
});

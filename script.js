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

// ============================================
// Accessibility: text size + high contrast
// ============================================
const TEXT_SIZES = ['normal', 'lg', 'xl'];
const html = document.documentElement;

function applyTextSize(size) {
  if (size === 'normal') {
    html.removeAttribute('data-text-size');
  } else {
    html.setAttribute('data-text-size', size);
  }
  localStorage.setItem('ita_text_size', size);
}

let textSizeIndex = TEXT_SIZES.indexOf(localStorage.getItem('ita_text_size') || 'normal');
if (textSizeIndex === -1) textSizeIndex = 0;
applyTextSize(TEXT_SIZES[textSizeIndex]);

document.getElementById('text-size-inc').addEventListener('click', () => {
  textSizeIndex = Math.min(textSizeIndex + 1, TEXT_SIZES.length - 1);
  applyTextSize(TEXT_SIZES[textSizeIndex]);
});
document.getElementById('text-size-dec').addEventListener('click', () => {
  textSizeIndex = Math.max(textSizeIndex - 1, 0);
  applyTextSize(TEXT_SIZES[textSizeIndex]);
});

const contrastToggle = document.getElementById('contrast-toggle');
function applyContrast(on) {
  if (on) {
    html.setAttribute('data-contrast', 'high');
  } else {
    html.removeAttribute('data-contrast');
  }
  contrastToggle.setAttribute('aria-pressed', String(on));
  localStorage.setItem('ita_contrast', on ? '1' : '0');
}
applyContrast(localStorage.getItem('ita_contrast') === '1');
contrastToggle.addEventListener('click', () => {
  applyContrast(html.getAttribute('data-contrast') !== 'high');
});

// ============================================
// Language switcher (EN / ES / IT)
// ============================================
const translations = {
  en: {
    nav_services: 'Services', nav_portfolio: 'Portfolio', nav_area: 'Area', nav_enquiry: 'Enquiry', nav_quote: 'Get a quote',
    hero_h1: 'Handyman work,<br>done properly.',
    hero_sub: 'Repairs, assemblies, installations and refurbs — booked in minutes over WhatsApp, done right the first time.',
    hero_cta_quote: 'Request a free quote', hero_cta_whatsapp: 'Message on WhatsApp',
    services_title: 'What I fix, build and finish',
    services_sub: "No job too small — if it needs a spirit level, a drill or a steady hand, it's on the list.",
    svc1_title: 'Basic Handyman', svc1_text: 'Shelving, curtain rails, TV mounts, door adjustments, sealant and all the small jobs that pile up on a to-do list.',
    svc2_title: 'Repairs', svc2_text: 'Leaks, sticking doors, broken hinges, damaged plaster and fixtures that have seen better days.',
    svc3_title: 'Assemblies', svc3_text: 'Flat-pack furniture, wardrobes, cots and self-assembly units — built straight, level and sturdy.',
    svc4_title: 'Installations', svc4_text: 'Shelving systems, blinds, taps, extractor fans, smart locks and fixtures fitted to stay put.',
    svc5_title: 'Refurbs', svc5_text: 'Small-scale room refreshes — painting, boxing in, skirting, and finishing touches that make a space feel new.',
    svc6_title: 'Not sure which one?', svc6_text: "Describe the job and I'll tell you straight whether it's something I can help with.", svc6_btn: 'Ask about a job',
    portfolio_title: 'Recent work',
    portfolio_sub: 'Photos from finished jobs are being added here — check back soon, or see the latest on Instagram.',
    portfolio_placeholder: 'Photo coming soon',
    portfolio_social_title: 'More on Instagram', portfolio_social_sub: 'Before-and-afters and job updates, posted as work gets finished.',
    btn_facebook: 'Facebook',
    area_title: 'Where I work', area_sub: 'Based in London, covering:',
    area_note: "Just outside these areas? Send the postcode over WhatsApp and I'll let you know if it's workable.",
    quote_title: 'Get a free quote',
    quote_sub: "Fill this in and it'll open WhatsApp with everything ready to send — no back-and-forth needed to get started.",
    quote_direct_label: 'Prefer to just message directly?', btn_call: 'Call: 07741 755413',
    quote_profiles_label: 'Also listed on',
    form_label_name: 'Name', form_placeholder_name: 'Your name',
    form_label_area: 'Area / postcode', form_placeholder_area: 'e.g. Romford, RM1',
    form_label_service: 'Type of job', form_select_placeholder: 'Select one',
    opt_handyman: 'Handyman', opt_repair: 'Repair', opt_assembly: 'Assembly', opt_installation: 'Installation', opt_refurb: 'Refurb', opt_notsure: 'Not sure',
    form_label_details: 'Job details', form_placeholder_details: 'What needs doing?',
    btn_send_whatsapp: 'Send via WhatsApp', btn_send_email: 'Send via Email', btn_send_form: 'Send via Website Form',
    enquiry_title: 'Send a website enquiry',
    enquiry_sub: "A simple, no-frills form — this one emails straight through, even if WhatsApp or your browser is playing up.",
    enquiry_label_contact: 'Phone or email', enquiry_placeholder_contact: 'Best way to reach you',
    enquiry_label_message: 'Message', enquiry_placeholder_message: 'What do you need doing?',
    enquiry_submit: 'Send Website Enquiry',
    footer_rights: 'All rights reserved.',
    util_text_size: 'Text size', util_contrast: 'Contrast',
    status_whatsapp: "Opening WhatsApp now. If it didn't open, message me directly using the button above.",
    status_email: 'Opening your email app now, addressed to info@itahandyman.com.',
  },
  es: {
    nav_services: 'Servicios', nav_portfolio: 'Trabajos', nav_area: 'Zona', nav_enquiry: 'Consulta', nav_quote: 'Pedir presupuesto',
    hero_h1: 'Trabajos de mantenimiento,<br>hechos como es debido.',
    hero_sub: 'Reparaciones, montajes, instalaciones y reformas — reservados en minutos por WhatsApp, bien hechos a la primera.',
    hero_cta_quote: 'Solicitar presupuesto gratis', hero_cta_whatsapp: 'Escribir por WhatsApp',
    services_title: 'Lo que reparo, monto y termino',
    services_sub: 'Ningún trabajo es demasiado pequeño — si hace falta un nivel, un taladro o mano firme, lo hago.',
    svc1_title: 'Mantenimiento general', svc1_text: 'Estanterías, rieles de cortinas, soportes de TV, ajuste de puertas, sellado y todas esas pequeñas tareas pendientes.',
    svc2_title: 'Reparaciones', svc2_text: 'Goteras, puertas atascadas, bisagras rotas, yeso dañado y accesorios que ya han visto mejores días.',
    svc3_title: 'Montajes', svc3_text: 'Muebles de kit, armarios, cunas y unidades de auto-montaje — montados rectos, nivelados y firmes.',
    svc4_title: 'Instalaciones', svc4_text: 'Sistemas de estanterías, persianas, grifos, extractores, cerraduras inteligentes y accesorios bien fijados.',
    svc5_title: 'Reformas', svc5_text: 'Renovaciones a pequeña escala — pintura, tabiques, rodapiés y esos toques finales que renuevan un espacio.',
    svc6_title: '¿No sabes cuál necesitas?', svc6_text: 'Cuéntame el trabajo y te diré con franqueza si puedo ayudarte.', svc6_btn: 'Preguntar por un trabajo',
    portfolio_title: 'Trabajos recientes',
    portfolio_sub: 'Aquí se irán añadiendo fotos de trabajos terminados — vuelve pronto, o mira las últimas en Instagram.',
    portfolio_placeholder: 'Foto próximamente',
    portfolio_social_title: 'Más en Instagram', portfolio_social_sub: 'Antes y después, y novedades de cada trabajo terminado.',
    btn_facebook: 'Facebook',
    area_title: 'Dónde trabajo', area_sub: 'Con base en Londres, cubriendo:',
    area_note: '¿Estás justo fuera de estas zonas? Envíame el código postal por WhatsApp y te digo si es posible.',
    quote_title: 'Pide un presupuesto gratis',
    quote_sub: 'Rellena esto y se abrirá WhatsApp con todo listo para enviar — sin idas y venidas para empezar.',
    quote_direct_label: '¿Prefieres escribir directamente?', btn_call: 'Llamar: 07741 755413',
    quote_profiles_label: 'También estoy en',
    form_label_name: 'Nombre', form_placeholder_name: 'Tu nombre',
    form_label_area: 'Zona / código postal', form_placeholder_area: 'p. ej. Romford, RM1',
    form_label_service: 'Tipo de trabajo', form_select_placeholder: 'Elige una opción',
    opt_handyman: 'Mantenimiento', opt_repair: 'Reparación', opt_assembly: 'Montaje', opt_installation: 'Instalación', opt_refurb: 'Reforma', opt_notsure: 'No estoy seguro',
    form_label_details: 'Detalles del trabajo', form_placeholder_details: '¿Qué necesitas?',
    btn_send_whatsapp: 'Enviar por WhatsApp', btn_send_email: 'Enviar por Email', btn_send_form: 'Enviar por el formulario web',
    enquiry_title: 'Envía una consulta desde la web',
    enquiry_sub: 'Un formulario simple — este llega directo por email, aunque WhatsApp o tu navegador fallen.',
    enquiry_label_contact: 'Teléfono o email', enquiry_placeholder_contact: 'La mejor forma de contactarte',
    enquiry_label_message: 'Mensaje', enquiry_placeholder_message: '¿Qué necesitas que haga?',
    enquiry_submit: 'Enviar consulta',
    footer_rights: 'Todos los derechos reservados.',
    util_text_size: 'Tamaño de texto', util_contrast: 'Contraste',
    status_whatsapp: 'Abriendo WhatsApp. Si no se abrió, escríbeme directamente con el botón de arriba.',
    status_email: 'Abriendo tu aplicación de email, dirigido a info@itahandyman.com.',
  },
  it: {
    nav_services: 'Servizi', nav_portfolio: 'Lavori', nav_area: 'Zona', nav_enquiry: 'Richiesta', nav_quote: 'Preventivo',
    hero_h1: 'Lavori da tuttofare,<br>fatti come si deve.',
    hero_sub: 'Riparazioni, montaggi, installazioni e ristrutturazioni — prenotati in pochi minuti su WhatsApp, fatti bene la prima volta.',
    hero_cta_quote: 'Richiedi un preventivo gratuito', hero_cta_whatsapp: 'Scrivi su WhatsApp',
    services_title: 'Cosa riparo, monto e rifinisco',
    services_sub: 'Nessun lavoro è troppo piccolo — se serve una livella, un trapano o polso fermo, lo faccio.',
    svc1_title: 'Manutenzione generale', svc1_text: 'Mensole, bastoni per tende, supporti TV, regolazione porte, sigillante e tutti quei piccoli lavori rimasti in sospeso.',
    svc2_title: 'Riparazioni', svc2_text: 'Perdite, porte che si incastrano, cerniere rotte, intonaco danneggiato e accessori ormai malmessi.',
    svc3_title: 'Montaggi', svc3_text: 'Mobili in kit, armadi, culle e unità autoassemblanti — montati dritti, in bolla e solidi.',
    svc4_title: 'Installazioni', svc4_text: 'Sistemi di mensole, tende, rubinetti, aspiratori, serrature smart e accessori fissati per restare.',
    svc5_title: 'Ristrutturazioni', svc5_text: 'Rinnovi su piccola scala — tinteggiatura, controsoffitti, battiscopa e i tocchi finali che rinnovano uno spazio.',
    svc6_title: 'Non sai quale scegliere?', svc6_text: 'Descrivimi il lavoro e ti dirò onestamente se posso aiutarti.', svc6_btn: 'Chiedi informazioni',
    portfolio_title: 'Lavori recenti',
    portfolio_sub: 'Le foto dei lavori finiti verranno aggiunte qui — torna presto, o guarda le ultime su Instagram.',
    portfolio_placeholder: 'Foto in arrivo',
    portfolio_social_title: 'Altro su Instagram', portfolio_social_sub: 'Prima e dopo, e aggiornamenti sui lavori appena finiti.',
    btn_facebook: 'Facebook',
    area_title: 'Dove lavoro', area_sub: 'Con base a Londra, copro:',
    area_note: 'Sei appena fuori da queste zone? Mandami il CAP su WhatsApp e ti dico se è fattibile.',
    quote_title: 'Richiedi un preventivo gratuito',
    quote_sub: 'Compila questo modulo e si aprirà WhatsApp con tutto pronto per l\'invio — nessun andirivieni per iniziare.',
    quote_direct_label: 'Preferisci scrivere direttamente?', btn_call: 'Chiama: 07741 755413',
    quote_profiles_label: 'Sono anche su',
    form_label_name: 'Nome', form_placeholder_name: 'Il tuo nome',
    form_label_area: 'Zona / CAP', form_placeholder_area: 'es. Romford, RM1',
    form_label_service: 'Tipo di lavoro', form_select_placeholder: 'Scegli una voce',
    opt_handyman: 'Manutenzione', opt_repair: 'Riparazione', opt_assembly: 'Montaggio', opt_installation: 'Installazione', opt_refurb: 'Ristrutturazione', opt_notsure: 'Non sono sicuro',
    form_label_details: 'Dettagli del lavoro', form_placeholder_details: 'Cosa c\'è da fare?',
    btn_send_whatsapp: 'Invia su WhatsApp', btn_send_email: 'Invia via Email', btn_send_form: 'Invia dal modulo web',
    enquiry_title: 'Invia una richiesta dal sito',
    enquiry_sub: 'Un modulo semplice — questo arriva via email anche se WhatsApp o il browser fanno i capricci.',
    enquiry_label_contact: 'Telefono o email', enquiry_placeholder_contact: 'Il modo migliore per contattarti',
    enquiry_label_message: 'Messaggio', enquiry_placeholder_message: 'Cosa c\'è da fare?',
    enquiry_submit: 'Invia richiesta',
    footer_rights: 'Tutti i diritti riservati.',
    util_text_size: 'Dimensione testo', util_contrast: 'Contrasto',
    status_whatsapp: 'Apertura di WhatsApp in corso. Se non si apre, scrivimi direttamente con il pulsante qui sopra.',
    status_email: 'Apertura della tua app email, indirizzata a info@itahandyman.com.',
  }
};

function t(key, lang) {
  return (translations[lang] && translations[lang][key]) || translations.en[key] || '';
}

let currentLang = 'en';

function applyLanguage(lang) {
  if (!translations[lang]) lang = 'en';
  currentLang = lang;
  html.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = t(el.getAttribute('data-i18n'), lang);
    if (val) el.innerHTML = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const val = t(el.getAttribute('data-i18n-placeholder'), lang);
    if (val) el.placeholder = val;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const val = t(el.getAttribute('data-i18n-aria'), lang);
    if (val) el.setAttribute('aria-label', val);
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
  });
  localStorage.setItem('ita_lang', lang);
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
});

const savedLang = localStorage.getItem('ita_lang');
const browserLang = (navigator.language || 'en').slice(0, 2);
applyLanguage(savedLang || (translations[browserLang] ? browserLang : 'en'));

// ============================================
// Quote form: WhatsApp / Email / Website Form
// (the "Send via Website Form" button submits natively via the
// @formspree/ajax CDN library initialised in index.html — see the
// initForm() call near the bottom of the page)
// ============================================
const WHATSAPP_NUMBER = '447741755413';
const CONTACT_EMAIL = 'info@itahandyman.com';

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

function setStatus(text, isError) {
  quoteStatus.textContent = text;
  quoteStatus.classList.toggle('is-error', !!isError);
}

// Path 1: Send via WhatsApp (button is type="button" — the form's native
// submit event is reserved for the Formspree AJAX button below)
whatsappBtn.addEventListener('click', () => {
  if (!quoteForm.reportValidity()) return;

  const fields = getQuoteFields();
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage(fields))}`;
  window.open(url, '_blank', 'noopener');

  setStatus(t('status_whatsapp', currentLang));
  quoteForm.reset();
});

// Path 2: Send via Email (mailto — opens the visitor's own email app, pre-filled)
emailBtn.addEventListener('click', () => {
  if (!quoteForm.reportValidity()) return;

  const fields = getQuoteFields();
  const subject = `Quote request: ${fields.service || 'handyman job'}`;
  const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage(fields))}`;
  window.location.href = mailtoUrl;

  setStatus(t('status_email', currentLang));
  quoteForm.reset();
});

// Path 3: Send via Website Form — handled entirely by the @formspree/ajax
// library (see initForm() in index.html), which owns the form's submit
// event and populates the [data-fs-success]/[data-fs-error] elements.

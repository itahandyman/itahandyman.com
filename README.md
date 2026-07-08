# ItaHandyman website

A one-page site for ItaHandyman, ready to publish with GitHub Pages on `itahandyman.com`.

## What's in here

```
index.html      the whole site (one page: hero, services, portfolio, area, instagram, quote form)
styles.css      all styling
script.js       mobile menu + the WhatsApp/email quote form
logo.png        your logo
CNAME           tells GitHub Pages to serve this at itahandyman.com
```

Everything sits flat in one folder — no subfolders needed. Keep any photos you add here too, right alongside these files.

**After editing `styles.css` or `script.js`,** bump the `?v=2` query string on their `<link>`/`<script>` tags near the top and bottom of `index.html` (e.g. to `?v=3`). Browsers aggressively cache CSS/JS files, so without this, visitors (and you, testing changes) can keep seeing an old cached copy after an update — even after the new file is live on GitHub Pages.

## 1. Put this on GitHub

1. Create a new repository on GitHub (e.g. `itahandyman-website`). It can be public or private — Pages works either way on a paid plan, but must be **public** on a free plan.
2. Upload all the files in this folder to the root of that repo — everything stays flat, no subfolders.
3. Commit / push.

## 2. Turn on GitHub Pages

1. In the repo, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)`. Save.
4. GitHub will build the site at a URL like `https://yourusername.github.io/itahandyman-website/`. Give it a minute or two.

## 3. Connect your domain (itahandyman.com)

The `CNAME` file is already in this repo pointing at `itahandyman.com`, so GitHub knows what domain to expect. You now need to point the domain *at* GitHub from wherever you bought it (registrar DNS settings):

**If `itahandyman.com` is the bare/apex domain**, add these **A records** at your domain registrar:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**If you also want `www.itahandyman.com` to work**, add a **CNAME record**:
```
www  →  yourusername.github.io
```

Then back in **Settings → Pages** on GitHub:
1. Under "Custom domain", enter `itahandyman.com` and save.
2. Once DNS propagates (can take a few minutes to a few hours), tick **Enforce HTTPS**.

## 4. Swap in real content later

- **Portfolio photos**: in `index.html`, find the `<section class="portfolio">` block. Replace each `<div class="portfolio-item arch-frame placeholder">...</div>` with:
  ```html
  <div class="portfolio-item arch-frame">
    <img src="job1.jpg" alt="Describe the job here">
  </div>
  ```
  Upload the photo files (e.g. `job1.jpg`, `job2.jpg`) into the same root folder as everything else — no subfolder needed. Compress them first (1500px wide is plenty).

- **WhatsApp number**: it's already set to `07741 755413` in both `index.html` (the direct link) and `script.js` (the `WHATSAPP_NUMBER` constant). If it ever changes, update both.

- **Email address**: it's `info@itahandyman.com`, set in `index.html` (the mailto links) and in `script.js` (the `CONTACT_EMAIL` constant). If it ever changes, update both.

- **Instagram**: the button links to `instagram.com/itahandyman`. The six coloured tiles next to it are decorative placeholders (Instagram doesn't allow a free live embed without their API) — you can leave them as a visual, or later swap them for screenshots of your actual posts.

## Formspree (the "Send via Website Form" button and the Enquiry section)

There are three separate ways to submit the quote form — WhatsApp, Email, and a dedicated **Send via Website Form** button — plus the standalone "Send a website enquiry" section further down the page. Both go to the same [Formspree](https://formspree.io) form (`https://formspree.io/f/xojozyeo`), which forwards submissions to your email, but each uses a different integration recommended by Formspree for how it's built:

- **"Send a website enquiry"** is a plain HTML `<form action="https://formspree.io/f/xojozyeo" method="POST">` — no JavaScript involved, so it works even if a visitor's browser blocks scripts.
- **"Send via Website Form"** (in the quote form) uses Formspree's official `@formspree/ajax` library, loaded from their CDN at the bottom of `index.html`:
  ```html
  <script>
    window.formspree = window.formspree || function () { (formspree.q = formspree.q || []).push(arguments); };
    formspree('initForm', { formElement: '#quote-form', formId: 'xojozyeo' });
  </script>
  <script src="https://unpkg.com/@formspree/ajax@1" defer></script>
  ```
  This library owns the quote form's native submit event — clicking that button shows field-level validation errors (`[data-fs-error="name"]` etc.) and a form-level success/error message (`[data-fs-success]` / `[data-fs-error]`) without a page reload. Note its success/error text comes from Formspree itself, so unlike the rest of the site it isn't translated into Spanish/Italian.

**Confirmed cause of the "Send via Website Form" failure:** testing it returns this exact error from Formspree:

> In order to submit via AJAX, you need to set a custom key or reCAPTCHA must be disabled in this form's settings page.

This means your form `xojozyeo` has reCAPTCHA turned on, which blocks JavaScript/AJAX submissions by default. **To fix it**, log into [formspree.io](https://formspree.io), open the form, go to its **Settings** tab, and either:
- turn **reCAPTCHA off** for this form (simplest — the honeypot field already in the enquiry form gives you basic spam protection instead), or
- generate an **AJAX key** for the form and pass it as a `data-fs-recaptcha-key` (or per Formspree's current docs) on the quote form.

The plain "Send a website enquiry" section further down the page is unaffected by this — it's a normal HTML POST (full page submission), not AJAX, so reCAPTCHA doesn't block it.

**If submissions still aren't arriving after that, also check:**

1. **The first submission was never confirmed.** Formspree requires you to click a one-time confirmation link before a new form starts forwarding. Submit the form once yourself, then check the inbox of the email address the form is set to deliver to (**and its spam/junk folder**) for an email from Formspree asking you to confirm.
2. **The form ID doesn't match your account.** Check the endpoint shown in your Formspree dashboard reads `https://formspree.io/f/xojozyeo`. If yours is different, update the `formId` in the `initForm(...)` call above *and* the `action="..."` attribute on the enquiry `<form>` in `index.html` to match, then commit and push.

Formspree's free tier covers 50 submissions a month.

## Notes

- No build step, no dependencies — it's plain HTML/CSS/JS, so it will keep working indefinitely on GitHub Pages with zero maintenance.
- The quote form doesn't send data anywhere itself — it composes a WhatsApp message and opens `wa.me` with it pre-filled, so replies land straight in your WhatsApp.

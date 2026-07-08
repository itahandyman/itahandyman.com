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

- **Instagram**: the button links to `instagram.com/itahandyman`. The six coloured tiles next to it are decorative placeholders (Instagram doesn't allow a free live embed without their API) — you can leave them as a visual, or later swap them for screenshots of your actual posts.

## Email backup for the quote form

The quote form does two things when someone submits it: opens WhatsApp with the message ready to send, **and** emails you a copy via [Formspree](https://formspree.io) — so you get a lead even if someone fills the form but doesn't follow through on the WhatsApp message.

To switch this on:

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form, give it any name (e.g. "ItaHandyman quote requests"), and set the destination to the email address you want leads sent to.
3. Formspree will give you a form endpoint that looks like `https://formspree.io/f/abcd1234`. Copy the `abcd1234` part (your form ID).
4. Open `script.js` in this repo, find this line near the top:
   ```js
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
   ```
   Replace `YOUR_FORM_ID` with your actual ID, so it reads e.g. `https://formspree.io/f/abcd1234`.
5. Commit and push. Formspree's free tier covers 50 submissions a month, which is plenty to start — check their pricing if you outgrow it.
6. Test it: submit the form yourself once. Formspree requires you to confirm the first submission from a new form (check your email) before it starts forwarding automatically.

If you skip this step, the form still works fine — it just won't email you a backup copy, only the WhatsApp message will go through.

## Notes

- No build step, no dependencies — it's plain HTML/CSS/JS, so it will keep working indefinitely on GitHub Pages with zero maintenance.
- The quote form doesn't send data anywhere itself — it composes a WhatsApp message and opens `wa.me` with it pre-filled, so replies land straight in your WhatsApp.

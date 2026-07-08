# ItaHandyman website

A one-page site for ItaHandyman, ready to publish with GitHub Pages on `itahandyman.com`.

## What's in here

```
index.html      the whole site (one page: hero, services, portfolio, area, instagram, quote form)
styles.css      all styling
script.js       mobile menu + the WhatsApp quote form
assets/logo.png your logo
CNAME           tells GitHub Pages to serve this at itahandyman.com
```

## 1. Put this on GitHub

1. Create a new repository on GitHub (e.g. `itahandyman-website`). It can be public or private — Pages works either way on a paid plan, but must be **public** on a free plan.
2. Upload all the files in this folder to the root of that repo (keep the `assets` folder as a folder).
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
    <img src="assets/portfolio/job1.jpg" alt="Describe the job here">
  </div>
  ```
  Add an `assets/portfolio/` folder with your photos (compress them first — 1500px wide is plenty).

- **WhatsApp number**: it's already set to `07741 755413` in both `index.html` (the direct link) and `script.js` (the `WHATSAPP_NUMBER` constant). If it ever changes, update both.

- **Instagram**: the button links to `instagram.com/itahandyman`. The six coloured tiles next to it are decorative placeholders (Instagram doesn't allow a free live embed without their API) — you can leave them as a visual, or later swap them for screenshots of your actual posts.

## Notes

- No build step, no dependencies — it's plain HTML/CSS/JS, so it will keep working indefinitely on GitHub Pages with zero maintenance.
- The quote form doesn't send data anywhere itself — it composes a WhatsApp message and opens `wa.me` with it pre-filled, so replies land straight in your WhatsApp.

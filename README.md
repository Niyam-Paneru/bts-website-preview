# Best Tech Solutions — website preview

This is a website for a computer shop in Mahendranagar, Nepal. Not a mock API. Not a 400-line explanation of what a website *could* be. Actual pages.

**[Walk around the preview](https://niyam-paneru.github.io/bts-website-preview/)**

It has a home page, a laptop catalogue, three product pages with image galleries, services, shop information, and contact details. The contact path opens WhatsApp with an enquiry already filled in. It **doesn't** write to a database or claim an order was placed.

## Decisions that mattered

- **No fake prices.** Prices show "On request." Stock and configurations need confirmation from the shop.
- **No pretend checkout.** The WhatsApp enquiry is the contact path. A button that looks like checkout but does nothing is an excellent way to annoy somebody.
- **Photos over stock-layout filler.** Product pages show ASUS product images; the about page includes real shop context.
- **Readable on a phone.** Responsive navigation, focused image-gallery controls, and a skip-to-content link are part of the source.

There are seven main HTML pages: [home](index.html), [laptops](laptops.html), three model pages ([Vivobook](product-vivobook-15.html), [Zenbook](product-zenbook-14-oled.html), [TUF](product-tuf-gaming-f15.html)), [services](services.html), [about](about.html), and [contact](contact.html). Okay, that's eight. Counting pages is apparently also part of web development.

## Open it locally

```sh
python -m http.server 8765
```

Then visit `http://localhost:8765/`. No install ceremony. The site is HTML, CSS, JavaScript, and assets.

A little of the design work: cream/paper backgrounds, dark ink, self-hosted Familjen Grotesk and Atkinson Hyperlegible Next, and galleries controlled by arrows or thumbnails. The [CSS](styles.css) and [JavaScript](script.js) are right here.

## Before anyone calls this "launched"

This is a **client-review concept**, not the approved production website. Pages are intentionally `noindex, nofollow`, with a restrictive `robots.txt`. Opening the GitHub Pages link is not client sign-off.

Still needed: final logo/photo assets, confirmed opening days and hours, service radius, domain/hosting, warranty copy, and client approval. The editable wider project lives privately in `bts-os`.

The ASUS renders illustrate models, not guaranteed in-stock configurations. Any real availability must come from the shop.

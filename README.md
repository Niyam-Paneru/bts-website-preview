# Best Tech Solutions — website preview

Most of my projects argue with invisible backend state. This one has visible laptops, a catalogue, and a WhatsApp enquiry button. Much easier to show to someone who doesn't want a lecture about timeout handling.

It's a **client-review website preview** for a computer shop in Mahendranagar, Nepal, with galleries, services, and WhatsApp enquiries. It isn't an online checkout, so there's no magical “order placed” screen after you click a button.

**[Walk around the preview](https://niyam-paneru.github.io/bts-website-preview/)**

It has a home page, a laptop catalogue, three product pages with image galleries, services, shop information, and contact details. The contact path opens WhatsApp with an enquiry already filled in. It **doesn't** write to a database or claim an order was placed.

## Things I refused to fake

| Decision | Why |
| --- | --- |
| Prices say **On request** | The shop must confirm stock, configuration, and price. |
| WhatsApp enquiry instead of fake checkout | Clicking “Buy” shouldn't submit an order to the kingdom of make-believe. |
| Product galleries and actual shop context | ASUS imagery illustrates the models; it does not certify local stock. |
| Responsive navigation, gallery controls, skip link | The preview should work on a phone, not just in a desktop screenshot. |

There are eight main HTML pages: [home](index.html), [laptops](laptops.html), three product pages ([Vivobook](product-vivobook-15.html), [Zenbook](product-zenbook-14-oled.html), [TUF](product-tuf-gaming-f15.html)), [services](services.html), [about](about.html), and [contact](contact.html). Eight pages, zero imaginary payment processors. A very deliberate feature.

## Open it locally

```sh
python -m http.server 8765
```

Then visit `http://localhost:8765/`. No install ceremony. The site is HTML, CSS, JavaScript, and assets.

A little of the design work: cream/paper backgrounds, dark ink, self-hosted Familjen Grotesk and Atkinson Hyperlegible Next, and galleries controlled by arrows or thumbnails. The [CSS](styles.css) and [JavaScript](script.js) are right here.

The gallery imagery is from ASUS product renders and illustrates the models; finishes and configurations can differ from what the shop has. The self-hosted display/body fonts are open-source under the SIL Open Font License. The code is public; the shop's brand assets and product photography aren't a blanket reuse license.

## Before the ribbon-cutting ceremony

This is a **client-review concept**, not the approved production website. Pages are intentionally `noindex, nofollow`, with a restrictive `robots.txt`. Opening the GitHub Pages link is not client sign-off.

Still needed: final logo/photo assets, confirmed opening days and hours, service radius, domain/hosting, warranty copy, and client approval. The editable wider project lives privately in `bts-os`.


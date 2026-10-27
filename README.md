# BTS website — client preview

Review build of the Best Tech Solutions public website in Mahendranagar, Nepal.

Live: **https://niyam-paneru.github.io/bts-website-preview/**

This is a static client-review concept, not the production application. It is served directly from `main` with GitHub Pages. Every page is marked `noindex, nofollow`, and `robots.txt` disallows all crawlers until the client approves the design.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home — hero, three laptop recommendations, services, enquiry CTA |
| `laptops.html` | Laptops — three considered recommendations and stock note |
| `product-vivobook-15.html` | ASUS Vivobook 15 (X1504) |
| `product-zenbook-14-oled.html` | ASUS Zenbook 14 OLED (UX3405) |
| `product-tuf-gaming-f15.html` | ASUS TUF Gaming F15 (FX507) |
| `services.html` | Sales, repairs, upgrades, CCTV, networking and support |
| `about.html` | Shop story, the real storefront, values and visit details |
| `contact.html` | Phone, WhatsApp, form, address and hours |

## Local preview

```powershell
python -m http.server 8765
```

Open `http://127.0.0.1:8765/`.

The contact form has no backend. It opens WhatsApp with a prefilled message and stores nothing.

## Design

- Warm cream canvas, paper panels and deep ink, with mineral green and ochre accents. No corporate blue.
- Familjen Grotesk display type and Atkinson Hyperlegible Next body text, self-hosted in `assets/fonts/`.
- Product pages lead with the gallery, then specifications, a short overview and one compact WhatsApp contact box.
- Each laptop has four or five official ASUS product angles. The main image changes with the overlay arrows, the thumbnails or arrow keys on a focused thumbnail.

## Product content rules

- Prices are never invented. Every price is shown as **On request**.
- Configurations are labelled as typical and can vary by stock. Current stock and configuration are confirmed on WhatsApp or at the shop.
- All enquiries use the shop number `9779868775155` with a prefilled message.
- Product images are illustrative. Finish and exact configuration may differ from the photographs.

## Assets

- `assets/brand/` contains BTS brand files supplied for this concept.
- `assets/laptops/` contains official ASUS product renders, cropped and converted to WebP for this review. They remain ASUS product imagery and illustrate the recommended models only.
- Familjen Grotesk and Atkinson Hyperlegible Next are open-source Google Fonts under the SIL Open Font License.

## Still to confirm with the client

- Final logo files and any additional shop or team photography.
- Weekly closing day and holiday hours.
- Service radius and visit policy.
- Domain, analytics and production hosting.
- Final copy review, especially service scope and warranty wording.
- Approval before removing `noindex` or connecting a production domain.

The editable source, build script and data live in the private `bts-os` repository under `docs/concepts/`.

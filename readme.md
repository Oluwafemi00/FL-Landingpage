# Frontend Launchpad — Bootcamp Landing Page 🚀

> A bold, terminal-aesthetic bootcamp enrollment website with Netlify form submission, AJAX redirect, a 3-step payment success page, scroll animations, and a full green/black design system — built across three clean files.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Netlify Forms](https://img.shields.io/badge/Netlify-Forms-00C7B7?logo=netlify)
![No Framework](https://img.shields.io/badge/framework-none-brightgreen)

---

## Overview

Frontend Launchpad is a real enrollment landing page for a 6-week coding bootcamp. It covers the full conversion funnel — from hero to curriculum to pricing to enrollment form — with a Netlify-compatible form that submits via AJAX and redirects to a styled payment confirmation page.

---

## Pages

### `index.html` — Main Landing Page

| Section                | Details                                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------------------------- |
| **Sticky Frosted Nav** | Fixed nav with Bebas Neue branding and enrollment CTA                                                     |
| **Hero**               | Full-viewport section with giant Bebas Neue headline, animated grid background, and CRT scan-line overlay |
| **Curriculum**         | 3 week-range cards (W1–2, W3–4, W5–6) with hover underline animation                                      |
| **Benefits**           | 4 feature blocks with monospace icons                                                                     |
| **Pricing**            | Early Bird (₦10k) and Regular (₦15k) cards — clicking pre-selects the plan in the form                    |
| **Enrollment Form**    | Name, email, WhatsApp, experience level, and plan — submits to Netlify                                    |
| **Scroll Animations**  | `IntersectionObserver` fade-up with staggered delays                                                      |

### `success.html` — Payment Confirmation Page

| Element            | Details                                                            |
| ------------------ | ------------------------------------------------------------------ |
| **3-Step Process** | Numbered steps: Transfer → Screenshot → WhatsApp                   |
| **Bank Details**   | Account number with one-click copy button + "Copied!" confirmation |
| **Amount Callout** | Amber-tinted note clarifying Early Bird vs Regular amount          |
| **WhatsApp CTA**   | Pre-filled message with payment receipt prompt                     |

---

## Technical Highlights

- **AJAX form submission** — `fetch()` POSTs to Netlify without a page reload; JS handles loading state, resets form, and redirects to `success.html`
- **BFCache reset** — `pageshow` event listener detects browser Back button cache and resets form/button state
- **Pre-select from pricing** — clicking a pricing card's CTA sets the `<select>` value before scrolling to form
- **Validation with visual feedback** — required fields get a red border + glow on invalid submit attempt, cleared on next `input` event
- **Dynamic toast** — injected into DOM on first call, not present in HTML; no wasted markup
- **Bebas Neue + Outfit** — condensed display font for maximum impact at large sizes; clean sans for body
- **CSS grid texture** — `repeating-linear-gradient` crosshatch gives the background a technical terminal feel

---

## Project Structure

```
launchpad/
├── index.html      ← Landing page: hero, curriculum, pricing, form
├── readme.md
├── style.css       ← Electric green design system, grid bg, animations
├── script.js       ← AJAX form, validation, scroll animations, pricing pre-select
└── success.html    ← Payment confirmation with copy button and WhatsApp CTA
```

---

## Deployment (Netlify)

1. Push `launchpad/` folder to a GitHub repo
2. Connect to Netlify — form submissions are captured automatically via `data-netlify="true"`
3. Set redirect in `script.js` to your deployed URL

---

## Design Decisions

- **Electric green + black** — terminal/hacker aesthetic signals tech credibility to the target audience (aspiring devs)
- **Outline text on "LAUNCHPAD"** — `-webkit-text-stroke` creates a bold display effect that's clearly CSS craft, not a font weight
- **Numbered curriculum cards** (W1–2, W3–4, W5–6) — clearer than vague week labels; shows structured thinking
- **WhatsApp CTA on success page** — practical for Nigerian market where WhatsApp is the primary payment verification channel

---

## Run Locally

```bash
npx serve launchpad/
# Netlify form submission requires actual Netlify deployment
# For local testing, form submit triggers redirect only
```

---

## What This Demonstrates

- Building a complete conversion funnel (landing → form → confirmation) without a CMS or framework
- Netlify Forms integration with AJAX submission and custom redirect
- UX details that reduce friction: pre-selection, visual validation feedback, BFCache handling
- Writing a real product for a real use case — not a tutorial exercise

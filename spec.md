# Forqi LLC — Website Specification

Version 1.0 · July 2026
Live target: https://forqi.net
Source of truth for rebuilding the site from scratch.

## 1. Overview

Single-page, fully static, responsive marketing site for Forqi LLC, a technology
and AI consultancy serving government and the public sector. No backend, no CMS,
no build step, no external dependencies (no fonts, frameworks, or CDNs). One
HTML file plus SVG assets.

Design language: black-and-white editorial (inspired by newlab.com) warmed with
a Hermès-orange accent. Oversized uppercase display type, hairline rules,
numbered sections, bordered grids.

## 2. Files

```
forqi-website/
├── index.html          # entire site: markup + CSS + minimal inline JS
├── spec.md             # this document
└── assets/
    └── logo-spark.svg  # primary mark (also inlined in index.html)
```

## 3. Design tokens

CSS custom properties defined on `:root`:

| Token       | Value     | Use                                        |
|-------------|-----------|--------------------------------------------|
| `--paper`   | `#F6F5F6` | page background                            |
| `--ink`     | `#1A161A` | primary text, heavy rules, dark band       |
| `--ink-soft`| `#565357` | secondary text                             |
| `--ink-faint`| `#9E9B9E`| tertiary text                              |
| `--rule`    | `#1A161A` | primary borders (1px)                      |
| `--rule-lt` | `#C5C1C4` | hairline borders                           |
| `--accent`  | `#F37021` | Hermès orange — logo, highlights, buttons  |
| `--tint`    | `#FBEEE3` | warm cream — contact section background    |

Accent usage rules: section index numbers, service row numbers, step numbers,
"Why Forqi" card headings, solid buttons, hero highlight text, credentials
strip background, contact email underline, text selection. Everything else
stays ink on paper.

## 4. Typography

- Font stack: `"Helvetica Neue", Helvetica, Arial, sans-serif` (system; no webfonts).
- Hero H1: `clamp(42px, 8vw, 104px)`, weight 800, uppercase, letter-spacing
  −.03em, line-height .98. Style variants: `.thin` (weight 300), `.hl` (accent color).
- Section H2: `clamp(30px, 4.5vw, 54px)`, weight 700, letter-spacing −.02em.
- Section labels: 11px, weight 600, uppercase, letter-spacing .22em, with index
  number in accent and a trailing hairline that fills remaining width (flex).
- Body/lead: 15–17px, `--ink-soft`, line-height ~1.55.
- Buttons/nav/footer: 11–12.5px, weight 600, uppercase, letter-spacing .16–.18em.

## 5. Logo — "Spark"

Radial burst of 12 rays around center (50,50) in a 100×100 viewBox; round caps.

- 6 long rays, Hermès orange `#F37021`: line from (50,8) to (50,30), rotated
  0°/60°/120°/180°/240°/300°.
- 6 short rays, ink `#1A161A`: line from (50,18) to (50,30), rotated
  30°/90°/150°/210°/270°/330°.
- Stroke width 7 (8 at nav size for weight).

Meaning: the moment insight clicks. Placements: nav (30px, next to "FORQI"
wordmark in site type), favicon (inline SVG data URI in `<head>`), hero
decoration (150px, absolute top-right of hero, hidden ≤900px).

## 6. Page structure & copy

Sticky header → Hero → Credentials strip → 01 About → 02 Services →
03 Approach → 04 Why Forqi (dark) → 05 Contact (tint) → Footer.
All nav links are anchors; `scroll-behavior: smooth`; `scroll-margin-top: 76px`.

### Header
Logo (Spark + FORQI) left; uppercase anchor links right: About, Services,
Approach, Why Forqi, Contact. ≤640px: links hidden, hamburger toggles a
stacked menu (inline JS classList toggle, aria-expanded managed).

### Hero
- H1: "TECHNOLOGY & AI *for the* **PUBLIC GOOD**" ("for the" thin, "Public
  Good" orange, manual line breaks after "Technology" and "the").
- Sub: "Forqi helps government and public-sector organizations put AI and
  modern technology to work — securely, responsibly, and with results the
  public can see."
- CTAs: "Talk to Us" (solid orange → ink on hover), "Services" (outline).

### Credentials strip
Solid orange band, white uppercase items spaced apart: U.S.-Based Small
Business · Public-Sector Focused · Security-First Delivery · Responsible AI
Practices. (Placeholders — replace with real designations when available.)

### 01 About Us
Two columns (stack ≤900px). Left, large statement: "Public institutions
deserve the same quality of technology as the best-run private companies —
delivered with the transparency, security, and accountability that public work
demands." Right, two paragraphs: partner-not-vendor positioning; honest advice,
right-sized budgets, knowledge transfer; "practical technology that improves
how government serves people."
Below: three bordered facts — Government-First / End-to-End / Responsible AI.

### 02 Services — editorial rows (number · title · description)
- S.01 AI & Data Analytics — applied AI/ML and analytics: document automation,
  citizen-service chatbots, forecasting, decision support; human oversight.
- S.02 Digital Modernization — replacing aging systems and paper processes
  with accessible, user-friendly digital services.
- S.03 Cloud & Infrastructure — migration, architecture, secure compliant
  infrastructure; lower cost, higher reliability.
- S.04 Advisory & Strategy — AI readiness, roadmaps, vendor evaluation,
  governance.

### 03 Our Approach — 4 bordered cells (grid with shared 1px borders)
Step 01 Listen & Assess · Step 02 Design & Prove (pilot before commitment) ·
Step 03 Build & Deliver (security/accessibility/compliance from day one, short
increments) · Step 04 Transfer & Support (training, documentation, ownership
handover, no lock-in).
Rationale: replaces a case-study section until real past-performance exists.

### 04 Why Forqi — dark band (`--ink` bg, paper text, orange headings)
Public-Sector Fluency · Right-Sized & Agile · Security & Trust First.
Lead: "Big-firm rigor, small-firm attention."

### 05 Contact — cream tint background
Left: H2 "Let's talk about your mission", short paragraph, email
info@forqi.net (orange underline), "United States · forqi.net".
Right: white bordered form — Name, Organization, Email, Message; underline-only
inputs; solid orange submit. Currently `mailto:`; for production wire to
Formspree or Cloudflare Forms (keeps site static).

### Footer
"© 2026 Forqi LLC" left; anchor links right. Uppercase 11px.

## 7. Responsive breakpoints

- **≤900px**: hero sub and about grids → 1 column; approach 4→2 columns; why
  cards stack; facts stack; service rows drop to number+title / description
  below; hero spark hidden.
- **≤640px**: nav links → hamburger; approach and contact → 1 column; section
  padding 96px→64px.

## 8. Accessibility & quality

WCAG 2.1 AA intent: semantic landmarks (header/nav/section/footer), one h1,
labeled form fields with `required`, `aria-label` on nav and icon-only
controls, `aria-expanded` on hamburger, decorative SVGs `aria-hidden`,
keyboard-reachable interactive elements, contrast-checked palette (orange used
at large/bold sizes or on white). Target Lighthouse ≥95 all categories.

## 9. SEO / metadata

Title "Forqi LLC — Technology & AI Services for Government"; meta description;
Open Graph title/description/type/url; JSON-LD `Organization` schema; SVG
favicon as data URI.

## 10. Hosting & deploy

Any static host: GitHub Pages / Cloudflare Pages / Netlify. No build step —
deploy the folder as-is. Custom domain forqi.net + automatic HTTPS. Post-launch
roadmap: real credentials in strip, case studies section (replacing or joining
Approach), capability statement PDF download, form service integration,
insights/blog if content grows (consider Astro/Eleventy at that point).

# Forqi LLC — Website Specification

Version 3.0 · September 2026 · Live target: **https://forqi.ai**
Source of truth for the current site and for rebuilding it from scratch. The change history
is summarized in §14.

---

## 1. Overview

Forqi LLC is a U.S.-based technology and AI company with **three offerings**, always
presented in this order:

| # | Offering | Audience | Primary CTA |
|---|----------|----------|-------------|
| A | **Qllect®**: Forqi's crowd-sourcing platform for on-demand data generation, user research and annotation | AI teams, product & UX researchers | Explore Qllect / Start a Qllect project |
| B | **Dataset Services**: licensed, consent-based AI training data; featured datasets previewable in the browser, the full catalog on request | Foundation-model labs, applied-AI product teams, robotics & AV | Browse the Catalog → `data.html` |
| C | **AI Consulting**: applied AI, modernization, cloud and advisory | Businesses of every size (startups → enterprise) and the public sector | Talk to a Consultant → `#contact` |

Headline: **"TRUSTED DATA & RESPONSIBLE AI"**. The shared thread is trustworthy data in and
accountable AI out. Qllect produces the data behind the catalog and custom projects.

**Tech:** a fully static, two-page site. No backend, no build step, no frameworks, no
webfonts or CDNs. The only external script is Google Analytics, which loads on
production hosts only (§11).

**Design language:** black-and-white editorial (inspired by newlab.com) warmed with a
Hermès-orange accent: oversized uppercase display type, hairline rules, numbered
sections and bordered grids.

## 2. Files

```
Forqi/                     (repo root = the deployed site)
├── index.html             # homepage
├── data.html              # dataset catalog (featured selection) + preview drawer
├── 404.html               # custom not-found page (served by Vercel for missing paths)
├── spec.md                # this document (not needed at runtime)
├── .gitignore             # keeps *.docx, .DS_Store, .claude/ out of the repo
└── assets/
    ├── site.css           # all styles for both pages
    ├── storefront.js      # preview renderers, drawer, catalog, home widgets, analytics events
    ├── catalog-data.js    # taxonomy + 54 featured datasets + preview samples (edit here)
    ├── logo-spark.svg     # primary mark (also inlined in HTML)
    └── partners/          # partner logos: microsoft, meta, amazon, zoom, ups, visa (.svg)
```

To add or change a dataset, edit only `assets/catalog-data.js`. The catalog, home tiles,
filters and previews all update automatically.

### 404 page (`404.html`)
Vercel serves `/404.html` automatically for any missing path. It uses the site header, footer
and tokens, with absolute asset and link paths (`/assets/site.css`, `/#qllect`) so it renders
correctly at any URL depth. Contents: an "Error 404" label, a large orange **404**, the H1
"PAGE NOT FOUND", and a line showing the missing path with a note that it may have moved in
the forqi.ai relaunch. CTAs: Back to Home / Contact Us. Below that are three destination
cards (Qllect®, Dataset Catalog, AI Consulting). It is marked `noindex` and sends a GA
`page_not_found` event with `page_path` and `page_referrer` (production hosts only).

## 3. Design tokens (`:root` in site.css)

| Token | Value | Use |
|-------|-------|-----|
| `--paper` | `#F6F5F6` | page background |
| `--ink` | `#1A161A` | primary text, heavy rules, dark bands |
| `--ink-soft` | `#565357` | secondary text |
| `--ink-faint` | `#9E9B9E` | tertiary text |
| `--rule` / `--rule-lt` | `#1A161A` / `#C5C1C4` | primary borders / hairlines |
| `--accent` | `#F37021` | Hermès orange: logo, highlights, buttons, annotation overlays |
| `--accent-dk` | `#C4520F` | orange text on tint (contrast) |
| `--tint` | `#FBEEE3` | warm cream: AI Consulting band, catalog note, synthetic-sample badge |
| `--mono` | system mono stack | dataset IDs, preview metadata, schema |

## 4. Typography

System stack `"Helvetica Neue", Helvetica, Arial, sans-serif`. Sizes:

- **Hero H1:** `clamp(42px, 8vw, 104px)`, weight 800, uppercase.
- **Section H2:** `clamp(30px, 4.5vw, 54px)`, weight 700.
- **Section labels:** 11px tracked uppercase, with the index number in orange and a trailing hairline.
- **Bento stat numbers:** `clamp(44px, 6vw, 80px)`, weight 500.
- **Mono** for dataset IDs.

## 5. Logo: "Spark"

A radial burst of 12 rays in a 100×100 viewBox with round caps: 6 long orange rays at
0/60/…/300° (50,8→50,30) and 6 short ink rays at 30/90/…/330° (50,18→50,30), stroke 7
(8 at nav size). It means the moment raw data becomes insight.

Placements:
- **Nav:** 30px, beside the "FORQI" wordmark.
- **Favicon:** inline data URI.
- **Hero decoration:** 118px, top-right, hidden at ≤900px.

"Qllect" is written with ® via `<sup class="reg">`. Use ® only while the mark is registered;
use ™ if registration is pending.

## 6. Homepage (`index.html`): structure & copy

**Header** (sticky): Spark + FORQI; links: Qllect® · Datasets · AI Consulting · About ·
**Contact Us** (orange CTA). At ≤760px a hamburger menu appears, which also includes
Data Catalog.

Section order:

1. **Hero**
   - H1 "TRUSTED DATA / & **RESPONSIBLE AI**".
   - Sub copy names all three offerings.
   - CTAs: "Talk to Us" (solid) and "About Forqi".
   - **Three cards** (`.pillars.three`), each with a kicker, 3 bullets and 2 CTAs:
     - **A · Qllect®** (featured, dark card): data collection · user research · annotation/RLHF.
     - **B · Dataset Services**: LLM, speech, vision, driving, robotics… · full catalog on request or custom-built with Qllect · perpetual or term licenses.
     - **C · AI Consulting**: analytics · modernization/cloud · readiness/governance.
2. **Orange strip:** U.S.-Based Business · Startups · Enterprise · Public Sector · Licensed &
   Consent-Based Data · Responsible AI Practices.
3. **01 Qllect® Platform** (`#qllect`): "Human intelligence, on demand".
   - **Bento stats** (`.bento`): a 2-column grid whose right tile (`.stat.glow`, ink with an orange radial glow) spans 2 rows. Stats:
     - **2.2M** Registered contributors
     - **150+** Markets (glow tile)
     - **200+** Languages & dialects
     - **110K+** Domain experts
     - **50+** Industries
   - **Capabilities** Q.01–Q.06: Data Generation · User Research · Annotation & RLHF · Targeted Recruiting · Quality Engine · Consent & Payouts.
   - **Flow:** Define → Recruit → Collect → Verify → Deliver, then "Start a Qllect project".
4. **02 Dataset Services** (`#data`): "AI training data, ready to license".
   - Copy says the catalog covers nine major domains and many more datasets than are shown online. The rest is available on request, and anything not ready-made is built with Qllect.
   - **Compact domain tiles** (9, rendered from catalog-data.js, each labeled "Featured datasets" → `data.html#cat=<id>`).
   - **Services:** D.01 Off-the-Shelf Datasets · D.02 Custom Cuts & Extensions (via Qllect) · D.03 Evaluation Samples (NDA) · D.04 Synthetic Data & Augmentation.
   - **Buttons:** "Preview a sample" (opens the LLM-03 drawer) and "Browse the Catalog".
5. **03 AI Consulting** (`#consulting`, tint background): "Practical AI that delivers results".
   - Audience: startups, SMBs, enterprises and public sector.
   - **Services:** C.01 AI & Data Analytics · C.02 Digital Modernization · C.03 Cloud & Infrastructure · C.04 Advisory & Strategy.
   - **"How we work":** Listen & Assess → Design & Prove → Build & Deliver → Transfer & Support, then "Talk to a Consultant".
6. **04 Why Forqi** (`#why`, dark band): "Why teams choose us / Big-firm rigor, small-firm attention."
   - Cards: Data You Can Audit · Business & Public-Sector Fluency · Right-Sized & Agile · Security & Trust First.
7. **05 About Forqi** (`#about`): one company with three offerings that reinforce each other.
   - Facts: Data-Grounded · Enterprise & Government-Ready · Responsible AI.
8. **06 Contact** (`#contact`): "Let's talk".
   - **Email:** **partner@forqi.ai** (large, orange underline).
   - **Details list** (`.contact-details`):
     - **Address:** 522 W Riverside Ave, Ste N, Spokane, WA 99201
     - **Phone:** (425) 955-9388, a `tel:+14259559388` link
     - **Web:** forqi.ai
   - **Form** (`mailto:partner@forqi.ai`): Name, Organization, Email, "I'm interested in" select with 3 option groups, and "How can we help?":
     - *Qllect®:* data generation / user research / annotation-RLHF-evaluation
     - *Dataset Services:* licensing / custom cut or extension
     - *AI Consulting:* analytics / modernization-cloud / readiness-strategy
9. **Partners & Clients** (`#partners`, just above the footer): "Working alongside industry leaders".
   - A **single-row, full-bleed logo carousel**: Microsoft · Meta · Amazon · Zoom · UPS · Lowe's · Visa.
   - Behavior: continuous scroll (42s loop), faded edges (mask), pauses on hover. Under `prefers-reduced-motion` it becomes a static wrapped row.
   - Logos show in **grey** (`grayscale(1) brightness(.55)`) and stay grey on hover.
   - The track holds the list 4× (copies `aria-hidden`), with two identical halves so the loop is seamless on wide screens.
   - Each slot loads `assets/partners/<slug>.svg` and falls back to a text wordmark (Lowe's currently uses the wordmark).
10. **Footer:** © 2026 Forqi LLC; links: Qllect® · Datasets · Data Catalog · AI Consulting · About · Contact.

## 7. Catalog page (`data.html`)

- **Header:** Qllect® · Datasets (current) · AI Consulting · **Contact Us**.
- **Hero:** "THE FORQI / **DATA STOREFRONT**". Copy: the catalog runs beyond what fits on one page; this is a featured selection; the rest is on request; anything not ready-made is generated with Qllect®.
- **Filter bar** (sticky on desktop, static on mobile with sideways-scrolling chips): *All domains* plus the 9 domain chips, **without counts**. **There is no search box.**
- **Result line:** "Featured datasets · <domain | all domains> — more available on request".
- **Catalog note** (`.catalog-note`, tint): "Featured selection…" · "Nothing ready-made? Qllect® can collect and annotate…" · "Ask about the full catalog" button.
- **Dataset cards**, grouped by domain: ID, name, summary, volume, coverage, formats, task tags, **Preview sample** and **Request** (a `mailto:partner@forqi.ai` link prefilled with the dataset ID).
- **Preview drawer** (right-side dialog, full-width on mobile):
  - Tabs: Sample preview · Schema · Specs & licensing.
  - Footer: "Download sample JSON" (client-side Blob) and "Request this dataset".
  - Closes with Esc, the backdrop or ✕; focus returns to the trigger.
- **Deep links:** `data.html#cat=speech` filters to a domain; `data.html#SPE-02` opens that preview.
- **Disclaimer:** volumes are indicative, previews are synthetic records, and fuller samples are shared under NDA.
- **Closing band:** "Don't see it? We'll build it." on Qllect®, with a pilot batch first.

## 8. Dataset taxonomy (9 domains · 54 featured datasets)

The taxonomy was benchmarked against Nexdata, Appen, Shaip, TELUS Digital, Defined.ai and
Datarade.

| # | Domain | Featured datasets |
|---|--------|-------------------|
| 01 | LLM Training & Alignment | Pre-training corpus · SFT · RLHF/DPO · STEM reasoning · Code · Agent/tool-use · Multilingual exam QA · Safety/red-team |
| 02 | Speech & Audio | Scripted ASR · Conversational/call-center · Studio TTS · Wake word · Far-field/in-car · Sound events · Lexicons |
| 03 | Computer Vision | Detection · Pose · Segmentation · Retail shelf · Aerial · Face liveness · Gesture/hand |
| 04 | Multimodal & Generative Media | Image–caption · VQA · Video–text · Image-editing · Character-consistent video · Interleaved docs |
| 05 | Autonomous Driving & ADAS | Surround-camera · LiDAR · Signs/signals · Lanes · DMS/OMS · Scenarios |
| 06 | Embodied AI & Robotics | Egocentric video · Manipulation (VLA) · 3D hand pose · Motion capture |
| 07 | Documents & OCR | Scene text · Handwriting · Forms/invoices (KIE) · Table structure |
| 08 | NLP & Language Resources | Intent/slot · NER · Sentiment · Parallel corpora · Search relevance |
| 09 | Industry Verticals | Medical dictation · Clinical notes · Medical imaging · Financial QA · Legal · Customer service · E-commerce |

**Dataset record fields:** `id` (e.g. `SPE-02`), `cat`, `name`, `summary`, `volume`
(indicative), `languages`, `formats[]`, `tasks[]`, `spec{}`, `schema[]`
(`[field, type, description]`), `preview{kind,…}`.

**Preview kinds** (all generated inline as SVG/HTML with a seeded PRNG, so there are no image files and no network calls):

| Kind | What it shows | Used for |
|------|---------------|----------|
| `chat` | Turns, with chosen/rejected/note styling | LLM & dialog data |
| `table` | Sample rows | Tabular data |
| `json` | Highlighted records | Structured records |
| `audio` | Waveform, segments, animated playhead and segment table | Speech & audio |
| `image` | SVG scene with boxes, polygons, polylines, keypoints and hand skeleton | CV, OCR, medical imaging |
| `frames` | Video frames | Video, driving sequences, image-editing pairs |
| `lidar` | Bird's-eye-view points and cuboids | LiDAR |
| `spans` | Entity highlights | Intent/slot, NER, clinical, legal |

Every preview carries a "Synthetic sample · illustrates schema & format" badge.

## 9. Honesty & content rules

- **Catalog size:** the site presents the 54 datasets as a featured selection of a larger catalog but **never states a total**. Add one only once it is confirmed.
- **Volumes and previews:** volumes are labeled indicative, and previews are labeled synthetic. Never present sample records as real data.
- **Qllect stats:** the 2.2M / 150+ / 200+ / 110K+ / 50+ figures are confirmed by Forqi. Update them here and in `index.html` together.
- **Partners:** list only companies Forqi actually works with, with permission to show their logo. Before launch, replace the open-source library SVGs (Iconify "logos" / Simple Icons) with official brand-kit files, and add `lowes.svg`.

## 10. Responsive breakpoints

| Width | Changes |
|-------|---------|
| ≤900px | Pillars, practice headers, about and partner headers stack to 1 column; tiles and cards go to 2 columns; capabilities 2 columns; flow 2×; catalog note stacks; hero spark hidden |
| ≤760px | Nav becomes the hamburger menu; catalog toolbar is no longer sticky; chips scroll sideways |
| ≤640px | Everything is 1 column (bento, capabilities, cards, contact); section padding goes from 96px to 64px; logo tiles 160×76 |

Verified: no horizontal scroll at 390px.

## 11. Analytics: GA4 `G-6EF2BJPP9G`

**Production-only loading.** The `<head>` snippet on both pages loads GA only when
`location.hostname` matches `forqi.ai` or `forqi.net` (`GA_HOSTS`). Elsewhere (localhost,
`file://`, preview deploys) `gtag` is a no-op stub that logs to `console.debug`, so nothing is
counted. Update `GA_HOSTS` if the site moves.

**Custom events** are sent by `track()` in `storefront.js`. They never include personal data (names, emails, message text).

| Event | Params | Fires when |
|-------|--------|-----------|
| `dataset_preview_open` | dataset_id, dataset_name, dataset_category, source (catalog_card / home_button / home_feature / deep_link) | Drawer opens |
| `dataset_preview_tab` | dataset_id, tab | Drawer tab clicked |
| `sample_download` | dataset_id, dataset_category | "Download sample JSON" |
| `dataset_request_click` | dataset_id, dataset_category, location (catalog_card / preview_modal) | Request links |
| `catalog_filter` | dataset_category | Domain chip clicked |
| `cta_click` | cta_text, location, link_url | Any `.btn` / nav CTA (outside the drawer and cards) |
| `contact_click` | method (email / phone), location | mailto: / tel: links |
| `contact_form_submit` | interest, offering | Contact form submitted |
| `generate_lead` | lead_source, offering | Same moment (GA4 recommended event) |
| `page_not_found` | page_path, page_referrer | 404 page viewed |

**GA4 admin setup:**
- Register `dataset_id`, `dataset_category`, `source`, `location`, `offering`, `interest` and `cta_text` as event-scoped custom dimensions.
- Mark `generate_lead` (and optionally `dataset_request_click`) as key events.

## 12. Accessibility & SEO

- **Accessibility:** WCAG 2.1 AA intent.
  - Landmarks, and one h1 per page.
  - Labeled fields.
  - Drawer: `aria-modal` dialog with labelled tabs (`aria-selected`).
  - Chips: `aria-pressed`; result line is `aria-live`.
  - SVG previews: `role="img"` with labels.
  - Visible focus rings; Esc closes the drawer.
  - Carousel: duplicate slides `aria-hidden`; reduced-motion supported.
- **SEO:**
  - **Home title:** "Forqi LLC — Qllect® Crowd Data Platform, AI Datasets & AI Consulting"; meta and OG copy name all three offerings.
  - **Home JSON-LD:** `Organization` with email, telephone and `PostalAddress` (Spokane, WA 99201).
  - **Catalog title:** "Data Catalog — Forqi AI Training Datasets"; JSON-LD `DataCatalog`.
  - **Domain:** all URLs and emails use `forqi.ai` / `partner@forqi.ai`.

## 13. Deployment & roadmap

**Deploy** the repo root as-is to any static host (GitHub Pages, Cloudflare Pages, Netlify).
There is no build step. Only `index.html`, `data.html`, `404.html` and `assets/` are served content. Point
`forqi.ai` at the host with HTTPS, and redirect `forqi.net` → `forqi.ai`.

**Repo:** `github.com/wdcn/Forqi`, branch `master`.

**Before or after launch:**
- Wire the forms to a form service (Formspree / Cloudflare Forms). They currently use `mailto:`.
- Replace the partner logos with official files and add Lowe's.
- Confirm the Qllect® trademark status (® vs ™) and add a Qllect link if it has its own site.
- Add a privacy policy page, plus a cookie-consent banner if targeting EU/UK visitors.
- Replace indicative dataset volumes with confirmed inventory.
- **Optional:** per-dataset static pages for SEO; real audio clips in speech previews; datasheet PDFs; marketplace listings (Datarade, Snowflake, Databricks).

## 14. Change history

| Version | Changes |
|---------|---------|
| v1.0 | Original single-page site: government/public-sector AI consultancy ("Technology & AI for the Public Good") |
| v2.0 | Data-first repositioning; `data.html` catalog with 54 datasets across 9 domains and in-browser previews |
| v2.1–2.2 | Balanced data + consulting homepage; consulting broadened to all business sizes + public sector; partners section added |
| v2.3 | Three-offering structure led by **Qllect®**; bento stats; capabilities and project flow |
| v2.4 | Domain moved to **forqi.ai** / **partner@forqi.ai**; strip reworded; partner carousel; section reorder |
| v2.5 | Confirmed Qllect figures; carousel moved below Contact and reduced to one row |
| v2.6 | Partner logos (Microsoft, Meta, Amazon, Zoom, UPS, Lowe's, Visa) in grey |
| v2.7 | Spokane address and phone in Contact + JSON-LD |
| v2.8 | Catalog search removed; datasets framed as a featured selection, full catalog on request, Qllect for anything missing |
| v2.9 | GA4 limited to production hosts; custom engagement events |
| v3.0 | Balanced site promoted to repo root; alternate versions removed; `.gitignore` added; this spec consolidated |
| v3.1 | Custom `404.html` page |

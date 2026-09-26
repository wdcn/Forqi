# Forqi LLC — Website Specification

Version 3.0 · September 2026 · **Main site** (formerly `versionDual`; the `versionData` variant was retired).
The body below records how the site evolved from v2.1 to v2.9. Anything it does not override
(design tokens, typography, logo, dataset taxonomy and schema, preview renderers, `data.html`
behavior, accessibility) is defined in **Appendix A**.



## 1. Positioning

Forqi is **one company with two equal practices**:

| | A · Data Services | B · AI Consulting |
|---|---|---|
| Audience | AI/ML teams: model labs, applied-AI product teams, robotics & AV | Businesses of every size (startups, SMBs, enterprises) and the public sector |
| Offer | Licensed, previewable training data; custom collection; annotation/RLHF/eval; synthetic data | AI & data analytics, digital modernization, cloud & infrastructure, advisory & strategy |
| Primary CTA | Browse the Catalog → `data.html` | Talk to a Consultant → `#contact` |

Headline: **"TRUSTED DATA & RESPONSIBLE AI"**. The two halves map to the two
practices. The shared thread: trustworthy data in, accountable AI out.
Consulting copy is sector-neutral: "business or mission", "customer- or
citizen-service", "industry and regulatory requirements".

**Balance rules:** neither practice gets more screen weight above the fold.
Each gets its own numbered section of similar length. The nav shows both
practices by name, and the contact form covers both.

## 2. Files

```
Forqi/
├── index.html          # dual-practice homepage (this spec)
├── data.html           # dataset catalog (featured selection) + preview drawer
├── spec.md
└── assets/             # site.css, storefront.js, catalog-data.js, logo-spark.svg, partners/*.svg
```

## 3. Homepage structure

Header nav: About · Data Services · AI Consulting · Why Forqi · **Contact Us**
(orange). The mobile menu adds Data Catalog.

1. **Hero:** H1 "TRUSTED DATA / & **RESPONSIBLE AI**"; the sub copy names both
   practices. CTAs are neutral: "Talk to Us" and "About Forqi".
   Below them, two **equal pillar cards** in a shared bordered grid:
   - **A · Data Services** (for AI/ML teams): 3 bullets; CTAs Browse the
     Catalog / Learn more.
   - **B · AI Consulting** (for government & public sector): 3 bullets; CTAs
     Talk to a Consultant / Learn more.
2. **Strip:** U.S.-Based Small Business · Startups · Enterprise · Public Sector ·
   Licensed & Consent-Based Data · Responsible AI Practices.
2b. **Partners & Clients** (unnumbered, ★ label): H2 "Working alongside industry
   leaders". Tier 1 = 2 large cells (Microsoft, Meta). Tier 2 = 4×2 grid (8 slots,
   currently placeholders "Partner 01–08"), greyscale until hover. Each slot loads
   `assets/partners/<slug>.svg` and falls back to a text wordmark if the file is
   missing. **Before launch:** use only official logo files, supplied under each
   company's brand/partner guidelines, and only list organizations Forqi has a real
   partner or client relationship with (written permission to display the logo).
3. **01 About Forqi:** one company, two practices that strengthen each other.
   Facts: Data-Grounded / Government-Ready / Responsible AI.
4. **02 Data Services** (paper background): practice header with audience
   note; **compact** 3×3 domain tiles (name and count only, linked to
   `data.html#cat=…`); service rows D.01–D.04; "Preview a sample" (opens the
   LLM-03 drawer) + "Browse the Catalog".
5. **03 AI Consulting** (tint background, a visual counterweight to section 02):
   practice header ("Practical AI that delivers results", audience: startups,
   SMBs, enterprises, public sector); service rows C.01–C.04 (sector-neutral); the 4-step "How we work" approach (Listen & Assess → Design & Prove →
   Build & Deliver → Transfer & Support); "Talk to a Consultant".
6. **04 Why Forqi (dark):** Data You Can Audit · Business & Public-Sector Fluency ·
   Right-Sized & Agile · Security & Trust First. Lead: "Big-firm rigor,
   small-firm attention."
7. **05 Contact (paper):** "Let's talk"; the "I'm interested in" select has two
   optgroups: Data Services (license / collect / annotate) and AI Consulting
   (analytics / modernization-cloud / readiness-strategy).

## 4. New CSS (end of `assets/site.css`)

`.pillars` / `.pillar` (2-col bordered cards with kicker, list, actions),
`.cat-grid.compact` (tiles without blurbs), `.practice-head` (title + audience
note), `.sub-h` (small section sub-label), `.partners` / `.logos.tier1|tier2` /
`.logo-slot` / `.wordmark` (partner grid). ≤900px: pillars and practice-head
stack to 1 column.

## 5. SEO

Title: "Forqi LLC — AI Training Data & AI Consulting". Meta and OG copy
name both practices. JSON-LD `Organization` description covers both.


## 6. v2.3 — Three offerings: Qllect® · Dataset Services · AI Consulting

The site now has **three offerings**, in this order everywhere (nav, hero cards,
sections, contact form, footer):

1. **Qllect®**: Forqi's crowd-sourcing platform for on-demand data generation,
   user research and annotation. It is the featured (dark) hero card.
2. **Dataset Services**: the licensed, previewable catalog (`data.html`).
3. **AI Consulting**: for businesses of every size and the public sector.

Nav: Qllect® · Datasets · AI Consulting · About · **Contact Us**.
Section order: Hero (3 cards) → Strip → Partners & Clients → 01 About →
**02 Qllect® Platform** → 03 Dataset Services → 04 AI Consulting → 05 Why Forqi
→ 06 Contact.

### 02 Qllect® Platform (`#qllect`)
- H2 "Human intelligence, on demand"; audience: AI teams, product & UX
  researchers, anyone who needs human input at scale.
- **Bento stats** (`.bento`; layout modeled on the reference screenshot): 2-col
  grid, with the right tile (`.stat.glow`, ink + orange radial glow) spanning 2 rows.
  Stats: 2.2M registered contributors · 150+ markets · 200+ languages & dialects ·
  110K+ domain experts · 50+ industries (confirmed figures, placeholders removed).
  Values with class `.ph` are **placeholders** and show a dashed "placeholder"
  badge. Replace with real Qllect figures, then remove the `ph` class.
- **Capabilities** (Q.01–Q.06): Data Generation · User Research · Annotation &
  RLHF · Targeted Recruiting · Quality Engine · Consent & Payouts.
- **Flow:** Define → Recruit → Collect → Verify → Deliver; CTA "Start a Qllect project".

### Dataset Services changes
Custom collection and annotation moved to Qllect. The service rows are now
D.01 Off-the-Shelf Datasets · D.02 Custom Cuts & Extensions (via Qllect) ·
D.03 Evaluation Samples · D.04 Synthetic Data & Augmentation.

### Trademark
"Qllect" is shown with ® (`<sup class="reg">`). Use ® only while the mark is
registered. If registration is pending, use ™.

## 7. v2.4 changes

- **Domain & email:** every `forqi.net` is now `forqi.ai`; the contact address is
  `partner@forqi.ai` (applied site-wide).
- **Strip:** U.S.-Based Business · Startups · Enterprise · Public Sector ·
  Licensed & Consent-Based Data · Responsible AI Practices.
- **Partners & Clients:** now a two-row, full-bleed logo carousel. The rows
  scroll continuously in opposite directions (42 s / 48 s), with greyscale logos
  in white tiles, edges faded with a mask, and a pause on hover. It stops and
  wraps into a static grid under `prefers-reduced-motion`. Each row repeats its
  logos twice (the copy is `aria-hidden`) so the loop is seamless. Slots load
  `assets/partners/<slug>.svg` and fall back to text wordmarks. Current slots:
  Microsoft, Meta, Partner 01–10 (placeholders). List only confirmed
  partners or clients, and only with permission to show their logo.
- **Section order:** Hero → Strip → Partners carousel → 01 Qllect® Platform →
  02 Dataset Services → 03 AI Consulting → 04 Why Forqi → 05 About Forqi →
  06 Contact. The nav stays Qllect® · Datasets · AI Consulting · About · Contact Us.

## 8. v2.5 changes
- Qllect bento stats use confirmed figures: **2.2M** registered contributors ·
  **150+** markets (glow tile) · **200+** languages & dialects · **110K+** domain
  experts · **50+** industries. Placeholder badges removed.
- Partners carousel moved to **after Contact** (just above the footer) and
  reduced to **one row** of logos.

## 9. v2.6 — Partner logos
Carousel logos (confirmed by Forqi): Microsoft · Meta · Amazon · Zoom · UPS ·
Lowe's · Visa. SVGs are in `assets/partners/`, taken from the open-source
Iconify "logos" and Simple Icons sets. They render grey
(`grayscale + brightness(.55)`) and stay grey on hover. `lowes.svg` is not
included (no open-source file was available), so it shows as a text wordmark until
the official file is added. Before launch, replace the files with each company's
official brand-kit versions where the partner program provides them.

## 10. v2.7: Contact details
The Contact section lists **Address:** 522 W Riverside Ave, Ste N, Spokane, WA 99201 ·
**Phone:** (425) 955-9388 (a tap-to-call `tel:` link) · **Web:** forqi.ai. These appear in a
`.contact-details` definition list under the email. The address and phone are also
added to the JSON-LD `Organization` (`PostalAddress`, `telephone`) for search.

## 11. v2.8: Catalog framing
- **Search removed** from `data.html`. Only the domain filter chips remain, and they
  no longer show counts.
- The copy now presents the 54 on-site datasets as a **featured selection** of a larger
  catalog: more datasets are available on request, and anything not ready-made can be
  built with Qllect®. This appears in the catalog hero copy, a new `.catalog-note` banner
  under the filter bar ("Ask about the full catalog" CTA), the result line ("Featured
  datasets · … — more available on request"), the homepage Dataset Services lead, the
  pillar card and the store-foot line. Domain tiles say "Featured datasets" instead of a count.
- No specific total catalog size is stated anywhere. Add one only once it is confirmed.

## 12. v2.9: Analytics (GA4 `G-6EF2BJPP9G`)
**Production-only loading.** The gtag snippet in every page's `<head>` loads GA only
when `location.hostname` matches `forqi.ai` or `forqi.net` (`GA_HOSTS`). On
localhost, `file://` and preview hosts, `gtag` is a no-op stub that logs to
`console.debug`, so nothing is sent. This applies to both pages.

**Custom events** (`track()` in `assets/storefront.js`; no personal data is ever sent):

| Event | Params | Fires when |
|---|---|---|
| `dataset_preview_open` | dataset_id, dataset_name, dataset_category, source (catalog_card / home_button / home_feature / deep_link) | Preview drawer opens |
| `dataset_preview_tab` | dataset_id, tab | Drawer tab clicked (sample / schema / spec) |
| `sample_download` | dataset_id, dataset_category | "Download sample JSON" clicked |
| `dataset_request_click` | dataset_id, dataset_category, location (catalog_card / preview_modal) | "Request" / "Request this dataset" clicked |
| `catalog_filter` | dataset_category | Domain filter chip clicked |
| `cta_click` | cta_text, location (section id / hero / header / footer), link_url | Any `.btn` or nav CTA clicked (outside the drawer and cards) |
| `contact_click` | method (email / phone), location | mailto: or tel: link clicked |
| `contact_form_submit` | interest, offering (Qllect® / Dataset Services / AI Consulting) | Contact form submitted |
| `generate_lead` | lead_source, offering | Same moment, GA4 recommended lead event |

GA4 setup: register `dataset_id`, `dataset_category`, `source`, `location`, `offering`,
`interest` and `cta_text` as event-scoped **custom dimensions**, and mark
`generate_lead` (and optionally `dataset_request_click`) as **key events**.

---

# Appendix A — Base specification (v2.0, data-first)

Version 2.0 · September 2026 (supersedes v1.0, July 2026)
Live target: https://forqi.ai
Source of truth for rebuilding the site from scratch.

### A.1. Overview

Forqi is repositioned as a **data-first** company: an AI training-data
storefront for AI/ML teams, with custom data services and AI advisory
(the original public-sector consultancy) as supporting offers.

The site is a static, responsive, two-page marketing site with a browsable
data catalog and an in-browser **sample preview** for every dataset.
Still no backend, CMS, build step, frameworks, webfonts or CDNs (the one
external script is the existing Google Analytics tag).

Design language unchanged: black-and-white editorial (inspired by newlab.com)
warmed with a Hermès-orange accent; oversized uppercase display type, hairline
rules, numbered sections, bordered grids.

### A.2. Files

```
Forqi/
├── index.html              # home: positioning, storefront highlight, services, contact
├── data.html               # data catalog: filters, search, dataset cards, preview drawer
├── spec.md                 # this document
└── assets/
    ├── site.css            # shared styles (both pages)
    ├── catalog-data.js     # taxonomy + all datasets + preview samples (edit here)
    ├── storefront.js       # renderers, preview drawer, catalog + home widgets
    └── logo-spark.svg      # primary mark (also inlined in HTML)
```

To add or change a dataset, edit only `assets/catalog-data.js`. Both pages
pick up the change: home tile counts, the catalog, filters and previews.

### A.3. Design tokens

Same as v1, plus two new tokens:

| Token        | Value     | Use                                          |
|--------------|-----------|----------------------------------------------|
| `--paper`    | `#F6F5F6` | page background                              |
| `--ink`      | `#1A161A` | primary text, heavy rules, dark band         |
| `--ink-soft` | `#565357` | secondary text                               |
| `--ink-faint`| `#9E9B9E` | tertiary text                                |
| `--rule`     | `#1A161A` | primary borders (1px)                        |
| `--rule-lt`  | `#C5C1C4` | hairline borders                             |
| `--accent`   | `#F37021` | Hermès orange: logo, highlights, buttons, annotation overlays |
| `--accent-dk`| `#C4520F` | orange text on tint (contrast)               |
| `--tint`     | `#FBEEE3` | contact band, synthetic-sample badge, entity highlights |
| `--mono`     | system mono stack | dataset IDs, preview metadata, schema |

Annotation overlays in previews use orange for labels and ink (dashed) for
secondary regions, which keeps the two-color brand inside the data.

### A.4. Typography

Unchanged from v1 (system Helvetica stack; H1 `clamp(42px,8vw,104px)`/800
uppercase; H2 `clamp(30px,4.5vw,54px)`/700; 11px tracked labels). Additions:
the catalog H1 is `clamp(38px,6.4vw,84px)`, and dataset IDs and preview metadata
are set in the system monospace font.

### A.5. Logo — "Spark"

Unchanged from v1. New meaning: the moment raw data becomes insight.
Hero spark is now 118px, offset above the headline so it clears line 2.

### A.6. Positioning & messaging

- **Who:** AI/ML teams (foundation-model labs, applied-AI product teams,
  robotics/AV companies, enterprise AI groups).
- **Promise:** "AI-ready data for better models."
- **Proof pillars:** Sample-first (preview every dataset) · Provenance on
  record (consent + license docs) · Quality you can measure · Pipeline-ready formats.
- **Supporting offers:** custom collection, annotation/RLHF/evaluation,
  synthetic data, AI solutions and advisory (public sector and enterprise).
- **Honesty rules:** volumes are labeled *indicative*; every in-browser preview
  is labeled *synthetic sample*. Do not present sample records as real data,
  and do not publish volume figures as guarantees.

### A.7. Data taxonomy (9 domains · 54 datasets)

Benchmarked against the published catalogs of Nexdata, Appen, Shaip, TELUS
Digital, Defined.ai and Datarade. The structure mixes modality and use case,
which is how buyers search.

| # | Domain | Datasets |
|---|--------|----------|
| 01 | LLM Training & Alignment | Pre-training corpus · SFT pairs · RLHF/DPO preferences · STEM reasoning · Code · Agent/tool-use trajectories · Multilingual exam QA · Safety/red-team |
| 02 | Speech & Audio | Scripted ASR · Conversational/call-center · Studio TTS · Wake word · Far-field/in-car · Sound events · Pronunciation lexicons |
| 03 | Computer Vision | Object detection · Human pose · Segmentation · Retail shelf · Aerial/satellite · Face liveness · Gesture/hand |
| 04 | Multimodal & Generative Media | Image–caption · VQA · Video–text · Image-editing triplets · Character-consistent video · Interleaved docs |
| 05 | Autonomous Driving & ADAS | Surround-camera · LiDAR cuboids · Signs/signals · Lanes/drivable area · DMS/OMS · Scenarios/trajectories |
| 06 | Embodied AI & Robotics | Egocentric multi-cam · Robot manipulation (VLA) · 3D hand pose · Motion capture |
| 07 | Documents & OCR | Scene text · Handwriting · Forms/receipts/invoices (KIE) · Table structure |
| 08 | NLP & Language Resources | Intent & slot · NER · Sentiment/emotion · Parallel corpora · Search relevance |
| 09 | Industry Verticals | Medical dictation · Clinical notes + coding · Medical imaging · Financial QA · Legal contracts · Customer-service dialogs · E-commerce product data |

### Dataset record (catalog-data.js)

`id` (e.g. `SPE-02`), `cat`, `name`, `summary`, `volume` (indicative),
`languages`, `formats[]`, `tasks[]`, `spec{}` (key specs), `schema[]`
(`[field, type, description]`), `preview{ kind, … }`.

### Preview kinds (storefront.js renderers)

| kind     | Renders | Used for |
|----------|---------|----------|
| `chat`   | Role-tagged turns; `chosen`/`rejected`/`note` styles | SFT, RLHF, code, support dialogs |
| `table`  | Bordered sample-rows table (+ optional note) | QA, lexicons, metadata-style sets |
| `json`   | Syntax-highlighted records | Corpora, trajectories, interleaved docs |
| `audio`  | Deterministic waveform, labeled segments, animated playhead, segment table | All speech/audio |
| `image`  | SVG scene (street, road, indoor, shelf, aerial, doc, plain, scan) + boxes / polygons / polylines / keypoints / hand skeleton | CV, OCR, medical imaging, lanes |
| `frames` | 2–4 SVG frames with timestamps and captions | Video, driving sequences, editing pairs |
| `lidar`  | Procedural BEV point cloud + oriented cuboids | LiDAR |
| `spans`  | Inline entity highlights with type labels | Intent/slot, NER, clinical, legal |

All preview graphics are generated inline (SVG, seeded PRNG). There are no
image files and no network calls, so previews look the same on every load.

### A.8. Page structure & copy

### Header (both pages)
Spark + FORQI; links: Data Catalog · Services · How It Works · Why Forqi ·
**Request Data** (orange pill). ≤760px: hamburger menu.

### index.html
1. **Hero:** H1 "AI-READY DATA / *for* **BETTER MODELS**"; sub copy on the
   storefront + sample-first; CTAs "Browse the Catalog" (solid, → data.html)
   and "Request Custom Data"; stats row: 9 domains · N+ datasets (live count) ·
   70+ languages · 100% previewable.
2. **Strip:** Licensed & Consent-Based · Human-Verified QA · Privacy-First
   De-identification · Custom Collection On Demand.
3. **01 Data Storefront:** 3×3 domain tiles (code, name, blurb, dataset count,
   link to `data.html#cat=<id>`), a "Browse all datasets" CTA, then a
   **Sample-first** block: chips for 6 featured datasets with a live inline
   preview and an "Open full preview" button.
4. **02 About Forqi:** data-company statement; facts: Sample-First /
   Provenance on Record / Pipeline-Ready.
5. **03 Services:** S.01 Off-the-Shelf Datasets · S.02 Custom Data Collection ·
   S.03 Annotation, RLHF & Evaluation · S.04 Synthetic Data & Augmentation ·
   S.05 AI Solutions & Advisory.
6. **04 How It Works:** Browse & Preview → Scope & Evaluate (NDA sample) →
   License & Deliver → Extend & Refresh.
7. **05 Why Forqi (dark):** Provenance You Can Audit · Quality You Can
   Measure · Fits Your Pipeline · Global & Bilingual.
8. **06 Request Data (tint):** fields Name, Company, Work email, Data interest
   (select populated from the taxonomy), Use case. Form still uses `mailto:`.

### data.html
- Catalog hero ("The Forqi Data Storefront").
- Sticky toolbar with domain filter chips (with counts) and full-text search
  (name, summary, languages, formats, tasks, specs). On mobile the toolbar is
  not sticky and the chips scroll sideways.
- Datasets grouped by domain; each card shows ID, name, summary, volume,
  coverage, formats, task tags, **Preview sample** and **Request** (a `mailto:`
  link prefilled with the dataset ID).
- **Preview drawer** (right-side dialog, full-width on mobile). Tabs: Sample
  preview · Schema · Specs & licensing. Footer: "Download sample JSON"
  (client-side Blob) and "Request this dataset". Closes with Esc, the backdrop
  or ✕; focus returns to the trigger.
- Deep links: `data.html#cat=speech` filters to a domain; `data.html#SPE-02`
  opens that preview.
- Disclaimer paragraph (indicative volumes, synthetic previews, NDA samples)
  and a "Don't see it? We'll build it." custom-data band.

### A.9. Responsive breakpoints

- **≤900px:** grids go to 2 columns (tiles, dataset cards, why); hero-sub,
  about and feature stack; stats 2×2; hero spark hidden.
- **≤760px:** nav collapses to the hamburger.
- **≤640px:** everything is 1 column; section padding goes from 96px to 64px;
  drawer padding shrinks.
- Verified: no horizontal scroll at 390px.

### A.10. Accessibility & quality

WCAG 2.1 AA intent: landmarks, one h1 per page, labeled fields, dialog with
`aria-modal` + labelled title, tabs with `aria-selected`, filter chips with
`aria-pressed`, live result count (`aria-live`), SVG previews with
`role="img"` and labels, visible focus rings, Esc to close. Previews are
deterministic, so screenshots and regression tests stay stable.

### A.11. SEO / metadata

- Home title: "Forqi — AI Training Data Storefront & Data Services"; JSON-LD `Organization`.
- Catalog title: "Data Catalog — Forqi AI Training Datasets"; JSON-LD `DataCatalog`.
- OG tags on both pages; SVG favicon data URI.

### A.12. Hosting, deploy & roadmap

Any static host (GitHub Pages / Cloudflare Pages / Netlify); deploy the folder
as-is.

Roadmap:
- Replace indicative volumes with confirmed inventory.
- Wire the forms to Formspree / Cloudflare Forms, including dataset ID.
- Gated "evaluation sample" download behind an email form.
- Per-dataset static pages (`/data/SPE-02.html`) for SEO; consider Astro or
  Eleventy generated from `catalog-data.js`.
- Real audio clips for speech previews.
- Datasheet PDF per dataset.
- Add listings to Datarade, Snowflake and Databricks marketplaces.


---

## Deployment (v3.0)
The main site is the repo root: `index.html`, `data.html` and `assets/`. There is no build
step, so deploy the folder as-is to any static host. `spec.md`, `.gitignore`d files and
anything else outside those paths is not part of the site. Point `forqi.ai` at the host
with HTTPS. GA only loads on `forqi.ai` / `forqi.net` (see §12).

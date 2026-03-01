# CozyStream — UX Case Study Brief

> **Handoff document for portfolio site build.** This contains the narrative, copy, section structure, and media specifications for a long-scroll case study page. Build it as a single page with generous whitespace, large imagery, and clear typographic hierarchy.

---

## Meta

- **Project:** CozyStream — A self-hosted media streaming platform
- **Role:** Designer & Engineer (solo)
- **Timeline:** Ongoing (2025–present)
- **Status:** Work in progress, actively in development
- **Platforms:** Web, Smart TV (LG webOS / Samsung Tizen), macOS desktop (Electron)
- **Stack:** Angular, Tailwind CSS, Node.js/Fastify, SQLite, FFmpeg

---

## Page Structure & Content

### SECTION 1: Hero

**Layout:** Full-width looping video of the app in use — browsing the library, opening a detail page, starting playback. Title and subtitle overlaid or positioned below the video. Keep it short (15-20 seconds, seamless loop).

**Video:** `[VIDEO: hero-walkthrough]` — Screen recording showing: browse page → scroll through posters → click into a movie detail page → hit play. Dark theme. Smooth, unhurried pace.

**Headline:**
> CozyStream

**Subheadline:**
> A self-hosted media server I designed and built for my household — and my partner's parents across town.

**Quick stats row** (small, muted):
- Solo designer & engineer
- Web, TV, and desktop apps
- Deeply customizable UI
- Built with Claude Code

---

### SECTION 2: The Problem

**Section title:** Why not just use Plex?

**Copy:**

When I started looking for a way to share my movie library with my partner and her parents, Plex was the obvious option. I tried it, and pretty quickly realized it wasn't what I wanted.

The home screen was full of things I didn't ask for — recommendations, free ad-supported movies mixed in with my own library, and a layout that felt more like a streaming service than a personal collection. Streaming remotely requires a paid subscription. And the whole thing runs through Plex's cloud — your account, your metadata, your viewing activity, all going through their servers.

I just wanted something simple. A clean way to browse my movies, share them with a few people, and keep everything local. So I started designing one.

**Visual:** `[SCREENSHOT: browse-main]` — Browse page, dark theme, populated library. Caption: *"Just my library. Nothing else."*

---

### SECTION 3: Who It's For

**Section title:** Three users, three contexts

**Copy:**

I'm designing for three people, and they all use the app differently.

**Me** — I'm the admin. I add movies, organize collections, tweak the metadata, and adjust settings. I want that experience to be fast and not annoying.

**My partner** — She just wants to find something to watch. She should be able to open the app, scroll through, pick a movie, and play it. Resume where she left off. That's it.

**Her parents** — They're not technical. They'd use it on their LG TV with a remote. Big text, simple navigation, no error messages about file formats. If it doesn't just work, they'll call us.

These three perspectives shaped almost every decision in the app.

---

### SECTION 4: Design Goals

**Layout:** Short list, no extra explanation needed.

1. **The library is the UI.** Posters front and center, minimal chrome around them.
2. **Zero learning curve.** If you've used Netflix, you already know how this works.
3. **Built for a TV remote.** If it works with four arrow keys and an OK button, it works for everyone.
4. **Make it feel like yours.** Themes, colors, fonts, spacing — the whole look is adjustable. A personal media server should feel personal.

---

### SECTION 5: Making It Customizable

**Section title:** The UI should feel like yours

**Copy:**

This is something I care about a lot and plan to keep building on. A media server is something you look at regularly — it should look the way you want it to.

Right now, CozyStream has six color themes (each with dark and light modes), eight accent colors plus a custom color picker, four independent font controls for different parts of the UI, and layout settings for card size, spacing, corner radius, and row density. Every change applies instantly — no save buttons, no page reloads.

There's also a DVD Case mode that swaps the flat poster grid for 3D cases with spines. Hovering lifts the poster to reveal a label underneath. It's not more functional than the default grid, but it gives the library a physical, tactile feel that I like.

The accent color picker has a built-in contrast checker. If your color doesn't read well against the background, it tells you and suggests alternatives. Small thing, but accessibility should be baked in even when it's a personal project.

This is one of the areas I want to keep pushing. More layout options, more ways to make the browse experience feel different from person to person.

**Screenshots:**
- `[SCREENSHOT: settings-appearance]` — Appearance settings: theme grid, accent picker, font options.
- `[SCREENSHOT: theme-comparison]` — Three side-by-side crops of the browse page in different theme/accent combos.
- `[SCREENSHOT: dvd-case-mode]` — DVD Case mode with a card in hover state.

---

### SECTION 6: Key Screens

**Section title:** How it comes together

**Layout:** Each screen gets a short paragraph and a screenshot or video.

---

#### Browse

The browse page is a poster grid organized into rows — some manually curated collections ("Studio Ghibli," "Watch with Mom"), some auto-generated by genre, director, or decade. No sidebar, no algorithmic recommendations. Cards show watch progress and favorites at a glance, with edit and play actions on hover.

**Screenshot:** `[SCREENSHOT: browse-collections]` — Browse page showing collection rows with scroll arrows, and the "All Movies" grid below.

---

#### Detail Page

Three layout options: a full-bleed backdrop image, a contained poster header, or no image at all. All three keep the same information hierarchy — title, genres, metadata, description, play button, then credits below. Backdrop mode has blur and tint controls so you can tune readability depending on the image.

**Screenshot:** `[SCREENSHOT: detail-backdrop]` — Backdrop layout with a movie showing genre pills, play/resume buttons, and cast credits.

---

#### Player

Controls auto-hide during playback and reappear on mouse movement. Progress bar is thin at rest, expands on hover. For files the browser can't play natively, the server transcodes to HLS on the fly with FFmpeg — the user just presses play.

**Video:** `[VIDEO: player-demo]` — Short screen recording (8-10 sec) showing: controls appearing on mouse move, scrubbing the progress bar, then controls fading out. More engaging than a static screenshot for this section.

---

#### Smart TV

The TV app is built for remote control navigation. Spatial focus management moves a visible focus ring between elements with arrow keys. Rows scroll horizontally as focus moves. The layout follows the Netflix/Roku carousel pattern intentionally — on a TV, familiar is better than clever.

It runs as a web app inside LG's webOS and Samsung's Tizen browsers, which are constrained environments. That meant simpler animations, fewer DOM nodes, and testing on actual hardware.

**Screenshots:**
- `[SCREENSHOT: tv-browse]` — TV browse with horizontal carousels and a visible focus ring.
- `[SCREENSHOT: tv-detail]` — TV detail page with backdrop, poster, metadata, and action buttons.

---

### SECTION 7: Building with Claude

**Section title:** How I built it this fast

**Copy:**

I designed CozyStream and I built it — with Claude Code handling a lot of the implementation speed. Having an AI tool that can work across the full stack (Angular components, Node.js routes, FFmpeg transcoding, SQLite queries) meant I could move from a design idea to a working feature in a single sitting.

The design decisions — the layout system, the customization approach, the TV navigation patterns, the information hierarchy — those are mine. Claude's role was letting me execute on them quickly. Instead of spending hours debugging a CSS 3D transform for DVD case mode or wiring up HLS transcoding, I could describe what I needed and stay focused on the design problem.

It's a workflow I'd use again. Design the experience, then build it fast enough that you can actually use it and refine it the same day.

---

### SECTION 8: What's Next

**Section title:** Still building

**Copy:**

CozyStream is a work in progress. The core flow — browse, watch, customize — works across web and TV. Here's what I'm focused on next:

- Getting it in front of my actual users (my partner and her parents) and redesigning based on their feedback
- A guided onboarding flow so first-time setup doesn't require technical knowledge
- A real responsive pass for phone and tablet
- More customization options — I want to keep expanding what you can change about how the UI looks and feels
- An accessibility audit beyond the contrast checker

---

## Media Capture Guide

### Videos

| ID | Content | Duration | Notes |
|---|---|---|---|
| `hero-walkthrough` | Browse → scroll → open detail → play | 15-20 sec loop | Smooth, unhurried. Dark theme, red accent. 1440px wide. This is the first thing people see. |
| `player-demo` | Mouse move to reveal controls → scrub progress bar → controls fade | 8-10 sec | Can be a GIF or short video. Shows the player is real, not a mockup. |

### Screenshots

All captured at **1440px wide** (1920px for TV), **dark theme** unless noted.

| ID | Screen | State / Notes |
|---|---|---|
| `browse-main` | Browse page | Populated library, progress bars visible on 1-2 cards. Used in the Problem section. |
| `browse-collections` | Browse page | Showing collection rows with scroll arrows and the full grid below. |
| `dvd-case-mode` | Browse page | DVD Case mode on, at least one card hovering with poster lifted. |
| `settings-appearance` | Settings → Appearance | Theme grid, accent picker, font options all visible. |
| `theme-comparison` | Browse page (composited) | 3 crops, same scroll position: (1) Default + red, (2) Midnight + blue, (3) Ember + orange. |
| `detail-backdrop` | Detail page | Backdrop layout, rich image, genre pills, play button, credits below. |
| `tv-browse` | TV Browse | Horizontal carousels, focus ring on one card. 1920x1080. |
| `tv-detail` | TV Detail | Backdrop, poster, metadata, action buttons. 1920x1080. |

### Optional

| ID | Screen | Notes |
|---|---|---|
| `settings-layout` | Settings → Layout tab | Card size, spacing, browse style options |
| `detail-poster-header` | Detail page | Poster Header mode for comparison |
| `login` | Login page | Clean centered form |
| `tv-player` | TV Player | Controls visible with skip buttons |

### Tips

- Use real movies with good poster art. The visual quality of the posters directly affects how polished this looks.
- For the theme comparison, keep the same scroll position across all three so they're directly comparable.
- For TV screenshots, set the viewport to exactly 1920x1080 and use the TV app at localhost:4201.
- The hero video is the most important asset — take time to get a smooth, natural recording.

---

## Design Specs for the Portfolio Page

**Tone:** Clean and direct. Not a slide deck, not a blog post. A well-paced long read that lets the visuals do most of the work.

**Layout:**
- Max content width ~720-800px for text
- Images/videos break wider (up to ~1200px or full-bleed)
- Alternate between text and full-width media to create rhythm
- Design Goals works well as a simple list or small card grid

**Typography:**
- Comfortable reading size (18-20px body)
- Generous line height (1.6-1.75)
- Muted secondary text for captions and metadata

**Color:**
- Neutral portfolio page background — don't theme it to match CozyStream
- Dark background works well so the dark-themed screenshots sit naturally

---

## Handoff Notes

1. Use the copy as-is or lightly edited for voice consistency with the rest of the portfolio
2. Replace `[SCREENSHOT: id]` and `[VIDEO: id]` placeholders with actual media assets
3. Adapt the design specs to fit the portfolio's existing design system
4. The Claude section should feel matter-of-fact, not promotional — it's about workflow, not the tool
5. The "Still building" section matters — it shows this is a living project

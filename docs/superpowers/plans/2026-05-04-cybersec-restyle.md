# Cybersec Portfolio Restyle — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle Alessio's Astro portfolio from a generic dark theme to a professional cybersec/terminal aesthetic that reflects a fullstack engineer transitioning into cybersecurity.

**Architecture:** New CSS design system with cyber design tokens, GSAP-powered terminal boot splash, monospace font system (JetBrains Mono + Inter), neon glow accents, terminal window chrome on cards, and glitch/scan animations throughout, just making sure the screen is not bombarded with a lot of moving objects. All i18n/nanostores logic is untouched — only visuals change.

**Tech Stack:** Astro 5, GSAP 3 (existing), Tailwind CSS 4 (existing), CSS custom properties, Google Fonts (JetBrains Mono + Inter replacing Roboto Flex)

---

## File Structure

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `src/styles/global.css` | Cyber design tokens, animation keyframes, utility classes |
| Modify | `src/layouts/Layout.astro` | Swap fonts to JetBrains Mono + Inter |
| Modify | `src/components/splash.astro` | Terminal boot animation sequence |
| Modify | `src/components/navbar.astro` | Monospace nav, green accent, `[SECURE]` status badge |
| Modify | `src/components/hero.astro` | Glitch name, terminal prompt prefix, grid background, cursor blink |
| Modify | `src/components/footer.astro` | Sysinfo-style footer (version, status, uptime) |
| Modify | `src/pages/about.astro` | Terminal-window section headers, cyber tech stack cards |
| Modify | `src/pages/projects.astro` | Project cards with terminal window chrome |
| Modify | `src/pages/blog.astro` | Cyber blog post cards |
| Modify | `src/pages/contact.astro` | Terminal-style contact form and sidebar |

---

## Task 1: Cybersec Design System (global.css)

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Replace global.css with new cyber design system**

Full replacement of `src/styles/global.css`:

```css
/* ============================================================
   CYBERSEC DESIGN SYSTEM — global.css
   ============================================================ */
:root {
  /* Backgrounds */
  --bg-primary: #050a0e;
  --bg-surface: #0a1520;
  --bg-surface-2: #0d1f2d;
  --bg-surface-3: #112233;

  /* Brand accents */
  --cyber-green: #00ff41;
  --cyber-green-dim: rgba(0, 255, 65, 0.5);
  --cyber-cyan: #00d4ff;
  --cyber-cyan-dim: rgba(0, 212, 255, 0.5);
  --cyber-red: #ff003c;
  --cyber-red-dim: rgba(255, 0, 60, 0.5);
  --cyber-yellow: #ffd700;

  /* Text */
  --text-primary: #e8f4f8;
  --text-secondary: #7a9bb5;
  --text-dim: rgba(232, 244, 248, 0.4);

  /* Borders */
  --border-green: rgba(0, 255, 65, 0.18);
  --border-cyan: rgba(0, 212, 255, 0.18);
  --border-dim: rgba(232, 244, 248, 0.06);

  /* Glows */
  --glow-green: 0 0 8px rgba(0, 255, 65, 0.35), 0 0 30px rgba(0, 255, 65, 0.08);
  --glow-cyan: 0 0 8px rgba(0, 212, 255, 0.35), 0 0 30px rgba(0, 212, 255, 0.08);
  --glow-red: 0 0 8px rgba(255, 0, 60, 0.35), 0 0 30px rgba(255, 0, 60, 0.08);

  /* Typography */
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;
  --font-main: var(--font-mono); /* legacy alias */

  /* Legacy color aliases — keeps old components working during restyle */
  --gordian-blue: var(--cyber-cyan);
  --gordian-red: var(--cyber-red);
  --gordian-black: var(--bg-primary);
  --gordian-white: var(--text-primary);
  --gordian-text: var(--text-secondary);
}

/* Base styles */
body {
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  margin: 0;
  padding: 80px 0 0;
  font-family: var(--font-body);
}

/* Subtle scanlines overlay */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.025) 2px,
    rgba(0, 0, 0, 0.025) 4px
  );
  pointer-events: none;
  z-index: 9998;
}

/* ── Animations ────────────────────────────────────────────── */

@keyframes glitch {
  0%, 85%, 100% {
    transform: translate(0);
    text-shadow: none;
  }
  86% {
    transform: translate(-3px, 0);
    text-shadow: 3px 0 var(--cyber-cyan);
  }
  88% {
    transform: translate(3px, 0);
    text-shadow: -3px 0 var(--cyber-red);
  }
  90% {
    transform: translate(-2px, 1px);
    text-shadow: 2px 0 var(--cyber-cyan);
  }
  92% {
    transform: translate(0);
    text-shadow: none;
  }
}

@keyframes cursor-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

@keyframes scan-down {
  0% { top: -2px; }
  100% { top: 100%; }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: var(--glow-green); }
  50% { box-shadow: 0 0 16px rgba(0, 255, 65, 0.6), 0 0 60px rgba(0, 255, 65, 0.15); }
}

@keyframes terminal-type {
  from { max-width: 0; }
  to   { max-width: 100%; }
}

/* ── Utility classes ───────────────────────────────────────── */

.text-green  { color: var(--cyber-green); }
.text-cyan   { color: var(--cyber-cyan); }
.text-red    { color: var(--cyber-red); }
.text-dim    { color: var(--text-dim); }
.text-blue   { color: var(--cyber-cyan); } /* legacy */
.text-red-legacy { color: var(--cyber-red); } /* legacy */

/* Blinking cursor element */
.cursor {
  display: inline-block;
  width: 10px;
  height: 1.1em;
  background: var(--cyber-green);
  margin-left: 3px;
  vertical-align: text-bottom;
  animation: cursor-blink 1s step-end infinite;
}

/* Cyber card — terminal window style */
.cyber-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-green);
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}

.cyber-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--cyber-green), transparent);
}

/* Terminal window chrome (title bar) */
.terminal-chrome {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: var(--bg-surface-2);
  border-bottom: 1px solid var(--border-dim);
}

.terminal-chrome .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.terminal-chrome .dot-red    { background: #ff5f57; }
.terminal-chrome .dot-yellow { background: #febc2e; }
.terminal-chrome .dot-green  { background: #28c840; }

.terminal-chrome .chrome-title {
  margin-left: 8px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-secondary);
  letter-spacing: 0.03em;
}

/* Status badge */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: var(--cyber-green);
  border: 1px solid var(--border-green);
  border-radius: 3px;
  padding: 2px 8px;
}

.status-badge::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--cyber-green);
  box-shadow: 0 0 6px var(--cyber-green);
  animation: cursor-blink 2s ease-in-out infinite;
}

/* Section header with terminal prefix */
.section-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: var(--cyber-green);
  text-transform: uppercase;
  margin-bottom: 8px;
}

.section-label::before {
  content: '> ';
}
```

- [ ] **Step 2: Start dev server and verify no layout breaks**

```bash
npm run dev
```

Open `http://localhost:4321`. Background should now be `#050a0e` (very dark navy-black). All text should still render. Body font will update after Task 2.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: replace design tokens with cybersec color system and animation keyframes"
```

---

## Task 2: Font System (Layout.astro)

**Files:**
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Replace font preload/stylesheet links in Layout.astro**

Find the Google Fonts block (lines 29–31 in current file). Replace the Roboto Flex links with JetBrains Mono + Inter:

```astro
<!-- Google Fonts: JetBrains Mono (mono/headings) + Inter (body) -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" media="print" onload="this.media='all'" />
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" /></noscript>
```

Remove the three old Roboto Flex `<link>` tags (preload, stylesheet, noscript).

Also remove the `<link rel="preconnect" href="https://fonts.googleapis.com" />` and `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />` that are already in the file at lines 24–25 (they'll be duplicated by the block above — keep only one set of preconnects).

The complete `<head>` in Layout.astro should end up as:

```astro
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width" />
  {description && <meta name="description" content={description} />}
  <title>{title}</title>

  <meta http-equiv="X-Content-Type-Options" content="nosniff" />
  <meta name="referrer" content="strict-origin-when-cross-origin" />
  <meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />

  <link rel="icon" type="image/png" href="/favicon.png" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" media="print" onload="this.media='all'" />
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" /></noscript>

  <!-- Font Awesome icons -->
  <link rel="preload" as="style" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" media="print" onload="this.media='all'" />
  <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" /></noscript>

  <style is:inline>
    body { opacity: 0; transition: opacity 0.35s ease-in; }
    body.page-ready { opacity: 1; }
  </style>
</head>
```

- [ ] **Step 2: Verify fonts load in browser**

Open `http://localhost:4321`. Open DevTools → Network → filter "fonts.gstatic". Confirm `JetBrains+Mono` and `Inter` appear. Text should render in monospace (JetBrains Mono) for nav links, Inter for body.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: swap fonts from Roboto Flex to JetBrains Mono + Inter for cybersec aesthetic"
```

---

## Task 3: Terminal Boot Splash (splash.astro)

**Files:**
- Modify: `src/components/splash.astro`

- [ ] **Step 1: Replace splash.astro with terminal boot sequence**

Full replacement of `src/components/splash.astro`:

```astro
---
// Terminal boot splash — replaces logo animation
---

<div id="splash-overlay">
  <div class="terminal-boot">
    <div class="boot-header">
      <span class="dot dot-red"></span>
      <span class="dot dot-yellow"></span>
      <span class="dot dot-green"></span>
      <span class="boot-title">boot.sh — alessio@portfolio:~</span>
    </div>
    <div class="boot-body">
      <div class="boot-line" id="bl-0">
        <span class="prompt">root@portfolio:~$</span>
        <span class="cmd"> ./init.sh --mode=secure</span>
      </div>
      <div class="boot-line hidden" id="bl-1">&gt; Initializing system kernel...</div>
      <div class="boot-line hidden" id="bl-2">
        &gt; Loading security modules&nbsp;&nbsp;&nbsp;
        <span class="progress-bar" id="progress-bar"></span>
        <span class="ok hidden" id="ok-modules">[OK]</span>
      </div>
      <div class="boot-line hidden" id="bl-3">&gt; Verifying TLS certificates&nbsp;&nbsp;&nbsp;<span class="ok">[VERIFIED]</span></div>
      <div class="boot-line hidden" id="bl-4">&gt; Mounting encrypted volumes&nbsp;&nbsp;<span class="ok">[MOUNTED]</span></div>
      <div class="boot-line hidden" id="bl-5">&gt; Establishing secure channel&nbsp;&nbsp;<span class="ok">[ENCRYPTED]</span></div>
      <div class="boot-line hidden accent" id="bl-6">&gt; ACCESS GRANTED<span class="cursor-boot"></span></div>
    </div>
  </div>
</div>

<style>
  :global(body.loading) {
    overflow: hidden;
  }

  #splash-overlay {
    position: fixed;
    inset: 0;
    background: #050a0e;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .terminal-boot {
    width: min(560px, 90vw);
    background: #0a1520;
    border: 1px solid rgba(0, 255, 65, 0.25);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 40px rgba(0, 255, 65, 0.08), 0 0 80px rgba(0, 0, 0, 0.6);
  }

  .boot-header {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 14px;
    background: #0d1f2d;
    border-bottom: 1px solid rgba(232, 244, 248, 0.06);
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .dot-red    { background: #ff5f57; }
  .dot-yellow { background: #febc2e; }
  .dot-green  { background: #28c840; }

  .boot-title {
    margin-left: 8px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    color: #7a9bb5;
  }

  .boot-body {
    padding: 20px 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-height: 200px;
  }

  .boot-line {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.82rem;
    color: #7a9bb5;
    white-space: nowrap;
    opacity: 1;
  }

  .boot-line.hidden {
    opacity: 0;
  }

  .boot-line .prompt {
    color: #00ff41;
    font-weight: 700;
  }

  .boot-line .cmd {
    color: #e8f4f8;
  }

  .boot-line.accent {
    color: #00ff41;
    font-weight: 700;
    font-size: 0.9rem;
    margin-top: 8px;
  }

  .ok {
    color: #00ff41;
    font-weight: 700;
  }

  .ok.hidden {
    opacity: 0;
  }

  .progress-bar {
    color: #00ff41;
    font-size: 0.75rem;
    letter-spacing: -1px;
  }

  .cursor-boot {
    display: inline-block;
    width: 9px;
    height: 1em;
    background: #00ff41;
    margin-left: 4px;
    vertical-align: text-bottom;
    animation: cursor-blink 1s step-end infinite;
  }
</style>

<!-- Hide immediately if already seen this session -->
<script is:inline>
  if (sessionStorage.getItem('splashSeen')) {
    document.getElementById('splash-overlay').style.display = 'none';
  }
</script>

<script>
  import { gsap } from 'gsap';

  const hasSeenSplash = sessionStorage.getItem('splashSeen');

  if (hasSeenSplash) {
    window.dispatchEvent(new Event('splash-finished'));
  } else {
    document.body.classList.add('loading');

    const PROGRESS_CHARS = '████████████████';
    const progressEl = document.getElementById('progress-bar')!;
    const okModules = document.getElementById('ok-modules')!;

    // Animate progress bar character by character
    function animateProgress(onDone: () => void) {
      let i = 0;
      const interval = setInterval(() => {
        progressEl.textContent = PROGRESS_CHARS.slice(0, i + 1);
        i++;
        if (i >= PROGRESS_CHARS.length) {
          clearInterval(interval);
          onDone();
        }
      }, 60);
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to('#splash-overlay', {
          opacity: 0,
          duration: 0.6,
          delay: 0.5,
          onComplete: () => {
            const overlay = document.getElementById('splash-overlay');
            if (overlay) overlay.style.display = 'none';
            document.body.classList.remove('loading');
            sessionStorage.setItem('splashSeen', 'true');
            window.dispatchEvent(new Event('splash-finished'));
          }
        });
      }
    });

    tl
      .to('#bl-1', { opacity: 1, duration: 0 }, 0.3)
      .to('#bl-2', { opacity: 1, duration: 0, onComplete: () => {
        animateProgress(() => {
          gsap.to('#ok-modules', { opacity: 1, duration: 0.1 });
        });
      }}, 0.7)
      .to('#bl-3', { opacity: 1, duration: 0 }, 1.9)
      .to('#bl-4', { opacity: 1, duration: 0 }, 2.4)
      .to('#bl-5', { opacity: 1, duration: 0 }, 2.9)
      .to('#bl-6', { opacity: 1, duration: 0 }, 3.4);
  }
</script>
```

- [ ] **Step 2: Verify terminal boot renders correctly**

Open `http://localhost:4321` in a new private/incognito window (so sessionStorage is empty). The terminal boot window should appear centered on black bg, lines reveal sequentially, progress bar fills, then fades out to reveal the site.

To re-test without private mode: run this in DevTools console: `sessionStorage.removeItem('splashSeen')` then refresh.

- [ ] **Step 3: Commit**

```bash
git add src/components/splash.astro
git commit -m "feat: replace logo splash with GSAP terminal boot sequence"
```

---

## Task 4: Cybersec Navbar (navbar.astro)

**Files:**
- Modify: `src/components/navbar.astro`

- [ ] **Step 1: Update navbar HTML to add status badge and cyber structure**

Replace the nav HTML (between `<nav>` tags, keeping the `<script>` and LanguageSwitcher import):

```astro
---
import LanguageSwitcher from './LanguageSwitcher.tsx';
---

<nav class="site-nav">
  <a href="/" class="logo-link">
    <span class="nav-logo">AM</span>
    <span class="nav-logo-sub">_portfolio</span>
  </a>

  <button class="hamburger" id="nav-toggle" aria-label="Toggle navigation">
    <span></span>
    <span></span>
    <span></span>
  </button>

  <div class="nav-right" id="nav-menu">
    <div class="nav-links">
      <a href="/about" data-i18n="nav.about">About Me</a>
      <a href="/services" data-i18n="nav.services">Services</a>
      <a href="/projects" data-i18n="nav.projects">Projects</a>
      <a href="/blog" data-i18n="nav.blog">Blog</a>
      <a href="/contact" data-i18n="nav.contact">Contact</a>
    </div>
    <div class="nav-extras">
      <LanguageSwitcher client:load />
      <span class="status-badge">[SECURE]</span>
    </div>
  </div>
</nav>
```

- [ ] **Step 2: Replace the entire `<style is:global>` block in navbar.astro**

```css
<style is:global>
  .site-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 10px 5%;
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    background: rgba(5, 10, 14, 0.92);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(0, 255, 65, 0.12);
  }

  /* Logo */
  .nav-logo {
    font-family: var(--font-mono);
    font-weight: 800;
    font-size: 1.1rem;
    color: var(--cyber-green);
    letter-spacing: -0.02em;
    text-shadow: var(--glow-green);
  }
  .nav-logo-sub {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-left: 1px;
  }
  .logo-link {
    text-decoration: none;
    display: flex;
    align-items: baseline;
    gap: 0;
  }

  /* Nav right */
  .site-nav .nav-right {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .nav-extras {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  /* Nav links */
  .site-nav .nav-links {
    display: flex;
    gap: 4px;
  }

  .site-nav .nav-links a {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-secondary);
    text-decoration: none;
    padding: 6px 10px;
    border-radius: 4px;
    border: 1px solid transparent;
    transition: color 0.2s, border-color 0.2s, background 0.2s;
    position: relative;
  }

  .site-nav .nav-links a::before {
    content: '> ';
    color: var(--cyber-green);
    opacity: 0;
    transition: opacity 0.2s;
  }

  .site-nav .nav-links a:hover {
    color: var(--cyber-green);
    border-color: var(--border-green);
    background: rgba(0, 255, 65, 0.04);
  }

  .site-nav .nav-links a:hover::before {
    opacity: 1;
  }

  /* Status badge */
  .status-badge {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: var(--cyber-green);
    border: 1px solid var(--border-green);
    border-radius: 3px;
    padding: 3px 8px;
    white-space: nowrap;
    text-shadow: 0 0 8px var(--cyber-green);
  }

  /* Language switcher overrides */
  .lang-switcher {
    display: flex;
    gap: 3px;
    background: rgba(0, 255, 65, 0.04);
    border-radius: 4px;
    padding: 2px;
    border: 1px solid var(--border-dim);
  }

  .lang-btn {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    padding: 4px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    background: transparent;
    color: var(--text-secondary);
    transition: background 0.2s, color 0.2s;
  }

  .lang-btn:hover { color: var(--cyber-green); }

  .lang-btn.active {
    background: var(--cyber-green);
    color: #050a0e;
    font-weight: 800;
  }

  /* Hamburger */
  .site-nav .hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    background: none;
    border: 1px solid var(--border-dim);
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    z-index: 1100;
  }

  .site-nav .hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--cyber-green);
    transition: transform 0.3s, opacity 0.3s;
  }

  .site-nav .hamburger.active span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  .site-nav .hamburger.active span:nth-child(2) {
    opacity: 0;
  }
  .site-nav .hamburger.active span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  /* Mobile */
  @media (max-width: 768px) {
    .site-nav .hamburger { display: flex; }

    .site-nav .nav-right {
      display: none;
      position: fixed;
      inset: 0;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      padding-top: 80px;
      background: rgba(5, 10, 14, 0.98);
      backdrop-filter: blur(20px);
      z-index: 1050;
    }

    .site-nav .nav-right.open { display: flex; }

    .site-nav .nav-links {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .site-nav .nav-links a {
      font-size: 1.1rem;
      color: var(--text-primary);
    }

    .nav-extras {
      flex-direction: column;
      gap: 16px;
    }
  }
</style>
```

- [ ] **Step 3: Verify navbar in browser**

Check: green `AM_portfolio` logo, dim uppercase monospace links, `[SECURE]` badge visible, green hover effect with `> ` prefix. Mobile hamburger opens full-screen overlay.

- [ ] **Step 4: Commit**

```bash
git add src/components/navbar.astro
git commit -m "feat: restyle navbar with cybersec terminal aesthetic — mono font, green accent, [SECURE] badge"
```

---

## Task 5: Glitch Hero (hero.astro)

**Files:**
- Modify: `src/components/hero.astro`

- [ ] **Step 1: Replace hero.astro HTML and styles**

Full replacement of `src/components/hero.astro`:

```astro
<section class="hero-section">
  <!-- Subtle grid background -->
  <div class="hero-grid" aria-hidden="true"></div>

  <!-- Scanning line effect -->
  <div class="scan-line" aria-hidden="true"></div>

  <div class="content">
    <!-- Terminal prompt line -->
    <div class="terminal-prompt">
      <span class="prompt-user">alessio</span><span class="prompt-sep">@</span><span class="prompt-host">portfolio</span><span class="prompt-colon">:</span><span class="prompt-path">~/</span><span class="prompt-dollar">$</span>
      <span class="prompt-cmd"> whoami</span>
    </div>

    <!-- Glitch name -->
    <h1 class="name glitch" data-text="Alessio Miccichè" data-i18n="hero.name">Alessio Miccichè</h1>

    <!-- Roles -->
    <div class="roles">
      <span class="role-green" data-i18n="hero.role1">Full Stack Engineer</span>
      <span class="role-sep">|</span>
      <span class="role-cyan" data-i18n="hero.role2">Aspiring CyberSec</span>
    </div>

    <!-- Bio -->
    <p class="bio" data-i18n-html="hero.bio">
      Dedicated to <span class="role-cyan">untangling</span> complex digital challenges through logic and design.
      I bridge the gap between development and protection to create systems that are
      <span class="role-green">secure by default</span> and scalable by nature.
    </p>

    <!-- CTA -->
    <a href="/contact" class="cta-btn">
      <span class="cta-prefix">&gt;_</span>
      <span data-i18n="hero.contactLink">Contact Me</span>
    </a>
  </div>

  <!-- Watermark -->
  <div class="bg-watermark" aria-hidden="true" data-i18n="hero.watermark">Hello World;</div>
</section>

<style>
  .hero-section {
    position: relative;
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5%;
    overflow: hidden;
    box-sizing: border-box;
  }

  /* Dot-grid background */
  .hero-grid {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(0, 255, 65, 0.08) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
  }

  /* Scanning line */
  .scan-line {
    position: absolute;
    left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 65, 0.4), transparent);
    animation: scan-down 6s linear infinite;
    pointer-events: none;
    z-index: 1;
  }

  .content {
    position: relative;
    z-index: 2;
    max-width: 900px;
    width: 100%;
    text-align: left;
    transform: translateY(-6vh);
  }

  /* Terminal prompt line */
  .terminal-prompt {
    font-family: var(--font-mono);
    font-size: clamp(0.75rem, 1.2vw, 0.9rem);
    margin-bottom: 16px;
    opacity: 0.8;
  }

  .prompt-user  { color: var(--cyber-green); font-weight: 700; }
  .prompt-sep   { color: var(--text-secondary); }
  .prompt-host  { color: var(--cyber-cyan); }
  .prompt-colon { color: var(--text-secondary); }
  .prompt-path  { color: var(--cyber-cyan); }
  .prompt-dollar { color: var(--text-secondary); }
  .prompt-cmd   { color: var(--text-primary); }

  /* Glitch name */
  .name {
    font-family: var(--font-mono);
    font-weight: 800;
    font-size: clamp(2.5rem, 8vw, 7rem);
    color: var(--text-primary);
    margin: 0 0 4px;
    line-height: 0.9;
    letter-spacing: -0.03em;
    word-break: break-word;
    overflow-wrap: break-word;
    animation: glitch 8s ease-in-out infinite;
  }

  /* Roles */
  .roles {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 20px 0 12px;
    font-family: var(--font-mono);
    font-size: clamp(0.82rem, 1.4vw, 1rem);
    font-weight: 500;
    letter-spacing: 0.08em;
    flex-wrap: wrap;
  }

  .role-green { color: var(--cyber-green); text-shadow: var(--glow-green); }
  .role-cyan  { color: var(--cyber-cyan); }
  .role-sep   { color: var(--text-dim); font-size: 1.2em; }

  /* Bio */
  .bio {
    font-family: var(--font-body);
    font-size: clamp(0.95rem, 1.2vw, 1.1rem);
    line-height: 1.7;
    color: var(--text-secondary);
    max-width: 520px;
    margin-bottom: 2.5rem;
  }

  /* CTA button */
  .cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--cyber-green);
    text-decoration: none;
    border: 1px solid var(--border-green);
    border-radius: 4px;
    padding: 10px 20px;
    background: rgba(0, 255, 65, 0.04);
    transition: background 0.25s, box-shadow 0.25s, transform 0.2s;
    letter-spacing: 0.06em;
  }

  .cta-btn:hover {
    background: rgba(0, 255, 65, 0.08);
    box-shadow: var(--glow-green);
    transform: translateX(4px);
  }

  .cta-prefix {
    color: var(--cyber-green);
    font-weight: 800;
  }

  /* Watermark */
  .bg-watermark {
    position: absolute;
    bottom: 0;
    left: -1vw;
    z-index: 1;
    font-family: var(--font-mono);
    font-size: 16vw;
    font-weight: 900;
    line-height: 0.8;
    white-space: nowrap;
    user-select: none;
    pointer-events: none;
    background: linear-gradient(to right, rgba(0, 255, 65, 0.03) 0%, rgba(0, 255, 65, 0.005) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* Mobile */
  @media (max-width: 768px) {
    .hero-section {
      flex-direction: column;
      flex: none;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 3vh 6% 0;
    }

    .content {
      transform: none;
      flex-shrink: 0;
    }

    .name { font-size: clamp(2rem, 10vw, 3.5rem); }

    .roles {
      margin: 1rem 0 0.8rem;
      font-size: clamp(0.75rem, 3vw, 0.9rem);
    }

    .bio {
      font-size: 0.92rem;
      margin-bottom: 2rem;
      max-width: 100%;
    }

    .bg-watermark {
      position: relative;
      bottom: auto; left: auto;
      margin-top: 0;
      font-size: 13vw;
    }
  }

  @media (max-width: 400px) {
    .name { font-size: clamp(1.8rem, 9vw, 2.5rem); }
    .roles { font-size: 0.75rem; }
  }
</style>
```

- [ ] **Step 2: Verify hero in browser**

Confirm:
- Terminal prompt line `alessio@portfolio:~/$ whoami` renders in top of hero
- Name has periodic glitch animation (wait ~8s for cycle)
- Dot-grid fades in from center
- Scan line sweeps down every 6s
- CTA button has green border + slides right on hover

- [ ] **Step 3: Commit**

```bash
git add src/components/hero.astro
git commit -m "feat: restyle hero with glitch animation, terminal prompt, dot-grid background"
```

---

## Task 6: Sysinfo Footer (footer.astro)

**Files:**
- Modify: `src/components/footer.astro`

- [ ] **Step 1: Replace footer.astro**

Full replacement of `src/components/footer.astro`:

```astro
---
const currentYear = new Date().getFullYear();
const buildDate = new Date().toISOString().split('T')[0];
---

<footer class="site-footer">
  <div class="footer-top-bar">
    <span class="ft-label">SYS</span>
    <span class="ft-status"><span class="ft-dot"></span>ONLINE</span>
    <span class="ft-version">v1.0.0</span>
    <span class="ft-build">build: {buildDate}</span>
  </div>

  <div class="footer-container">
    <div class="footer-section">
      <div class="footer-logo-line">
        <span class="footer-handle">AM</span><span class="footer-handle-sub">_portfolio</span>
      </div>
      <p class="footer-tagline" data-i18n="footer.tagline">Full Stack Engineer &amp; Aspiring CyberSec</p>
      <div class="contact-details">
        <a href="mailto:micciche.alessio@outlook.com" class="ft-link">
          <i class="fa-regular fa-envelope"></i>
          micciche.alessio@outlook.com
        </a>
      </div>
    </div>

    <div class="footer-section">
      <h4 class="ft-section-title" data-i18n="footer.navTitle">Navigation</h4>
      <ul class="ft-nav-list">
        <li><a href="/" data-i18n="footer.home">Home</a></li>
        <li><a href="/services" data-i18n="footer.services">Services</a></li>
        <li><a href="/projects" data-i18n="footer.projects">Projects</a></li>
        <li><a href="/about" data-i18n="footer.about">About</a></li>
        <li><a href="/contact" data-i18n="footer.contact">Contact</a></li>
        <li><a href="/faq" data-i18n="footer.faq">FAQ</a></li>
      </ul>
    </div>

    <div class="footer-section">
      <h4 class="ft-section-title" data-i18n="footer.connectTitle">Connect</h4>
      <div class="social-icons">
        <a href="https://github.com/AM1407" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="GitHub">
          <i class="fa-brands fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/alessio-micciche/" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="LinkedIn">
          <i class="fa-brands fa-linkedin"></i>
        </a>
        <a href="mailto:micciche.alessio@outlook.com" class="social-icon" aria-label="Send Email">
          <i class="fa-solid fa-envelope"></i>
        </a>
        <a href="https://github.com/sponsors/AM1407" target="_blank" rel="noopener noreferrer" class="sponsor-btn" aria-label="Sponsor">
          <i class="fa-solid fa-heart"></i>
          <span data-i18n="footer.sponsor">Sponsor</span>
        </a>
      </div>
      <div class="legal-links">
        <a href="/terms" data-i18n="footer.termsLink">Terms</a>
        <a href="/privacy" data-i18n="footer.privacyLink">Privacy</a>
      </div>
      <p class="copyright" data-i18n="footer.copyright">© {currentYear} — Built with Security &amp; Passion</p>
    </div>
  </div>
</footer>

<style>
  .site-footer {
    background: #050a0e;
    border-top: 1px solid rgba(0, 255, 65, 0.12);
    margin-top: 80px;
    color: var(--text-primary);
  }

  /* Top sysinfo bar */
  .footer-top-bar {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 8px 5%;
    background: #0a1520;
    border-bottom: 1px solid var(--border-dim);
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    color: var(--text-secondary);
    flex-wrap: wrap;
  }

  .ft-label {
    color: var(--cyber-green);
    font-weight: 700;
  }

  .ft-status {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--cyber-green);
    font-weight: 600;
  }

  .ft-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--cyber-green);
    box-shadow: 0 0 6px var(--cyber-green);
    animation: cursor-blink 2s ease-in-out infinite;
  }

  .ft-version { color: var(--cyber-cyan); }
  .ft-build   { color: var(--text-dim); }

  /* Main footer grid */
  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 60px 5% 40px;
    display: grid;
    grid-template-columns: 2fr 1fr 1.5fr;
    gap: 60px;
  }

  /* Logo */
  .footer-logo-line {
    margin-bottom: 8px;
  }
  .footer-handle {
    font-family: var(--font-mono);
    font-weight: 800;
    font-size: 1.3rem;
    color: var(--cyber-green);
    letter-spacing: -0.02em;
    text-shadow: var(--glow-green);
  }
  .footer-handle-sub {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-secondary);
  }

  .footer-tagline {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 16px;
    font-family: var(--font-body);
  }

  .ft-link {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s;
    font-family: var(--font-mono);
  }
  .ft-link:hover { color: var(--cyber-green); }

  /* Section headers */
  .ft-section-title {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--cyber-green);
    margin-bottom: 20px;
  }
  .ft-section-title::before { content: '> '; }

  /* Nav list */
  .ft-nav-list {
    list-style: none;
    padding: 0; margin: 0;
  }

  .ft-nav-list a {
    display: inline-block;
    color: var(--text-secondary);
    text-decoration: none;
    font-family: var(--font-body);
    font-size: 0.9rem;
    margin-bottom: 10px;
    transition: color 0.2s, padding-left 0.2s;
  }

  .ft-nav-list a:hover {
    color: var(--cyber-green);
    padding-left: 8px;
  }

  .ft-nav-list a:hover::before {
    content: '> ';
    color: var(--cyber-green);
  }

  /* Social icons */
  .social-icons {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px; height: 36px;
    border-radius: 4px;
    border: 1px solid var(--border-dim);
    color: var(--text-secondary);
    font-size: 1rem;
    text-decoration: none;
    transition: color 0.2s, border-color 0.2s, box-shadow 0.2s;
    font-family: var(--font-mono);
  }

  .social-icon:hover {
    color: var(--cyber-green);
    border-color: var(--border-green);
    box-shadow: var(--glow-green);
  }

  .sponsor-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border: 1px solid var(--border-dim);
    border-radius: 4px;
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.78rem;
    font-family: var(--font-mono);
    letter-spacing: 0.05em;
    transition: color 0.2s, border-color 0.2s;
  }

  .sponsor-btn:hover {
    color: #ff6eb4;
    border-color: rgba(255, 110, 180, 0.3);
  }

  .legal-links {
    margin-top: 24px;
    display: flex;
    gap: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--border-dim);
  }

  .legal-links a {
    color: var(--text-dim);
    text-decoration: none;
    font-size: 0.75rem;
    font-family: var(--font-mono);
    transition: color 0.2s;
  }
  .legal-links a:hover { color: var(--cyber-green); }

  .copyright {
    margin-top: 16px;
    font-size: 0.72rem;
    font-family: var(--font-mono);
    color: var(--text-dim);
  }

  @media (max-width: 768px) {
    .footer-container {
      grid-template-columns: 1fr;
      gap: 36px;
      text-align: center;
    }
    .social-icons { justify-content: center; }
    .legal-links  { justify-content: center; }
    .ft-nav-list a:hover { padding-left: 0; }
  }
</style>
```

- [ ] **Step 2: Verify footer**

Check: green top bar with `SYS | ONLINE | v1.0.0 | build: YYYY-MM-DD`, green `AM_portfolio` logo, green section title prefixes `> Navigation`, hover effects on nav items (slides right, prefixes `> `), social icon green glow on hover.

- [ ] **Step 3: Commit**

```bash
git add src/components/footer.astro
git commit -m "feat: restyle footer with sysinfo top bar and terminal aesthetic"
```

---

## Task 7: About Page (about.astro)

**Files:**
- Modify: `src/pages/about.astro`

- [ ] **Step 1: Replace the `<style>` block in about.astro**

Remove the existing `<style>` block and replace it with:

```css
<style>
  .container {
    max-width: 960px;
    margin: 0 auto;
    padding: 0 24px 80px;
  }

  /* Section titles */
  .section-label {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.15em;
    color: var(--cyber-green);
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .section-label::before { content: '> '; }

  .section-title {
    font-family: var(--font-mono);
    font-weight: 800;
    color: var(--text-primary);
    font-size: clamp(2rem, 4vw, 3rem);
    margin: 0 0 8px;
    letter-spacing: -0.03em;
    line-height: 1;
  }

  .section-subtitle {
    color: var(--text-secondary);
    font-family: var(--font-body);
    font-size: 1rem;
    margin-bottom: 28px;
    line-height: 1.6;
  }

  /* Bio section */
  .about-section {
    padding-top: 24px;
    margin-bottom: 64px;
  }

  .aboutcontent {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 48px;
    margin-top: 28px;
  }

  .about-text { flex: 1; }

  .about-text p {
    color: var(--text-secondary);
    font-family: var(--font-body);
    line-height: 1.8;
    margin-bottom: 16px;
    font-size: 1rem;
  }

  /* Profile picture */
  .profile-pic-wrapper {
    flex-shrink: 0;
    position: relative;
    width: 180px;
    height: 180px;
    border-radius: 6px;
    background: linear-gradient(135deg, var(--cyber-green), var(--cyber-cyan));
    padding: 2px;
    box-shadow: var(--glow-green);
    transition: transform 0.4s, box-shadow 0.4s;
  }

  .profile-pic-wrapper:hover {
    transform: translateY(-4px);
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.5), 0 0 60px rgba(0, 255, 65, 0.15);
  }

  .profile-pic {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    object-fit: cover;
    background: var(--bg-surface);
    display: block;
  }

  /* Tech stack */
  .stack-section { margin-bottom: 64px; }

  .stack-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 12px;
  }

  .stack-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 20px 10px;
    border-radius: 6px;
    cursor: default;
    background: var(--bg-surface);
    border: 1px solid var(--border-dim);
    transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
  }

  .stack-block:hover {
    transform: translateY(-4px);
    border-color: var(--border-green);
    box-shadow: var(--glow-green);
  }

  .stack-block i, .stack-block svg {
    font-size: 1.6rem;
    color: var(--text-secondary);
    fill: var(--text-secondary);
    transition: color 0.25s, fill 0.25s;
    width: 1.6rem;
    height: 1.6rem;
  }

  .stack-block:hover i, .stack-block:hover svg {
    color: var(--cyber-green);
    fill: var(--cyber-green);
    filter: drop-shadow(0 0 6px var(--cyber-green));
  }

  .stack-block svg path { fill: currentColor; }

  .stack-block span {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--text-dim);
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transition: color 0.25s;
  }

  .stack-block:hover span { color: var(--cyber-green); }

  /* Why cards */
  .why-section { margin-bottom: 20px; }

  .why-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .why-card {
    padding: 28px 24px;
    border-radius: 6px;
    background: var(--bg-surface);
    border: 1px solid var(--border-dim);
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
  }

  .why-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--cyber-green), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .why-card:hover {
    border-color: var(--border-green);
    transform: translateY(-4px);
    box-shadow: var(--glow-green);
  }

  .why-card:hover::before { opacity: 1; }

  .why-card-icon {
    width: 44px;
    height: 44px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    background: rgba(0, 255, 65, 0.06);
    border: 1px solid var(--border-green);
  }

  .why-card-icon i {
    font-size: 1.1rem;
    color: var(--cyber-green);
  }

  .why-card h3 {
    font-family: var(--font-mono);
    color: var(--text-primary);
    font-size: 1rem;
    font-weight: 700;
    margin: 0 0 10px;
    letter-spacing: -0.01em;
  }

  .why-card p {
    font-family: var(--font-body);
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.7;
    margin: 0;
  }

  /* Mobile */
  @media (max-width: 700px) {
    .aboutcontent { flex-direction: column; align-items: center; text-align: center; }
    .profile-pic-wrapper { order: -1; width: 150px; height: 150px; }
    .why-grid { grid-template-columns: 1fr; }
    .stack-grid { grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px; }
    .stack-block { padding: 16px 8px; }
  }
</style>
```

- [ ] **Step 2: Add section labels to about.astro HTML**

Add a `.section-label` `<p>` tag before each `<h1>` / `<h2>` in the sections. In the Astro frontmatter section, change nothing. In the HTML template:

Before `<h1 class="section-title" ...>About Me</h1>`:
```astro
<p class="section-label">cat about.txt</p>
```

Before `<h2 class="section-title" ...>Tech Stack</h2>`:
```astro
<p class="section-label">ls --tech-stack</p>
```

Before `<h2 class="section-title" ...>Why Me?</h2>`:
```astro
<p class="section-label">grep --why-choose-me</p>
```

- [ ] **Step 3: Verify about page**

Open `http://localhost:4321/about`. Check: terminal-prefixed section labels, stack cards dim by default and glow green on hover, why cards get green top border line on hover, profile image has green-gradient border.

- [ ] **Step 4: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: restyle about page with cyber terminal sections and neon glow card effects"
```

---

## Task 8: Projects Page (projects.astro)

**Files:**
- Modify: `src/pages/projects.astro`

- [ ] **Step 1: Replace the entire `<style>` block in projects.astro**

Open `src/pages/projects.astro`. Replace the existing `<style>` block with:

```css
<style>
  main { max-width: 1100px; margin: 0 auto; padding: 0 24px 80px; }

  .projects-overview { padding-top: 24px; }

  h1 {
    font-family: var(--font-mono);
    font-weight: 800;
    font-size: clamp(2rem, 4vw, 3rem);
    color: var(--text-primary);
    margin: 0 0 8px;
    letter-spacing: -0.03em;
  }

  h1::before {
    content: '> ';
    color: var(--cyber-green);
    font-size: 0.6em;
    vertical-align: middle;
  }

  /* Featured card — terminal window style */
  .featured-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border: 1px solid var(--border-green);
    border-radius: 6px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    margin-bottom: 32px;
    margin-top: 24px;
    background: var(--bg-surface);
    transition: box-shadow 0.3s, transform 0.3s;
    position: relative;
  }

  .featured-card::before {
    content: 'FEATURED_PROJECT.sh';
    position: absolute;
    top: 0; left: 0; right: 0;
    padding: 8px 14px;
    background: var(--bg-surface-2);
    border-bottom: 1px solid var(--border-green);
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--cyber-green);
    letter-spacing: 0.1em;
    z-index: 1;
  }

  .featured-card:hover {
    box-shadow: var(--glow-green);
    transform: translateY(-3px);
  }

  .featured-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    min-height: 280px;
    display: block;
    margin-top: 32px;
  }

  .featured-body {
    padding: 48px 28px 28px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
  }

  .featured-label {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--cyber-green);
    border: 1px solid var(--border-green);
    border-radius: 3px;
    padding: 2px 8px;
    align-self: flex-start;
  }

  .featured-body h2 {
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 1.5rem;
    color: var(--text-primary);
    margin: 0;
    letter-spacing: -0.02em;
  }

  .featured-body p {
    color: var(--text-secondary);
    font-family: var(--font-body);
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0;
  }

  /* Tech badges */
  .tech-stack {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 4px;
  }

  .badge {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: var(--cyber-cyan);
    border: 1px solid var(--border-cyan);
    border-radius: 3px;
    padding: 2px 8px;
    text-transform: uppercase;
    background: rgba(0, 212, 255, 0.04);
  }

  .card-cta {
    font-family: var(--font-mono);
    font-size: 0.82rem;
    color: var(--cyber-green);
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 8px;
  }

  .card-cta::before { content: '>_ '; }

  /* Project grid */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
  }

  .project-card {
    display: flex;
    flex-direction: column;
    background: var(--bg-surface);
    border: 1px solid var(--border-dim);
    border-radius: 6px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
    position: relative;
  }

  /* Terminal window chrome on each card */
  .project-card::before {
    content: '';
    display: block;
    height: 28px;
    background: var(--bg-surface-2);
    border-bottom: 1px solid var(--border-dim);
    flex-shrink: 0;
  }

  .project-card:hover {
    border-color: var(--border-green);
    box-shadow: var(--glow-green);
    transform: translateY(-4px);
  }

  .card-img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    display: block;
  }

  .card-body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }

  .card-body h2 {
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 1rem;
    color: var(--text-primary);
    margin: 0;
    letter-spacing: -0.01em;
  }

  .card-body p {
    color: var(--text-secondary);
    font-family: var(--font-body);
    font-size: 0.88rem;
    line-height: 1.6;
    margin: 0;
    flex: 1;
  }

  /* Pagination */
  .load-more-btn {
    display: block;
    margin: 32px auto 0;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: var(--cyber-green);
    background: transparent;
    border: 1px solid var(--border-green);
    border-radius: 4px;
    padding: 10px 28px;
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s;
  }

  .load-more-btn:hover {
    background: rgba(0, 255, 65, 0.06);
    box-shadow: var(--glow-green);
  }

  @media (max-width: 700px) {
    .featured-card { grid-template-columns: 1fr; }
    .featured-img { min-height: 200px; }
    .projects-grid { grid-template-columns: 1fr; }
  }
</style>
```

- [ ] **Step 2: Verify projects page**

Open `http://localhost:4321/projects`. Check: featured card has green border and `FEATURED_PROJECT.sh` header bar, project cards have terminal chrome bar at top, tech badges are cyan with brackets style, hover shows green glow.

- [ ] **Step 3: Commit**

```bash
git add src/pages/projects.astro
git commit -m "feat: restyle projects page with terminal window chrome cards and cyber badges"
```

---

## Task 9: Blog Page (blog.astro)

**Files:**
- Modify: `src/pages/blog.astro`

- [ ] **Step 1: Add cybersec styles to blog.astro**

Append this `<style>` block to `src/pages/blog.astro` (replacing or merging with the existing `<style>` block if one exists):

```css
<style>
  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 24px 80px;
  }

  .blog-header {
    padding-top: 24px;
    margin-bottom: 32px;
  }

  .page-title {
    font-family: var(--font-mono);
    font-weight: 800;
    font-size: clamp(2rem, 4vw, 3rem);
    color: var(--text-primary);
    margin: 0 0 8px;
    letter-spacing: -0.03em;
  }

  .page-title::before {
    content: '> ';
    color: var(--cyber-green);
    font-size: 0.6em;
    vertical-align: middle;
  }

  .page-subtitle {
    color: var(--text-secondary);
    font-family: var(--font-body);
    font-size: 1rem;
    margin: 0;
  }

  /* Search & filter controls */
  .controls {
    margin-bottom: 28px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .search-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--bg-surface);
    border: 1px solid var(--border-dim);
    border-radius: 6px;
    padding: 10px 14px;
    transition: border-color 0.2s;
  }

  .search-bar:focus-within {
    border-color: var(--border-green);
    box-shadow: 0 0 0 2px rgba(0, 255, 65, 0.08);
  }

  .search-icon { color: var(--text-dim); font-size: 0.85rem; }

  .search-bar input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: 0.88rem;
    caret-color: var(--cyber-green);
  }

  .search-bar input::placeholder { color: var(--text-dim); }

  .search-clear {
    background: transparent;
    border: none;
    color: var(--text-dim);
    cursor: pointer;
    font-size: 0.85rem;
    padding: 2px 6px;
    transition: color 0.2s;
  }

  .search-clear:hover { color: var(--cyber-red); }

  .filter-row {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .date-filter {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--text-secondary);
  }

  .date-filter input[type="date"] {
    background: var(--bg-surface);
    border: 1px solid var(--border-dim);
    border-radius: 4px;
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: 0.78rem;
    padding: 5px 8px;
    outline: none;
    transition: border-color 0.2s;
  }

  .date-filter input[type="date"]:focus {
    border-color: var(--border-green);
  }

  .clear-filters-btn {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    color: var(--cyber-red);
    border: 1px solid rgba(255, 0, 60, 0.2);
    border-radius: 4px;
    padding: 5px 12px;
    background: transparent;
    cursor: pointer;
    transition: background 0.2s;
  }

  .clear-filters-btn:hover { background: rgba(255, 0, 60, 0.06); }

  /* Blog list — cards rendered by JS into #blog-list */
  :global(.blog-card) {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 0;
    background: var(--bg-surface);
    border: 1px solid var(--border-dim);
    border-radius: 6px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    margin-bottom: 16px;
    transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
  }

  :global(.blog-card:hover) {
    border-color: var(--border-green);
    box-shadow: var(--glow-green);
    transform: translateX(4px);
  }

  :global(.blog-card-img) {
    width: 200px;
    height: 100%;
    object-fit: cover;
    display: block;
    min-height: 140px;
  }

  :global(.blog-card-body) {
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
  }

  :global(.blog-card-meta) {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--text-dim);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  :global(.blog-card-title) {
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 1rem;
    color: var(--text-primary);
    margin: 0;
    line-height: 1.3;
  }

  :global(.blog-card-excerpt) {
    font-family: var(--font-body);
    font-size: 0.88rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
  }

  :global(.blog-card-tags) {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  :global(.blog-tag) {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    color: var(--cyber-cyan);
    border: 1px solid var(--border-cyan);
    border-radius: 3px;
    padding: 1px 7px;
    text-transform: uppercase;
  }

  /* Empty state */
  .empty-state {
    text-align: center;
    padding: 60px 0;
    color: var(--text-dim);
    font-family: var(--font-mono);
  }

  .empty-state i { font-size: 2rem; margin-bottom: 12px; display: block; }

  /* Pagination */
  :global(.pagination) {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 32px;
    font-family: var(--font-mono);
  }

  :global(.page-btn) {
    min-width: 36px;
    height: 36px;
    border: 1px solid var(--border-dim);
    border-radius: 4px;
    background: var(--bg-surface);
    color: var(--text-secondary);
    font-family: var(--font-mono);
    font-size: 0.82rem;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s, box-shadow 0.2s;
  }

  :global(.page-btn:hover), :global(.page-btn.active) {
    border-color: var(--border-green);
    color: var(--cyber-green);
    box-shadow: var(--glow-green);
  }

  @media (max-width: 600px) {
    :global(.blog-card) { grid-template-columns: 1fr; }
    :global(.blog-card-img) { width: 100%; height: 160px; }
  }
</style>
```

- [ ] **Step 2: Verify blog page**

Open `http://localhost:4321/blog`. Check: search bar has green focus ring, date inputs dark styled, clear button red. Blog cards (rendered by JS) should inherit base dark bg and get green border on hover.

Note: Blog cards are rendered dynamically via JS (`renderCard()` function). If they don't pick up the `:global()` styles, open the inline `<script>` in blog.astro and ensure generated card elements use class names `blog-card`, `blog-card-img`, `blog-card-body`, `blog-card-title`, `blog-card-excerpt`, `blog-card-meta`, `blog-card-tags`, `blog-tag`. Update the JS card template string if it uses different class names.

- [ ] **Step 3: Commit**

```bash
git add src/pages/blog.astro
git commit -m "feat: restyle blog page with cyber search controls and terminal card aesthetic"
```

---

## Task 10: Contact Page (contact.astro)

**Files:**
- Modify: `src/pages/contact.astro`

- [ ] **Step 1: Add cybersec style block to contact.astro**

Append or replace the `<style>` block in `src/pages/contact.astro`:

```css
<style>
  .contact-main {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 24px 80px;
  }

  .contact-header {
    padding-top: 24px;
    margin-bottom: 40px;
  }

  .label {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.15em;
    color: var(--cyber-green);
    text-transform: uppercase;
  }

  .label::before { content: '> '; }

  .contact-header h1 {
    font-family: var(--font-mono);
    font-weight: 800;
    font-size: clamp(2rem, 4vw, 3.5rem);
    color: var(--text-primary);
    margin: 6px 0 10px;
    letter-spacing: -0.03em;
  }

  .subtitle {
    color: var(--text-secondary);
    font-family: var(--font-body);
    font-size: 1rem;
    margin: 0;
  }

  .contact-wrapper {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 40px;
    align-items: start;
  }

  /* Sidebar */
  .contact-aside {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .aside-block {
    background: var(--bg-surface);
    border: 1px solid var(--border-dim);
    border-radius: 6px;
    padding: 20px;
    transition: border-color 0.25s;
  }

  .aside-block:hover { border-color: var(--border-green); }

  .aside-block h3 {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--cyber-green);
    margin: 0 0 10px;
  }

  .aside-block h3::before { content: '> '; }

  .aside-block a,
  .aside-block span {
    font-family: var(--font-body);
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: color 0.2s;
  }

  .aside-block a:hover { color: var(--cyber-green); }

  .faq-link {
    color: var(--cyber-cyan) !important;
  }

  .aside-socials {
    display: flex;
    gap: 12px;
    padding-top: 8px;
  }

  .aside-socials a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px; height: 36px;
    border: 1px solid var(--border-dim);
    border-radius: 4px;
    color: var(--text-secondary);
    font-size: 1rem;
    text-decoration: none;
    transition: color 0.2s, border-color 0.2s, box-shadow 0.2s;
  }

  .aside-socials a:hover {
    color: var(--cyber-green);
    border-color: var(--border-green);
    box-shadow: var(--glow-green);
  }

  /* Form wrapper — ContactForm.tsx styles go here as globals */
  :global(.contact-form) {
    background: var(--bg-surface);
    border: 1px solid var(--border-dim);
    border-radius: 6px;
    padding: 32px;
  }

  :global(.contact-form label) {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--cyber-green);
    display: block;
    margin-bottom: 6px;
  }

  :global(.contact-form input),
  :global(.contact-form textarea) {
    width: 100%;
    background: var(--bg-surface-2);
    border: 1px solid var(--border-dim);
    border-radius: 4px;
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: 0.88rem;
    padding: 10px 12px;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s, box-shadow 0.2s;
    caret-color: var(--cyber-green);
    margin-bottom: 16px;
    resize: vertical;
  }

  :global(.contact-form input:focus),
  :global(.contact-form textarea:focus) {
    border-color: var(--border-green);
    box-shadow: 0 0 0 2px rgba(0, 255, 65, 0.08);
  }

  :global(.contact-form input::placeholder),
  :global(.contact-form textarea::placeholder) {
    color: var(--text-dim);
  }

  :global(.contact-form button[type="submit"]) {
    font-family: var(--font-mono);
    font-size: 0.88rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #050a0e;
    background: var(--cyber-green);
    border: none;
    border-radius: 4px;
    padding: 12px 28px;
    cursor: pointer;
    transition: box-shadow 0.2s, transform 0.2s;
    width: 100%;
  }

  :global(.contact-form button[type="submit"]:hover) {
    box-shadow: var(--glow-green);
    transform: translateY(-2px);
  }

  @media (max-width: 700px) {
    .contact-wrapper { grid-template-columns: 1fr; }
  }
</style>
```

- [ ] **Step 2: Verify contact page**

Open `http://localhost:4321/contact`. Check: dark styled aside blocks with green section labels, form inputs dark with green focus ring, submit button solid green.

- [ ] **Step 3: Commit**

```bash
git add src/pages/contact.astro
git commit -m "feat: restyle contact page with terminal sidebar and cyber form inputs"
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] New cybersec color palette (green/cyan/dark) — Task 1
- [x] JetBrains Mono + Inter fonts — Task 2
- [x] Terminal boot splash replacing logo — Task 3
- [x] Navbar with [SECURE] badge and mono font — Task 4
- [x] Hero with glitch animation, terminal prompt, grid bg — Task 5
- [x] Sysinfo footer — Task 6
- [x] About page terminal sections + cyber cards — Task 7
- [x] Projects page terminal window chrome cards — Task 8
- [x] Blog page cyber search + cards — Task 9
- [x] Contact page terminal form + aside — Task 10
- [x] i18n system untouched (data-i18n attributes preserved throughout)
- [x] Mobile responsive at every breakpoint
- [x] Legacy CSS aliases prevent breakage during incremental rollout

**Type consistency:**
- CSS custom properties defined in Task 1 are used consistently in Tasks 2–10
- `--border-green`, `--glow-green`, `--cyber-green`, `--font-mono`, `--font-body` referenced identically across all tasks
- No class name collisions — each component uses scoped or clearly-namespaced classes

**No placeholders detected:** All CSS blocks are complete. All `git commit` commands include exact file paths.

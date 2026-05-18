# 🏗️ V&D Solutions – Website & Admin Dashboard

**Building a website for a small renovation company sounds simple.** Until you decide to deploy it on shared hosting with a full CI/CD pipeline, attempt to run a Filament 5 admin panel on a subdomain, and stumble into a confirmed bug between Laravel 13.1 and Filament 5 that nobody had solved yet. Welcome to my first professional client project. [https://www.v-dsolutions.com/](https://www.v-dsolutions.com/)

---

## 🎯 The Project

V&D Solutions is a Belgian renovation and HVAC company. They needed a professional online presence to showcase their work and attract new clients — without agency pricing. In exchange for a fair rate, I got the opportunity to build a fully production-ready project as part of my studies.

The result: a custom Laravel application with a public-facing website and a private admin dashboard, delivered under a formal SLA contract.

---

## 🛠 Technical Deep-Dive

### 1. Filament CMS & Admin Dashboard
The client independently manages services, projects, promotions and contact requests through a Filament 5 dashboard. Media uploads are handled via **Spatie Media Library**, visitor statistics via **Spatie Analytics**. No external CMS needed — everything is bundled within the Laravel application itself.

### 2. Google Reviews Integration
The reviews section is dynamic: when a Google Place ID is configured and reviews are available, the site automatically displays a carousel. While no reviews exist yet, a call-to-action encourages visitors to leave one. Fully configurable via `.env`.

### 3. CI/CD Pipeline on Shared Hosting
Setting up a full CI/CD pipeline on Combell shared hosting without root access required some creativity. Via **GitHub Actions** and `appleboy/ssh-action`, every merge to `main` triggers an automatic deployment: `git pull`, `composer install`, migrations and cache clearing — fully automated.

### 4. The Filament/Laravel 13 Bug
Deploying the Filament admin panel on a subdomain hit a confirmed bug between **Laravel 13.1 and Filament 5**. Laravel 13 changed how domain-scoped routes are registered (using the `+` operator instead of direct assignment), causing Filament's dashboard route to be silently overwritten by the `home` redirect route. The fix: updating to **Laravel 13.7** where this behaviour was corrected. Diagnosis required deep investigation into nginx logs, PHP-FPM configuration and Combell's server architecture.

---

## 📂 Tech Stack

| Feature | Technology |
| :--- | :--- |
| **Backend** | Laravel 13 |
| **Admin Panel** | Filament 5 |
| **Database** | MySQL |
| **Media** | Spatie Media Library |
| **Mail** | Resend |
| **Spam** | Spatie Honeypot |
| **Sitemap** | Spatie Sitemap |
| **Analytics** | Spatie Analytics |
| **Deployment** | GitHub Actions + Combell SSH |
| **DNS & SSL** | Cloudflare + Let's Encrypt |

---

## 🏆 The Result

A clean, fast and fully managed website delivered to a client, with a formal contract and an annual SLA. My first professional invoice. My first production deployment. And confirmation that debugging on a live server at 11pm with only Termius on your iPhone counts as a skill too.

---

*"Just a quick DNS change, you said."* — **Me, multiple times**
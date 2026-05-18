# 🏗️ V&D Solutions – Website & Admin Dashboard

**Een website bouwen voor een klein renovatiebedrijf klinkt eenvoudig.** Tot je beslist om het te deployen op shared hosting met een volledige CI/CD-pipeline, een Filament 5 admin dashboard op een subdomein wil zetten, en toevallig een confirmed bug tegenkomt tussen Laravel 13.1 en Filament 5 die niemand nog had opgelost. Welkom bij mijn eerste professionele klantproject.

---

## 🎯 Het Project

V&D Solutions is een Belgisch renovatie- en HVAC-bedrijf. Ze hadden nood aan een professionele online aanwezigheid om hun werk te tonen en nieuwe klanten aan te trekken — zonder de hoge prijzen van een webbureau. In ruil voor een eerlijke prijs kreeg ik de kans om een volledig productieproject te bouwen als onderdeel van mijn opleiding.

Het resultaat: een op maat gemaakte Laravel-applicatie met een publieke website én een privé beheerdashboard, opgeleverd onder een formeel SLA-contract.

---

## 🛠 Technische Deep-Dive

### 1. Filament CMS & Admin Dashboard
De klant beheert zelfstandig diensten, projecten, promoties en contactaanvragen via een Filament 5 dashboard. Media-uploads worden afgehandeld via **Spatie Media Library**, bezoekerstatistieken via **Spatie Analytics**. Geen externe CMS nodig — alles zit gebundeld in de Laravel-applicatie zelf.

### 2. Google Reviews Integratie
De reviews sectie is dynamisch: wanneer de Google Place ID is ingesteld en er reviews beschikbaar zijn, toont de site automatisch een carousel. Zolang er nog geen reviews zijn, verschijnt er een call-to-action die bezoekers aanmoedigt een review achter te laten. Volledig configureerbaar via de `.env`.

### 3. CI/CD Pipeline op Shared Hosting
Zonder root-toegang een volledige CI/CD-pipeline opzetten op Combell shared hosting vergde wat creativiteit. Via **GitHub Actions** en de `appleboy/ssh-action` wordt elke merge naar `main` automatisch gedeployed: `git pull`, `composer install`, migraties en cache-clearing — volledig geautomatiseerd.

### 4. De Filament/Laravel 13 Bug
Het deployen van het Filament admin panel op een subdomein liep vast op een confirmed bug tussen **Laravel 13.1 en Filament 5**. Laravel 13 veranderde hoe domain-scoped routes worden geregistreerd (`+` operator ipv directe assignment), waardoor Filament's dashboard route stilletjes werd overschreven door de `home` redirect route. De fix: updaten naar **Laravel 13.7** waar dit gedrag gecorrigeerd werd. Diagnose vergde diepgaand onderzoek in nginx-logs, PHP-FPM config en Combell's serverarchitectuur.

---

## 📂 Tech Stack

| Feature | Technologie |
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

## 🏆 De Uitkomst

Een strakke, snelle en volledig beheerde website opgeleverd voor een klant, met een formeel contract en een jaarlijkse SLA. Mijn eerste professionele factuur. Mijn eerste productie-deployment. En een bevestiging dat debuggen op een live server om 23u met alleen Termius op je iPhone ook gewoon een skill is.

---

*"Gewoon even de DNS aanpassen, zei je."* — **Ik, meerdere keren**
# 🎅 Santa's Webshop

**"Het officiële inkoopportaal voor Noordpool-elfen."** Santa's Webshop is een volledig functionele, feestelijke E-Commerce applicatie gebouwd met **TypeScript** en **Vite**. Het project demonstreert diepgaande beheersing van Vanilla JS/TS door complexe state management en API-integraties te realiseren zonder gebruik te maken van frameworks zoals React of Vue.

---

## 🎯 Het Concept
Het doel van dit project was om een moderne winkelervaring te creëren met een sterke visuele identiteit (Glassmorphism & Festive UI). De focus lag op het bouwen van een robuust frontend-systeem dat complexe taken afhandelt, zoals gebruikersauthenticatie, dynamische productfiltering en een real-world checkout-systeem dat daadwerkelijk e-mails verstuurt.

## 🛠️ Technische Deep-Dive

* **TypeScript Architectuur:** Gebruik van strikte typing voor productmodellen, cart-items en API-responses om runtime-fouten te minimaliseren en de codeonderhoudbaarheid te vergroten.
* **Complex State Management:** Een op maat gemaakt winkelmandje-systeem dat data synchroniseert tussen de UI, `localStorage` voor persistentie en de actuele berekeningen van subtotalen.
* **Authenticatie Systeem:** Simulatie van een beveiligde login met `sessionStorage` en een "Onthoud mij"-functionaliteit via `localStorage`.
* **EmailJS Integratie:** In plaats van een zware backend, maakt de app gebruik van **EmailJS**. Bij het afrekenen genereert een helper-functie een HTML-tabel van de bestelling, die via een API-call direct als geformatteerde factuur naar de inbox van de gebruiker wordt verzonden.
* **Dynamische UI & UX:** Implementatie van een realtime zoekfilter, toast-notificaties voor user feedback en een responsief Glassmorphism design met Bootstrap 5 en aangepaste CSS-animaties.

## 📂 Tech Stack

| Categorie | Technologie |
| :--- | :--- |
| **Frontend** | TypeScript, HTML5, CSS3 |
| **Build Tool** | Vite |
| **Styling** | Bootstrap 5 & Custom Animations |
| **Backend (Mock)** | JSON-Server (REST API) |
| **Services** | EmailJS (Transactionele E-mails) |

---
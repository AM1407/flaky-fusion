# 🚀 Space Telemetry Dashboard — ISS UPA Monitor

**"Houston, we have a problem... or at least a full tank."** Dit project is een real-time missiecontrole-dashboard dat de *Urine Processing Assembly* (UPA) aan boord van het International Space Station monitort. Het combineert live NASA-telemetrie met complexe webarchitectuur om een functioneel en visueel indrukwekkend systeem neer te zetten.

---

## 🎯 Het Concept
Het doel was om een "Mission Control" interface te bouwen die echte data uit de ruimte verwerkt. Het dashboard streamt live vloeistofniveaus van de Waste Storage Tank (telemetrie-id `NODE3000005`), trackt de ISS-positie op een interactieve kaart, toont de huidige crew-manifest en crawlt NASA's blog voor het laatste nieuws.

## 🛠️ Technische Deep-Dive

* **Astro Islands Architectuur:** De frontend maakt gebruik van **Astro 5** met een "Islands" aanpak. Elke widget (telemetrie, kaart, nieuws) is een onafhankelijk gehydrateerd **Preact** component. Dit zorgt voor een razendsnelle initiële laadtijd (zero-JS HTML) terwijl interactieve onderdelen pas laden wanneer nodig.
* **Real-time Data Streaming:** Via de **Lightstreamer SDK** maakt de app een WebSocket-verbinding met NASA's live feeds. Data wordt gepusht naar het dashboard zonder dat de gebruiker de pagina hoeft te verversen.
* **Cross-Island Communication:** Voor state-management tussen de verschillende "eilanden" (bijv. de connectiestatus in de header koppelen aan de telemetrie-panel) wordt gebruik gemaakt van **nanostores**. Dit zijn lichtgewicht, atomaire stores die framework-agnostisch werken.
* **Multi-gefacetteerde PHP Backend:** De API-laag (PHP 8) demonstreert verschillende data-acquisitie technieken:
    * **Guzzle (Composer):** Voor het ophalen van de crew-manifest.
    * **cURL:** Voor de ISS-locatiegegevens.
    * **DOMDocument & XPath:** Een custom web-crawler die de RSS-feed van NASA's blog ontleedt.
* **AI-Collaborative Development:** Dit project is ontwikkeld in samenwerking met AI-coding agents (Claude/Copilot), waarbij de focus lag op het refactoren van monolithische code naar een modulaire component-structuur en het oplossen van specifieke CSS-scoping uitdagingen binnen Astro.

## 📂 Tech Stack

| Categorie | Technologie |
| :--- | :--- |
| **Frontend Framework** | Astro 5 (Islands Architecture) |
| **Interactiviteit** | Preact & nanostores |
| **Real-time Data** | Lightstreamer (WebSockets) |
| **Backend API** | PHP 8 (Guzzle, cURL, XPath) |
| **Mapping** | Leaflet.js |

---
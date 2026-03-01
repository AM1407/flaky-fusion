# 🚀 Space Telemetry Dashboard — ISS UPA Monitor 

**"Houston, we have a problem... or at least a full tank."** This project is a real-time mission control dashboard designed to monitor the Urine Processing Assembly (UPA) aboard the International Space Station. It merges live NASA telemetry with complex web architecture to create a functional and visually striking command center.

---

## 🎯 The Concept
The objective was to build a professional-grade interface powered by actual data from space. The dashboard streams live fluid levels from the Waste Storage Tank (telemetry ID `NODE3000005`), tracks the ISS position on an interactive map, displays the current crew manifest, and crawls NASA’s official blog for the latest updates.

## 🛠️ Technical Deep-Dive

* **Astro Islands Architecture:** The frontend utilizes **Astro 5** with an "Islands" architecture. Each widget (telemetry, map, news) is an independently hydrated **Preact** component. This allows for lightning-fast initial loads (zero-JS HTML) while only hydrating interactive elements as they become necessary.
* **Real-time Data Streaming:** Using the **Lightstreamer SDK**, the app establishes a WebSocket connection with NASA’s live telemetry feeds. Data is pushed to the dashboard in real-time, providing an authentic "live" experience.
* **Cross-Island Communication:** To handle state between different "islands" (e.g., reflecting connection status in the header based on the telemetry panel), the project uses **nanostores**. These are tiny, atomic state stores that facilitate framework-agnostic communication.
* **Multi-faceted PHP Backend:** The API layer (PHP 8) showcases various data acquisition methods:
    * **Guzzle (Composer):** To fetch the live crew manifest.
    * **cURL:** To retrieve ISS orbital position data.
    * **DOMDocument & XPath:** A custom web crawler designed to parse NASA’s blog RSS feed into a clean JSON format.
* **AI-Collaborative Development:** Built in partnership with AI coding agents (Claude/Copilot), focusing on refactoring monolithic code into a modular component structure and navigating specific Astro CSS-scoping challenges.

## 📂 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend Framework** | Astro 5 (Islands Architecture) |
| **Interactivity** | Preact & nanostores |
| **Real-time Data** | Lightstreamer (WebSockets) |
| **Backend API** | PHP 8 (Guzzle, cURL, XPath) |
| **Mapping** | Leaflet.js |
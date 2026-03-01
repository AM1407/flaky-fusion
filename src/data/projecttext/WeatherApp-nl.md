# 🌦️ WeatherMoods App

**"Het weerbericht, maar dan met een persoonlijkheid."** WeatherMoods is een dynamische webapplicatie die real-time meteorologische data transformeert tot een thematische ervaring. In plaats van droge cijfers, interpreteert de app de temperatuur door de ogen van drie unieke persona's: een vampier, een tuinier of een surfer.

---

## 🎯 Het Concept
Het doel van WeatherMoods was om een alledaags hulpmiddel te veranderen in een interactieve beleving. Door gebruik te maken van **conditional logic** in JavaScript, verandert niet alleen de visuele interface, maar ook de toon van de berichtgeving. Of je nu advies krijgt over "bloed-slushies" of "wetsuit shrinkage", de app brengt data tot leven met humor en context.

## 🛠️ Technische Deep-Dive

* **Real-time Data Integratie:** De applicatie communiceert rechtstreeks met de **OpenWeatherMap API** om actuele gegevens op te halen over temperatuur, luchtvochtigheid, windsnelheid en zonnecycli.
* **Thematische State Management:** Gebruikers kunnen onmiddellijk schakelen tussen drie modi (Vampire, Gardener, Surfer). Dit triggert een volledige UI-transformatie via **Tailwind CSS** en past de "Feels Like"-commentaar dynamisch aan op basis van de opgehaalde temperatuurwaarden.
* **Geavanceerde Logica:** Het script bevat een custom windkompas dat graden automatisch omzet naar windstreken (N, NE, E, etc.) en berekent specifieke drempelwaarden voor de verschillende "moods".
* **Modern UI Design:** De interface maakt gebruik van **Glassmorphism** (frosted-glass effecten) en Adobe Typekit typografie voor een strakke, moderne uitstraling die volledig responsive is.

## 📂 Tech Stack

| Onderdeel | Technologie |
| :--- | :--- |
| **Frontend** | HTML5 & Tailwind CSS |
| **Logic** | JavaScript (ES6+ / Fetch API) |
| **Data Bron** | OpenWeatherMap API |

---
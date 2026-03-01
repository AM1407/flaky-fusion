# 🌦️ WeatherMoods App 

**"Weather reporting with a twist of personality."** WeatherMoods is a dynamic web application that transforms real-time meteorological data into a thematic experience. Instead of just displaying cold numbers, the app interprets the temperature through the eyes of three unique personas: a Vampire, a Gardener, and a Surfer.

---

## 🎯 The Concept
The goal of WeatherMoods was to turn an everyday utility into an interactive narrative. By leveraging **conditional logic** in JavaScript, the app changes more than just its visual interface; it shifts the entire tone of the commentary. Whether you're getting advice on "blood slushies" or "wetsuit shrinkage," the app brings data to life with humor and context.

## 🛠️ Technical Deep-Dive

* **Real-time Data Integration:** The application communicates directly with the **OpenWeatherMap API** to fetch live data regarding temperature, humidity, wind speed, and solar cycles.
* **Thematic State Management:** Users can instantly toggle between three modes (Vampire, Gardener, Surfer). This triggers a full UI transformation via **Tailwind CSS** and dynamically adjusts the "Feels Like" commentary based on the retrieved temperature values.
* **Advanced Logic:** The script includes a custom wind compass that automatically converts degrees into cardinal directions (N, NE, E, etc.) and calculates specific thresholds for the various "moods."
* **Modern UI Design:** The interface utilizes **Glassmorphism** (frosted-glass effects) and Adobe Typekit typography for a sleek, modern aesthetic that is fully responsive across all devices.

## 📂 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | HTML5 & Tailwind CSS |
| **Logic** | JavaScript (ES6+ / Fetch API) |
| **Data Source** | OpenWeatherMap API |

---
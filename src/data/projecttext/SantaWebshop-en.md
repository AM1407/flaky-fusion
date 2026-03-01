# 🎅 Santa's Webshop 

**"The official procurement portal for North Pole Elves."** Santa's Webshop is a fully functional, festive E-Commerce application built with **TypeScript** and **Vite**. This project demonstrates core mastery of Vanilla JS/TS by implementing complex state management and API integrations without the use of heavy frameworks like React or Vue.

---

## 🎯 The Concept
The goal of this project was to create a modern shopping experience with a strong visual identity (Glassmorphism & Festive UI). The focus was on building a robust frontend system capable of handling complex tasks such as user authentication, dynamic product filtering, and a real-world checkout system that sends actual emails.

## 🛠️ Technical Deep-Dive

* **TypeScript Architecture:** Utilizes strict typing for product models, cart items, and API responses to minimize runtime errors and enhance code maintainability.
* **Complex State Management:** A custom-built shopping cart system that synchronizes data between the UI, `localStorage` for persistence, and real-time subtotal calculations.
* **Authentication System:** Secure login simulation featuring `sessionStorage` persistence and a "Remember Me" functionality via `localStorage`.
* **EmailJS Integration:** To avoid a heavy backend, the app utilizes **EmailJS**. During checkout, a helper function generates an HTML order table, which is sent directly to the user's inbox as a formatted receipt via an API call.
* **Dynamic UI & UX:** Implementation of real-time search filtering, toast notifications for user feedback, and a responsive Glassmorphism design using Bootstrap 5 and custom CSS animations.

## 📂 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | TypeScript, HTML5, CSS3 |
| **Build Tool** | Vite |
| **Styling** | Bootstrap 5 & Custom Animations |
| **Backend (Mock)** | JSON-Server (REST API) |
| **Services** | EmailJS (Transactional Emails) |

---
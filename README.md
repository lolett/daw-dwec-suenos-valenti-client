# Sueños Valenti (DWEC) — Client-side JavaScript App

## Overview
Client-side web app built with vanilla JavaScript to display and manage *Sueños Valenti* sessions. 
The project loads data from JSON, renders UI dynamically, and keeps user state in the browser (e.g., cart/preferences).

## Main Features
- Dynamic rendering of sessions (DOM manipulation)
- Data loading from local JSON using `fetch()`
- Basic navigation between views (sessions / cart / favourites)
- Browser persistence using `localStorage`

## Tech Stack
- HTML / CSS
- JavaScript (ES Modules)

## Assessment checklist:
- Fetch data from JSON
- DOM rendering
- Event handling
- LocalStorage persistence

## How to Run
No installation required.

1. Download / clone the repository
2. Open `index.html` in your browser (Chrome/Edge/Firefox)

## Live Demo
`https://lolett.github.io/daw-dwec-suenos-valenti-client/`

## Troubleshooting
If your browser blocks module loading via `file://`, run a simple local server:

### Option A --> (VS Code)
- Install "Live Server" extension and click "Go Live"

### Option B --> (Python)
`python -m http.server <port_number>`
then open `http://localhost:<port_number>` on your browser

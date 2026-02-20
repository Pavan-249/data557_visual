# The Salary Story

An interactive story built with **React**, **Vite**, and **GSAP**. Two characters (Alex and Sam) deliver dialogue from the Milestone 2 faculty salary analysis, with animated movement and typewriter-style dialogue.

## Run locally

**Important:** The React app must be served by Vite. Do **not** open `index.html` directly in the browser (file://) — it won’t load.

1. In a terminal, from the project folder:
   ```bash
   npm install
   npm run dev
   ```
2. In your browser, open **http://localhost:5173** (click the link Vite prints, or type it in the address bar).

**No server?** Open **`standalone.html`** directly in your browser for a simple, non-animated version of the story.

## Build for production

```bash
npm run build
```

Output is in `dist/`. Serve with any static host or `npm run preview`.

## Features

- **Animated characters**: Idle bounce, step forward when speaking, arm gestures (GSAP).
- **Dialogue delivery**: Speech bubble pops in; text reveals word-by-word, then formats with highlighted stats.
- **Navigation**: Previous / Next buttons, progress bar, clickable dots, arrow keys (← / →).
- **Design**: Dark theme, gradient background, glassmorphism bubble, Outfit + Fraunces fonts.

## Tech

- React 18
- Vite 5
- GSAP 3.12

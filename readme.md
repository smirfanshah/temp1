# Wedding Invitation

A mobile-first digital wedding invitation built with React, Vite, Framer Motion, and Tailwind CSS. Features an animated virtual envelope, interactive invitation deck with wedding details, calendar, countdown, itinerary, dress code, venue info, RSVP modal, and map link.

## Quick Start

Install dependencies and start the dev server:

```bash
npm install
PORT=5173 BASE_PATH=/ npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Commands

```bash
npm run dev       # Start dev server on port 5173
npm run build     # Create production build (output: dist/public)
npm run serve     # Preview production build on port 4173
npm run typecheck # Run TypeScript type checking
```

## Customization

- **Content & Logic**: [src/App.tsx](src/App.tsx)
- **Styling & Theme**: [src/index.css](src/index.css)

## Main Interactions

- Click/tap the wax seal to open the envelope
- Use navigation controls or arrow keys to browse the deck
- Swipe horizontally on touch devices
- View May 2026 calendar with wedding date highlighted
- Copy venue address or open in Google Maps
- Open RSVP modal
- Toggle ambient sound
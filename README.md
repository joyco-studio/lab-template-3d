# JOYCO Lab — 3D Template

Starter template for building interactive 3D web experiences with [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) and [Next.js](https://nextjs.org).

## Quick Start

The fastest way to get started is with the [JOYCO CLI](https://github.com/joyco-studio/joyco-cli):

```bash
npx joyco create
```

Or clone and install manually:

```bash
git clone https://github.com/joyco-studio/lab-template-3d.git
cd lab-template-3d
npm install
npm run dev
```

## Stack

- **Next.js 16** — App Router
- **React 19** — UI
- **Three.js** — 3D graphics
- **React Three Fiber** — React renderer for Three.js
- **@react-three/drei** — Useful helpers (OrbitControls, primitives, etc.)
- **Tailwind CSS 4** — Styling
- **Zustand** — State management
- **Leva** — Real-time parameter tweaking GUI
- **TypeScript** — Type safety

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start dev server         |
| `npm run build` | Production build         |
| `npm start`     | Start production server  |
| `npm run lint`  | Run ESLint               |

## Themes

Switch themes via URL parameter:

```
?theme=dark      # default
?theme=light
?theme=radio
?theme=terminal
```

Use `?lab=true` to hide the header for a full-screen 3D experience.

## Project Structure

```
app/
  layout.tsx        # Root layout with theme support
  page.tsx          # Home page
  globals.css       # Global styles and theme variables
components/
  scene.tsx         # 3D canvas with React Three Fiber
  header.tsx        # Header with logo
  theme-init.tsx    # Theme initialization
lib/
  utils.ts          # Utility functions
```

## License

MIT

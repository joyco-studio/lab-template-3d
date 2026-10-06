# JOYCO Lab — 3D Template

A small starter for DOM-aligned 3D experiences with [Three.js](https://threejs.org), [TSL](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language), [PortalGL](https://hub.joyco.studio/toolbox/portalgl), and [Next.js](https://nextjs.org). The default view renders an extruded JOYCO symbol with a procedural band material.

## Quick start

Use the [JOYCO CLI](https://github.com/joyco-studio/joyco-cli):

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

- **Next.js 16 / React 19** — App Router and HTML UI.
- **Three.js 0.186.1 / TSL** — Native scene ownership and node materials, using `three/webgpu` and `three/tsl`.
- **PortalGL 0.1.0** — DOM tracking, clipping, resizing, and canvas coordination. Metri is included and managed automatically.
- **[XYZ](https://hub.joyco.studio/toolbox/xyz)** — Ordered, idempotent teardown.
- **Tailwind CSS 4 / TypeScript** — Styling and types.

React Three Fiber and Drei are not used. React mounts the runtime and displays loading/failure states; imperative Three.js code owns the rendering resources.

## Rendering and ownership

`lib/scene/runtime.ts` initializes a `WebGPURenderer`, then creates `ThreeDOM` and registers one padding-free HTML host with `addView`. After `prepare()` resolves, one animation loop calls `dom.update(time)` to update placement, run the view's artistic callback, and draw.

On **WebGPU**, PortalGL places a local canvas inside the host. On **WebGL2**, the same view uses a shared canvas. Keep the coordinator's container at document origin, even when view hosts are inside padded or scrolled layouts. Keep host padding and borders on an outer wrapper. PortalGL handles measurement, camera aspect, clipping, offscreen culling, and a maximum DPR of 2.

OrbitControls attach to the host so input works on either backend. Drag to orbit; scroll or pinch to zoom. Focus the view and use Ctrl/Shift/Command plus arrow keys to rotate. Reduced motion freezes shader phase and disables damping. Hidden documents stop the rendering loop.

Teardown stops the loop and aborts preparation immediately, then waits for asynchronous initialization/preparation to settle before destroying the coordinator and GPU resources. Initialization, preparation, frame, and device failures show a static symbol and accessible message.

The reference for this setup is **[GLSync](https://glsync.joyco.studio)**. Tracking APIs now live in `portalgl/three`; XYZ remains useful for teardown, debug tools, and richer scene warmup.

## Changing the example

- **Artwork:** `lib/brand.ts` contains the canonical full JOYCO symbol path and viewBox, shared by the header and 3D geometry. Replace these with approved artwork; refresh the public icons and SVG assets separately when the brand changes.
- **Geometry:** `lib/scene/symbol.ts` parses the SVG into shapes, extrudes them, rotates SVG's Y-down coordinates into Three.js orientation, centers the geometry, and normalizes its width to 3 units.
- **Material:** The same file builds a `MeshStandardNodeMaterial` using `positionLocal`, `uniform`, `smoothstep`, and `mix` from TSL. Edit `colorNode` to change the shader. Advance animation through the view's `onFrame` callback; register every disposable resource with the runtime's `Disposer`.
- **Views:** Add a new host, scene, and distinct camera with `dom.addView`. Keep one coordinator and one renderer per runtime. For a world spanning several DOM anchors, use `addScene` and its `track` method instead.

## Branding and themes

The template uses Public Sans and Roboto Mono through `next/font`, canonical artwork from the JOYCO website, and the [JOYCO Hub's semantic tokens](https://hub.joyco.studio/toolbox/ui). Fonts are self-hosted by Next.js after download at build time. The canvas is transparent, so the page's CSS theme supplies its background.

```text
?theme=dark      # default
?theme=light
?theme=radio
?theme=terminal
```

Unknown themes fall back to dark. Theme initialization runs before paint and stays synchronized with client-side URL navigation. `?lab=true` hides the header.

## Backend verification

The renderer prefers WebGPU and automatically falls back to WebGL2. WebGPU needs a supported browser and a secure context (HTTPS or localhost).

```text
?forceWebGL=true
?forceWebGL=true&theme=light&lab=true
```

The view's `data-backend` attribute reports `WebGPU` or `WebGL2` after successful preparation. Verify both paths when editing materials or tracking. The forced backend is chosen at mount; reload when changing it. If neither backend initializes, the HTML fallback remains visible.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Check TypeScript |

## License

MIT

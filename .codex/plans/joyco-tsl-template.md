# JOYCO TSL template update

## Summary

Refresh the starter with current JOYCO branding and one PortalGL tracked view rendering an extruded JOYCO symbol. Use TSL with WebGPU-first rendering and automatic WebGL2 fallback. React Three Fiber is already absent; retain native Three.js ownership.

## Implementation

1. Adapt the website's canonical full BrandSymbol geometry into one shared source for the header and 3D artwork. Use the symbol without the copyright glyph for extrusion. Replace smiley assets and favicons with current website assets; complete manifest names and metadata. Apply Public Sans, Roboto Mono, and hub semantic theme tokens. Preserve dark, light, radio, terminal, and lab=true; default unknown themes to dark.
2. Add portalgl@0.1.0 and retain Three.js 0.186.1, matching types, and XYZ. Initialize WebGPURenderer before registering one ThreeDOM view. Root the canvas coordinator at document origin and use a responsive, padding-free host. PortalGL owns measurement, clipping, resize, and DPR limits. Bind OrbitControls to the host. Preserve the Scene component interface and add forceWebGL=true for fallback verification.
3. Parse shared canonical SVG geometry into shapes, extrude, correct SVG's inverted Y axis, and center it. Use MeshStandardNodeMaterial with a procedural local-position band shader mixing JOYCO blue and off-white. Add simple lighting and an angled, responsive camera. Animate shader phase slowly; reduced motion freezes animation and disables damping. Keep the scene background transparent.
4. Show accessible loading and failure states. Await ThreeDOM.prepare before starting one animation loop. Guard asynchronous boundaries against unmount, abort preparation, and wait for pending work before releasing GPU resources. Retain XYZ ordered teardown and suspend hidden-document rendering. Document TSL, PortalGL ownership, themes, backend verification, and replacing the symbol.

## Validation

Run ESLint, TypeScript checking, and a production build. Check WebGPU and forced WebGL2 for orientation, shader output, orbit interaction, responsive framing, clipping, and scroll alignment. Check all themes, invalid input, lab mode, reduced motion, and failure fallback. Exercise Strict Mode remounts, hot reload, and unmount during asynchronous initialization/preparation for leaked canvases, listeners, and loops.

## Defaults

Keep Next.js, React, npm, and the current branch. Use the hub visual system and canonical website artwork. Keep one tracked view and a small template shell.

## Progress

Implementation complete. PortalGL 0.1.0 is installed; the canonical symbol drives both the header and extrusion. Hub theme tokens, fonts, icons, manifest, and documentation are updated. The runtime includes async cancellation, ordered teardown, reduced motion, failure fallback, responsive framing, and hidden-document suspension.

ESLint, TypeScript, the production build, and git diff whitespace validation passed. The production server was also checked in Chrome on both WebGPU and forced WebGL2. Chrome smoke checks covered WebGPU and forced WebGL2, desktop/mobile and short-viewport framing, keyboard orbit, all theme presets, invalid-theme fallback, lab mode, hot reload, and scroll alignment. A temporary no-GPU route verified the visible fallback, then was removed. Six focused lifecycle checks in the gitignored .context directory covered early unmount, pending preparation, initialization/draw failure, reduced motion, hidden-document pause/resume, and remount ownership.

Browser validation exposed shared-canvas overscan extending the document. Clipping the document-root coordinator fixes this while preserving natural scroll for actual page content. Neutral tone mapping and moderate lighting keep the off-white shader bands visible against the light theme.

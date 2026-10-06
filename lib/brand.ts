/** Canonical artwork from JOYCO website's brand/geometry.ts. Do not hand-edit. */
export const SYMBOL_BOX = { width: 352, height: 144 } as const
export const SYMBOL_PATH = "M328 96L280 144H0V40H176V112H192V24H0V0H352V24H328V96Z"

/** The same artwork drives the HTML mark and the extruded Three.js geometry. */
export const SYMBOL_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SYMBOL_BOX.width} ${SYMBOL_BOX.height}"><path d="${SYMBOL_PATH}"/></svg>`

import { ExtrudeGeometry, Mesh, MeshStandardNodeMaterial } from "three/webgpu"
import { color, mix, positionLocal, smoothstep, uniform } from "three/tsl"
import { SVGLoader } from "three/addons/loaders/SVGLoader.js"
import { SYMBOL_BOX, SYMBOL_SVG } from "@/lib/brand"

export function createSymbol() {
  const { paths } = new SVGLoader().parse(SYMBOL_SVG)
  const shapes = paths.flatMap((path) => path.toShapes())
  const geometry = new ExtrudeGeometry(shapes, {
    depth: 24,
    bevelEnabled: false,
    steps: 1,
  })
  // SVG is Y-down. Rotate (rather than reflect) to preserve face winding/normals.
  geometry.rotateX(Math.PI)
  geometry.center()
  geometry.scale(3 / SYMBOL_BOX.width, 3 / SYMBOL_BOX.width, 3 / SYMBOL_BOX.width)

  const phase = uniform(0)
  const bands = positionLocal.x.mul(3).add(positionLocal.y.mul(2)).add(phase).sin()
  const material = new MeshStandardNodeMaterial({ roughness: 0.35, metalness: 0.15 })
  material.colorNode = mix(
    color("#0000ff"),
    color("#fcfcfc"),
    smoothstep(-0.25, 0.25, bands),
  )

  return { mesh: new Mesh(geometry, material), geometry, material, phase }
}

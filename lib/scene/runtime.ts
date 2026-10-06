import { Disposer } from "@joycostudio/xyz"
import { ThreeDOM } from "portalgl/three"
import {
  AmbientLight,
  DirectionalLight,
  NeutralToneMapping,
  PerspectiveCamera,
  Scene,
  WebGPURenderer,
} from "three/webgpu"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { createSymbol } from "./symbol"

type SceneCallbacks = {
  onReady: (backend: "WebGPU" | "WebGL2") => void
  onError: (error: unknown) => void
}

/** React owns mounting; this runtime owns one renderer, view, and animation loop. */
export function mountScene(container: HTMLElement, host: HTMLElement, callbacks: SceneCallbacks) {
  const disposer = new Disposer()
  const abort = new AbortController()
  let stopped = false
  let renderer: WebGPURenderer | undefined

  const stopLoop = () => {
    // setAnimationLoop implicitly calls init() if uninitialized. Do not restart failed init.
    if (renderer?.hasInitialized()) void renderer.setAnimationLoop(null)
  }

  const release = () => {
    try {
      disposer.dispose()
    } catch (error) {
      console.error("JOYCO scene cleanup failed", error)
    }
  }

  const fail = (error: unknown) => {
    if (stopped) return
    stopped = true
    abort.abort()
    stopLoop()
    callbacks.onError(error)
    // Preparation may still be using GPU resources. Wait before releasing them.
    void startup.then(release)
  }

  async function start() {
    renderer = new WebGPURenderer({
      antialias: true,
      alpha: true,
      forceWebGL: new URLSearchParams(window.location.search).get("forceWebGL") === "true",
    })
    await renderer.init()
    const activeRenderer = renderer
    activeRenderer.toneMapping = NeutralToneMapping
    disposer.add(() => {
      void activeRenderer.dispose().catch((error: unknown) => {
        console.error("JOYCO renderer cleanup failed", error)
      })
      activeRenderer.domElement.remove()
    })
    if (stopped) return

    activeRenderer.onDeviceLost = fail
    activeRenderer.onError = fail
    disposer.add(() => {
      activeRenderer.onDeviceLost = () => {}
      activeRenderer.onError = () => {}
    })

    const scene = new Scene()
    const camera = new PerspectiveCamera(40, 1, 0.1, 100)
    camera.position.set(1.2, 0.8, 5)
    const symbol = createSymbol()
    disposer.add([symbol.geometry, symbol.material])
    const keyLight = new DirectionalLight("#ffffff", 2)
    keyLight.position.set(2, 3, 5)
    scene.add(symbol.mesh, new AmbientLight("#ffffff", 0.8), keyLight)

    const controls = new OrbitControls(camera, host)
    controls.enablePan = false
    controls.minDistance = 2
    controls.maxDistance = 12
    controls.listenToKeyEvents(host)
    disposer.add(controls)
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updateMotion = () => {
      controls.enableDamping = !reducedMotion.matches
    }
    updateMotion()
    disposer.listen(reducedMotion, "change", updateMotion)

    const dom = new ThreeDOM({ renderer: activeRenderer, container, maxPixelRatio: 2 })
    disposer.add(() => dom.destroy())
    let framedAspect = 0
    dom.addView(host, {
      scene,
      camera,
      onFrame: ({ delta }) => {
        if (camera.aspect !== framedAspect) {
          // Increase vertical FOV on narrow hosts instead of resetting the user's orbit.
          const halfFov = 20 * Math.PI / 180
          camera.fov = 2 * Math.atan(Math.tan(halfFov) / Math.min(camera.aspect, 1)) * 180 / Math.PI
          camera.updateProjectionMatrix()
          framedAspect = camera.aspect
        }
        controls.update()
        if (!reducedMotion.matches) symbol.phase.value += delta * 0.6
      },
    })

    await dom.prepare({ signal: abort.signal })
    if (stopped) return
    dom.update(performance.now())

    const tick = (time: number) => {
      if (stopped || document.hidden) return
      try {
        dom.update(time)
      } catch (error) {
        fail(error)
      }
    }
    const syncVisibility = () => {
      if (!stopped) void activeRenderer.setAnimationLoop(document.hidden ? null : tick)
    }
    disposer.listen(document, "visibilitychange", syncVisibility)
    syncVisibility()
    callbacks.onReady(dom.mode === "multi-canvas" ? "WebGPU" : "WebGL2")
  }

  const startup = start().catch(fail)

  return () => {
    stopped = true
    abort.abort()
    stopLoop()
    void startup.then(release)
  }
}

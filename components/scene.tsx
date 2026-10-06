"use client"

import { useEffect, useRef, useState } from "react"
import { Logo } from "./logo"
import { mountScene } from "@/lib/scene/runtime"

type SceneStatus =
  | { phase: "loading" }
  | { phase: "ready"; backend: "WebGPU" | "WebGL2" }
  | { phase: "error" }

export function Scene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const hostRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<SceneStatus>({ phase: "loading" })

  useEffect(() => {
    const container = containerRef.current
    const host = hostRef.current
    if (!container || !host) return

    return mountScene(container, host, {
      onReady: (backend) => setStatus({ phase: "ready", backend }),
      onError: (error) => {
        console.error("JOYCO scene unavailable", error)
        setStatus({ phase: "error" })
      },
    })
  }, [])

  return (
    <div ref={containerRef} data-slot="canvas-root" className="relative min-h-dvh overflow-clip">
      <main className="relative mx-auto flex min-h-dvh max-w-6xl flex-col px-6 pt-24 pb-6">
        <section aria-label="Interactive JOYCO symbol" className="relative flex flex-1 flex-col">
          <div
            ref={hostRef}
            id="webgl"
            data-slot="scene-view"
            data-backend={status.phase === "ready" ? status.backend : undefined}
            aria-label="JOYCO symbol: drag or use Ctrl and arrow keys to orbit; scroll to zoom"
            aria-busy={status.phase === "loading"}
            tabIndex={0}
            className="relative min-h-96 flex-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          />
          {status.phase === "error" ? (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <Logo className="h-auto w-2/3 max-w-lg text-primary" />
            </div>
          ) : null}
        </section>
        <p role="status" className="relative z-10 mt-6 text-center font-mono text-xs tracking-wide text-muted-foreground uppercase">
          {status.phase === "loading" ? "Preparing 3D view…" :
            status.phase === "error" ? "3D rendering is unavailable in this browser." :
              "Drag to orbit · Scroll to zoom"}
        </p>
      </main>
    </div>
  )
}

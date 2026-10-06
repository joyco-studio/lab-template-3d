"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Logo } from "./logo"

function HeaderInner() {
  const searchParams = useSearchParams()
  const isLab = searchParams.get("lab") === "true"

  if (isLab) return null

  return (
    <header className="pointer-events-none absolute top-0 left-0 z-20 p-6 text-foreground">
      <Logo className="h-6 w-auto" />
      <h1 className="sr-only">JOYCO Lab — 3D Template</h1>
    </header>
  )
}

export function Header() {
  return (
    <Suspense>
      <HeaderInner />
    </Suspense>
  )
}

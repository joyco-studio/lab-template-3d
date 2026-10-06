"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"
import { resolveTheme } from "@/lib/themes"

function ThemeInitInner() {
  const searchParams = useSearchParams()
  const theme = resolveTheme(searchParams.get("theme"))

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return null
}

export function ThemeInit() {
  return (
    <Suspense>
      <ThemeInitInner />
    </Suspense>
  )
}

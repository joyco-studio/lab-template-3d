import type { SVGProps } from "react"
import { SYMBOL_BOX, SYMBOL_PATH } from "@/lib/brand"

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={SYMBOL_BOX.width}
      height={SYMBOL_BOX.height}
      viewBox={`0 0 ${SYMBOL_BOX.width} ${SYMBOL_BOX.height}`}
      fill="none"
      focusable="false"
      aria-hidden="true"
      data-slot="brand-symbol"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d={SYMBOL_PATH} fill="currentColor" />
    </svg>
  )
}

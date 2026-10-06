import type { Metadata } from "next"
import { ThemeInit } from "@/components/theme-init"
import { publicSans, robotoMono } from "@/lib/fonts"
import { THEME_BOOT_SCRIPT } from "@/lib/themes"
import "./globals.css"

export const metadata: Metadata = {
  title: "JOYCO Lab — 3D Template",
  description: "A JOYCO starter for DOM-aligned Three.js views with TSL, WebGPU, and PortalGL.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${publicSans.variable} ${robotoMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: THEME_BOOT_SCRIPT,
          }}
        />
      </head>
      <body>
        <ThemeInit />
        {children}
      </body>
    </html>
  )
}

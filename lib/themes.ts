export const THEMES = ["dark", "light", "radio", "terminal"] as const
export type Theme = (typeof THEMES)[number]

export function resolveTheme(value: string | null): Theme {
  return THEMES.find((theme) => theme === value) ?? "dark"
}

/** Runs before paint; uses the same allowlist as client-side navigation. */
export const THEME_BOOT_SCRIPT = `(() => {
  const theme = new URLSearchParams(location.search).get('theme');
  document.documentElement.dataset.theme = ${JSON.stringify(THEMES)}.includes(theme) ? theme : 'dark';
})()`

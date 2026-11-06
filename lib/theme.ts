export type Theme = "light" | "dark" | "system";
export const THEME_STORAGE_KEY = "portfolio-theme";
export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

// Run before the page paints so saved preferences never flash the other theme.
export const themeScript = `(function(){var t='system';try{var s=localStorage.getItem('${THEME_STORAGE_KEY}');if(s==='light'||s==='dark'||s==='system')t=s}catch(e){}document.documentElement.classList.toggle('dark',t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches))})();`;

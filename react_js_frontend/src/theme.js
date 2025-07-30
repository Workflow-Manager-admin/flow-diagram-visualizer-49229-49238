export const THEME_COLORS = {
  accent: "#ffeb3b",
  primary: "#1976d2",
  secondary: "#424242",
  background: "#ffffff",
  surface: "#f8f9fa",
  text: "#282c34",
  border: "#e9ecef"
};

// PUBLIC_INTERFACE
export function applyTheme(theme = "light") {
  /**
   * Apply theme CSS variables to document :root.
   * @param {string} theme - 'light' or 'dark'
   */
  const root = document.documentElement;
  if (theme === "light") {
    root.style.setProperty("--accent-color", THEME_COLORS.accent);
    root.style.setProperty("--primary-color", THEME_COLORS.primary);
    root.style.setProperty("--secondary-color", THEME_COLORS.secondary);
    root.style.setProperty("--bg-primary", THEME_COLORS.background);
    root.style.setProperty("--bg-secondary", THEME_COLORS.surface);
    root.style.setProperty("--text-primary", THEME_COLORS.text);
    root.style.setProperty("--border-color", THEME_COLORS.border);
  }
  // Optionally add dark theming
}

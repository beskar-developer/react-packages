import type { ThemeModeContext as Context } from "@shared-vendor/types";

const DEFAULT_CONTEXT: Context = {
  mode: "DARK",
  isDark: true,
  isLight: false,
  toggleMode: () => {},
  setMode: () => {},
};

const ThemeModeContext = createContext<Context>(DEFAULT_CONTEXT);

export default ThemeModeContext;

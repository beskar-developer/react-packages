import { ThemeModeContext } from "@shared-vendor/contexts";
import type { ThemeMode } from "@shared-vendor/types";

const DARK_CLASS = "dark";
const DARK_MEDIA_QUERY = `(prefers-color-scheme: ${DARK_CLASS})`;

// TODO: find a better way to do this instead of working with DOM API
const removeDarkClass = () => document.body.classList.remove(DARK_CLASS);
const addDarkClass = () => document.body.classList.add(DARK_CLASS);

export const ThemeModeProvider = ({ children }: FragmentProps) => {
  const isDarkPreferred = matchMedia(DARK_MEDIA_QUERY).matches;

  const [mode, setMode] = usePersistState<ThemeMode>(
    () => (isDarkPreferred ? "DARK" : "LIGHT"),
    "THEME_MODE",
  );

  const isDark = mode === "DARK";
  const isLight = !isDark;

  const toggleMode = () => setMode(isDark ? "LIGHT" : "DARK");

  useLayoutEffect(() => {
    if (!isDark) {
      removeDarkClass();

      return;
    }

    addDarkClass();
  }, [isDark]);

  const value = { mode, isDark, isLight, toggleMode, setMode };

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
};

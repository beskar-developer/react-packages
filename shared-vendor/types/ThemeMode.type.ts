export type ThemeMode = "DARK" | "LIGHT";

export type ThemeModeContext = {
  mode: ThemeMode;
  isDark: boolean;
  isLight: boolean;
  toggleMode: () => void;
  setMode: React.Dispatch<React.SetStateAction<ThemeMode>>;
};

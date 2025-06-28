export const ThemeToggleButton = () => {
  const { isDark, toggleMode } = useThemeMode();

  return <ToggleButton label="تم دارک" value={isDark} onValueChange={toggleMode} />;
};

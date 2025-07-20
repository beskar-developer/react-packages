import { addDarkClass, removeDarkClass } from "@shared-vendor/helpers";

export const ThemeModeProvider = ({ children }: FragmentProps) => {
  const { isDark } = useThemeMode();

  useLayoutEffect(() => {
    if (!isDark) {
      removeDarkClass();

      return;
    }

    addDarkClass();
  }, [isDark]);

  return children;
};

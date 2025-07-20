import type { ThemeMode } from "@shared-vendor/types";

import { createSetMode, createToggleMode, selectTheme } from "@shared-vendor/store/Theme";

export const useThemeMode = () => {
  const dispatch = useDispatch();

  const { mode, isDark, isLight } = useSelector(selectTheme);

  const setMode = (mode: ThemeMode) => dispatch(createSetMode(mode));
  const toggleMode = () => dispatch(createToggleMode());

  return { mode, isLight, isDark, setMode, toggleMode };
};

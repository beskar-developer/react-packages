import { CONTEXT_ERROR_MESSAGE } from "@shared-vendor/constants";

import { ThemeModeContext } from "@shared-vendor/contexts";

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);

  if (!context) throw new Error(CONTEXT_ERROR_MESSAGE);

  return context;
};

import type { PayloadAction } from "@reduxjs/toolkit";
import type { ThemeMode } from "@shared-vendor/types";
import type { RootState } from "@shared-vendor/store";

import { isDarkPreferred } from "@shared-vendor/helpers";

type ThemeState = {
  mode: ThemeMode;
};

const NAME = "theme";

const initialState: ThemeState = {
  mode: isDarkPreferred() ? "DARK" : "LIGHT",
};

const themeSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
    toggleMode: (state) => {
      state.mode = state.mode === "DARK" ? "LIGHT" : "DARK";
    },
  },
});

export const selectThemeMode = (state: RootState) => state.theme.mode;
export const selectIsDark = (state: RootState) => state.theme.mode === "DARK";
export const selectIsLight = (state: RootState) => state.theme.mode === "LIGHT";

const selectSelf = (state: RootState) => state;
export const selectTheme = createSelector(selectSelf, (state) => ({
  mode: selectThemeMode(state),
  isDark: selectIsDark(state),
  isLight: selectIsLight(state),
}));

export const name = NAME;
export const { setMode: createSetMode, toggleMode: createToggleMode } = themeSlice.actions;
export default themeSlice.reducer;

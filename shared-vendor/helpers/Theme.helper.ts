const DARK_CLASS = "dark";
const DARK_MEDIA_QUERY = `(prefers-color-scheme: ${DARK_CLASS})`;

export const removeDarkClass = () => document.body.classList.remove(DARK_CLASS);
export const addDarkClass = () => document.body.classList.add(DARK_CLASS);
export const isDarkPreferred = () => matchMedia(DARK_MEDIA_QUERY).matches;

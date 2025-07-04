export const getEnv = (key: string): string => import.meta.env[`VITE_${key}`];

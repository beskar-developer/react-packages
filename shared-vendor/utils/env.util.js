// in some scenarios you might need to refactor this code to => JSON.parse(JSON.stringify(import.meta.env[`VITE_${key}`]));
export const getEnv = (key) => import.meta.env[`VITE_${key}`];

const mode = import.meta.env.VITE_MODE;

export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const isProd = mode === 'PROD';
export const isDev = mode === 'DEV';

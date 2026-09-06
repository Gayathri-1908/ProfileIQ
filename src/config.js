// Central place for the backend URL.
// In development, falls back to localhost.
// In production, set VITE_API_URL in your deployment platform's environment variables.
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
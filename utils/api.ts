export const API_BASE_URL = typeof window !== 'undefined'
    ? `http://${window.location.hostname}:8080`
    : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

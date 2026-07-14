export const API_BASE_URL = process.env.NODE_ENV === 'development'
    ? (typeof window !== 'undefined' ? `http://${window.location.hostname}:8080` : 'http://localhost:8080')
    : 'http://tu286r0hary5blh7i51xiv6g.31.97.237.130.sslip.io';

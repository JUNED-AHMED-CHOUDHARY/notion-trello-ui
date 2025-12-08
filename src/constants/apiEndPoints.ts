export const baseUrl = process.env.BACKEND_API_URL || 'http://localhost:8000';

export const providerAuthUrlApi = `${baseUrl}/auth/oauth`;
export const getJWTTokenApiUrl = `${baseUrl}/auth/get-token`;

export const API_BACKEND_ENDPOINT = import.meta.env.VITE_API_BACKEND_ENDPOINT;
export const AZURE_STORAGE_CONNECTION_STRING = import.meta.env.VITE_AZURE_STORAGE_CONNECTION_STRING as string;
export interface JwtPayload {
  sub: string;
  jti: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/hash': string;
  exp: number;
  iss: string;
  aud: string;
}

export const PASSWORD = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/hash';
export const ROLE = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
export const GOOGLE_CLIENT_ID =
  '815968135131-6vrgbltmgkcvhmsimo4buelpe9keu1qo.apps.googleusercontent.com';

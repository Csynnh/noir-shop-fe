/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  readonly VITE_COGNITO_REGION: string;
  readonly VITE_APPSYNC_REGION: string;
  readonly VITE_APPSYNC_GRAPHQL_ENDPOINT: string;
  readonly VITE_BROCHURE_LINK: string;
  readonly VITE_SWAGGER_LINK: string;
  readonly VITE_ENABLE_MOCK: string;
  readonly MODE: 'development' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.scss';
declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
declare module '*.csv';
declare module '*.webp';

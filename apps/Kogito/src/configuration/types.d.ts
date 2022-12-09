declare module '@env' {
  export const MODE = 'DEVELOPMENT' | 'PRODUCTION';
  export const API_CORE: string;
  export const USE_SIGNPOST: 'true' | 'false';
  export const MIXPANEL: string;
}

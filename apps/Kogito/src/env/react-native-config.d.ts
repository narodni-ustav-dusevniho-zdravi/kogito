declare module 'react-native-config' {
  export type NativeConfig = {
    MIXPANEL_API_KEY?: string;
  };
  export const Config: NativeConfig;
  export default Config;
}

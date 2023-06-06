declare module '*.png' {
  import {ImageRequireSource} from 'react-native';

  const image: ImageRequireSource;
  export default image;
}

declare module '*.jpg' {
  import {ImageRequireSource} from 'react-native';

  const image: ImageRequireSource;
  export default image;
}

declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';

  const svg: React.FC<SvgProps>;
  export default svg;
}

import type {ViewStyle} from 'react-native';

import ENV from '~modules/env';

const interpolate = (
  elevation: number,
  rangeA: number,
  rangeB: number,
  rangeA2: number,
  rangeB2: number,
): number =>
  elevation === 0
    ? 0
    : (elevation - rangeA) * ((rangeB2 - rangeA2) / (rangeB - rangeA)) +
      rangeA2;

const shadowStyle = (elevation = 0): ViewStyle | undefined => {
  if (!elevation) return undefined;
  if (!ENV.IS_IOS) return {elevation};
  const height = Math.floor(elevation / 2);
  const blur = elevation + height;
  const radius = Number(interpolate(blur, 1, 38, 1, 16).toFixed(2));

  return {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height,
    },
    shadowOpacity: 0.24,
    shadowRadius: radius,
  };
};

export default shadowStyle;

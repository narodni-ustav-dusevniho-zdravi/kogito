import React, {useMemo} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
// eslint-disable-next-line no-restricted-imports
import HTML from 'react-native-render-html';

const styles = StyleSheet.create({
  p: {
    textAlign: 'justify',
    marginBottom: 12,
    fontSize: 18,
  },
  li: {
    fontSize: 18,
    margin: 0,
    padding: 0,
    lineHeight: 20,
  },
});

export const Html: React.FC<{source: string}> = ({source}) => {
  const screenWidth = useWindowDimensions().width;
  return (
    <HTML
      contentWidth={screenWidth}
      source={{html: source}}
      tagsStyles={useMemo(
        () => ({
          ...styles,
          img: {width: screenWidth - 84},
        }),
        [screenWidth],
      )}
    />
  );
};

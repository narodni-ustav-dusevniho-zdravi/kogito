import React, {useMemo} from 'react';
import type {GestureResponderEvent, TouchableOpacityProps} from 'react-native';
import {TouchableNativeFeedback, TouchableOpacity, View} from 'react-native';

import ENV from '~modules/env';

import {theme} from '../config';
import {Color} from '../utils';

export type TouchableProps = TouchableOpacityProps & {
  children?: React.ReactNode;
  color?: string;
  noFeedback?: true;
  onPress?: (e?: GestureResponderEvent) => void;
};

const TouchableAndroid = React.memo<TouchableProps>(props => {
  const {color = theme.colors.primary, style, children, ...restProps} = props;

  return (
    <TouchableNativeFeedback
      {...restProps}
      background={useMemo(
        () =>
          TouchableNativeFeedback.Ripple(
            Color.alpha(color, Color.isDark(color) ? 0.1 : 0.25),
            true,
          ),
        [color],
      )}
      useForeground>
      <View style={useMemo(() => [{overflow: 'hidden'}, style], [style])}>
        {children}
      </View>
    </TouchableNativeFeedback>
  );
});

export const Touchable = React.memo<TouchableProps>(props => {
  const disabled =
    props.disabled ||
    !(
      props.onPress ||
      props.onPressIn ||
      props.onPressOut ||
      props.onLongPress ||
      props.onMagicTap
    );

  if (ENV.IS_IOS || props.noFeedback)
    return (
      <TouchableOpacity
        {...props}
        activeOpacity={props.noFeedback ? 1 : undefined}
        disabled={disabled}>
        {props.children}
      </TouchableOpacity>
    );
  return <TouchableAndroid {...props} disabled={disabled} />;
});

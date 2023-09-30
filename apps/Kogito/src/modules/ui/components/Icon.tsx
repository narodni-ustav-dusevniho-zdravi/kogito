import type {ComponentProps} from 'react';
import React from 'react';
import type {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {StyleSheet} from 'react-native';
import {createIconSet} from '@expo/vector-icons';

import type {PartialNever} from '~modules/common';

import {icons, theme} from '../config';
import type {IconName} from '../types';

import type {TouchableProps} from './Touchable';
import {Touchable} from './Touchable';

const IconSet = createIconSet(icons, 'icons', 'icons.ttf');
const VectorIcon = React.memo<ComponentProps<typeof IconSet>>(props => (
  <IconSet {...props} />
));

type IconProps = (TouchableProps | PartialNever<TouchableProps>) & {
  color: string;
  name: IconName;
  size: number;
  backgroundColor?: string;
  children?: React.ReactNode;
  contentStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
};

const styles = StyleSheet.create({
  content: {overflow: 'visible', borderRadius: theme.radius.round},
});

export const Icon: React.FC<IconProps> = ({
  name,
  color,
  backgroundColor,
  size,
  style,
  contentStyle,
  onPress,
  accessibilityRole = onPress ? 'button' : undefined,
  ...touchableProps
}) => {
  return (
    <Touchable
      {...touchableProps}
      accessibilityRole={accessibilityRole}
      color={color}
      style={[styles.content, {backgroundColor}, style]}
      onPress={onPress}>
      <VectorIcon color={color} name={name} size={size} style={contentStyle} />
    </Touchable>
  );
};

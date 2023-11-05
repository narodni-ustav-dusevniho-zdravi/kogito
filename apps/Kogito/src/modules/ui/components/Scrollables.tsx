import type {ComponentProps} from 'react';
import React from 'react';
import type {
  // eslint-disable-next-line no-restricted-imports
  FlatListProps as RNFlatListProps,
  // eslint-disable-next-line no-restricted-imports
  SectionListProps as RNSectionListProps,
} from 'react-native';
import type {KeyboardAwareScrollViewProps} from 'react-native-keyboard-aware-scroll-view';
import {
  KeyboardAwareFlatList,
  KeyboardAwareScrollView,
  KeyboardAwareSectionList,
} from 'react-native-keyboard-aware-scroll-view';
import {useLayout} from '@react-native-community/hooks';
import useEventCallback from 'use-event-callback';

//bypass https://github.com/react-navigation/react-navigation/issues/8452
const scrollIndicatorInsets = {right: 1};

type WrappedComponentRef<T> = InstanceType<React.ComponentClass<T>>;
const withScrollableContext = <T extends KeyboardAwareScrollViewProps>(
  WrappedComponent: React.ComponentClass<T> | React.FC<T>,
) => {
  return React.forwardRef<WrappedComponentRef<T>, T>((props, ref) => {
    const layout = useLayout();
    const extraScrollHeight = layout.y;
    return (
      <WrappedComponent
        enableAutomaticScroll
        enableResetScrollToCoords={false}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        scrollIndicatorInsets={scrollIndicatorInsets}
        {...props}
        ref={ref}
        extraScrollHeight={extraScrollHeight}
        onLayout={useEventCallback(e => {
          props.onLayout?.(e);
          layout.onLayout(e);
        })}
      />
    );
  });
};

export const ScrollView = withScrollableContext(KeyboardAwareScrollView);
export type ScrollViewProps = ComponentProps<typeof ScrollView>;
export type ScrollView = KeyboardAwareScrollView;

export const FlatList = withScrollableContext(KeyboardAwareFlatList);
export type FlatListProps<T> = RNFlatListProps<T>;
export type FlatList = KeyboardAwareFlatList;

export const SectionList = withScrollableContext(KeyboardAwareSectionList);
export type SectionListProps<T, S> = RNSectionListProps<T, S>;
export type SectionList = KeyboardAwareSectionList;

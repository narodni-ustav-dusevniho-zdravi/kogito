import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import MainHeader from '../../../components/container/MainHeader';
import GradientBackground from '../../../components/primitives/GradientBackground';

import {SafeArea} from './SafeArea';
import type {FlatListProps, ScrollViewProps} from './Scrollables';
import {FlatList, ScrollView} from './Scrollables';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
});

type ListScreenProps<T> = {
  type: 'list';
} & Omit<FlatListProps<T>, 'children'>;

type ScrollScreenProps = {
  type: 'static';
  loading?: boolean;
} & ScrollViewProps;

export type ScreenContainerProps<T> = {
  gradientBackground?: boolean;
  title?: string;
} & (ListScreenProps<T> | ScrollScreenProps);

export const ScreenContainer = <T,>({
  gradientBackground,
  ...props
}: ScreenContainerProps<T>) => {
  return (
    <View style={styles.container}>
      {gradientBackground && (
        <GradientBackground
          angle={180}
          color1="rgba(255,255,255,0.29)"
          color2="rgba(255,231,231,0.29)"
          style={StyleSheet.absoluteFillObject}
        />
      )}
      <SafeArea.Top />
      <MainHeader title={props.title} />
      {props.type === 'static' ? (
        <ScrollView alwaysBounceVertical={false} {...props}>
          {props.loading ? <ActivityIndicator /> : props.children}
          <SafeArea.Bottom />
        </ScrollView>
      ) : (
        <FlatList {...props} />
      )}
    </View>
  );
};

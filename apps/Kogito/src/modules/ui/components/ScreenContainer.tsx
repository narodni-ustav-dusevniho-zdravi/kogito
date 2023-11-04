import React from 'react';
import type {FlatListProps, ScrollViewProps} from 'react-native';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import MainHeader from '../../../components/container/MainHeader';
import GradientBackground from '../../../components/primitives/GradientBackground';

import {SafeArea} from './SafeArea';

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
  title?: string;
} & (ListScreenProps<T> | ScrollScreenProps);

export const ScreenContainer = <T,>(props: ScreenContainerProps<T>) => {
  return (
    <View style={styles.container}>
      <GradientBackground
        angle={180}
        color1="rgba(255,255,255,0.29)"
        color2="rgba(255,231,231,0.29)"
        style={StyleSheet.absoluteFillObject}
      />
      <SafeArea.Top />
      <MainHeader title={props.title} />
      {props.type === 'static' ? (
        <ScrollView {...props} alwaysBounceVertical={false}>
          {props.loading ? <ActivityIndicator /> : props.children}
          <SafeArea.Bottom />
        </ScrollView>
      ) : (
        <FlatList {...props} />
      )}
    </View>
  );
};

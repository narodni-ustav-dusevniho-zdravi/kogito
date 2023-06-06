import React from 'react';
import S from './styles';
import ReactNative from 'react-native';
import Text from '../../primitives/Text';
import IconClose from '../../../assets/icon-cross.svg';

import Moment from 'react-moment';

import ResultSatisfied from '../../../assets/emotions/satisfied_result.png';
import ResultHappy from '../../../assets/emotions/happy_result.png';
import ResultOkay from '../../../assets/emotions/okay_result.png';
import ResultSad from '../../../assets/emotions/sad_result.png';
import ResultVerysad from '../../../assets/emotions/verysad_result.png';
import EmoticonSatisfied from '../../../assets/emotions/satisfied_big.png';
import EmoticonHappy from '../../../assets/emotions/happy_big.png';
import EmoticonOkay from '../../../assets/emotions/okay_big.png';
import EmoticonSad from '../../../assets/emotions/sad_big.png';
import EmoticonVerysad from '../../../assets/emotions/verysad_big.png';
import {Mood} from '../../../../gql/__generated__/graphql';

type HalfOverlayProps = {
  close?: () => void;
  type: Mood;
} & ReactNative.ModalProperties;

type Settings = {
  title: string;
  icon: number;
  iconBig: number;
};

const getSettings = (type: HalfOverlayProps['type']): Settings => {
  switch (type) {
    case 'SATISFIED':
      return {
        title: 'Jsem velmi spokojená',
        icon: ResultSatisfied,
        iconBig: EmoticonSatisfied,
      };
    case 'HAPPY':
      return {
        title: 'Jsem spokojená',
        icon: ResultHappy,
        iconBig: EmoticonHappy,
      };
    case 'OKAY':
      return {
        title: 'Je mi jakž takž',
        icon: ResultOkay,
        iconBig: EmoticonOkay,
      };
    case 'SAD':
      return {
        title: 'Jsem smutná',
        icon: ResultSad,
        iconBig: EmoticonSad,
      };
    case 'VERYSAD':
      return {
        title: 'Jsem velmi smutná',
        icon: ResultVerysad,
        iconBig: EmoticonVerysad,
      };
  }
};

const ModalEmoticon: React.FC<HalfOverlayProps> = ({
  close = () => {},
  type,
  ...rest
}) => {
  const settings = getSettings(type);

  return (
    <S.Modal animationType="fade" transparent={true} {...rest}>
      <S.Close onPress={() => close()}>
        <IconClose />
      </S.Close>
      <S.ContainerWrap type={type}>
        <S.ContainerInner>
          <S.EmoticonBg source={settings.icon} />
          <S.EmoticonContent>
            <S.EmoticonImage source={settings.iconBig} />
            <Text textVariant={'bigHeader'} align={'center'}>
              {settings.title}
            </Text>
            <Moment element={Text}>{new Date()}</Moment>
          </S.EmoticonContent>
          {/*<S.EmoticonButton>*/}
          {/*  <Text>Odstranit</Text>*/}
          {/*</S.EmoticonButton>*/}
        </S.ContainerInner>
      </S.ContainerWrap>
    </S.Modal>
  );
};

export default ModalEmoticon;

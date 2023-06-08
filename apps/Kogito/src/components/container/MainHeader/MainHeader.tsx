import React from 'react';
import S from './styles';
import IconUser from '../../../assets/icon-user.svg';
import GoBack from '../../primitives/GoBack';
import {useNavigation} from '@react-navigation/native';

export type Align = 'left' | 'right';
export type BgColor = 'transparent';

type MainContainerProps = {
  title?: string;
  useTransparent?: boolean;
  beforeBackButton?: () => Promise<void>;
};

const MainHeader: React.FC<MainContainerProps> = ({
  title,
  useTransparent = false,
  beforeBackButton,
  // ...rest
}) => {
  const navigation = useNavigation();

  return (
    <S.Container bgColor={useTransparent ? 'transparent' : undefined}>
      {title ? (
        <GoBack title={title} beforeBackButton={beforeBackButton} />
      ) : (
        <IconUser onPress={() => navigation.navigate('ProfileSettings')} />
      )}
      {/* NOT USED NOW */}
      {/*<Coin title={'132'} />*/}
    </S.Container>
  );
};

export default MainHeader;

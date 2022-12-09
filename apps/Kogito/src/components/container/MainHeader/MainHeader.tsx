import React, {FC} from 'react';
import S from './styles';
import IconUser from '../../../assets/icon-user.svg';
import GoBack from '../../primitives/GoBack';
import {useNavigation} from '@react-navigation/native';

export type Align = 'left' | 'right' | null;
export type BgColor = 'transparent' | null;

type MainContainerProps = {
  title?: string;
  useTransparent?: boolean;
  beforeBackButton?: () => Promise<void>;
};

const MainHeader: FC<MainContainerProps> = ({
  title,
  useTransparent = false,
  beforeBackButton = async () => {},
  // ...rest
}) => {
  const navigation = useNavigation();

  return (
    <S.Container bgColor={useTransparent ? 'transparent' : null} align={null}>
      {title ? (
        <GoBack
          title={title}
          goTo={'Dashboard'}
          beforeBackButton={beforeBackButton}
        />
      ) : (
        <IconUser onPress={() => navigation.navigate('ProfileSettings')} />
      )}
      {/* NOT USED NOW */}
      {/*<Coin title={'132'} />*/}
    </S.Container>
  );
};

export default MainHeader;

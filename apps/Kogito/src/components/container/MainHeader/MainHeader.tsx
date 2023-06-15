import React from 'react';

import IconUser from '~assets/icon-user.svg';
import {useNavigation} from '~modules/navigation';

import GoBack from '../../primitives/GoBack';

import S from './styles';

export type Align = 'left' | 'right';
export type BgColor = 'transparent';

type MainContainerProps = {
  beforeBackButton?: () => Promise<void>;
  title?: string;
  useTransparent?: boolean;
};

const MainHeader: React.FC<MainContainerProps> = ({
  title,
  useTransparent = false,
  beforeBackButton,
  // ...rest
}) => {
  const {navigate} = useNavigation();

  return (
    <S.Container bgColor={useTransparent ? 'transparent' : undefined}>
      {title ? (
        <GoBack beforeBackButton={beforeBackButton} title={title} />
      ) : (
        <IconUser onPress={() => navigate('ProfileSettings')} />
      )}
      {/* NOT USED NOW */}
      {/*<Coin title={'132'} />*/}
    </S.Container>
  );
};

export default MainHeader;

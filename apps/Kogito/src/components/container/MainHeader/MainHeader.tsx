import React from 'react';

import {logEvent} from '~modules/analytics';
import {useNavigation} from '~modules/navigation';
import {Icon} from '~modules/ui';

import GoBack from '../../primitives/GoBack';

import S from './styles';

export type Align = 'left' | 'right';
export type BgColor = 'transparent';

type MainContainerProps = {
  title?: string;
  useTransparent?: boolean;
};

const MainHeader: React.FC<MainContainerProps> = ({
  title,
  useTransparent = false,
  // ...rest
}) => {
  const {navigate} = useNavigation();

  return (
    <S.Container bgColor={useTransparent ? 'transparent' : undefined}>
      {title ? (
        <GoBack title={title} />
      ) : (
        <Icon
          color="#1d1d1b"
          name="user"
          size={32}
          onPress={() => {
            navigate('ProfileSettings');
            logEvent('click_profile_open');
          }}
        />
      )}
      {/* NOT USED NOW */}
      {/*<Coin title={'132'} />*/}
    </S.Container>
  );
};

export default MainHeader;

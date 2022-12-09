import React, {FC} from 'react';
import Icon from '../../../assets/icon-chevron-left.svg';
import S from './styles';
import {useNavigation} from '@react-navigation/native';

type ContainerProps = {
  title: string;
  goTo: string;
  beforeBackButton?: () => Promise<void>;
};

const GoBack: FC<ContainerProps> = ({
  goTo = '',
  title,
  beforeBackButton = () => {},
  ...rest
}) => {
  const navigation = useNavigation();

  const handlePress = async () => {
    await beforeBackButton();
    navigation.navigate(goTo);
  };

  return (
    <S.Container {...rest} onPress={handlePress}>
      <S.Wrapper>
        <Icon
          style={{
            color: '#1c1c1c',
          }}
        />
        <S.Text>{title}</S.Text>
      </S.Wrapper>
    </S.Container>
  );
};

export default GoBack;

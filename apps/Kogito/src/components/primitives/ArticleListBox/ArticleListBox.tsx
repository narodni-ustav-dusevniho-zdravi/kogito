import React, {FC} from 'react';
import {Container, ContainerInner, Title, Text} from './styles';
import Button from '../Button';
import {View} from 'react-native';
import Moment from 'react-moment';
import LinearGradient from 'react-native-linear-gradient';

type BoxBigProps = {
  title: string;
  buttonText: string;
  date: Date;
  onPress?: () => void;
};

const ArticleListBox: FC<BoxBigProps> = ({
  title,
  buttonText,
  date,
  onPress = () => {},
}) => {
  return (
    <Container>
      <LinearGradient
        colors={['#FFCE8F', '#FFA38F']}
        useAngle={true}
        angle={138}>
        <ContainerInner
          style={
            {
              // display: 'flex',
              // flexDirection: 'row',
              // justifyContent: 'space-between',
              // alignItems: 'center',
              // flexWrap: 'wrap',
            }
          }>
          {/*<View>*/}
          <Title>{title}</Title>
          {/*<Moment element={Text}>{date}</Moment>*/}
          {/*</View>*/}
          <Button
            onPress={onPress}
            title={buttonText}
            colorVariant={'red'}
            type={'small'}
          />
        </ContainerInner>
      </LinearGradient>
    </Container>
  );
};

export default ArticleListBox;

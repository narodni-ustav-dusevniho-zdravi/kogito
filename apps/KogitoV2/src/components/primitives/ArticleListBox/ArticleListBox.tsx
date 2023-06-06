import React from 'react';
import {Container, ContainerInner, Title} from './styles';
import Button from '../Button';
import LinearGradient from 'react-native-linear-gradient';

type BoxBigProps = {
  title: string;
  buttonText: string;
  onPress?: () => void;
};

const ArticleListBox: React.FC<BoxBigProps> = ({
  title,
  buttonText,
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

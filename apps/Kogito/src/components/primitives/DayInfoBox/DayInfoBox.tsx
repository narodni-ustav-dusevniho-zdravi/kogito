import React from 'react';
import S from './styles';
import {TouchableWithoutFeedback} from 'react-native';

type ContainerProps = {
  date: Date;
  title?: string;
  onPress?: () => void;
  onLongPress?: () => void;
};

const toDayString = (day: number): string => {
  switch (day) {
    case 0:
      return 'Ne';
    case 1:
      return 'Po';
    case 2:
      return 'Út';
    case 3:
      return 'St';
    case 4:
      return 'Čt';
    case 5:
      return 'Pá';
    case 6:
      return 'So';
    default:
      return '-';
  }
};

const DayInfoBox: React.FC<ContainerProps> = ({
  date,
  title = '',
  onPress = () => {},
  onLongPress = () => {},
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} onLongPress={onLongPress}>
      <S.Container>
        <S.Wrapper>
          <S.DayBox>
            <S.TextDay>{date.getDate().toString()}</S.TextDay>
            <S.TextDayInWeek>{toDayString(date.getDay())}</S.TextDayInWeek>
          </S.DayBox>
          <S.TitleBox>
            <S.Title>{title}</S.Title>
          </S.TitleBox>
        </S.Wrapper>
      </S.Container>
    </TouchableWithoutFeedback>
  );
};

export default DayInfoBox;

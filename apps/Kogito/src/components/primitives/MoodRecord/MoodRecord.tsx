import React, {FC} from 'react';
import S from './styles';
import {Mood} from '../../../modules/diary/useLogMood';
import EmoticonSatisfied from '../../../assets/emotions/satisfied.png';
import EmoticonHappy from '../../../assets/emotions/happy.png';
import EmoticonOkay from '../../../assets/emotions/okay.png';
import EmoticonSad from '../../../assets/emotions/sad.png';
import EmoticonVerysad from '../../../assets/emotions/verysad.png';

type MoodRecordProps = {
  type: Mood;
  onLongPress?: () => void;
};

const MoodRecord: FC<MoodRecordProps> = ({
  type,
  onLongPress = () => {},
  children,
}) => {
  return (
    <S.Container type={type} onLongPress={onLongPress}>
      <S.Text>{children}</S.Text>
      {type === 'SATISFIED' && <S.Image source={EmoticonSatisfied} />}
      {type === 'HAPPY' && <S.Image source={EmoticonHappy} />}
      {type === 'OKAY' && <S.Image source={EmoticonOkay} />}
      {type === 'SAD' && <S.Image source={EmoticonSad} />}
      {type === 'VERYSAD' && <S.Image source={EmoticonVerysad} />}
    </S.Container>
  );
};

export default MoodRecord;

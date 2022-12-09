import React, {FC, useEffect, useState} from 'react';
import Modal from '../../../../components/container/Modal/Modal';
import {Mood, useLogMood} from '../../useLogMood';
import useEventListener from '../../../../helpers/useEventListener';
import Text from '../../../../components/primitives/Text';
import ButtonIcon from '../../../../components/primitives/ButtonIcon';
import {Image} from 'react-native';
import EmoticonSatisfied from '../../../../assets/emotions/satisfied.png';
import EmoticoedHappy from '../../../../assets/emotions/happy.png';
import EmoticonOkay from '../../../../assets/emotions/okay.png';
import EmoticonSad from '../../../../assets/emotions/sad.png';
import EmoticonVerysad from '../../../../assets/emotions/verysad.png';
import S from './styles';
import ModalEmoticon from '../../../../components/container/ModalEmoticon/ModalEmoticon';
import useMixPanelTracking from '../../../../tracking/useMixPanelTracking';

const LogMoodModal: FC = () => {
  const logMoodMutation = useLogMood();
  const [visibility, setVisibility] = useState(false);
  const [showResult, setShowResult] = useState<Mood | null>(null);
  const [closeTimer, setCloseTimer] = useState<NodeJS.Timeout | null>(null);
  const {trackEmotionEvaluated} = useMixPanelTracking();

  const {addListener, removeListener, fireEvent} = useEventListener();

  const logMood = async (mood: Mood) => {
    const result = await logMoodMutation({
      variables: {
        input: {
          mood,
        },
      },
    });

    trackEmotionEvaluated(
      mood,
      result.data?.logMood.last ? result.data.logMood.last : '',
    );
    setShowResult(mood);
    fireEvent('refetch-mood-list');

    setCloseTimer(
      setTimeout(() => {
        fireEvent('refetch-mood-list');
        setVisibility(false);
        setShowResult(null);
      }, 3000),
    );
  };

  const handleClose = () => {
    if (closeTimer) {
      clearTimeout(closeTimer);
      setCloseTimer(null);
    }
    setVisibility(false);
  };

  useEffect(() => {
    const openFunction = () => {
      setShowResult(null);
      setVisibility(true);
    };

    addListener('open-log-mood', openFunction);

    return () => {
      removeListener(openFunction);
    };
  }, []);

  if (visibility) {
    return !showResult ? (
      <Modal close={() => setVisibility(false)}>
        <Text textVariant={'bigHeader'} align={'center'}>
          Jak se cítíte?
        </Text>
        <Text textVariant={'textMini'} align={'center'}>
          Zaznamejte svou náladu
        </Text>
        <S.EmoticonWrapper>
          <S.EmoticonItem>
            <ButtonIcon onPress={() => logMood('SATISFIED')}>
              <Image source={EmoticonSatisfied} />
            </ButtonIcon>
          </S.EmoticonItem>
          <S.EmoticonItem>
            <ButtonIcon onPress={() => logMood('HAPPY')}>
              <Image source={EmoticoedHappy} />
            </ButtonIcon>
          </S.EmoticonItem>
          <S.EmoticonItem>
            <ButtonIcon onPress={() => logMood('OKAY')}>
              <Image source={EmoticonOkay} />
            </ButtonIcon>
          </S.EmoticonItem>
          <S.EmoticonItem>
            <ButtonIcon onPress={() => logMood('SAD')}>
              <Image source={EmoticonSad} />
            </ButtonIcon>
          </S.EmoticonItem>
          <S.EmoticonItem>
            <ButtonIcon onPress={() => logMood('VERYSAD')}>
              <Image source={EmoticonVerysad} />
            </ButtonIcon>
          </S.EmoticonItem>
        </S.EmoticonWrapper>
      </Modal>
    ) : (
      <ModalEmoticon type={showResult} close={handleClose} />
    );
  } else {
    return <></>;
  }
};

export default LogMoodModal;

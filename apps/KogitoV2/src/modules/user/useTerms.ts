import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import {useEffect, useState} from 'react';

export const useTerms = () => {
  const [haveSeenTerms, setHaveSeenTerms] = useState(false);

  const setSeenTerms = async () => {
    setHaveSeenTerms(true);
    await RNSecureStorage.set('user.terms', '1', {
      accessible: ACCESSIBLE.ALWAYS,
    });
  };

  useEffect(() => {
    RNSecureStorage.get('user.terms').then(value => {
      setHaveSeenTerms(value === '1');
    });
  }, []);

  return {
    setSeenTerms,
    haveSeenTerms,
  };
};

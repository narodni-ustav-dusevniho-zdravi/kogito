import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ToastAndroid} from 'react-native';

import type {LoginInput} from '~gql/graphql';
import {logEvent} from '~modules/analytics';
import {Dialog} from '~modules/ui';

import TextInput from '../../components/form/TextInput';
import {ValidationMessage} from '../../components/form/ValidationMessage';
import Button from '../../components/primitives/Button';
import {PHONE_NUMBER_REGEX} from '../../helpers/regexp';
import {useAuth} from '../useAuth';
import {useLogin} from '../useLogin';

type LoginForm = {
  onClose: () => void;
  onSuccess: () => void;
  type: 'login' | 'registration';
};

// eslint-disable-next-line max-lines-per-function
const LoginForm: React.FC<LoginForm> = ({type, onSuccess, onClose}) => {
  const {setTokens} = useAuth();
  const [useMasked, setUseMasked] = useState(true);
  const {initializeLoginMutation, loginMutation} = useLogin();
  const [error, setError] = useState<string | null>(null);
  const {control, handleSubmit, watch} = useForm<LoginInput>({
    defaultValues: {
      phoneNumber: '+420',
    },
  });
  const phoneNumberWatch = watch('phoneNumber');
  useEffect(() => {
    setUseMasked(true);
    (async () => {
      const phoneNumber = phoneNumberWatch.replace(/\s/gi, '');
      console.log(phoneNumber.length);
      console.log(phoneNumber.match(PHONE_NUMBER_REGEX));

      if (phoneNumber.length >= 13 && phoneNumber.match(PHONE_NUMBER_REGEX)) {
        const result = await initializeLoginMutation({
          variables: {
            input: {
              phoneNumber,
            },
          },
        });

        if (result.data?.initLogin.useSmsCode) {
          ToastAndroid.show(
            'Na Váš telefon jsme odeslali SMS s přihlašovacím kódem',
            ToastAndroid.LONG,
          );
          setUseMasked(false);
        }
      } else {
        console.log('Invalid phone number');
      }
    })().then();
  }, [initializeLoginMutation, phoneNumberWatch]);

  const onSubmit = async (input: LoginInput) => {
    console.log('Submit');
    logEvent(type === 'login' ? 'click_login' : 'click_register');
    try {
      const result = await loginMutation({
        variables: {
          input: {
            phoneNumber: input.phoneNumber.replace(/\s/gi, ''),
            password: input.password,
          },
        },
      });

      console.log(result);

      if (result.data) {
        logEvent(
          type === 'login'
            ? 'Login Phone Number Entered'
            : 'Registration Phone Number Entered',
        );
        setTokens(
          result.data.login.accessToken,
          result.data.login.refreshToken,
        );
        onSuccess();
      }
    } catch (e) {
      console.log(e);
      setError('Telefonní číslo nebo heslo neni správné.');
    }
  };

  return (
    <Dialog
      title={type === 'login' ? 'Přihlášení' : 'Registrace'}
      visible
      onHide={onClose}>
      <Controller
        control={control}
        defaultValue=""
        name="phoneNumber"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Telefonní číslo"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            onTouchStart={() => setError(null)}
          />
        )}
        rules={{required: true}}
      />
      <Controller
        control={control}
        defaultValue=""
        name="password"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder={useMasked ? 'Heslo / SMS Kód' : 'SMS Kód'}
            secureTextEntry={useMasked}
            style={{marginTop: 16, marginBottom: 24}}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            onTouchStart={() => setError(null)}
          />
        )}
        rules={{required: true}}
      />
      {error && (
        <ValidationMessage style={{marginBottom: 24}}>
          {error}
        </ValidationMessage>
      )}
      <Button
        style={{marginBottom: 24}}
        title="Přihlásit se"
        onPress={handleSubmit(onSubmit)}
      />
    </Dialog>
  );
};

export default LoginForm;

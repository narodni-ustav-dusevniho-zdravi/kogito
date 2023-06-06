import React, {useEffect, useState} from 'react';
import {ToastAndroid, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import Text from '../../../components/primitives/Text';
import TextInput from '../../../components/form/TextInput';
import Button from '../../../components/primitives/Button';
import {useAuth} from '../useAuth';
import {ValidationMessage} from '../../../components/form/ValidationMessage';
import {useLogin} from '../useLogin';
import {PHONE_NUMBER_REGEX} from '../../../helpers/regexp';
import useMixPanelTracking from '../../../tracking/useMixPanelTracking';
import {LoginInput} from '../../../../gql/__generated__/graphql';

type LoginForm = {
  type: 'login' | 'registration';
  onSuccess: () => void;
};

const LoginForm: React.FC<LoginForm> = ({type, onSuccess}) => {
  const {setTokens} = useAuth();
  const [useMasked, setUseMasked] = useState(true);
  const {initializeLoginMutation, loginMutation} = useLogin();
  const [error, setError] = useState<string | null>(null);
  const {trackRegistrationPhoneNumberEntered} = useMixPanelTracking();
  const {control, handleSubmit, watch} = useForm<LoginInput>({
    defaultValues: {
      phoneNumber: '+420',
    },
  });
  const phoneNumberWatch = watch('phoneNumber');

  useEffect(() => {
    setUseMasked(true);
    (async () => {
      const phoneNumber = phoneNumberWatch.replace(' ', '');
      console.log(phoneNumber.length);
      console.log(phoneNumber.match(PHONE_NUMBER_REGEX));

      if (phoneNumber.length >= 13 && phoneNumber.match(PHONE_NUMBER_REGEX)) {
        const result = await initializeLoginMutation({
          variables: {
            input: {
              phoneNumber: phoneNumber,
            },
          },
        });

        if (result && result.data?.initLogin.useSmsCode) {
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
  }, [phoneNumberWatch]);

  const onSubmit = async (input: LoginInput) => {
    console.log('Submit');
    try {
      const result = await loginMutation({
        variables: {
          input,
        },
      });

      console.log(result);

      if (result.data) {
        trackRegistrationPhoneNumberEntered();
        await setTokens(
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
    <View>
      <View style={{marginBottom: 35}}>
        {type === 'login' && <Text textVariant="bigHeader">Přihlášení</Text>}
        {type === 'registration' && (
          <Text textVariant="bigHeader">Registrace</Text>
        )}
      </View>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Telefonní číslo"
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            onTouchStart={() => setError(null)}
            value={value}
          />
        )}
        name="phoneNumber"
        rules={{required: true}}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            secureTextEntry={useMasked}
            style={{marginTop: 16, marginBottom: 24}}
            placeholder={useMasked ? 'Heslo / SMS Kód' : 'SMS Kód'}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            onTouchStart={() => setError(null)}
            value={value}
          />
        )}
        name="password"
        rules={{required: true}}
        defaultValue=""
      />
      {error && (
        <ValidationMessage style={{marginBottom: 24}}>
          {error}
        </ValidationMessage>
      )}
      <Button
        title="Přihlásit se"
        onPress={handleSubmit(onSubmit)}
        style={{marginBottom: 24}}
      />
    </View>
  );
};

export default LoginForm;

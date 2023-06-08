import React from 'react';
import {View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import TextInput from '../../../components/form/TextInput/TextInput';
import Button from '../../../components/primitives/Button/Button';
import {useFinishRegistration} from '../../user/useFinishRegistration';
import Text from '../../../components/primitives/Text';
import {EMAIL_REGEX} from '../../../helpers/regexp';
import {useMeQuery} from '../../user/useMeQuery';
import ChoiceList from '../../../components/form/ChoiceList/ChoiceList';

type FinishRegistrationForm = {
  onSuccess: () => void;
};

const MaritalStatusChoices = [
  {label: 'Žiji s manželem', value: 1},
  {label: 'Žiji s partnerem', value: 2},
  {label: 'Žiji sama', value: 3},
  {label: 'Vdova', value: 4},
  {label: 'Jiný - prosím doplňte', value: 5},
];

const EducationalAttainment = [
  {label: 'Základní včetně neukončeného', value: 1},
  {label: 'Střední včetně vyučení bez maturity', value: 2},
  {label: 'Střední s maturitou', value: 3},
  {label: 'Vyšší odborné vzdělání ', value: 4},
  {label: 'Vysokoškolské bakalářské', value: 5},
  {label: 'Vysokoškolské magisterské', value: 6},
  {label: 'Vyšší', value: 7},
];

const Population = [
  {label: '1 – 999', value: 1},
  {label: '1 000 - 4 999', value: 2},
  {label: '5 000 - 9 999', value: 3},
  {label: '10 000 - 49 999', value: 4},
  {label: '50 000 - 99 999', value: 5},
  {label: '100 000 a více', value: 6},
];

const ActualState = [
  {label: 'Těhotná', value: 1},
  {label: 'V šestinedělí', value: 2},
  {label: 'Po šestinedělí do 1 roku dítěte', value: 3},
  {label: 'Od porodu uběhl víc jak rok', value: 4},
];

const FinishRegistrationForm: React.FC<FinishRegistrationForm> = ({
  onSuccess,
}) => {
  const {me, updateCacheValue} = useMeQuery();
  const {finishRegistrationMutation} = useFinishRegistration();
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: me?.firstName || '',
      lastName: me?.lastName || '',
      email: me?.email || '',
      age: me?.age,
      maritalStatus: me?.maritalStatus,
      maritalStatusDescription: me?.maritalStatusDescription || '',
      numberOfChildren: me?.numberOfChildren,
      educationalAttainment: me?.educationalAttainment,
      population: me?.population,
      actualState: me?.actualState,
    },
  });
  const maritalStatusValue = watch('maritalStatus');

  const onSubmit: Parameters<typeof handleSubmit>[0] = async input => {
    console.log('Submit', input);
    try {
      const result = await finishRegistrationMutation({
        variables: {
          input: {
            ...input,
            firstName: '',
            lastName: '',
          },
        },
      });
      if (result.data?.finishRegistration.viewer) {
        updateCacheValue(result.data.finishRegistration.viewer.me);
      }
      onSuccess();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      {/*<Controller*/}
      {/*  control={control}*/}
      {/*  name="firstName"*/}
      {/*  rules={{required: {value: true, message: 'Vyplň prosím své jméno'}}}*/}
      {/*  render={({field: {onChange, onBlur, value}}) => (*/}
      {/*    <TextInput*/}
      {/*      placeholder="Jméno"*/}
      {/*      style={{marginTop: 16}}*/}
      {/*      onBlur={onBlur}*/}
      {/*      onChangeText={(value) => onChange(value)}*/}
      {/*      value={value}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*/>*/}
      {/*{errors.firstName && <Text>{errors.firstName.message}</Text>}*/}

      {/*<Controller*/}
      {/*  control={control}*/}
      {/*  name="lastName"*/}
      {/*  rules={{required: {value: true, message: 'Vyplň prosím své příjmení'}}}*/}
      {/*  render={({field: {onChange, onBlur, value}}) => (*/}
      {/*    <TextInput*/}
      {/*      placeholder="Příjmení"*/}
      {/*      style={{marginTop: 16}}*/}
      {/*      onBlur={onBlur}*/}
      {/*      onChangeText={(value) => onChange(value)}*/}
      {/*      value={value}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*/>*/}
      {/*{errors.lastName && <Text>{errors.lastName.message}</Text>}*/}

      <Controller
        control={control}
        name="email"
        rules={{
          required: {value: true, message: 'Vyplň prosím svůj e-mail'},
          pattern: {value: EMAIL_REGEX, message: 'E-mail není validní'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="E-Mail"
            autoComplete="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            style={{marginTop: 16}}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
      />
      {errors.email && <Text>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="age"
        rules={{required: {value: true, message: 'Vyplň prosím svůj věk'}}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Věk"
            keyboardType="number-pad"
            style={{marginTop: 16}}
            onBlur={onBlur}
            onChangeText={value =>
              onChange(parseInt(value.replace(/[^0-9]/g, '')))
            }
            value={value?.toString()}
          />
        )}
      />
      {errors.age && <Text>{errors.age.message}</Text>}

      <Controller
        control={control}
        name="actualState"
        rules={{
          required: {value: true, message: 'Vyplň prosím svůj aktuální stav'},
        }}
        render={({field: {onChange, value}}) => (
          <ChoiceList
            value={value}
            placeholder={{label: 'Aktuálně jsem', value: 0}}
            items={ActualState}
            onValueChange={onChange}
          />
        )}
      />
      {errors.actualState && <Text>{errors.actualState.message}</Text>}

      <Controller
        control={control}
        name="maritalStatus"
        rules={{
          required: {value: true, message: 'Vyplň prosím svůj rodinný stav'},
        }}
        render={({field: {onChange, value}}) => (
          <ChoiceList
            value={value}
            placeholder={{label: 'Váš rodinný stav', value: 0}}
            items={MaritalStatusChoices}
            onValueChange={value => onChange(value)}
          />
        )}
      />
      {errors.maritalStatus && <Text>{errors.maritalStatus.message}</Text>}

      {maritalStatusValue === 5 && (
        <>
          <Controller
            control={control}
            name="maritalStatusDescription"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Popis Váš rodinný stav zde"
                style={{marginTop: 16}}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
          />
          {errors.maritalStatusDescription && (
            <Text>{errors.maritalStatusDescription.message}</Text>
          )}
        </>
      )}

      <Controller
        control={control}
        name="numberOfChildren"
        rules={{
          required: {
            value: true,
            message: 'Vyplň prosím počet dětí v domácnosti',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Počet dětí v domácnosti"
            keyboardType="number-pad"
            style={{marginTop: 16}}
            onBlur={onBlur}
            onChangeText={value =>
              onChange(parseInt(value.replace(/[^0-9]/g, '')))
            }
            value={value?.toString()}
          />
        )}
      />
      {errors.numberOfChildren && (
        <Text>{errors.numberOfChildren.message}</Text>
      )}

      <Controller
        control={control}
        name="educationalAttainment"
        rules={{
          required: {
            value: true,
            message: 'Vyplň prosím své dosažené vzdělání',
          },
        }}
        render={({field: {onChange, value}}) => (
          <ChoiceList
            value={value}
            placeholder={{label: 'Dosažené vzdělání', value: 0}}
            items={EducationalAttainment}
            onValueChange={value => onChange(value)}
          />
        )}
      />
      {errors.educationalAttainment && (
        <Text>{errors.educationalAttainment.message}</Text>
      )}

      <Controller
        control={control}
        name="population"
        rules={{
          required: {
            value: true,
            message: 'Vyplň počet obyvatel v místě bydliště',
          },
        }}
        render={({field: {onChange, value}}) => (
          <ChoiceList
            value={value}
            placeholder={{label: 'Počet obyvatel v místě bydliště', value: 0}}
            items={Population}
            onValueChange={value => onChange(value)}
          />
        )}
      />
      {errors.population && <Text>{errors.population.message}</Text>}

      <Button
        title="Pokračovat"
        style={{marginTop: 24}}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default FinishRegistrationForm;

import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import Button from '../../../components/primitives/Button';
import TextInput from '../../../components/form/TextInput';
import {useMeQuery} from '../useMeQuery';
import {useEditProfile} from '../useEditProfile';
import {EditProfileInput} from '../../../../gql/__generated__/graphql';

type ProfileSettingsForm = {
  onSuccess?: () => void;
};

const ProfileSettingsForm: React.FC<ProfileSettingsForm> = ({
  onSuccess = () => {},
}) => {
  const {me} = useMeQuery();
  const {control, handleSubmit} = useForm({
    defaultValues: {
      firstName: me?.firstName || '',
      lastName: me?.lastName || '',
    },
  });
  const {editProfileMutation} = useEditProfile();

  console.log({me});

  const onSubmit = async (input: EditProfileInput) => {
    try {
      await editProfileMutation({
        variables: {
          input,
        },
      });
      onSuccess();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Jméno"
            onBlur={onBlur}
            style={{marginTop: 16, marginBottom: 6}}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="firstName"
        rules={{required: true}}
      />
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Příjmení"
            onBlur={onBlur}
            style={{marginTop: 6, marginBottom: 12}}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="lastName"
        rules={{required: true}}
      />
      <Button
        title="Uložit"
        type="medium"
        onPress={handleSubmit(onSubmit)}
        style={{marginBottom: 24}}
      />
    </>
  );
};

export default ProfileSettingsForm;

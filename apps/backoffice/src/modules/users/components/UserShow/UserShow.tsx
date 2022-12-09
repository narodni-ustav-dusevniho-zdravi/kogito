import React, {FC} from 'react';
import {
  BooleanField,
  Show,
  TextField,
  TabbedShowLayout,
  Tab,
  ArrayField,
  Datagrid,
  DateField,
  FunctionField,
  ReferenceField,
} from 'react-admin';

const MaritalStatusChoices = {
  null: 'Nevyplněno',
  1: 'Žiji s manželem',
  2: 'Žiji s partnerem',
  3: 'Žiji sama',
  4: 'Vdova',
  5: 'Jiný - prosím doplňte',
};

const EducationalAttainment = {
  null: 'Nevyplněno',
  1: 'Základní včetně neukončeného',
  2: 'Střední včetně vyučení bez maturity',
  3: 'Střední s maturitou',
  4: 'Vyšší odborné vzdělání ',
  5: 'Vysokoškolské bakalářské',
  6: 'Vysokoškolské magisterské',
  7: 'Vyšší',
};

const Population = {
  null: 'Nevyplněno',
  1: '1 – 999',
  2: '1 000 - 4 999',
  3: '5 000 - 9 999',
  4: '10 000 - 49 999',
  5: '50 000 - 99 999',
  6: '100 000 a více',
};

const ActualState = {
  null: 'Nevyplněno',
  1: 'Těhotná',
  2: 'V šestinedělí',
  3: 'Po šestinedělí do 1 roku dítěte',
  4: 'Od porodu uběhl víc jak rok',
};

const UserShow: FC = (props) => {
  return (
    <>
      <Show {...props}>
        <TabbedShowLayout>
          <Tab label="Detaily">
            <TextField label="Jméno" source="firstName" />
            <TextField label="Příjmení" source="lastName" />
            <TextField label="Telefon" source="phoneNumber" type="tel" />

            <TextField label="Skupina" source="group" />
            <TextField label="Zpětná vazba" source="registrationLabel" />

            <BooleanField
              label="Dokončená registrace"
              source="finishedRegistration"
            />
            <BooleanField
              label="Uživatel pozvaný z administrace"
              source="invitedUser"
            />
          </Tab>
          <Tab label="Osobní dotazníky">
            <BooleanField label="Vyplněno" source="userInfoCompleted" />
            <TextField label="Věk" source="age" />
            <DateField label="Datum narození" source="dateOfBirth" />

            <FunctionField
              label="Rodinný stav"
              render={(record) => MaritalStatusChoices[record.maritalStatus]}
            />
            <TextField
              label="Popis rodinného stavu"
              source="maritalStatusDescription"
            />
            <TextField
              label="Počet dětí v domácnosti"
              source="numberOfChildren"
            />
            <FunctionField
              label="Vzdělání"
              render={(record) =>
                EducationalAttainment[record.educationalAttainment]
              }
            />
            <FunctionField
              label="Počet obyvatel v místě bydliště"
              render={(record) => Population[record.population]}
            />
            <FunctionField
              label="Aktuální stav"
              render={(record) => ActualState[record.actualState]}
            />
          </Tab>
          <Tab label="Dotazníky">
            <ArrayField source="userQuestionnaire">
              <Datagrid>
                <TextField label="Jméno" source="name" />
                <DateField label="Dokončen" source="completedAt" />

                <ArrayField source="items">
                  <Datagrid>
                    <TextField label="Otázka" source="question" />
                    <TextField label="Odpověď" source="answer" />
                  </Datagrid>
                </ArrayField>
              </Datagrid>
            </ArrayField>
          </Tab>
          <Tab label="Aktuální cesta">
            <TextField label="Aktuální cesta" source="actualJourney" />
          </Tab>
        </TabbedShowLayout>
      </Show>
    </>
  );
};

export default UserShow;

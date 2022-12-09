import React, {FC} from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  ArrayInput,
  NumberInput,
  SimpleFormIterator,
} from 'react-admin';
import {Record as RaRecord} from 'ra-core/esm/types';

type TransformFC = (data: RaRecord) => RaRecord | Promise<RaRecord>;
const transform: TransformFC = (data) => {
  const mutateRecord = {...data};

  console.log(mutateRecord.questions);

  delete mutateRecord['questionsIds'];

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  mutateRecord.questions = mutateRecord.questions.map((question) => ({
    id: question.id,
    question: question.question,
    answers: question.answers,
  }));

  console.log(mutateRecord);

  return mutateRecord;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Title: FC<any> = ({record}) => {
  return <span>Dotazník {record ? `"${record.name}"` : ''}</span>;
};

const QuestionnaireEdit: FC = (props) => {
  return (
    <Edit {...props} transform={transform} title={<Title />}>
      <SimpleForm>
        <TextInput source="name" />
        <ArrayInput source="questions">
          <SimpleFormIterator>
            <TextInput source="question" />
            <ArrayInput source="answers" defaultValue={[]}>
              <SimpleFormIterator>
                <TextInput source="answer" />
              </SimpleFormIterator>
            </ArrayInput>
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
};

export default QuestionnaireEdit;

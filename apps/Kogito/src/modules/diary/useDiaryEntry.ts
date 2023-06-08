import {gql, MutationFunction, useMutation, useQuery} from '@apollo/client';

const DiaryEntryQuery = gql`
  query diaryEntry($id: ID!) {
    diaryEntry(id: $id) {
      id
      date
      content
    }
  }
`;

const DiaryEditAction = gql`
  mutation editDiaryEntry($input: EditDiaryEntryInput!) {
    editDiaryEntry(input: $input) {
      id
      date
      previewText
      content
    }
  }
`;

const DiaryRemoveAction = gql`
  mutation removeDiaryEntry($id: ID!) {
    removeDiaryEntry(id: $id)
  }
`;

type DiaryEntry = {
  id: string;
  date: Date;
  content: string;
};

type EditDiaryEntryInput = {
  id: string | null;
  content: string;
};

type UseDiaryEntry = (id: string | null) => {
  diaryEntry: null | DiaryEntry;
  saveDiaryEntry: MutationFunction<DiaryEntry, {input: EditDiaryEntryInput}>;
  removeDiaryEntry: MutationFunction<boolean, {id: string}>;
};

export const useDiaryEntry: UseDiaryEntry = id => {
  const {data} = useQuery(DiaryEntryQuery, {
    variables: {
      id,
    },
    skip: !id,
  });

  const [saveDiaryEntry] = useMutation(DiaryEditAction);
  const [removeDiaryEntry] = useMutation(DiaryRemoveAction);

  if (data) {
    return {
      diaryEntry: data.diaryEntry,
      saveDiaryEntry,
      removeDiaryEntry,
    };
  }

  return {
    diaryEntry: null,
    saveDiaryEntry,
    removeDiaryEntry,
  };
};

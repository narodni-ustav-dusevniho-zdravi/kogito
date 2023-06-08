import {gql, useQuery} from '@apollo/client';
import {Story} from './graphql';

export const StoryDetailQuery = gql`
  query storyDetail($id: ID!) {
    storyDetail(id: $id) {
      id
      title
      published
      content
      videoLink
    }
  }
`;

type UseStoryContent = (id: string) => {
  story: Story | null;
};

export const useStoryContent: UseStoryContent = (id: string) => {
  const {data, loading} = useQuery(StoryDetailQuery, {
    variables: {
      id,
    },
  });

  return {
    story: (data && data.storyDetail) || null,
    loading,
  };
};

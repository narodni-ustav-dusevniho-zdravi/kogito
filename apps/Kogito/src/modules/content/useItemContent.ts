import {gql} from '@apollo/client';
import {useQuery} from '@apollo/client';

type Item = {
  id: string;
  name: string;
  subTitle: string;
  image: string | null;
  options: string | null;
};

type AudioItem = {
  duration: number;
  link: string;
  image?: string;
  transcript?: string;
  previous?: string | null;
  next?: string | null;
} & Item;

type ArticleItem = {
  content: {
    content: string;
    continue: string;
  }[];
} & Item;

type VideoItem = {
  link: string;
} & Item;

export const ItemQuery = gql`
  query itemDetail($id: ID!) {
    itemDetail(id: $id) {
      id
      name
      subTitle
      image
      options
      ... on AudioItem {
        duration
        transcript
        link
        next
        previous
      }
      ... on ArticleItem {
        content {
          content
          continue
        }
      }
      ... on VideoItem {
        link
      }
    }
  }
`;

type UseItemContent = (id: string) => {
  audioFile: AudioItem | null;
  articleItem: ArticleItem | null;
  videoItem: VideoItem | null;
  loading: boolean;
};

export const useItemContent: UseItemContent = (id: string) => {
  const {data, loading} = useQuery(ItemQuery, {
    variables: {
      id,
    },
  });

  if (data) {
    return {
      audioFile:
        data.itemDetail.__typename === 'AudioItem' ? data.itemDetail : null,
      articleItem:
        data.itemDetail.__typename === 'ArticleItem' ? data.itemDetail : null,
      videoItem:
        data.itemDetail.__typename === 'VideoItem' ? data.itemDetail : null,
      loading: false,
    };
  }

  return {
    audioFile: null,
    articleItem: null,
    videoItem: null,
    loading,
  };
};

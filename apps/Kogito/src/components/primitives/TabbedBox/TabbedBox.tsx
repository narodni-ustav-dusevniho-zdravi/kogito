import React, {FC, ReactInstance, useEffect, useState} from 'react';
import S from './styles';

type HeaderVariant = 'boxed' | 'headers';

type Item = {
  label: string;
  id: string;
  render: () => ReactInstance;
};

type TabbedBox = {
  items: Item[];
  headerVariant?: HeaderVariant;
};

type NavigationItem = {
  title: string;
  active: boolean;
  onPress: () => void;
};

const NavigationItem: FC<NavigationItem> = ({title, active, onPress}) => {
  return (
    <S.Navigation.Button active={active} onPress={onPress}>
      <S.Navigation.Text active={active}>{title}</S.Navigation.Text>
    </S.Navigation.Button>
  );
};

const LinkItem: FC<NavigationItem> = ({title, active, onPress}) => {
  return (
    <S.LinkItem.Link active={active} onPress={onPress}>
      <S.LinkItem.Text active={active}>{title}</S.LinkItem.Text>
      <S.LinkItem.Border active={active} />
    </S.LinkItem.Link>
  );
};

const TabbedBox: FC<TabbedBox> = ({items, headerVariant = 'boxed'}) => {
  const [selected, setSelected] = useState<Item | null>(null);

  useEffect(() => {
    if (selected) {
      const sameItem = items.find(item => item.id === selected.id);

      if (sameItem) {
        setSelected(sameItem);
        return;
      }
    }

    if (items.length) {
      setSelected(items[0]);
    } else {
      setSelected(null);
    }
  }, [items]);

  return (
    <S.WrapperContainer>
      <S.Wrapper>
        <S.Navigation.Container>
          <S.Navigation.Wrapper>
            {headerVariant === 'boxed' &&
              items.map(item => (
                <NavigationItem
                  key={item.label}
                  title={item.label}
                  active={item === selected}
                  onPress={() => setSelected(item)}
                />
              ))}
            {headerVariant === 'headers' &&
              items.map(item => (
                <LinkItem
                  key={item.label}
                  title={item.label}
                  active={item === selected}
                  onPress={() => setSelected(item)}
                />
              ))}
          </S.Navigation.Wrapper>
        </S.Navigation.Container>
        {selected && selected.render()}
      </S.Wrapper>
    </S.WrapperContainer>
  );
};

export default TabbedBox;

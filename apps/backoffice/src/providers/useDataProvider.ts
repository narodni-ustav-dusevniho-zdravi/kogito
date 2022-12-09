import { DataProvider } from 'ra-core/src/types';
import buildGraphQLProvider from 'ra-data-graphql-simple';
import { useEffect, useState } from 'react';
import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

type UseDataProviderFC = () => DataProvider | null;

const targetEndPointLink = createHttpLink({
    uri: process.env.REACT_APP_BACKOFFICE_API,
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('auth');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

export const BackofficeApolloLink = new ApolloClient({
    link: ApolloLink.from([authLink, targetEndPointLink]),
    cache: new InMemoryCache(),
});

const useDataProvider: UseDataProviderFC = () => {
    const [dataProvider, setDataProvider] = useState<DataProvider>();
    useEffect(() => {
        (async function () {
            const provider = await buildGraphQLProvider({
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                client: BackofficeApolloLink,
            });
            setDataProvider(() => provider);
        })();
    }, []);

    return dataProvider || null;
};

export default useDataProvider;

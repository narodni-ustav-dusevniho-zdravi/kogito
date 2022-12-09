// import { DataProvider } from 'ra-core/src/types';

declare module 'ra-data-graphql-simple' {
    import {DataProvider} from 'ra-core/src/types';

    type Config = {
        clientOptions: {
            uri: string;
        };
    };

    export default function buildGraphQLProvider(config: Config): Promise<DataProvider>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// declare function buildGraphQLProvider(config: any): Promise<DataProvider>;

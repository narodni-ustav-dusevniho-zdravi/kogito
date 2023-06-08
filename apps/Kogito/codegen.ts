import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://prod-api.kogito.cz/graphql',
  documents: 'src/**/*.{ts,tsx}',
  generates: {
    'gql/__generated__/': {
      preset: 'client',
      plugins: [],
      config: {
        useTypeImports: true,
        enumsAsTypes: true, // Convert enums to types 'a' | 'b' | 'c'
        //skipTypename: true, // Remove unneeded __typename from types
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
  hooks: {afterOneFileWrite: ['eslint --fix']},
};

export default config;

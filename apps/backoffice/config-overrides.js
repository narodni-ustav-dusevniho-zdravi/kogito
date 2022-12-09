const { useBabelRc, override, addWebpackAlias, overrideDevServer, watchAll } = require('customize-cra');
const path = require('path');

const ESLintPlugin = require('eslint-webpack-plugin');

function enableEslintCache() {
    return function (config) {
        const rootDir = path.resolve(__dirname, '../../');
        // console.log('rootDir:', rootDir);
        const eslintPlugin = config.plugins[11];

        if (process.env.NODE_ENV === 'development') {
            if (eslintPlugin) {
                config.plugins[11].options.cache = true;

                return {
                    ...config,
                    plugins: config.plugins,
                };
            }

            const eslint = new ESLintPlugin({
                extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
                emitError: true,
                emitWarning: true,
                failOnError: true,
                formatter: path.resolve(rootDir, 'node_modules/react-dev-utils/eslintFormatter.js'),
                eslintPath: path.resolve(rootDir, 'node_modules/eslint/lib/api.js'),
                context: path.resolve(__dirname, 'src'),
                cache: true,
                cacheLocation: path.resolve(__dirname, 'node_modules/.cache/.eslintcache'),
                cwd: __dirname,
                resolvePluginsRelativeTo: path.resolve(__dirname, 'node_modules/react-scripts/config'),
                baseConfig: {
                    extends: [path.resolve(rootDir, 'node_modules/eslint-config-react-app/base.js')],
                    rules: {},
                },
            });

            const plugins = config.plugins.concat([eslint]);
            //
            // console.log('eslint:', eslint);
            // console.log('plugins:', plugins);

            return {
                ...config,
                plugins,
            };
        }

        return config;
    };
}

module.exports = {
    webpack: override(
        useBabelRc(),
        addWebpackAlias({
            // react: path.resolve(__dirname, 'node_modules', 'react'),
            // 'styled-components': path.resolve(__dirname, '../..', 'node_modules', 'styled-components'),
            // '@medica-ui/system': path.resolve(__dirname, '../..', 'node_modules', '@medica-ui/system'),
            // '@medica-ui/theming': path.resolve(__dirname, '../..', 'node_modules', '@medica-ui/theming'),
        }),
        enableEslintCache(),
    ),
    devServer: overrideDevServer(
        // dev server plugin
        watchAll(),
    ),
};

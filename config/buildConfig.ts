import { buildDevServer } from './dev-server'
import { buildLoaders } from './loaders'
import { buildPlugins } from './plugins'
import { buildResolvers } from './resolvers'
import { BuildOptions } from './types/config'
import { Configuration } from 'webpack'

export const buildWebpackConfig = (options: BuildOptions): Configuration => {
    const { mode, isDev, paths, port } = options

    return {
        mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: buildDevServer(options),
    }
}

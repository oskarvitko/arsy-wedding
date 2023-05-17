import { BuildOptions } from '../types/config'
import { Configuration } from 'webpack-dev-server'

export const buildDevServer = (
    options: BuildOptions,
): Configuration | undefined => {
    if (!options.isDev) return undefined

    return {
        port: options.port,
        open: true,
        historyApiFallback: true,
        hot: true,
    }
}

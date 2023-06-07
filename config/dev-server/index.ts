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
        host: '0.0.0.0',
        allowedHosts: 'all',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*',
        },
    }
}

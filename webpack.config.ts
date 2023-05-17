import { buildWebpackConfig } from './config/buildConfig'
import { BuildEnv, BuildPaths } from './config/types/config'

const path = require('path')

module.exports = function (env: BuildEnv) {
    const isDev = env.mode !== 'production'
    const mode = isDev ? 'development' : 'production'
    const port = env.port || 6767

    const paths: BuildPaths = {
        src: path.resolve(__dirname, 'src'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        build: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src'),
    }

    const config = buildWebpackConfig({
        paths,
        isDev,
        port,
        mode,
    })

    return config
}

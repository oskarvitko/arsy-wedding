import { RuleSetRule } from 'webpack'
import { BuildOptions } from '../types/config'
import { buildCssLoader } from './cssLoader'
import { buildBabelLoader } from './babelLoader'
import { buildTypescriptLoader } from './typescriptLoader'
import { htmlLoader } from './htmlLoader'

export const buildLoaders = (options: BuildOptions): RuleSetRule[] => {
    const cssLoader = buildCssLoader(options.isDev)

    const babelLoader = buildBabelLoader()

    const typescriptLoader = buildTypescriptLoader()

    const loaders: RuleSetRule[] = [cssLoader, babelLoader, typescriptLoader]

    if (!options.isDev) {
        loaders.push(htmlLoader)
    }

    return loaders
}

import { RuleSetRule } from 'webpack'
import { BuildOptions } from '../types/config'
import { buildSvgLoader } from './svgLoader'
import { buildFileLoader } from './fileLoader'
import { buildCssLoader } from './cssLoader'
import { buildBabelLoader } from './babelLoader'
import { buildTypescriptLoader } from './typescriptLoader'

export const buildLoaders = (options: BuildOptions): RuleSetRule[] => {
    const svgLoader = buildSvgLoader()

    const fileLoader = buildFileLoader()

    const cssLoader = buildCssLoader(options.isDev)

    const babelLoader = buildBabelLoader()

    const typescriptLoader = buildTypescriptLoader()

    return [cssLoader, svgLoader, fileLoader, babelLoader, typescriptLoader]
}

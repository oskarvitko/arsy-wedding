import { WebpackPluginInstance, ProgressPlugin, DefinePlugin } from 'webpack'
import { BuildOptions } from '../types/config'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import path from 'path'

export const buildPlugins = (
    options: BuildOptions,
): WebpackPluginInstance[] => {
    const { paths, isDev } = options

    const plugins = [
        new ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: paths.html,
            minify: !isDev,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        new DefinePlugin({ IS_DEV: isDev }),
        new CopyWebpackPlugin({
            patterns: [{ from: 'public/video', to: 'video' }],
        }),
    ]

    return plugins
}

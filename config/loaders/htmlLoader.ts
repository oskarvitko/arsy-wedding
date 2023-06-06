import { RuleSetRule } from 'webpack'

export const htmlLoader: RuleSetRule = {
    test: /\.html$/i,
    loader: 'html-loader',
}

export const assetsLoader: RuleSetRule = {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
}

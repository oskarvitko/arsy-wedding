import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export const buildCssLoader = (isDev: boolean) => ({
    test: /\.(sa|sc|c)ss$/,
    exclude: /\.module.(s[ac]ss)$/,
    use: [
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                url: true,
                sourceMap: isDev,
            },
        },
        'postcss-loader',
        {
            loader: 'sass-loader',
            options: {
                sourceMap: isDev,
            },
        },
    ],
})

export const buildFileLoader = () => ({
    test: /\.(png|jpe?g|gif)$/i,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'images',
            },
        },
    ],
})

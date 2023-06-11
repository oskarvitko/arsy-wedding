import { RuleSetRule } from 'webpack'

export const htmlLoader: RuleSetRule = {
    test: /\.html$/i,
    loader: 'html-loader',
    options: {
        sources: {
            list: [
                {
                    tag: 'img',
                    attribute: 'src',
                    type: 'src',
                },
                {
                    tag: 'a',
                    attribute: 'href',
                    type: 'src',
                    filter: (
                        tag: string,
                        attribute: string,
                        attributes: string,
                        resourcePath: string,
                    ) => {
                        if (tag === 'a') {
                            if (resourcePath.includes('.mp4')) return true

                            return false
                        }

                        return true
                    },
                },
            ],
        },
    },
}

export const assetsLoader: RuleSetRule = {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
}

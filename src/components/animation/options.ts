import { Options } from '.'

export const getNodes = (): Options[] => [
    {
        sectionSelector: '#section-main',
        selectors: [
            '#section-main > div > div > div.main__inner-title',
            '#section-main > div > div > div.main__inner-photo',
            '#section-description',
            '#section-date > div > div.date__inner-photo',
            '#section-date > div > div.date__inner-text',
        ],
        animation: [
            'animate__fadeInLeft',
            'animate__fadeInRight',
            'animate__fadeIn',
            'animate__fadeInLeft',
            'animate__fadeInRight',
        ],
        delay: 700,
        groups: [[0, 1], [2], [3, 4]],
    },
    {
        sectionSelector: '#section-colors',
        selectors: [
            '#section-colors > div > p',
            '#section-colors > div > div > div:nth-child(1)',
            '#section-colors > div > div > div:nth-child(2)',
            '#section-colors > div > div > div:nth-child(3)',
            '#section-colors > div > div > div:nth-child(4)',
        ],
        animation: [
            'animate__fadeIn',
            'animate__fadeInUp',
            'animate__fadeInUp',
            'animate__fadeInUp',
            'animate__fadeInUp',
        ],
        firstDelay: 1000,
        delay: 300,
    },
    {
        sectionSelector: '#section-gifts > div > p',
        selectors: ['#section-gifts > div > p'],
        animation: ['animate__fadeIn'],
        firstDelay: 500,
    },
]

export const initTitle = () => {
    const node = document.querySelector<HTMLParagraphElement>(
        '#section-description > div > p',
    )
    const yesLabel = document.querySelector('[for=yes]')
    const noLabel = document.querySelector('[for=no]')

    if (node && yesLabel && noLabel) {
        const text = getText()
        node.innerHTML = `${text.dear}, мы рады сообщить ${text.short}, что мы женимся!<br>${text.lets} разделить этот счастливый и
        долгожданный для нас праздник.`

        yesLabel.textContent = text.single ? 'Буду' : 'Будем присутствовать'
        noLabel.textContent = text.single ? 'Не буду' : 'Будем отсутствовать'
    }
}

const getText = (): {
    dear: string
    lets: string
    short: string
    single?: boolean
} => {
    const pathname = window.location.pathname.replace(/\//g, '')
    switch (pathname) {
        case 'f':
            return {
                dear: 'Дорогие гости',
                lets: 'Приглашаем Вашу семью',
                short: 'вам',
            }
        case 'c': {
            return {
                dear: 'Дорогие гости',
                lets: 'Приглашаем Вас',
                short: 'вам',
            }
        }
        case 'u': {
            return {
                dear: 'Дорогой гость',
                lets: 'Приглашаем тебя',
                short: 'тебе',
                single: true,
            }
        }
        default:
            return {
                dear: 'Дорогие гости',
                lets: 'Приглашаем Вас',
                short: 'вам',
            }
    }
}

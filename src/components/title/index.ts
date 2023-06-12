export const initTitle = () => {
    const node = document.querySelector<HTMLParagraphElement>(
        '#section-description > div > p',
    )
    const yesLabel = document.querySelector('[for=yes]')
    const noLabel = document.querySelector('[for=no]')
    const videoBtn = document.querySelector<HTMLAnchorElement>('.main__btn')

    if (node && yesLabel && noLabel && videoBtn) {
        const text = getText()
        node.innerHTML = `${text.dear}, мы рады сообщить ${text.short}, что мы женимся!<br>${text.lets} разделить этот счастливый и
        долгожданный для нас праздник.`

        yesLabel.textContent = text.single ? 'Буду' : 'Будем присутствовать'
        noLabel.textContent = text.single ? 'Не буду' : 'Будем отсутствовать'
        videoBtn.href = text.video
    }
}

const getText = (): {
    dear: string
    lets: string
    short: string
    video: string
    single?: boolean
} => {
    const pathname = window.location.pathname.replace(/\//g, '')
    switch (pathname) {
        case 'f':
            return {
                dear: 'Дорогие гости',
                lets: 'Приглашаем Вашу семью',
                short: 'вам',
                video: './video/video-many.mp4',
            }
        case 'c': {
            return {
                dear: 'Дорогие гости',
                lets: 'Приглашаем Вас',
                short: 'вам',
                video: './video/video-many.mp4',
            }
        }
        case 'u': {
            return {
                dear: 'Дорогой гость',
                lets: 'Приглашаем тебя',
                short: 'тебе',
                single: true,
                video: './video/video-alone.mp4',
            }
        }
        default:
            return {
                dear: 'Дорогие гости',
                lets: 'Приглашаем Вас',
                short: 'вам',
                video: './video/video-many.mp4',
            }
    }
}

export const initArrow = () => {
    const arrow = document.querySelector<HTMLDivElement>('.main__arrow')
    const btn = document.querySelector('.main__btn')

    if (btn && arrow) {
        const handle = () => {
            arrow.style.display = 'none'
            btn.removeEventListener('click', handle)
        }

        btn.addEventListener('click', handle)
    }
}

export const initHand = () => {
    const galery = document.getElementById('section-galery')
    const galeryItems = galery?.querySelectorAll('.galery__item img')
    const galeryHand = document.getElementById('galery-hand')

    if (galery && galeryHand && galeryItems) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        galeryHand.classList.add('show')

                        const handleHideSwipe = () => {
                            galeryHand.classList.remove('show')
                            galery.removeEventListener(
                                'touchmove',
                                handleHideSwipe,
                            )
                        }

                        const handleHideClick = () => {
                            galeryHand.classList.remove('show')
                            galery.removeEventListener('click', handleHideClick)
                        }

                        galery.addEventListener('touchmove', handleHideSwipe)
                        galery.addEventListener('click', handleHideClick)
                    }
                })
            },
            { threshold: 1 },
        )

        observer.observe(galery)
    }
}

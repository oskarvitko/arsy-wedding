import { getNodes } from './options'

export interface Options {
    sectionSelector: string
    selectors: string[]
    firstDelay?: number
    delay?: number
    animation: string | string[]
    groups?: Array<Array<number>>
}

export const initAnimations = () => {
    const nodes = getNodes()

    nodes.forEach(initAnimation)
}

const initAnimation = (options: Options) => {
    const { sectionSelector, selectors, firstDelay = 0, groups } = options

    const section = document.querySelector(sectionSelector)

    if (!section) return

    const nodes: HTMLElement[] = []
    selectors.forEach((selector) => {
        const node = document.querySelector(selector)
        if (node) nodes.push(node as HTMLElement)
    })

    if (!nodes.length) return

    nodes.forEach((node) => node.classList.add('hidden'))

    const observer = new IntersectionObserver(
        (entries) =>
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        if (groups) {
                            animateGroups(nodes, options)
                        } else animateNodes(nodes, options)
                    }, firstDelay)
                }
            }),
        { threshold: 0.5 },
    )

    observer.observe(section)
}

const animateNodes = (nodes: HTMLElement[], options: Options) => {
    const { delay = 0, animation } = options

    nodes.forEach((node, i) => {
        const animationClass = Array.isArray(animation)
            ? animation[i]
            : animation

        setTimeout(() => {
            node.classList.remove('hidden')
            node.classList.add('animate__animated', animationClass)
        }, delay * i)
    })
}

const animateGroups = (nodes: HTMLElement[], options: Options) => {
    const { delay = 0, animation, groups = [] } = options

    groups.forEach((group, i) => {
        const nodesInGroup: Array<{ idx: number; node: HTMLElement }> = []
        nodes.forEach((node, idx) => {
            if (group.includes(idx)) {
                nodesInGroup.push({
                    node,
                    idx,
                })
            }
        })

        setTimeout(() => {
            nodesInGroup.forEach((node) => {
                const animationClass = Array.isArray(animation)
                    ? animation[node.idx]
                    : animation
                node.node.classList.remove('hidden')
                node.node.classList.add('animate__animated', animationClass)
            })
        }, delay * i)
    })
}

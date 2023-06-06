/**
 * LightCountdown javascript plugin
 * @version 1.2
 * @author xkritikx@gmail.com
 */

interface LightCountdownOptions {
    seconds: boolean
    minutes: boolean
    hours: boolean
    days: boolean
    delimeter: string
    finish?: Function
    interval: number
    animation?: string
    animationDuration: string
    language: {
        seconds: string
        minutes: string
        hours: string
        days: string
    }
}

interface CountdownRange {
    s: string
    m: string
    h: string
    d: string
    v: number
}

type LightCountdownProps = Partial<LightCountdownOptions>

class CountdownItem {
    digits: NodeListOf<HTMLElement>
    digitContainer: HTMLElement | null
    key: keyof CountdownRange
    constructor(
        prefix: string,
        key: keyof CountdownRange,
        container: HTMLElement,
    ) {
        this.digits = container.querySelectorAll(
            `.lightcountdown__${prefix} .lightcountdown__digit`,
        )
        this.digitContainer = container.querySelector(
            `.lightcountdown__${prefix} .lightcountdown__digits`,
        )
        this.key = key
    }

    tick(range: CountdownRange) {
        if (!this.digits.length) return

        const value = range[this.key].toString()

        let edited = false

        this.digits.forEach((e, i) => {
            if (e.textContent !== value[i]) {
                e.textContent = value[i]
                edited = true
            }
        })

        if (edited && this.digitContainer) {
            this.digitContainer.classList.add('flip')
            setTimeout(() => {
                if (this.digitContainer)
                    this.digitContainer.classList.remove('flip')
            }, 800)
        }
    }
}

export default class LightCountdown {
    options: LightCountdownOptions = {
        seconds: true,
        minutes: true,
        hours: true,
        days: true,
        delimeter: ':',
        interval: 1000,
        animationDuration: '600ms',
        language: {
            seconds: 'Секунд',
            minutes: 'Минут',
            hours: 'Часов',
            days: 'Дней',
        },
    }
    containers: HTMLElement[] | NodeListOf<HTMLElement> = []
    dateEnd: Date
    timer?: NodeJS.Timer
    items: CountdownItem[] = []
    progress = document.querySelector('.progress')

    constructor(
        selector: string | Node | NodeListOf<HTMLElement>,
        dateEnd: Date,
        options: LightCountdownProps = {},
    ) {
        if (selector instanceof Node) {
            this.containers = [selector] as HTMLElement[]
        } else if (selector instanceof NodeList) {
            this.containers = selector
        } else if (typeof selector === 'string') {
            this.containers = document.querySelectorAll(selector)
        } else {
            throw new Error(
                'LightCountdown: Invalid Selector in first argument!',
            )
        }

        if (dateEnd instanceof Date) {
            this.dateEnd = dateEnd
        } else if (Date.parse(dateEnd)) {
            this.dateEnd = new Date(dateEnd)
        } else {
            throw new Error('LightCountdown: Invalid Date in second argument!')
        }

        this.options = {
            ...this.options,
            ...options,
        }

        if (this.containers.length < 1) {
            return
        }

        Array.prototype.forEach.call(this.containers, (e, i) => {
            this.createContainer(e)
            if (this.options.days)
                this.items.push(new CountdownItem('days', 'd', e))
            if (this.options.hours)
                this.items.push(new CountdownItem('hours', 'h', e))
            if (this.options.minutes)
                this.items.push(new CountdownItem('minutes', 'm', e))
            if (this.options.seconds)
                this.items.push(new CountdownItem('seconds', 's', e))
        })

        this.play()
    }

    play() {
        this.timer = setInterval(() => this.tick(), this.options.interval)
        this.tick()
    }

    stop() {
        clearInterval(this.timer)
        if (typeof this.options.finish === 'function') {
            this.options.finish(this.containers)
        }
    }

    tick() {
        let range: CountdownRange = this.getRange()

        if (range.v < 0) {
            range = {
                s: '00',
                m: '00',
                h: '00',
                d: '00',
                v: 0,
            }
            this.stop()
        }

        if (this.progress) {
            const startDate = new Date(this.dateEnd)
            startDate.setDate(startDate.getDate() - 100)
            const endDateTime = this.dateEnd.getTime()

            const allTime = endDateTime - startDate.getTime()
            const passed = allTime - range.v
            const percent = ((passed * 100) / allTime).toFixed(1) + '%'

            const progressLine =
                this.progress.querySelector<HTMLDivElement>('.progress__line')
            const progressCursor = this.progress.querySelector(
                '.progress__line-cursor span',
            )

            if (progressLine) progressLine.style.width = percent
            if (progressCursor) progressCursor.textContent = percent
        }

        this.items.forEach((item) => item.tick(range))
    }

    getRange(): CountdownRange {
        let now = Date.now()
        let value = this.dateEnd.getTime() - now

        const values: Record<string, number | string> = {
            s: Math.floor((value / 1000) % 60),
            m: Math.floor((value / 1000 / 60) % 60),
            h: Math.floor((value / 1000 / 60 / 60) % 24),
            d: Math.floor((value / 1000 / 60 / 60 / 24) % 365),
        }

        Object.keys(values).forEach((key) => {
            const value = values[key as keyof CountdownRange]
            if (Number(value) < 10) {
                values[key as keyof CountdownRange] = `0${value}`
            }
        })

        return {
            ...values,
            v: value,
        } as CountdownRange
    }

    createContainer(container: HTMLElement) {
        let range = this.getRange()
        let template = []
        let delimeter = `<div class="lightcountdown__delimeter">${this.options.delimeter}</div>`

        container.classList.add('lightcountdown')

        if (this.options.days) {
            template.push(`<div class="lightcountdown__item lightcountdown__days">
    <div class="lightcountdown__digits">
        <div class="lightcountdown__digit">${range.d.toString()[0]}</div>
        <div class="lightcountdown__digit">${range.d.toString()[1]}</div>
    </div>
    <div class="lightcountdown__text">${this.options.language.days}</div>
</div>`)
        }

        if (this.options.hours) {
            template.push(`<div class="lightcountdown__item lightcountdown__hours">
    <div class="lightcountdown__digits">
        <div class="lightcountdown__digit">${range.h.toString()[0]}</div>
        <div class="lightcountdown__digit">${range.h.toString()[1]}</div>
    </div>
    <div class="lightcountdown__text">${this.options.language.hours}</div>
</div>`)
        }

        if (this.options.minutes) {
            template.push(`<div class="lightcountdown__item lightcountdown__minutes">
    <div class="lightcountdown__digits">
        <div class="lightcountdown__digit">${range.m.toString()[0]}</div>
        <div class="lightcountdown__digit">${range.m.toString()[1]}</div>
    </div>
    <div class="lightcountdown__text">${this.options.language.minutes}</div>
</div>`)
        }

        if (this.options.seconds) {
            template.push(`<div class="lightcountdown__item lightcountdown__seconds">
    <div class="lightcountdown__digits">
        <div class="lightcountdown__digit">${range.s.toString()[0]}</div>
        <div class="lightcountdown__digit">${range.s.toString()[1]}</div>
    </div>
    <div class="lightcountdown__text">${this.options.language.seconds}</div>
</div>`)
        }

        container.innerHTML = template.join(delimeter)
        if (this.options.animation) {
            Array.prototype.forEach.call(
                container.querySelectorAll('.lightcountdown__digit'),
                (e, i) => {
                    e.style.animationDuration = this.options.animationDuration
                    e.addEventListener('animationend', () => {
                        e.classList.remove(
                            ...(this.options.animation?.split(' ') || ['']),
                        )
                    })
                },
            )
        }
    }
}

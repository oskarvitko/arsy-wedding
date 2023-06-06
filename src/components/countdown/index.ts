import LightCountdown from './countdown.module'

/* countdown */
let dateEnd = new Date('2023-08-15T15:30:00')

export default () => new LightCountdown('.countdown', dateEnd)

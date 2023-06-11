import '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox.css'
import 'animate.css'

import './styles/index.scss'

import initCountdown from './components/countdown'
import { initHand } from 'components/hand'
import { initForm } from 'components/form/ui'
import { initTitle } from 'components/title'
import { initAnimations } from 'components/animation'
import { initArrow } from 'components/arrow'

initCountdown()
initHand()
initForm()
initTitle()
initAnimations()
initArrow()

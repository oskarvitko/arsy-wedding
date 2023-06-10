import { showAlert } from 'components/alert'
import { addData, getUserData, updateData } from '../service'
import { AddDataDto } from '../service/dto/addData.dto'

const disableAll = (inputs: Array<HTMLInputElement>) => {
    inputs.forEach((input) => (input.disabled = true))
}

const enableAll = (inputs: Array<HTMLInputElement>) => {
    inputs.forEach((input) => (input.disabled = false))
}

export const initForm = () => {
    const form = document.getElementById('form')

    const nameInput = form?.querySelector<HTMLInputElement>('input[name=name]')
    const surnameInput = form?.querySelector<HTMLInputElement>(
        'input[name=surname]',
    )
    const commentInput = form?.querySelector<HTMLInputElement>('textarea')
    const yesRadioInput = form?.querySelector<HTMLInputElement>('#yes')
    const noRadioInput = form?.querySelector<HTMLInputElement>('#no')
    const changeBtn = form?.querySelector<HTMLButtonElement>('#change-data')
    const sendBtn = form?.querySelector<HTMLButtonElement>(
        'button[type=submit]',
    )

    if (
        form &&
        nameInput &&
        surnameInput &&
        commentInput &&
        yesRadioInput &&
        noRadioInput &&
        changeBtn &&
        sendBtn
    ) {
        const inputs = [
            nameInput,
            surnameInput,
            commentInput,
            yesRadioInput,
            noRadioInput,
        ]

        form.addEventListener('submit', (e) => {
            const data = handleSubmit(e)
            if (data.id) {
                updateData(
                    data,
                    () => {
                        showAlert({
                            severity: 'success',
                            message: 'Изменения приняты!',
                        })
                        disableAll(inputs)
                        sendBtn.classList.remove('show')
                        changeBtn.classList.add('show')
                    },
                    () => {
                        showAlert({
                            severity: 'error',
                            message: 'Что-то пошло не так',
                        })
                    },
                )
            } else {
                addData(
                    data,
                    (data) => {
                        showAlert({
                            severity: 'success',
                            message: 'Информация принята!',
                        })
                        disableAll(inputs)
                        form.setAttribute('data-user-id', data.id.toString())
                        sendBtn.classList.remove('show')
                        changeBtn.classList.add('show')
                    },
                    () => {
                        showAlert({
                            severity: 'error',
                            message: 'Что-то пошло не так',
                        })
                    },
                )
            }
        })

        changeBtn.addEventListener('click', () => {
            sendBtn.classList.add('show')
            changeBtn.classList.remove('show')
            enableAll(inputs)
        })

        getUserData((data) => {
            nameInput.value = data.name
            surnameInput.value = data.surname
            if (data.comment) commentInput.value = data.comment

            if (data.willBe) yesRadioInput.checked = true
            else noRadioInput.checked = true

            form.setAttribute('data-user-id', data.id.toString())

            disableAll(inputs)

            sendBtn.classList.remove('show')
            changeBtn.classList.add('show')
        })
    }
}

const handleSubmit = (e: SubmitEvent, userId?: number): AddDataDto => {
    e.preventDefault()
    const form = e.target as HTMLFormElement

    const nameInput = form?.querySelector<HTMLInputElement>('input[name=name]')
    const surnameInput = form?.querySelector<HTMLInputElement>(
        'input[name=surname]',
    )
    const commentInput = form.querySelector('textarea')
    const radioInput = form.querySelector<HTMLInputElement>(
        'input[type=radio]:checked',
    )

    const data: any = {
        name: nameInput?.value,
        surname: surnameInput?.value,
    }
    if (commentInput?.value) {
        data.comment = commentInput.value
    }
    if (form.getAttribute('data-user-id')) {
        data.id = Number(form.getAttribute('data-user-id'))
    }
    data.willBe = radioInput?.value === '0' ? false : true

    return data as AddDataDto
}

const getAlert = () => document.getElementById('alert') as HTMLDivElement

interface AlertOptions {
    severity: 'success' | 'error'
    message: string
}

export const showAlert = (options: AlertOptions) => {
    const alert = getAlert()
    alert.classList.remove('show', 'success', 'error')
    const classes = ['show']
    switch (options.severity) {
        case 'success': {
            classes.push('success')
            break
        }
        case 'error': {
            classes.push('error')
            break
        }
    }

    alert.textContent = options.message
    alert.classList.add(...classes)
    setTimeout(() => {
        alert.classList.remove('show')
    }, 3000)
}

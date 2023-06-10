import { API_URL } from '../../../config'
import { UserData } from '../model'
import { AddDataDto } from './dto/addData.dto'

export type OnSuccess = (data: UserData) => void
export type OnError = (error: Error) => void

export const addData = (
    data: AddDataDto,
    onsuccess: OnSuccess,
    onerror: OnError,
) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', API_URL)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(data))
    xhr.onload = () => {
        if (xhr.status === 200) {
            try {
                const data = JSON.parse(xhr.responseText) as UserData
                if (data) {
                    localStorage.setItem('userId', data.id.toString())
                    onsuccess(data)
                }
            } catch (e) {
                onerror(e as any)
            }
        }
    }
}

export const updateData = (
    data: AddDataDto,
    onsuccess: OnSuccess,
    onerror: OnError,
) => {
    const xhr = new XMLHttpRequest()
    xhr.open('PUT', API_URL)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(data))
    xhr.onload = () => {
        if (xhr.status === 200) {
            try {
                const data = JSON.parse(xhr.responseText) as UserData
                if (data) {
                    localStorage.setItem('userId', data.id.toString())
                    onsuccess(data)
                }
            } catch (e) {
                onerror(e as any)
            }
        }
    }
}

export const getUserData = (onsuccess: OnSuccess) => {
    try {
        const userId = Number(localStorage.getItem('userId'))
        if (!userId || Number.isNaN(userId)) return null

        const xhr = new XMLHttpRequest()
        xhr.open('GET', API_URL + '/' + userId)
        xhr.send()
        xhr.onload = () => {
            if (xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText) as UserData
                    if (data) {
                        onsuccess(data)
                    }
                } catch (e) {}
            }
        }
    } catch (e) {
        return null
    }
}

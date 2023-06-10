const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const fs = require('fs')
const { Telegraf } = require('telegraf')

const PORT = process.env.PORT || 6000
const TOKEN = '5967920692:AAFt5Knf8ygYGNiZrGq0UsDmRaKSeoJETb0'
const ids = [668975944]

const bot = new Telegraf(TOKEN)

const sendBotMessage = async (message) => {
    for (let id of ids) {
        try {
            await bot.telegram.sendMessage(id, message, { parse_mode: 'HTML' })
        } catch (e) {
            console.log(e)
        }
    }
}

const getMessage = (data, updated) => {
    const message = [
        `<b>${
            updated
                ? '✏️ Гость изменил свои данные'
                : '✨ Гость оставил свои данные'
        }:</b>`,
        '<b>Имя:</b> ' + data.name,
        '<b>Фамилия:</b> ' + data.surname,
        data.willBe
            ? '✅ Присутствие подтверждено'
            : '⛔ Гость будет отсутствовать',
    ]

    if (data.comment) {
        message.push(`<b>Комментарий:</b>\n${data.comment}`)
    }

    return message.join('\n')
}

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.post('/api', async (req, res) => {
    const dto = req.body
    const rep = new UserDataRepository()

    rep.add(dto, async (data) => {
        const message = getMessage(data)
        await sendBotMessage(message)
        res.status(200).send(data)
    })
})

app.put('/api', (req, res) => {
    const dto = req.body
    const rep = new UserDataRepository()

    rep.update(dto, async (data) => {
        const message = getMessage(data, true)
        await sendBotMessage(message)
        res.status(200).send(data)
    })
})

app.get('/api/:id', (req, res) => {
    const id = req.params.id
    const rep = new UserDataRepository()

    rep.getById(Number(id), (data) => {
        if (!data) res.status(404).send()
        else {
            res.status(200).send(data)
        }
    })
})

app.get('*', (req, res) => {
    res.render('build/index.html')
})

app.listen(PORT, () => {
    console.log(`Server started on  http://localhost:${PORT}...`)
})

class UserDataRepository {
    storeList(list, cb) {
        fs.writeFile(
            'server/db.txt',
            list
                .map((userData) => {
                    const { id, name, surname, willBe, comment } = userData
                    const data = [id, name, surname, willBe ? '1' : '0']
                    if (comment) {
                        data.push(comment)
                    }
                    return data.join('|')
                })
                .join('///'),
            'utf8',
            () => {
                cb()
            },
        )
    }

    getList(cb) {
        fs.readFile('server/db.txt', 'utf8', (err, data) => {
            if (!err) {
                cb(
                    data
                        .split('///')
                        .filter((row) => row.trim())
                        .map((row) => {
                            const [id, name, surname, willBe, comment] =
                                row.split('|')

                            const data = {
                                id: Number(id),
                                name,
                                surname,
                                willBe: willBe === '1',
                            }

                            if (comment) {
                                data.comment = comment
                            }

                            return data
                        }),
                )
            }
        })
    }

    getById(id, cb) {
        this.getList((data) => {
            const userData = data.find((candidate) => candidate.id === id)
            cb(userData || null)
        })
    }

    update(dto, cb) {
        this.getList((data) => {
            const userData = data.find((candidate) => candidate.id === dto.id)
            if (userData) {
                userData.name = dto.name
                userData.surname = dto.surname
                userData.willBe = dto.willBe
                userData.comment = dto.comment

                this.storeList(data, () => {
                    cb(userData)
                })
            }
        })
    }

    add(dto, cb, err) {
        this.getList((data) => {
            const dataCopy = [...data]
            const last = dataCopy.sort((a, b) => a.id - b.id).at(-1)?.id

            const userData = {
                ...dto,
                id: (last || 0) + 1,
            }

            data.push(userData)

            this.storeList(data, () => {
                cb(userData)
            })
        })
    }
}

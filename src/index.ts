'use strict'
import express from 'express'
import axios from 'axios'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.post('/', async (req, res) => {
    const type = req.headers['content-type']

    if (type !== 'application/json') {
        res.sendStatus(400)
        return
    }

    const [image]: [string] = req.body

    if (typeof image !== 'string') {
        res.sendStatus(400)
        return
    }

    console.log(await axios.get(image))

    res.sendStatus(200)
})

const listener = app.listen(PORT, () => console.log(`Your app is listening on port ${PORT}`))
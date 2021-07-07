'use strict'
import express from 'express'
import axios from 'axios'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.get('/', (req, res) => void res.sendStatus(405))
app.post('/', async (req, res) => {
    const type = req.headers['content-type']

    if (type !== 'application/json') {
        res.sendStatus(400)
        return
    }

    const { image }: { image: string } = req.body

    if (typeof image !== 'string' || image.length === 0) {
        res.sendStatus(400)
        return
    }

    console.log(image, await axios.get(image))

    res.sendStatus(200)
})

const listener = app.listen(PORT, () => console.log(`Your app is listening on port ${PORT}`))
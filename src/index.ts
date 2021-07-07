'use strict'
import express from 'express'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.post('/', (req, res) => {
    const type = req.headers['content-type']

    if (type !== 'application/json') {
        res.sendStatus(400)
    } else {
        console.log(req)
        res.sendStatus(200)
    }
})

const listener = app.listen(PORT, () => console.log(`Your app is listening on port ${PORT}`))
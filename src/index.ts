'use strict'
import express from 'express'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.post('/', (req, res) => {
    try {
        if (req.headers['content-type'] === 'application/json') {
            console.log(req.body)
            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
    } catch (e) { }
})

const listener = app.listen(PORT, () => console.log(`Your app is listening on port ${PORT}`))
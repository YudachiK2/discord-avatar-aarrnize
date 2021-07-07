'use strict'
import express from 'express'

const PORT = process.env.PORT || 3000

const app = express()

app.post('/', (req, res) => {
    console.log(req)
    res.sendStatus(400)
})

const listener = app.listen(PORT, () => console.log(`Your app is listening on port ${PORT}`))
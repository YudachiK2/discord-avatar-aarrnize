'use strict'
import express from 'express'

const PORT = process.env.PORT || 5000

const app = express()

app.post('/', (req, res) => {
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send({})
})

const listener = app.listen(PORT, () => console.log(`Your app is listening on port ${PORT}`))
'use strict'
import express from 'express'

const PORT = process.env.PORT || 5000

const app = express()

app.post('/', (req, res) => {
    console.log(req, res)
})

const listener = app.listen(PORT, () => console.log(`Your app is listening on port ${PORT}`))
'use strict'
import express from 'express'

const PORT = process.env.PORT || 5000

const app = express()

app.post('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://zippy-childlike-anise.glitch.me')
})

const listener = app.listen(PORT, () => console.log(`Your app is listening on port ${PORT}`))
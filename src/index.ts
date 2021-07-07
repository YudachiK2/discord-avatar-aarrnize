'use strict'
import express from 'express'

const PORT = process.env.PORT || 5000

const app = express()

const listener = app.listen(PORT, () => console.log(`Your app is listening on port ${PORT}`))
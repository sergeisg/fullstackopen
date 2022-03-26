const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

logger.info(`connecting to ${config.MONGODB_URI}`)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected')
    })
    .catch((error) => {
        logger.error('error connecting', error.message)
    })

app.use(cors())
app.use(express.json())

module.exports = app
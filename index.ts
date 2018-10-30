const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const config = require('./config/')
const statusHandler = require('./handlers/status')
// const eventsHandler = require('./handlers/events.ts')
import eventsHandler from './handlers/events'
const notFoundMiddleware = require('./middlewares/notFound')
const errorMiddleware = require('./middlewares/error')
const port = config.get('app:port')

app.use(bodyParser.json())

app.get('/status', statusHandler)
app.get('/api/events', eventsHandler)
// Все остальные роуты
app.use(notFoundMiddleware)
// Обработка ошибок
app.use(errorMiddleware)

app.listen(port, () => {
  console.log('App started on ' + port)
})
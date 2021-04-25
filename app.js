require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const http = 'http://api'
const cors = require('cors')
const app = express()

// Routes
const indexRouter = require('./routes/index')
const heroesRouter = require('./routes/heroes')

// Middlewares
app.set('view engine', 'hbs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))
app.use(cors())

app.use((req, res, next) => {
  res.locals.http = http
  next()
})

// Logger
app.use(logger('dev'))


app.use('/', indexRouter)
app.use(heroesRouter)


app.listen(process.env.PORT, () => {
  console.log(`Server was running on ${process.env.PORT}`)
})

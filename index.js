const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/files', express.static('data'))

const AuthMiddleware = require('./src/middleware/Auth')

app.get('/', function (req, res) {
  const data = {
    success: true,
    msg: 'Welcome to Shuttle Bus-Id'
  }
  res.send(data)
})
app.get('/migrate', function (req, res) {
  require('./src/migrations/Users')
  require('./src/migrations/Users_details')
  require('./src/migrations/Agents')
  require('./src/migrations/Busses')
  require('./src/migrations/Routes')
  require('./src/migrations/Schedules')
  const data = {
    success: true,
    msg: ' migrate succes'
  }
  res.send(data)

  app.use('/users/picture', express.static('data'))
})
// Import router
const UserRouter = require('./src/routers/Users')
const BussesRouter = require('./src/routers/Busses')
const AgentsRouter = require('./src/routers/Agents')
const RoutesRouter = require('./src/routers/Routes')
const UserDetailsRouter = require('./src/routers/Users_details')
const SchedulesRouter = require('./src/routers/Schedules')
const AuthRouter = require('./src/routers/Auth')
const ReservationRouter = require('./src/routers/Reservation')

// Define Router
app.use('/users', AuthMiddleware.checkAuthToken, UserRouter)
app.use('/busses', AuthMiddleware.checkAuthToken, BussesRouter)
app.use('/agents', AuthMiddleware.checkAuthToken, AgentsRouter)
app.use('/routes', AuthMiddleware.checkAuthToken, RoutesRouter)
app.use('/userdetails', UserDetailsRouter)
app.use('/schedules', AuthMiddleware.checkAuthToken, SchedulesRouter)
app.use('/auth', AuthRouter)
app.use('/reservations', AuthMiddleware.checkAuthToken, ReservationRouter)

app.listen(process.env.APP_PORT, function () {
  console.log(`Aplication runs in PORT ${process.env.APP_PORT}`)
})

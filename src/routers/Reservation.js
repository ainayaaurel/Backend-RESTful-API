const Reservation = require('express').Router()
const ReservationControllers = require('../controllers/Reservation')

// Reservation.get('/checkticket', ReservationControllers.chec)
Reservation.post('/order', ReservationControllers.getTransaction)
Reservation.patch('/updateorder', ReservationControllers.updateticket)
Reservation.delete('/cancelorder', ReservationControllers.cancelticket)

module.exports = Reservation

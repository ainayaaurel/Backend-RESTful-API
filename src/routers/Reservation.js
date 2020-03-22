const Reservation = require('express').Router()
const ReservationControllers = require('../controllers/Reservation')

Reservation.get('/checkticket', ReservationControllers.checkticket)
Reservation.post('/order', ReservationControllers.orderticket)
Reservation.patch('/updateorder', ReservationControllers.updateticket)
Reservation.delete('/cancelorder', ReservationControllers.cancelticket)

module.exports = Reservation

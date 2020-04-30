const Reservation = require('express').Router()
const ReservationControllers = require('../controllers/Reservation')

Reservation.get('/checkticket', ReservationControllers.checkticket)
Reservation.post('/order', ReservationControllers.getTransaction)
Reservation.patch(
  '/updateorder/:reservationId',
  ReservationControllers.updateticket
)
Reservation.delete(
  '/cancelorder/:reservationId',
  ReservationControllers.cancelticket
)

module.exports = Reservation

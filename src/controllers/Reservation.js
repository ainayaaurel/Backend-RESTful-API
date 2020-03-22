const ReservationsModel = require('../models/Reservation')

module.exports = {
  checkticket: async function (req, res) {
    const { reservationId } = req.body
    const results = await ReservationsModel.checkReservatian(reservationId)
    if (results) {
      const data = {
        success: true,
        msg: 'This is Your Ticket Reservation',
        results
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'You haven/t made ticket Reservation'
      }
      res.send(data)
    }
  },
  orderticket: async function (req, res) {
    const { routesId, bussesId, agentsId, schedulesId } = req.body
    const results = await ReservationsModel.createReservations(routesId, schedulesId, agentsId, bussesId)
    if (results) {
      const data = {
        success: true,
        msg: 'Your reservation is successfully, please check your order is correct, before making payment'
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'Busses Not Created!!!'
      }
      res.send(data)
    }
  },
  updateticket: async function (req, res) {
    const { reservationId } = req.params
    const { routesId, bussesId, agentsId, schedulesId } = req.body
    delete req.body.code
    const results = await ReservationsModel.updateReservation(reservationId, routesId, bussesId, agentsId, schedulesId)
    if (results) {
      const data = {
        success: true,
        msg: 'Your Ticket succesfully updated',
        data: { reservationId, ...req.body }
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'Your Ticket failed to update, please correct correctly',
        data: { reservationId, ...req.body }
      }
      res.send(data)
    }
  },
  cancelticket: async function (req, res) {
    const { reservationId } = req.params
    const results = await ReservationsModel.cancelReservation(reservationId)
    if (results) {
      const data = {
        success: true,
        msg: `Order ticket with ${reservationId} succesfully cancel!!`
      }
      res.send(data)
    } else {
      const data = {
        success: true,
        msg: `Order ticket with ${reservationId} not avaiable`
      }
      res.send(data)
    }
  }
}

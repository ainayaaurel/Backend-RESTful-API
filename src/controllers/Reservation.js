const ReservationsModel = require('../models/Reservation')
const SchedulesModel = require('../models/Schedules')
const UserModel = require('../models/Users')
const UserDetailsModel = require('../models/Usersdetails')

module.exports = {
  // checkticket: async function (req, res) {
  //   const { reservationId } = req.body
  //   const results = await ReservationsModel.checkReservatian(reservationId)
  //   if (results) {
  //     const data = {
  //       success: true,
  //       msg: 'This is Your Ticket Reservation',
  //       results
  //     }
  //     res.send(data)
  //   } else {
  //     const data = {
  //       success: false,
  //       msg: 'You haven/t made ticket Reservation'
  //     }
  //     res.send(data)
  //   }
  // },
  getTransaction: async function (req, res) {
    const { routesId, bussesId, agentsId, usersId, schedulesId } = req.body
    const price = await SchedulesModel.getSchedulesById(schedulesId)
    const userSaldo = await UserModel.getUserDetailByUserId(usersId)
    if (price > userSaldo) {
      res.send({
        msg: 'Saldo kurang'
      })
    } else {
      const newSaldo = parseInt(userSaldo[0].balance) - parseInt(price.price)
      console.log('ini router saldo', usersId, userSaldo, newSaldo)
      const hasil = await UserDetailsModel.updateSaldo(usersId, newSaldo)
      if (hasil) {
        console.log('ini hasil salod', hasil)
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
      }
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

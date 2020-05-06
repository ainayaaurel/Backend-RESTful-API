const db = require('../utils/db')

module.exports = {
  checkReservatian: function (reservationId) {
    return new Promise(function (resolve, reject) {
      const sql = `SELECT routes.departure_at, routes.arrival_at, agents.name_agents,
        schedules.time, busses.name, busses.class, busses.sheets FROM reservation JOIN schedules ON
        schedules.id = reservation.schedules_id JOIN routes ON routes.id = reservation.routes_id
        JOIN agents ON agents.id = reservation.agents_id JOIN busses ON busses.id = reservation.busses_id
        WHERE reservation.id = ${reservationId}`
      db.query(sql, function (err, results, fields) {
        console.log('ini sql', sql)
        if (err) {
          reject(err)
        } else {
          console.log(results)
          resolve(results)
        }
      })
    })
  },
  dataReservations: function (id) {
    const table = 'reservation'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT  reservation.id as reservationId, reservation.seat , routes.departure_at, routes.arrival_at, agents.name_agents,
      schedules.time,schedules.date, busses.name, busses.class, busses.price, users_details.balance FROM ${table} JOIN schedules ON
      schedules.id = reservation.schedules_id JOIN routes ON routes.id = reservation.routes_id
      JOIN agents ON agents.id = reservation.agents_id JOIN users_details ON users_details.users_id = reservation.users_id JOIN busses ON busses.id = reservation.busses_id WHERE reservation.users_id = ${id}`
      console.log('sql baru', sql)
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },

  createReservations: function (
    users_id,
    routesId,
    schedulesId,
    agentsId,
    bussesId,
    seat
  ) {
    const table = 'reservation'
    return new Promise(function (resolve, reject) {
      const sql = `INSERT INTO ${table} (users_id, routes_id, schedules_id, agents_id, busses_id, seat) VALUES 
      ( ${users_id}, ${routesId}, ${schedulesId}, ${agentsId}, ${bussesId}, ${seat})`
      db.query(sql, function (err, results, fields) {
        console.log('ini models', sql)
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  updateReservation: function (
    reservationId,
    routesId,
    bussesId,
    agentsId,
    schedulesId,
    seat
  ) {
    const table = 'reservation'
    return new Promise(function (resolve, reject) {
      const sql = `UPDATE ${table} SET routes_id='${routesId}', busses_id='${bussesId}', agents_id='${agentsId}', schedules_id='${schedulesId}', seat='${seat}' WHERE id='${reservationId}'`
      db.query(sql, function (err, results, fields) {
        console.log('ini sql', sql)
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  cancelReservation: function (reservationId) {
    const table = 'reservation'
    return new Promise(function (resolve, reject) {
      db.query(`DELETE FROM ${table} WHERE id='${reservationId}'`, function (
        err,
        results,
        fields
      ) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
}

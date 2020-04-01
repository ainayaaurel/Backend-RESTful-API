const db = require('../utils/db')

module.exports = {
//   checkReservatian: function (id) {
//     return new Promise(function (resolve, reject) {
//       const sql = (`SELECT routes.departure_at, routes.arrival_at, agents.name, 
//       schedules.time, busses.name, busses.class, busses.sheets FROM reservation JOIN schedules ON 
//       schedules.id = reservation.schedules_id JOIN routes ON routes.id = reservation.routes_id 
//       JOIN agents ON agents.id = reservation.agents_id JOIN busses ON busses.id = reservation.busses_id 
//       WHERE reservation.id = ${id}`)
//       db.query(sql, function (err, results, fields) {
//         if (err) {
//           reject(err)
//         } else {
//           console.log(results)
//           resolve(results)
//         }
//       })
//   })
// },

  createReservations: function (routesId, schedulesId, agentsId, bussesId) {
    const table = 'reservation'
    return new Promise(function (resolve, reject) {
      db.query(`INSERT INTO ${table} (routes_id, schedules_id, agents_id, busses_id ) VALUES 
      (${routesId}, ${schedulesId}, ${agentsId}, ${bussesId})`, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  updateReservation: function (id, routesId, bussesId, agentsId, schedulesId) {
    const table = 'reservation'
    return new Promise(function (resolve, reject) {
      db.query(`UPDATE ${table} SET routes_id='${routesId}', busses_id='${bussesId}', agents_id='${agentsId}', schedules_id='${schedulesId}' WHERE id='${id}'`
        , function (err, results, fields) {
          if (err) {
            reject(err)
          } else {
            resolve(results)
          }
        })
    })
  },
  cancelReservation: function (id) {
    const table = 'reservation'
    return new Promise(function (resolve, reject) {
      db.query(`DELETE FROM ${table} WHERE id='${id}'`, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  }
}

const db = require('../utils/db')

module.exports = {
  getAllSchedules: function (id) {
    return new Promise(function (resolve, reject) {
      const sql = `SELECT routes.departure_at, routes.arrival_at, agents.name, schedules.time, busses.name, 
      busses.class, busses.sheets FROM schedules JOIN routes ON routes.id = schedules.routes_id JOIN agents ON 
      agents.id = schedules.agents_id JOIN busses 
      ON busses.id = schedules.busses_id WHERE schedules.id = ${id}`
      console.log(id)
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  // INSERT INTO table1 (field1, field2, ...) VALUES (value1, value2, ...)
  createSchedules: function (time, routesId, bussesId, agentsId) {
    const table = 'schedules'
    return new Promise(function (resolve, reject) {
      db.query(`INSERT INTO ${table} (time, routes_id, busses_id, agents_id) VALUES 
      ('${time}', '${routesId}', '${bussesId}', '${agentsId}')`, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  // UPDATE table1 SET field1=new_value1 WHERE condition
  updateSchedules: function (id, time) {
    const table = 'schedules'
    return new Promise(function (resolve, reject) {
      db.query(`UPDATE ${table} SET time='${time}' WHERE id=${id}`
        , function (err, results, fields) {
          if (err) {
            reject(err)
          } else {
            resolve(results)
          }
        })
    })
  },
  // DELETE FROM table1 WHERE condition
  deleteBusses: function (id) {
    const table = 'schedules'
    return new Promise(function (resolve, reject) {
      db.query(`DELETE FROM ${table} WHERE id=${id}`, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  }
}

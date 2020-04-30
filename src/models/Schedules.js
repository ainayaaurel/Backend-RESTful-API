const db = require('../utils/db')

module.exports = {
  getSchedulesById: function (id) {
    const table = 'schedules'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT routes.departure_at, routes.arrival_at, agents.name_agents, schedules.time, busses.name, 
      busses.class, busses.sheets, busses.price FROM ${table} JOIN routes ON routes.id = schedules.routes_id JOIN agents ON 
      agents.id = schedules.agents_id JOIN busses 
      ON busses.id = schedules.busses_id  WHERE schedules.id='${id}'`
      console.log(sql)
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results[0])
        }
      })
    })
  },
  getAllSchedules: function (conditions = {}) {
    let { page, perPage, sort, search } = conditions
    sort = sort || { key: 'id', value: 1 }
    search = search || { key: '', value: '' }
    const table = 'schedules'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT schedules.id, routes.departure_at, routes.arrival_at, agents.name_agents, schedules.time, busses.name, 
      busses.class, busses.sheets, busses.price FROM ${table} JOIN routes ON routes.id = schedules.routes_id JOIN agents ON 
      agents.id = schedules.agents_id JOIN busses 
      ON busses.id = schedules.busses_id 
      WHERE routes.departure_at LIKE '${search.value}%'
      ORDER BY schedules.id ${sort.value ? 'ASC' : 'DESC'}
      LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`
      console.log('ini query', sql)
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  getTotalSchedules: function (conditions) {
    let { search } = conditions
    search = search || { key: '', value: '' }
    const table = 'schedules'
    return new Promise(function (resolve, reject) {
      const sql = `
      SELECT COUNT(*) AS total FROM ${table}
      WHERE time LIKE '${search.value}%'`
      console.log('ini get total schedules', sql)
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          console.log(results)
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
  updateSchedules: function (id, time, routesId, agentsId, bussesId) {
    const table = 'schedules'
    return new Promise(function (resolve, reject) {
      db.query(`UPDATE ${table} SET time='${time}', routes_id='${routesId}', agents_id='${agentsId}, 
      busses_id='${bussesId}' WHERE id=${id}`
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

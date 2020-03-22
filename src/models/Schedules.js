const db = require('../utils/db')

module.exports = {
  getAllSchedules: function () {
    const table = 'schedules'
    return new Promise(function (resolve, reject) {
      db.query(`SELECT * FROM ${table}`, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  // INSERT INTO table1 (field1, field2, ...) VALUES (value1, value2, ...)
  createSchedules: function (time) {
    const table = 'schedules'
    return new Promise(function (resolve, reject) {
      db.query(`INSERT INTO ${table} (time) VALUES 
      ('${time}')`, function (err, results, fields) {
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

const db = require('../utils/db')

module.exports = {
  getAllRoutes: function () {
    const table = 'routes'
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
  createRoutes: function (departure, arrival) {
    const table = 'routes'
    return new Promise(function (resolve, reject) {
      db.query(`INSERT INTO ${table} (departure_at, arrival_at) VALUES
      ('${departure}', '${arrival}')`, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  // UPDATE table1 SET field1=new_value1 WHERE condition
  updateRoutes: function (id, departure, arrival) {
    const table = 'routes'
    return new Promise(function (resolve, reject) {
      db.query(`UPDATE ${table} SET departure_at='${departure}', arrival_at='${arrival}' WHERE id=${id}`
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
  deleteRoutes: function (id) {
    const table = 'routes'
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

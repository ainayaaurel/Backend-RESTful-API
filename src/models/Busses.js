const db = require('../utils/db')

module.exports = {
  getAllBusses: function () {
    const table = 'busses'
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
  createBusses: function (name, classbus, sheets) {
    const table = 'busses'
    return new Promise(function (resolve, reject) {
      db.query(`INSERT INTO ${table} (name, class, sheets) VALUES 
      ('${name}', '${classbus}', '${sheets}')`, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  // UPDATE table1 SET field1=new_value1 WHERE condition
  updateBusses: function (id, name, classbus, sheets) {
    const table = 'busses'
    return new Promise(function (resolve, reject) {
      db.query(`UPDATE ${table} SET name='${name}', class='${classbus}', sheets='${sheets}' WHERE id=${id}`
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
    const table = 'busses'
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

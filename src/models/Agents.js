const db = require('../utils/db')

module.exports = {
  getAllAgents: function () {
    const table = 'agents'
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
  createAgents: function (name) {
    const table = 'agents'
    return new Promise(function (resolve, reject) {
      db.query(`INSERT INTO ${table} (name) VALUES 
      ('${name}')`, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  // UPDATE table1 SET field1=new_value1 WHERE condition
  updateAgents: function (id, name) {
    const table = 'Agents'
    return new Promise(function (resolve, reject) {
      db.query(`UPDATE ${table} SET name='${name}' WHERE id=${id}`
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
  deleteAgents: function (id) {
    const table = 'agents'
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

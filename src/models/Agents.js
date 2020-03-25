const db = require('../utils/db')

module.exports = {
  getAgentsById: function (id) {
    return new Promise(function (resolve, reject) {
      const sql = `SELECT * FROM users WHERE id=${id}` // beradasarkan agents bus
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

  getAllAgents: function (conditions = {}) {
    let { page, perPage, sort, search } = conditions
    page = page || 1
    perPage = perPage || 5
    sort = sort || { key: 'id', value: 1 }
    search = search || { key: 'name', value: '' }
    const table = 'agents'
    return new Promise(function (resolve, reject) {
      const sql = `
      SELECT * FROM ${table}
      WHERE name LIKE '${search.value}%'
      ORDER BY ${sort.key} ${sort.value ? 'ASC' : 'DESC'}
      LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`
      console.log(sql)
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
  getTotalAgents: function (conditions) {
    let { page, perPage, sort, search } = conditions
    page = page || 1
    perPage = perPage || 5
    sort = sort || { key: 'id', value: 1 }
    search = search || { key: 'name', value: '' }
    const table = 'agents'
    return new Promise(function (resolve, reject) {
      const sql = `
      SELECT COUNT (*) AS total FROM ${table}
      WHERE name LIKE '${search.value}%'`
      console.log(sql)
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
  createAgents: function (name, rolesId) {
    const table = 'agents'
    return new Promise(function (resolve, reject) {
      db.query(`INSERT INTO ${table} (name, roles_id) VALUES 
      ('${name}', '${rolesId}' )`, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  // UPDATE table1 SET field1=new_value1 WHERE condition
  updateAgents: function (id, name, rolesId) {
    const table = 'Agents'
    return new Promise(function (resolve, reject) {
      db.query(`UPDATE ${table} SET name='${name}', roles_id='${rolesId}' WHERE id=${id}`
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
  // getAllAgents: function () {
  //   const table = 'agents'
  //   return new Promise(function (resolve, reject) {
  //     db.query(`SELECT * FROM ${table}`, function (err, results, fields) {
  //       if (err) {
  //         reject(err)
  //       } else {
  //         resolve(results)
  //       }
  //     })
  //   })
  // },
  
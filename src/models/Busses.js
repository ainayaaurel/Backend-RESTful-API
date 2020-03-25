const db = require('../utils/db')

module.exports = {
  getBussesById: function (id) {
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
  getAllBusses: function (conditions = {}) {
    let { page, perPage, sort, search } = conditions
    page = page || 1
    perPage = perPage || 5
    sort = sort || { key: 'id', value: 1 }
    search = search || { key: 'name', value: '' }
    const table = 'busses'
    return new Promise(function (resolve, reject) {
      const sql = `
      SELECT * FROM ${table}
      WHERE name LIKE '${search.value}%'
      ORDER BY id ${sort.value ? 'ASC' : 'DESC'}
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
  getTotalBusses: function (conditions) {
    let { page, perPage, sort, search } = conditions
    page = page || 1
    perPage = perPage || 5
    sort = sort || { key: 'id', value: 1 }
    search = search || { key: 'name', value: '' }
    const table = 'busses'
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

  // getTotalBusses: function (conditions = {}) {
  //   let { search } = conditions
  //   search = search || { key: 'name', value: '' }
  //   const table = 'busses'
  //   return new Promise(function (resolve, reject) {
  //     const sql = `
  //     SELECT COUNT (*) AS total FROM ${table}
  //     WHERE ${search.key} LIKE '${search.value}%'`
  //     console.log(sql)
  //     db.query(sql, function (err, results, fields) {
  //       if (err) {
  //         reject(err)
  //       } else {
  //         resolve(results[0].total)
  //       }
  //     })
  //   })
  // },
  // getAllBusses: function () {
  //   const table = 'busses'
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
  // INSERT INTO table1 (field1, field2, ...) VALUES (value1, value2, ...)
  createBusses: function (name, classbus, sheets, price, agentsId) {
    const table = 'busses'
    return new Promise(function (resolve, reject) {
      db.query(`INSERT INTO ${table} (name, class, sheets, price, agents_id) VALUES 
      ('${name}', '${classbus}', '${sheets}', '${price}', '${agentsId}')`, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  // UPDATE table1 SET field1=new_value1 WHERE condition
  updateBusses: function (id, name, classbus, sheets, price, agentsId) {
    const table = 'busses'
    return new Promise(function (resolve, reject) {
      db.query(`UPDATE ${table} SET name='${name}', class='${classbus}', sheets='${sheets}', price='${price}',agents_Id='${agentsId} WHERE id=${id}`
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

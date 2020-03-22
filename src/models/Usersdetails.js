const db = require('../utils/db')

module.exports = {
  getAllUserDetails: function () {
    const table = 'users_details'
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
  getUserDetails: function (id) {
    const table = 'users_details'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT * FROM ${table} WHERE users_id=${id}`
      console.log(sql)
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          if (results.length) {
            resolve(results[0])
          } else {
            resolve(false)
          }
        }
      })
    })
  },
  createUserDetails: function (name, gender, address, phone, email, usersId) {
    const table = 'users_details'
    return new Promise(function (resolve, reject) {
      db.query(`INSERT INTO ${table} (name, gender, address, phone, email, users_id) VALUES
      ('${name}', '${gender}', '${address}', '${phone}', '${email}', ${usersId})`, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  updateUserDetails: function (id, name, gender, address, phone, email) {
    const table = 'users_details'
    return new Promise(function (resolve, reject) {
      db.query(`UPDATE ${table} SET name='${name}', gender='${gender}', address='${address}',
      phone='${phone}', email='${email}' WHERE id=${id}`, function (err, results, fields) {
        if (err) {
          console.log(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  deleteUserDetails: function (id) {
    const table = 'users_details'
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

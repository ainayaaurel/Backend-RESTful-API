const UsersDetail = require('express').Router()
const UsersDetailControllers = require('../controllers/Users_details')

UsersDetail.get('/', UsersDetailControllers.read)
UsersDetail.post('/', UsersDetailControllers.create)
UsersDetail.patch('/:id', UsersDetailControllers.update)
UsersDetail.delete('/:id', UsersDetailControllers.delete)

module.exports = UsersDetail

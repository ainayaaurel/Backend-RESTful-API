const Auth = require('express').Router()
const AuthControllers = require('../controllers/Auth')

Auth.post('/login', AuthControllers.login)
Auth.post('/register', AuthControllers.register)
Auth.get('/verify', AuthControllers.verify)
Auth.post('/forgotpassword', AuthControllers.forgotPassword)
module.exports = Auth

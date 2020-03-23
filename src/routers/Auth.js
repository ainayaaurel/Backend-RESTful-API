const Auth = require('express').Router()
const AuthControllers = require('../controllers/Auth')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: 'data/',
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({ storage })

Auth.post('/login', AuthControllers.login)
Auth.post('/register', upload.single('picture'), AuthControllers.register)
Auth.get('/verify', AuthControllers.verify)
Auth.post('/forgotpassword', AuthControllers.forgotPassword)
module.exports = Auth

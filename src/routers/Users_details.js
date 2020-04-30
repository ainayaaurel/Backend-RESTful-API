const UsersDetail = require('express').Router()
const UsersDetailControllers = require('../controllers/Users_details')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: 'data/',
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

UsersDetail.get('/', UsersDetailControllers.read)
UsersDetail.get('/myprofile/', UsersDetailControllers.readById)
UsersDetail.post('/', UsersDetailControllers.create)
UsersDetail.patch('/:id', UsersDetailControllers.update)
UsersDetail.patch(
  '/updatepicture/:id',
  upload.single('picture'),
  UsersDetailControllers.updatePicture
)
UsersDetail.delete('/:id', UsersDetailControllers.delete)

module.exports = UsersDetail

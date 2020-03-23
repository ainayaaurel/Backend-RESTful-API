const UserDetailsModel = require('../models/Usersdetails')

module.exports = {
  read: async function (req, res) {
    if (req.user.roleId !== 3) {
      const data = {
        success: false,
        msg: 'Only general users can access this feature'
      }
      res.send(data)
    }
    const results = await UserDetailsModel.getUserDetails(req.user.id)
    console.log(results)
    if (results) {
      const data = {
        success: true,
        msg: 'You GET all data users',
        results
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'cannot acces your data'
      }
      console.log(req.user)
      res.send(data)
    }
  },

  readSuperAdmin: async function (req, res) {
    if (req.user.roleId !== 1) {
      const data = {
        success: false,
        msg: 'Only Super Admin can access this feature'
      }
      res.send(data)
    }
    const results = await UserDetailsModel.getAllUserDetails()
    if (results) {
      const data = {
        success: true,
        msg: 'You GET all data users',
        results
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'You not GET data all users'
      }
      res.send(data)
    }
  },
  create: async function (req, res) {
    if (req.user.roleId !== 3) {
      const data = {
        success: false,
        msg: 'Only General User/Consument can access this feature'
      }
      res.send(data)
    }
    console.log(req.file)
    // const picture = (req.file && req.file.filename) || null
    // const { name, gender, address, phone, email } = req.body
    // const results = await UserDetailsModel.createUserDetails(picture, name, gender, address, phone, email)
    // if (results) {
    //   const data = {
    //     success: true,
    //     msg: `${name}, ${gender}, ${address}, ${phone}, ${email} SUCCESS CREATE!!`
    //   }
    //   res.send(data)
    // } else {
    //   const data = {
    //     success: false,
    //     msg: `${name}, ${gender}, ${address}, ${phone}, ${email} SUCCESS CREATE!!`
    //   }
    //   res.send(data)
    // }
  },
  update: async function (req, res) {
    if (req.user.roleId !== 3) {
      const data = {
        success: false,
        msg: 'Only General User/Consument can access this feature'
      }
      res.send(data)
    }
    const picture = (req.file && req.file.filename) || null
    const { id } = req.params
    const { name, gender, address, phone, email } = req.body
    delete req.body.arrival
    const results = await UserDetailsModel.updateUserDetails(id, picture, name, gender, address, phone, email)
    if (results) {
      const data = {
        success: true,
        msg: `${name}, ${gender}, ${address}, ${phone}, ${email} SUCCESS UPDATE!`,
        data: { id, ...req.body }
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: `${name}, ${gender}, ${address}, ${phone}, ${email} SUCCESS NOT UPDATE!`,
        data: { id, ...req.body }
      }
      res.send(data)
    }
  },
  delete: async function (req, res) {
    if (req.user.roleId !== 1) {
      const data = {
        success: false,
        msg: 'Only Super Admin can access this feature'
      }
      res.send(data)
    }
    const { id } = req.params
    const results = await UserDetailsModel.deleteUserDetails(id)
    if (results) {
      const data = {
        success: true,
        msg: `Routes with ${id} successfully deleted!!!`
      }
      res.send(data)
    } else {
      const data = {
        success: true,
        msg: `Routes with ${id} not deleted`
      }
      res.send(data)
    }
  }
}

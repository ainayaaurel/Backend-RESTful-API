const BussesModel = require('../models/Busses')

module.exports = {
  read: async function (req, res) {
    const results = await BussesModel.getAllBusses()
    if (results) {
      const data = {
        success: true,
        msg: 'You busses GET Method',
        results
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'you cannot GET Method'
      }
      res.send(data)
    }
  },
  create: async function (req, res) {
    if (req.user.roleId !== 2) {
      const data = {
        success: false,
        msg: 'Only Admin can access this feature'
      }
      res.send(data)
    }
    const { name, classbus, sheets } = req.body
    const results = await BussesModel.createBusses(name, classbus, sheets)
    if (results) {
      const data = {
        success: true,
        msg: `This is bus ${name} type class ${classbus} for ${sheets} sheets SUCCES Created!!!`
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'Busses Not Created!!!'
      }
      res.send(data)
    }
  },
  update: async function (req, res) {
    if (req.user.roleId !== 2) {
      const data = {
        success: false,
        msg: 'Only Admin can access this feature'
      }
      res.send(data)
    }
    const { id } = req.params
    const { name, classbus, sheets } = req.body
    delete req.body.code
    const results = await BussesModel.updateBusses(id, name, classbus, sheets)
    if (results) {
      const data = {
        success: true,
        msg: `TRANSPORT with ${id}, ${name}, ${classbus}, ${sheets} SUCCESFULLY UPDATE`,
        data: { id, ...req.body }
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: `TRANSPORT with ${id}, ${name}, ${classbus}, ${sheets} FAILED TO UPDATE`,
        data: { id, ...req.body }
      }
      res.send(data)
    }
  },
  delete: async function (req, res) {
    if (req.user.roleId !== 2) {
      const data = {
        success: false,
        msg: 'Only Admin can access this feature'
      }
      res.send(data)
    }
    const { id } = req.params
    const results = await BussesModel.deleteBusses(id)
    if (results) {
      const data = {
        success: true,
        msg: `Transport with ${id} successfully deleted!!!`
      }
      res.send(data)
    } else {
      const data = {
        success: true,
        msg: `Transport with ${id} not deleted`
      }
      res.send(data)
    }
  }
}

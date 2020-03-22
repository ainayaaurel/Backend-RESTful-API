const RoutesModel = require('../models/Routes')

module.exports = {
  read: async function (req, res) {
    const results = await RoutesModel.getAllRoutes()
    if (results) {
      const data = {
        success: true,
        msg: 'You GET Method',
        results
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'You not GET Method'
      }
      res.send(data)
    }
  },
  create: async function (req, res) {
    if (req.user.roleId !== 1) {
      const data = {
        success: false,
        msg: 'Only Super Admin Can Access This Feature'
      }
      res.send(data)
    }
    const { departure, arrival } = req.body
    const results = await RoutesModel.createRoutes(departure, arrival)
    if (results) {
      const data = {
        success: true,
        msg: `This bus departure at ${departure} - ${arrival} SUCCESS Create!`
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: `This bus  ${departure} - ${arrival} NOT SUCCESS Create!`
      }
      res.send(data)
    }
  },
  update: async function (req, res) {
    if (req.user.roleId !== 1) {
      const data = {
        success: false,
        msg: 'Only Super Admin Can Access This Feature'
      }
      res.send(data)
    }
    const { id } = req.params
    const { departure, arrival } = req.body
    delete req.body.arrival
    const results = await RoutesModel.updateRoutes(departure, arrival)
    if (results) {
      const data = {
        success: true,
        msg: `Bus ${id} routes ${departure} - ${arrival} SUCCESS UPDATE!`,
        data: { id, ...req.body }
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: `Bus ${id} routes ${departure} - ${arrival} SUCCESS NOT UPDATE!`,
        data: { id, ...req.body }
      }
      res.send(data)
    }
  },
  delete: async function (req, res) {
    if (req.user.roleId !== 1) {
      const data = {
        success: false,
        msg: 'Only Super Admin Can Access This Feature'
      }
      res.send(data)
    }
    const { id } = req.params
    const results = await RoutesModel.deleteRoutes(id)
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

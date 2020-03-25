const BussesModel = require('../models/Busses')

module.exports = {
  read: async function (req, res) {
    let { page, limit, search, sort } = req.query
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5

    let key = search && Object.keys(search)[0]
    let value = search && Object.values(search)[0]
    search = (search && { key, value }) || { key: 'name', value: '' }

    key = sort && Object.keys(sort)[0]
    value = sort && Object.values(sort)[0]
    sort = (sort && { key, value }) || { key: 'id', value: 1 }
    const conditions = { page, perPage: limit, search, sort }

    const results = await BussesModel.getAllBusses(conditions)
    const totalDataBus = await BussesModel.getTotalBusses(conditions)
    console.log(totalDataBus[0].total)
    conditions.totalData = totalDataBus[0].total
    // conditions.totalPage = Math.ceil(conditions.totalData / conditions.perPage)
    // conditions.nextLink = (page >= conditions.totalPage ? null : process.env.APP_URI.concat(`users?page=${page + 1}`))
    // conditions.prevLink = (page <= 1 ? null : process.env.APP_URI.concat(`users?page=${page - 1}`))
    delete conditions.search
    delete conditions.sort
    delete conditions.limit

    const data = {
      success: 'Success!',
      pageInfo: conditions,
      data: results
    }
    res.send(data)
  },
  create: async function (req, res) {
    if (req.user.roleId !== 2) {
      const data = {
        success: false,
        msg: 'Only Admin can access this feature'
      }
      res.send(data)
    }
    const { name, classbus, sheets, price, agentsId } = req.body
    const results = await BussesModel.createBusses(name, classbus, sheets, price, agentsId)
    if (results) {
      const data = {
        success: true,
        msg: `This is bus ${name} type class ${classbus} for ${sheets}, price ${price} ${agentsId}sheets SUCCES Created!!!`
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
    const { name, classbus, sheets, price, agentsId } = req.body
    delete req.body.code
    const results = await BussesModel.updateBusses(id, name, classbus, sheets, price, agentsId)
    if (results) {
      const data = {
        success: true,
        msg: `TRANSPORT with ${id}, ${name}, ${classbus}, ${sheets}, ${price}, ${agentsId} SUCCESFULLY UPDATE`,
        data: { id, ...req.body }
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: `TRANSPORT with ${id}, ${name}, ${classbus}, ${sheets}, ${price}, ${agentsId} FAILED TO UPDATE`,
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

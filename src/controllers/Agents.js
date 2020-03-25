const AgentsModel = require('../models/Agents')

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

    const results = await AgentsModel.getAllAgents(conditions)
    const totalDataAgents = await AgentsModel.getTotalAgents(conditions)
    console.log(totalDataAgents[0].total)
    conditions.totalData = totalDataAgents[0].total
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
    const { name, rolesId } = req.body
    const results = await AgentsModel.createAgents(name, rolesId)
    if (results) {
      const data = {
        success: true,
        msg: `This is ${name} SUCCES Created!!!`
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'Agents Not Created!!!'
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
    const { name, rolesId } = req.body
    delete req.body.name
    const results = await AgentsModel.updateAgents(id, name, rolesId)
    if (results) {
      const data = {
        success: true,
        msg: `Agents with ${id}, ${name}, successfully updated`,
        data: { id, ...req.body }
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: `Agents with ${id}, ${name}, successfully updated`,
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
    const results = await AgentsModel.deleteAgents(id)
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
// read: async function (req, res) {
//     const results = await AgentsModel.getAllAgents()
//     if (results) {
//       const data = {
//         success: true,
//         msg: 'You Agents GET Method',
//         results
//       }
//       res.send(data)
//     } else {
//       const data = {
//         success: false,
//         msg: 'you cannot GET Method'
//       }
//       res.send(data)
//     }
//   },
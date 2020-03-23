const AgentsModel = require('../models/Agents')

module.exports = {
  read: async function (req, res) {
    const results = await AgentsModel.getAllAgents()
    if (results) {
      const data = {
        success: true,
        msg: 'You Agents GET Method',
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
    const { name } = req.body
    const results = await AgentsModel.createAgents(name)
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
    const { name } = req.body
    delete req.body.name
    const results = await AgentsModel.updateAgents(id, name)
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

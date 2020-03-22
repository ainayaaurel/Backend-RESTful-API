const SchedulesModel = require('../models/Schedules')

module.exports = {
  read: async function (req, res) {
    const results = await SchedulesModel.getAllSchedules()
    if (results) {
      const data = {
        success: true,
        msg: 'You Schedules GET Method',
        results
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'you cannot GET Method',
        results
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
    const { time } = req.body
    const results = await SchedulesModel.createSchedules(time)
    if (results) {
      const data = {
        success: true,
        msg: `This is ${time} SUCCES Created!!!`
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
    const { time } = req.body
    delete req.body.name // Apa fungsi ini???
    const results = await SchedulesModel.updateSchedules(id, time)
    if (results) {
      const data = {
        success: true,
        msg: `Bus with ${id}, ${time}, successfully updated`,
        data: { id, ...req.body }
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: `Bus with ${id}, ${time}, successfully updated`,
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
    const results = await SchedulesModel.deleteBusses(id)
    if (results) {
      const data = {
        success: true,
        msg: `Schedules with ${id} successfully deleted!!!`
      }
      res.send(data)
    } else {
      const data = {
        success: true,
        msg: `Schedules with ${id} not deleted`
      }
      res.send(data)
    }
  }
}

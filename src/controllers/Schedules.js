const SchedulesModel = require('../models/Schedules')

module.exports = {
  read: async function (req, res) {
    let { page, limit, search, sort } = req.query
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5

    let key = search && Object.keys(search)[0]
    let value = search && Object.values(search)[0]
    search = (search && { key, value }) || { key: 'id', value: '' }

    key = sort && Object.keys(sort)[0]
    value = sort && Object.values(sort)[0]
    sort = (sort && { key, value }) || { key: 'id', value: 1 }
    const conditions = { page, perPage: limit, search, sort }

    const results = await SchedulesModel.getAllSchedules(conditions)
    conditions.totalData = await SchedulesModel.getAllSchedules(conditions)
    conditions.totalPage = Math.ceil(conditions.totalData / conditions.perPage)
    delete conditions.search
    delete conditions.sort
    delete conditions.limit

    const data = {
      success: true,
      data: results,
      pageInfo: conditions
    }
    res.send(data)
    // const results = await SchedulesModel.getAllSchedules()
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
    const { time, routesId, bussesId, agentsId } = req.body
    console.log(req.body)
    const results = await SchedulesModel.createSchedules(time, routesId, bussesId, agentsId)
    if (results) {
      const data = {
        success: true,
        msg: 'This is succes created!!!',
        results
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

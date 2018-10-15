const fs = require('fs')
const filter = require('lodash/filter')
const drop = require('lodash/drop')

const currectTypes = ['info', 'critical']

const getPaginatedItems = (items, page = 1, pageSize = 10) => {
  page = Number(page)
  pageSize = Number(pageSize)
  const offset = (page - 1) * pageSize
  const data = drop(items, offset).slice(0, pageSize)
  return {
    page,
    pageSize,
    totalCount: items.length,
    totalPages: Math.ceil(items.length / pageSize),
    data,
  }
}

const eventsHandler = (req, res, next) => {
  try {
    const { type, page = 1, pageSize = 10 } = req.query
    const data = JSON.parse(fs.readFileSync('./events.json', 'utf8'))
    let events = data.events
    if (type) {
      if (!currectTypes.includes(type))
        return res.status(400).send('incorrect type')
      events = filter(events, { type })
    }
    res.json(getPaginatedItems(events, page, pageSize))
  } catch (err) {
    next(err)
  }
}

module.exports = eventsHandler

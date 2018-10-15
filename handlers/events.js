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

const parseTypes = typesStr => {
  let types = []
  if (!typesStr.includes(':')) types.push(typesStr)
  else types = typesStr.split(':')
  if (types.some(i => !currectTypes.includes(i))) {
    const err = new Error('Incorrect type')
    err.statusCode = 400
    throw err
  }
  return types
}

const eventsHandler = (req, res, next) => {
  try {
    const { type, page = 1, pageSize = 10 } = req.query
    const data = JSON.parse(fs.readFileSync('./events.json', 'utf8'))
    let events = data.events
    if (type) {
      const types = parseTypes(type)
      events = filter(events, i => types.includes(i.type))
    }
    res.json(getPaginatedItems(events, page, pageSize))
  } catch (err) {
    next(err)
  }
}

module.exports = eventsHandler

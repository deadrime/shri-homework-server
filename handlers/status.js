const moment = require('moment')
const serverStartedTime = moment()

const statusHandler = (req, res, next) => {
  res.json({
    started: serverStartedTime.fromNow(),
    startedAt: serverStartedTime.format('hh:mm:ss'),
  })
}

module.exports = statusHandler

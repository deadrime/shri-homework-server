import moment from 'moment'
import {Request, Response, NextFunction} from 'express'

const serverStartedTime = moment()

const statusHandler = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    started: serverStartedTime.fromNow(),
    startedAt: serverStartedTime.format('hh:mm:ss'),
  })
}

module.exports = statusHandler

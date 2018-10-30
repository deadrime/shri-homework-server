
import fs from 'fs'
import filter from 'lodash/filter'
import drop from 'lodash/drop'
import APIError from '../helpers/Error'
import {Request, Response, NextFunction} from 'express'

const currectTypes = ['info', 'critical']

interface TemperatureData {
  temperature: number,
  humidity: number,
}

interface GraphData {
  type: string,
  values: {
    [type: string]: (string | number)[]
  }[],
}

interface PlayerData {
  albumcover: string,
  artist: string,
  track: {
    name: string,
    length: string
  },
  volume: number,
}

interface Event {
  type: 'info' | 'critical',
  size: 'm' | 's' | 'l',
  title: string,
  source: string,
  time: string,
  description: string | null,
  icon: string,
  data?: TemperatureData | GraphData | PlayerData
}

const getPaginatedItems = (items: Event[], page = 1, pageSize = 10) => {
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

const parseTypes = (typesStr: string): string[] => {
  let types = []
  if (!typesStr.includes(':')) types.push(typesStr)
  else types = typesStr.split(':')
  if (types.some(i => !currectTypes.includes(i))) {
    const err = new APIError('Incorrect type', 400)
    throw err
  }
  return types
}

function eventsHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { type, page = 1, pageSize = 10 } = req.query
    const data = JSON.parse(fs.readFileSync('./events.json', 'utf8'))
    let events: Event[] = data.events
    if (type) {
      const types = parseTypes(type)
      events = filter(events, (i: Event) => types.includes(i.type))
    }
    res.json(getPaginatedItems(events, page, pageSize))
  } catch (err) {
    next(err)
  }
}

export default eventsHandler

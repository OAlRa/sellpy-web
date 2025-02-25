import logger from 'pino-http'
import type { Request, Response } from 'express'

const customLogger = logger({
  serializers: {
    req: (req: Request) => ({ method: req.method, url: req.url }),
    res: (res: Response) => ({ statusCode: res.statusCode }),
  },
})

export default customLogger

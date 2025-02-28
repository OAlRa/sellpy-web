import logger from 'pino-http'

const customLogger = logger({
  serializers: {
    req: (req) => ({ method: req.method, url: req.url }),
    res: (res) => ({ statusCode: res.statusCode }),
  },
})

export default customLogger

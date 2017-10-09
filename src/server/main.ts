import * as bodyParser from 'body-parser'
import 'config/axios-interceptor'
import { appLogs, loggerMiddleware } from 'config/logger'
import * as cookieParser from 'cookie-parser'
import * as ejs from 'ejs'
import * as express from 'express'
import * as helmet from 'helmet'
import expressStaticGzip from 'middlewares/compression'
import session from 'middlewares/session'
import * as onHeaders from 'on-headers'
import * as path from 'path'
import api from 'routes/api'
import { pageRouter } from 'routes/index'

interface ErrorConstructor {
  new(message?: string, status?: number): any
  (message?: string): string
  (status?: number): number
}
declare const ErrorWrapper: ErrorConstructor

const removeEtag = (res) => {
  onHeaders(res, function(){
    this.removeHeader('ETag')
  })
}
const notFoundHandler = (req, res, next) => {
  appLogs.error(`404:, ${req.originalUrl}`)
  const err = new ErrorWrapper('Not Found', 404)
  next(err)
}
const gobalErrorHandler = (err, req, res) => {
  appLogs.error(err)
  const errorWrapper = new ErrorWrapper(err.message, err.status || 500)
  res.status(errorWrapper.status).send(errorWrapper)
}
const app = express()
app.use(helmet())
app.use(loggerMiddleware)
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.get('*', expressStaticGzip(path.join(__dirname), {
  urlContains: 'static/',
  fallthrough: false,
  enableBrotli: true,
}))
app.use(session)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use((req, res, next) => {
  removeEtag(res)
  next()
})
app.use(api)
app.use('/', pageRouter)
app.use(notFoundHandler)
app.use(gobalErrorHandler)

export default app

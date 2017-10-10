import * as express from 'express'
import * as path from 'path'
import { appLogs } from './../config/logger'

export const pageRouter = express.Router()

pageRouter.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    appLogs.error(`cannot access session here ${err}`)
  })
  res.redirect('/')
})

pageRouter.get('*', (req, res) => {
  const url = req.originalUrl
  if (url.startsWith('/v1/api')) {
    res.sendStatus(404)
  } else {
      res.sendFile(path.join(__dirname, 'static/index.html'))
  }
})

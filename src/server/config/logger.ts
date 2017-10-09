
import * as fs from 'fs'
import * as logger from 'morgan'
import * as path from 'path'
import * as rfs from 'rotating-file-stream'
import { getConfigurationValue } from './../config'
import { getLogger } from './../config/child-logger'

const createFile = (filename) => {
  fs.open(filename, 'r', (err) => {
    if (err) {
      fs.writeFile(filename, '', (error) => {
        if (error) {
           throw (error)
        }
        // tslint:disable-next-line:no-console
        console.log('The file was saved!', filename)
      })
    } else {
      // tslint:disable-next-line:no-console
      console.log('The file exists!', filename)
    }
  })
}
const logDir = getConfigurationValue('logDir')
const hostname = getConfigurationValue('hostname')

const logDirectory = path.join(logDir)
const appname = getConfigurationValue('app')
const appLogPath = `${hostname}-application.log`
const errorLogPath = `${hostname}-error.log`
const accessLogPath = `${hostname}-access.log`

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory)
}
const appLogFile = path.join(logDir, appLogPath)
createFile(appLogFile)
const errorLogFile = path.join(logDir, errorLogPath)
createFile(errorLogFile)

export const appLogs = getLogger(appname, errorLogFile, appLogFile)

const accessLogStream = rfs(accessLogPath, {
  size: '1G',
  interval: '1d',
  compress: 'gzip',
  path: logDirectory,
})

export const loggerMiddleware = logger('combined', { stream: accessLogStream })

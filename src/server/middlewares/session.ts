import * as mysqlSession from 'express-mysql-session'
import * as expressSession from 'express-session'
import { getConfigurationValue } from './../config'
import './../models/db/session'
import { COOKIES, MAXAGE } from './../utils/constants'

const databaseConfig = getConfigurationValue('database')

const MySQLStore = mysqlSession(expressSession)

const options = {
  host: databaseConfig.host,
  port: databaseConfig.port,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}
const sessionStore = new MySQLStore(options)
const session = expressSession({
  secret: COOKIES.SECRET,
  name: COOKIES.SESSION,
  store: sessionStore,
  resave: false,
  saveUninitialized: true,
  cookie: { path: '/', httpOnly: true, secure: false, maxAge: MAXAGE },
})
export default session

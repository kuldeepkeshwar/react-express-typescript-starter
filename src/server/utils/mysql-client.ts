import Sequelize from 'sequelize'
import { getConfigurationValue } from './../config'
import { appLogs } from './../config/logger'

const databaseConfig = getConfigurationValue('database')

const options = {...databaseConfig,
                 logging: appLogs.info.bind(appLogs)}

export const sequelize =
    new Sequelize(
        process.env.MYSQL_DATABASE,
        process.env.MYSQL_USER,
        process.env.MYSQL_PASSWORD,
        options,
    )

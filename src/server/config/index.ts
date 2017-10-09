import * as fs from 'fs'
import * as _ from 'lodash'
import * as path from 'path'

const args: any  = process.argv.slice(2).reduce((result, arg) => {
  const tmp = arg.split('=')
  result[tmp[0]] = tmp[1]
  return result
}, {})

const configFilePath = path.join(__dirname, args.config)

const config = JSON.parse(fs.readFileSync(configFilePath).toString())
export const getConfigurationValue = (key) => _.get(config, key)

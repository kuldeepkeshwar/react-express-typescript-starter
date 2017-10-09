import { getConfigurationValue } from 'config'

export const COOKIES = {
  SESSION: `${getConfigurationValue('app')}-tk`,
  SECRET: getConfigurationValue('app'),
  RELEASE_COMMIT: 'release',
}
export const MAXAGE = 1000 * 60 * 60 * 24 * 30
export const VERSION = {
  AGE: 365 * 24 * 60 * 60 * 1000,
}

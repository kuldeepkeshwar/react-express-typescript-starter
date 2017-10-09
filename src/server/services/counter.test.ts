import { getCounter } from './counter'

describe('Counter Test', () => {
  test('getCounter test', () => {
    const count = getCounter()
    expect(count).toMatchSnapshot()
  })
})

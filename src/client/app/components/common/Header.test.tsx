import { mount } from 'enzyme'
import * as React from 'react'
import Header from './Header'

describe('Header tests', () => {
  test('Header is rendered properly', () => {
    const component = mount(<Header/>)
    expect(component).toMatchSnapshot()
  })
})

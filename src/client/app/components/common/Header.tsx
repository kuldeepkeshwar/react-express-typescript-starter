import * as React from 'react'
import { Link } from 'react-router'

class Header extends React.Component {
  public render() {
    return (
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header

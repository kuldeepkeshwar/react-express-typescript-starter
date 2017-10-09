import * as React from 'react'
import Header from './common/Header'

class App extends React.Component {
  constructor() {
    super()
  }
  public render() {
    fetch('/v1/api/counter').then((data) => console.log(data))
    return (
      <div className="container">
        <Header />
        {this.props.children}
      </div>
    )
  }
}

export default App

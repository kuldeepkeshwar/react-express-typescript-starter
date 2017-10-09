import * as React from 'react'
import Header from './common/Header'

interface AppSate {
  counter: number
}

class App extends React.Component<{}, AppSate > {
  constructor() {
    super()
    this.state = {
      counter: 0,
    }
  }
  public componetWillMount() {
    fetch('/v1/api/counter').
    then((data: any) => this.setState(data))
  }
  public render() {
    return (
      <div className="container">
        <Header />
        <p>{this.state.counter}</p>
        {this.props.children}
      </div>
    )
  },
}

export default App

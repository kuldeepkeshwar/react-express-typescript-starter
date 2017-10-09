import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory, IndexRoute, Route, Router} from 'react-router'
import { applyMiddleware, createStore } from 'redux'

import About from './components/about/About'
import App from './components/App'
import Home from './components/home/Home'

import reducers from './reducers'

import './components/bundle.scss'

const createStoreWithMiddleware = applyMiddleware()(createStore)
const Store = createStoreWithMiddleware(reducers)
const createRoutes = (app, home, about) => (
  <Route path="/" component={app}>
    <IndexRoute component={home} />;
    <Route path="/about" component={about} />
  </Route>
)
function onUpdate(): () => any {
  return () => window.scrollTo(0, 0)
}
const createRoot = (store, app, home, about) => (
  <Provider store={store}>
    <Router onUpdate={onUpdate()} history={browserHistory}>
      {createRoutes(app, home, about)}
    </Router>
  </Provider>
)

export default class Root extends React.Component {
    public render() {
          return createRoot(Store, App, Home, About)
      }
  }

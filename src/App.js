import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import Faq from './Faq'
import Page from './Page'
import Preview from './Preview'
import NotFound from './NotFound'

const App = (props) => (
  <Router>
    <Switch>
      <Redirect exact from="/" to="/help"/>
      <Route exact path="/page/:uid" render={routeProps => <Page {...routeProps} prismicCtx={props.prismicCtx}/>}/>
      <Route exact path="/faq" render={routeProps => <Faq {...routeProps} prismicCtx={props.prismicCtx}/>}/>
      <Route exact path="/preview" render={routeProps => <Preview {...routeProps} prismicCtx={props.prismicCtx}/>}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
)

export default App

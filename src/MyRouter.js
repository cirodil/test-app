import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import Main from './pages/main/Main.js'
import Turnstile from './pages/turnstile/Turnstile.js'

export default function MyRouter() {
  return (
    <Router>
      <Switch>
        <Redirect exact from='/' to='/main' />
        <Route path="/main">
          <Main />
        </Route>

        <Route path="/turnstile">
          <Turnstile />
        </Route>
      </Switch>
    </Router>
  );
}

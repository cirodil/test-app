import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import MyRouter from './MyRouter'
import * as serviceWorker from './serviceWorker'
import 'bootstrap/dist/css/bootstrap.min.css'

export const BASE_URL = process.env.REACT_APP_BASE_URL

ReactDOM.render(<MyRouter />, document.getElementById('root'))

serviceWorker.unregister()

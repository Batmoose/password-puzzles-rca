import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'semantic-ui-css/semantic.min.css'
import App from './app'
import registerServiceWorker from './registerServiceWorker'
import { HashRouter, Switch } from 'react-router-dom'
ReactDOM.render(
  <HashRouter basename={process.env.PUBLIC_URL}>
    <App />
  </HashRouter>, 
  document.getElementById('root')
)
registerServiceWorker()

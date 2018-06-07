import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
const pagesreq = require.context('./pages', true, /\.\/[^/.]+[/.]$/)
const pages = pagesreq
  .keys()
  .map((key, i) =>
    <Route path={key.slice(1, -1)} key={key} component={pagesreq(key).default} />
  )
export default (props) =>
  <Route render={({ location }) =>
    <TransitionGroup>
      <CSSTransition key={location.key} className='fade' timeout={300}>
        <Switch location={location}>
          {pages}
          <Redirect key={'last'} to='/workshop' />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  } />

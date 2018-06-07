import React from 'react'
import { Container, Header } from 'semantic-ui-react'
export default ({ title, children }) =>
  <Container style={{height: '100%'}}>
    <Container style={{padding: '1em'}}>
      <Header as='h1'>{title}</Header>
    </Container>
    {children}
  </Container>

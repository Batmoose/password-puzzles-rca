import React from 'react'
import { Container, Header, Grid, Button, Segment } from 'semantic-ui-react'
export default ({ title, description, children }) =>
  <Container style={{height: '100%'}}>
    <Container style={{padding: '1em'}}>
      <Header as='h1'>{title}</Header>
    </Container>
    <Grid columns='equal' centered stackable>
      <Grid.Row>
        <Grid.Column width={14}>
          <Segment textAlign='left'>
            {description}
            <Button>Go to next section </Button>
            <br />
          </Segment>
        </Grid.Column>
      </Grid.Row>
      {children}
    </Grid>
  </Container>

import React from 'react'
import { Grid } from 'semantic-ui-react'
const Split = ({ children, ...props }) =>
  <Grid padded centered columns='equal' style={{backgroundColor: '#FFFFFF'}}{...props}>
    {children}
  </Grid>
Split.Column = ({ children, ...props }) =>
  <Grid.Column width={8} {...props}>
    {children}
  </Grid.Column>
export default Split

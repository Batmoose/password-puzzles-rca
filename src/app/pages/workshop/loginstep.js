import React from 'react'
import { Segment, Header, Button, Label } from 'semantic-ui-react'
import Login from '../../components/login'
export default ({
  children,
  disabled,
  step,
  color,
  instruction,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  username,
  password,
  onClick,
  inverted
}) =>
  <React.Fragment>
    <Segment attached raised={!disabled} disabled={disabled} onClick={onClick}>
      <Header color={color} attached='top'>{instruction}</Header>
      <Label color={color} attached='top right'>
        {step}
      </Label>
      <Login onSubmit={onSubmit}>
        <Login.Username
          autoComplete='off'
          disabled={disabled}
          spellCheck={false}
          value={username}
          onChange={e => onUsernameChange(e.target.value)} />
        <Login.Password
          autoComplete='off'
          disabled={disabled}
          spellCheck={false}
          type={disabled ? 'password' : 'text'}
          value={password}
          onChange={e => onPasswordChange(e.target.value)} />
        <Button disabled={disabled}>Submit</Button>
      </Login>
    </Segment>
    <Segment attached disabled={disabled} color={color}>
      {disabled ? '' : children}
    </Segment>
  </React.Fragment>

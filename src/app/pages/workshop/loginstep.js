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
  usernameValue,
  passwordValue,
  onClick
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
          value={usernameValue}
          onChange={onUsernameChange} />
        <Login.Password
          autoComplete='off'
          disabled={disabled}
          spellCheck={false}
          type={disabled ? 'password' : 'text'}
          value={passwordValue}
          onChange={onPasswordChange} />
        <Button disabled={disabled}>Submit</Button>
      </Login>
    </Segment>
    <Segment attached disabled={disabled} color={color} size='large'>
      {(disabled && <br />) || children}
    </Segment>
  </React.Fragment>

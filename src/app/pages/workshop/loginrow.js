import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import PasswordInfo from './passwordinfo'
import SignupBlock from './signupbloxk'
import LoginStep from './loginstep'
import zxcvbn from 'zxcvbn'
export default class extends Component {
  getInfo (e) {
    const info = zxcvbn(this.props.password)
    const crackTime = info.guesses_log10 - this.props.logSpeed
    const isSecure = crackTime > this.props.logThreshold
    return { info, isSecure, crackTime }
  }
  render () {
    const {
      step,
      username,
      password,
      attempt,
      onUsernameChange,
      onPasswordChange,
      onInsecureSubmit,
      onSecureSubmit,
      onLoginSubmit,
      onAttemptChange,
      onSignupClick,
      onLoginClick,
      disabled
    } = this.props
    const info = this.getInfo()
    return (
      <React.Fragment>
        <Grid.Row>
          <Grid.Column width={5}>
            <SignupBlock
              step={`${step}.1`}
              disabled={disabled}
              isSecure={info.isSecure}
              username={username}
              password={password}
              onUsernameChange={onUsernameChange}
              onPasswordChange={onPasswordChange}
              onSecureSubmit={onSecureSubmit}
              onInsecureSubmit={onInsecureSubmit}
              onClick={onSignupClick}
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <LoginStep
              step={`${step}.2`}
              disabled={!disabled}
              username={username}
              password={attempt}
              onUsernameChange={onUsernameChange}
              onPasswordChange={onAttemptChange}
              onClick={onLoginClick}
              onSubmit={onLoginSubmit}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={10}>
            <PasswordInfo.Group {...info} />
          </Grid.Column>
        </Grid.Row >
      </React.Fragment>
    )
  }
}

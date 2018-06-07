import React, { Component } from 'react'
import { Grid, Header } from 'semantic-ui-react'
import PasswordInfo from './passwordinfo'
import SignupBlock from './signupblock'
import LoginStep from './loginstep'
import zxcvbn from 'zxcvbn'
export default class extends Component {
  getInfo (e) {
    const info = zxcvbn(this.props.password, this.props.userDict)
    const crackTime = info.guesses_log10 - this.props.logSpeed
    // const isSecure = crackTime > this.props.logThreshold
    const isSecure = info.score === 4
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
      onSignupSubmit,
      onLoginSubmit,
      onAttemptChange,
      onSignupClick,
      onLoginClick,
      state,
      logSpeed,
      logThreshold
    } = this.props
    const info = this.getInfo()
    return (
      <React.Fragment>
        <Grid.Row>
          <Grid.Column width={7}>
            <SignupBlock
              step={`${step}.1`}
              disabled={state === 1 || state === 2}
              isSecure={info.isSecure}
              username={username}
              password={password}
              onUsernameChange={onUsernameChange}
              onPasswordChange={onPasswordChange}
              onSecureSubmit={onSignupSubmit}
              onInsecureSubmit={() => {}}
              onClick={onSignupClick}
              logSpeed={logSpeed}
              logThreshold={logThreshold}
            >
              <PasswordInfo.Group {...info} horizontal />
            </SignupBlock>
          </Grid.Column>

          <Grid.Column width={7}>
            <LoginStep
              inverted={state === 1}
              instruction={'Login'}
              color={'orange'}
              step={`${step}.2`}
              disabled={state === 0 || state === 2}
              username={username}
              password={attempt}
              onUsernameChange={onUsernameChange}
              onPasswordChange={onAttemptChange}
              onClick={onLoginClick}
              onSubmit={onLoginSubmit}
            >
              <Header size='tiny'>Login with the correct password</Header>
            </LoginStep>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    )
  }
}

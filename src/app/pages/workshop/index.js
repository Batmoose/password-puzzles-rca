import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Grid, Segment, Label, Icon, Header, Container} from 'semantic-ui-react'
import zxcvbn from 'zxcvbn'
import Split from '../../components/split'
import Layout from '../../components/layout'
import Login from './loginstep'
import PasswordInfo from './passwordinfo'
export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      passwords: [''],
      secure: [false],
      attempts: [''],
      active: [true],
      username: ''
    }
  }
  isSecureEven (info) {
    return info.crack_times_display.online_throttling_100_per_hour === 'centuries'
  }
  isSecureOdd (info) {
    return info.crack_times_display.offline_fast_hashing_1e10_per_second === 'centuries'
  }
  handleSubmitLeft (i) {
    const { active, passwords } = this.state
    const info = zxcvbn(passwords[i], this.allButCurrentPassword(i))
    console.log(i, info)
    if ((i % 2 === 0 && this.isSecureEven(info)) || this.isSecureOdd(info)) {
      console.log('Password secure')
      this.setState({active: [...active.slice(0, i), false, ...active.slice(i + 1)]})
    }
  }
  allButCurrentPassword (i) {
    const { passwords } = this.state
    return passwords.filter((password, u) => i !== u)
  }
  handleClick (i) {
    const { active } = this.state
    this.setState({active: [...active.slice(0, i), true, ...active.slice(i + 1)]})
  }
  handleSubmitRight (i) {
    console.log(this.state)
    const { attempts, passwords } = this.state
    if (attempts.reduce((prev, curr, i) => prev && curr === passwords[i], true)) {
      this.setState(({ passwords, attempts, active, secure }) => ({
        passwords: [...passwords, ''],
        attempts: [...attempts.slice(0, -1), '', ''],
        active: [...active, true],
        secure: [...secure, false]
      }))
    } else {
      this.setState(({ passwords, attempts, active, secure }) => ({
        display: [...active.slice(0, i), true, ...active.slice(i + 1)],
        attempts: [...attempts.slice(0, i), '', ...attempts.slice(i + 1)],
        active: [...active.slice(0, i), true, ...active.slice(i + 1)],
        passwords: [...passwords.slice(0, i), '', ...passwords.slice(i + 1)]
      }))
    }
  }
  render () {
    const { username, passwords, active, attempts } = this.state
    return (
      <Layout title='How hard could it be?'>
        <Container text>
          <p>
            Welcome to your very first lesson in password security. <br />
            Each row is a simulated web service with the familiar signup and login prompts (here shown together). The more times you successfully login, the more websites will appear. See how long you can go. <br />
            To increase the challenge, we made even-numbered websites have more stringent password requirements
          </p>
          <br />
        </Container>
        <Grid columns='equal' centered>{
          passwords.map((password, i) =>
            <React.Fragment>
              <Grid.Row key={i}>
                <Grid.Column width={5}>
                  <Login
                    disabled={!active[i]}
                    color='teal'
                    step={`${i + 1}.1`}
                    instruction='Sign up'
                    line1='Enter a password to begin'
                    line2="Don't worry about making it perfect"
                    passwordValue={passwords[i]}
                    usernameValue={username}
                    onSubmit={e => this.handleSubmitLeft(i)}
                    onPasswordChange={e => this.setState({
                      passwords: [...passwords.slice(0, i), e.target.value, ...passwords.slice(i + 1)]
                    })}
                    onUsernameChange={e => this.setState({ username: e.target.value })}
                    onClick={e => this.handleClick(i)}
                  >
                  Begin by entering a password
                  </Login>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Login
                    disabled={active[i]}
                    color='orange'
                    usernameValue={username}
                    step={`${i + 1}.2`}
                    instruction='Login'
                    onPasswordChange={e => this.setState({
                      attempts: [...passwords.slice(0, i), e.target.value, ...passwords.slice(i + 1)]
                    })}
                    passwordValue={attempts[i]}
                    onUsernameChange={e => this.setState({ username: e.target.value })}
                    onSubmit={e => this.handleSubmitRight(i)}
                  >
                    Now Login with the password you created
                  </Login>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={10}>{
                  passwords[i].length && active[i] ? <PasswordInfo.Group isSecure={i % 2 === 0 ? this.isSecureEven : this.isSecureOdd} color='teal' zxcvbn={zxcvbn(passwords[i], this.allButCurrentPassword(i))} /> : ''
                }</Grid.Column>
              </Grid.Row>
            </React.Fragment>
          )
        }
        </Grid>
      </Layout>
    )
  }
}

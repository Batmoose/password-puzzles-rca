import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'
import LoginRow from './loginrow'
import Layout from '../../components/layout'
export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      passwords: [''],
      attempts: [''],
      states: [0],
      username: ''
    }
  }
  render () {
    const { username, passwords, states, attempts } = this.state
    return (
      <Layout
        title='How hard could it be?'
        description={
          <React.Fragment>
            <p>
              Welcome to your very first lesson in password security.
            </p>
            <p>
              Each row is a simulated web service with the familiar signup and login prompts (here shown together).
              For every row, enter a secure and memorable password in the signup prompt and then enter it again in the corresponding login prompt.
            </p>
            <p>
              You must login correctly to <b>all</b> prompts before unlocking a new row. See how long you can go!
            </p>
            <Header size='small'>
             So far, you're at {passwords.length === 1 ? '1 row' : passwords.length + ' rows'}
            </Header>
          </React.Fragment>
        }
      >
        {
          passwords.map((password, i) =>
            <LoginRow
              key={i}
              step={i + 1}
              userDict={excludeOne(passwords, i)}
              username={username}
              password={passwords[i]}
              attempt={attempts[i]}
              onUsernameChange={un => this.setState({ username: un })}
              onPasswordChange={ps => this.setState({ passwords: updateOne(passwords, i, ps) })}
              onSignupSubmit={e => this.setState({ states: updateOne(states, i, 1) })}
              onLoginSubmit={e => {
                this.setState(({ attempts, states, passwords }) => {
                  if (attempts.every((item, u) => item === passwords[u])) {
                    return {
                      attempts: [...attempts.map(() => ''), ''],
                      states: [...states.map(() => 1), 0],
                      passwords: [...passwords, '']
                    }
                  } else if (passwords[i] === attempts[i]) {
                    return {
                      states: [...states.slice(0, -1), 2]
                    }
                  } else {
                    return {
                      attempts: [...attempts.slice(0, -1), ''],
                      states: [...states.slice(0, -1), 0]
                    }
                  }
                })
              }}
              onAttemptChange={at => {
                console.log(at)
                this.setState({ attempts: updateOne(attempts, i, at) })
              }}
              onSignupClick={e => this.setState({ states: updateOne(states, i, 0) })}
              onLoginClick={e => this.setState({ states: updateOne(states, i, 1) })}
              state={states[i]}
              logSpeed={4}
              logThreshold={7}
            />
          )
        }
      </Layout>
    )
  }
}
const updateOne = (arr, i, val) => [...arr.slice(0, i), val, ...arr.slice(i + 1)]
const excludeOne = (arr, i) => [...arr.slice(0, i), ...arr.slice(i + 1)]

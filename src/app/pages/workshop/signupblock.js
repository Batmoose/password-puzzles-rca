import React, { Component } from 'react'
import LoginStep from './loginstep'
export default class extends Component {
  handleSubmit (e) {
    const { isSecure, password, onSecureSubmit, onInsecureSubmit } = this.props
    if (isSecure) onSecureSubmit(password)
    else onInsecureSubmit(password)
  }
  render () {
    const {
      disabled,
      step,
      onUsernameChange,
      onPasswordChange,
      username,
      password,
      onClick
    } = this.props
    return (
      <LoginStep
        disabled={disabled}
        step={step}
        color={'teal'}
        instruction={'Sign up'}
        onUsernameChange={e => onUsernameChange(e.target.value)}
        onPasswordChange={e => onPasswordChange(e.target.value)}
        onSubmit={this.handleSubmit.bind(this)}
        usernameValue={username}
        passwordValue={password}
        onClick={onClick}
      />
    )
  }
}

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
      onClick,
      logSpeed,
      logThreshold,
      children
    } = this.props
    return (
      <LoginStep
        disabled={disabled}
        step={step}
        logSpeed={logSpeed}
        logThreshold={logThreshold}
        color={'teal'}
        instruction={'Sign up'}
        onUsernameChange={onUsernameChange}
        onPasswordChange={onPasswordChange}
        onSubmit={this.handleSubmit.bind(this)}
        usernameValue={username}
        passwordValue={password}
        onClick={onClick}
        children={children}
      />
    )
  }
}

import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'

// Authentication Components
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'

// Pic Resource Components
import IndexPic from './components/IndexPic/IndexPic'
import CreatePic from './components/CreatePic/CreatePic'
import PinView from './components/PinView/PinView'

// Import API Auth for directLogIn
import { signIn } from './api/auth'

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  // updates user name to show Authenticated Route
  directLogIn = event => {
    event.preventDefault()
    signIn({ email: 'w@w.com', password: '66666' })
      .then(res => this.setUser(res.data.user))
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state
    const logo = () => {
      if (this.state.user === null) {
        return (
          <img className="logo" alternate="Camera Image" src="https://i.imgur.com/NZxpHxk.jpg"/>
        )
      }
    }
    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/' render={() => (
            <IndexPic msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/pins' render={() => (
            <PinView msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-pic' render={() => (
            <CreatePic msgAlert={this.msgAlert} user={user} />
          )} />
          <button onClick={this.directLogIn}>Quick Login</button>
        </main>
        <div>
          {logo()}
        </div>
      </Fragment>
    )
  }
}

export default App

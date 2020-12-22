import React, { Component } from 'react'

import { createLike, indexLike, likeDelete } from '../../api/like'
import { Form } from 'react-bootstrap'

class Likes extends Component {
  constructor (props) {
    super(props)
    this.state = {
      liked: '',
      likes: ''
    }
  }

  componentDidMount () {
    console.log(this.props)
    const token = this.props
    indexLike(token.props)
      .then(res => {
        console.log(this.state)
        this.setState({ likes: res.length })
      })
  }

  handleToggle = event => {
    event.preventDefault()
    if (this.state.liked === false) {
      this.setState({ liked: true })
      createLike(event.target.name)
    } else {
      this.setState({ liked: false })
      likeDelete(event.target.name)
    }
  }

  render () {
    return (
      <div>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="like?" name={this.props} onClick={this.handleToggle}/>
          <p>{this.state.likes}</p>
        </Form.Group>
      </div>
    )
  }
}

export default Likes

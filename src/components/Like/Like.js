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
    console.log(this.props.props)
    const user = this.props.props
    indexLike(user)
      .then(res => {
        console.log(this.state)
        this.setState({ likes: res.length })
      })
  }

  handleToggle = event => {
    const user = this.props.props
    event.preventDefault()
    console.log(event.target)
    const picId = event.target.name
    const likeId = event.target.id
    console.log(likeId)
    if (this.state.liked === true) {
      this.setState({ liked: false })
      likeDelete(user, likeId)
    } else {
      this.setState({ liked: true })
      createLike(picId, user)
    }
  }

  render () {
    return (
      <div>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="like?" name={this.props.name} onClick={this.handleToggle}/>
          <p>{this.state.likes}</p>
        </Form.Group>
      </div>
    )
  }
}

export default Likes

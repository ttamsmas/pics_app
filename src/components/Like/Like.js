import React, { Component } from 'react'

import { indexLike, likeDelete, createLike } from '../../api/like'
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
    console.log(this.props.user)
    indexLike(this.props.user.token)
    // .then(res => {
    //   this.setState({ likes: res.data.likes.length })
    // })
  }

  handleToggle = event => {
    event.preventDefault()
    const picId = event.target.name
    const likeId = event.target.id
    console.log(likeId)
    console.log(this.props.user.token)
    console.log(picId)
    if (this.state.liked === true) {
      this.setState({ liked: false })
      likeDelete(this.props.user.token, likeId)
    } else {
      this.setState({ liked: true })
      createLike(picId, this.props.user.token)
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

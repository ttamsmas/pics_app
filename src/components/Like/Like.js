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
    indexLike(this.props.user.token)

      // set state to a count of items linked to this specific pic so it can be displayed as a like count
      .then(res => {
        this.setState({ likes: res.data.likes.length })
      })
      // check the index response for any likes by the current user, if there is one set the checkbox of that pic to checked so when you click it you delete it not create it
      .then(res => {
        if (res.findIndex(this.props.name)) {
          // name the checkbox the ID of the like attached to this user so you are able to delete that specific like
          const likeIndex = res.findIndex(this.props.name)
          const likeId = res[likeIndex].name
          this.setState({
            liked: 'checked',
            likeId: likeId
          })
        }
      })
  }

  // the checkbox used for like/unlike toggles between creating and deleting a like attached to that specific pic & current user
  handleToggle = event => {
    event.preventDefault()
    const picId = event.target.name
    const likeId = event.target.id
    console.log(likeId)
    console.log(this.props.user.token)
    console.log(picId)
    // check if the 'liked' state to determine if the user already has a like attached to the pic, this prevents a user from creating more than 1 like per pic
    if (this.state.liked === true) {
      this.setState({ liked: false })
      likeDelete(this.props.user.token, likeId)
    } else {
      this.setState({ liked: true })
      createLike(picId, this.props.user)
    }
  }

  render () {
    return (
      <div>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" defaultChecked={this.state.liked} label="like?" name={this.props.name} onClick={this.handleToggle}/>
          <p>{this.state.likes}</p>
        </Form.Group>
      </div>
    )
  }
}

export default Likes

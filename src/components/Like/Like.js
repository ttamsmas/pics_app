import React, { Component } from 'react'

import { indexLike, likeDelete, createLike } from '../../api/like'
import { Form, Container, Row } from 'react-bootstrap'

class Likes extends Component {
  _isMounted = false

  constructor (props) {
    super(props)
    this.state = {
      liked: false,
      likes: '',
      likeId: ''
    }
  }

  componentDidMount () {
    this._isMounted = true

    if (this._isMounted) {
      indexLike(this.props.user.token)

      // set state to a count of items linked to this specific pic so it can be displayed as a like count
        .then(res => {
          const likeArray = res.data.likes
          const picLikes = likeArray.filter(like => like.pic.id === this.props.name)
          this.setState({ likes: picLikes.length })

          // name the checkbox the ID of the like attached to this user so you are able to delete that specific like
          const secondId = picLikes.findIndex(element => element.owner.email === this.props.user.email && element.pic.id === this.props.name)
          // check the index response for any likes by the current user, if there is one set the checkbox of that pic to checked so when you click it you delete it not create it
          if (picLikes[secondId] !== undefined) {
            this.setState({
              liked: true,
              likeId: picLikes[secondId].id
            })
          }
        })
        .catch(console.error)
    }
  }

  // the checkbox used for like/unlike toggles between creating and deleting a like attached to that specific pic & current user
  handleToggle = event => {
    event.preventDefault()
    const picId = event.target.name

    // check if the 'liked' state to determine if the user already has a like attached to the pic, this prevents a user from creating more than 1 like per pic
    if (this.state.liked === true) {
      this.setState({ liked: false })
      likeDelete(this.props.user, this.state.likeId)
        .then(() => {
          const newCount = this.state.likes - 1
          this.setState({ likeId: '', likes: newCount })
          indexLike(this.props.user.token)

          // set state to a count of items linked to this specific pic so it can be displayed as a like count
            .then(res => {
              const likeArray = res.data.likes
              const picLikes = likeArray.filter(like => like.pic.id === this.props.name)
              this.setState({ likes: picLikes.length })
            })
        })
    } else {
      this.setState({ liked: true })
      createLike(picId, this.props.user)
        .then(() => {
          const newCount = this.state.likes + 1
          this.setState({ likes: newCount })
          indexLike(this.props.user.token)

            // set state to a count of items linked to this specific pic so it can be displayed as a like count
            .then(res => {
              const likeArray = res.data.likes
              const picLikes = likeArray.filter(like => like.pic.id === this.props.name)
              this.setState({ likes: picLikes.length })

              // name the checkbox the ID of the like attached to this user so you are able to delete that specific like
              const secondId = picLikes.findIndex(element => element.owner.email === this.props.user.email && element.pic.id === this.props.name)
              // check the index response for any likes by the current user, if there is one set the checkbox of that pic to checked so when you click it you delete it not create it
              if (picLikes[secondId] !== undefined) {
                this.setState({
                  liked: true,
                  likeId: picLikes[secondId].id
                })
              }
            })
            .catch(console.error)
        })
    }
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  render () {
    return (
      <Form.Group controlId="formBasicCheckbox">
        <Container fluid>
          <Row>
            <h6 className="like_row" xs={3}>Pin?</h6>
            <input className="like_row" type="checkbox" checked={this.state.liked} label="like?" name={this.props.name} onChange={this.handleToggle}/>
            <h6 className="like_row" xs={true}>Total Pins: {this.state.likes}</h6>
          </Row>
        </Container>
      </Form.Group>
    )
  }
}

export default Likes

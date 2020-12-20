import React, { Component } from 'react'

import { indexPic, picDelete } from '../../api/pic'
import { Button, Card } from 'react-bootstrap'

class Pics extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pics: []
    }
  }
  componentDidMount () {
    const { user, msgAlert } = this.props
    console.log(user)
    indexPic(user)
      .then(res => {
        this.setState({ pics: res.data.pics })
      })
      .then(() => {
        msgAlert({
          heading: 'Images Have Finished Loading',
          variant: 'success',
          message: 'enjoy!'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Pics Failed to Load',
          variant: 'danger',
          message: 'Pic Error Message: ' + err.message
        })
      })
  }

  onPicDelete = (event) => {
    event.preventDefault()
    const picId = event.target.name
    picDelete(this.props.user, picId)
      .then(() => {
        this.props.msgAlert({
          heading: 'Message Deleted!',
          message: 'Success!',
          variant: 'success'
        })
      })

      .then(props => {
        indexPic(this.props.user)
          .then(res => {
            this.setState({ pics: res.data.pics })
          })
      })

      .catch(error => {
        this.props.msgAlert({
          heading: 'You are not the owner of this message ' + error.message,
          message: 'Failed to Load',
          variant: 'danger'
        })
      })
  }

  render () {
    const pics = this.state.pics.map(pic => (
      <div key={pic.id}>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={pic.imgLink} alt="Cat Meme"/>
          <Card.Body>
            <Card.Title>{pic.caption}</Card.Title>
            <Card.Text>{pic.tag}</Card.Text>
          </Card.Body>
          <Button variant="dark" name={pic.id} onClick={this.onPicDelete}>Delete</Button>
        </Card>
      </div>
    ))

    return (
      <div>
        {pics}
      </div>
    )
  }
}

export default Pics

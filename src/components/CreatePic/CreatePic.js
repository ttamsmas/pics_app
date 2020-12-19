// import React/dev Tools
import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'

// import messaging for feedback
import messages from '../AutoDismissAlert/messages'

// import module with API/Server calls
import { createPic } from '../../api/pic'

class CreatePic extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pic: {
        name: '',
        tag: '',
        imgLink: ''
      }
    }
  }

  // componentDidMount () {}

    handleInputChange = event => {
      event.persist()

      this.setState(prevState => {
        const updatedField = {
          [event.target.name]: event.target.value
        }
        const updatedData = Object.assign({}, prevState.chat, updatedField)

        return { chat: updatedData }
      })
    }

    onCreatePic = event => {
      event.preventDefault()
      const { msgAlert, user } = this.props
      createPic(this.state.pic, user)
        // Next make form clear on submit
        .then(() => this.setState({ chat: {
          text: '' } }))

        .then(() => msgAlert({
          heading: 'Sent!',
          message: messages.createMessageSuccess,
          variant: 'success'
        }))

        .catch(error => {
          this.setState({ text: '' })
          msgAlert({
            heading: 'Message failed ' + error.message,
            message: messages.createMessageFailure,
            variant: 'danger'
          })
        })
    }

    render () {
      return (
        <div>
          <form onSubmit={this.onCreatePic}>
            <Form.Group>
              <Form.Label>Pic Caption</Form.Label>
              <Form.Control type="text" placeholder="type caption here..." />
              <br />
              <Form.Label>Pic Tags</Form.Label>
              <Form.Control as="select">
                <option>People</option>
                <option>Pets</option>
                <option>Nature</option>
                <option>Action</option>
                <option>Lifestyle</option>
              </Form.Control>
              <br />
              <Form.Label>Pic Link</Form.Label>
              <Form.Control type="text" placeholder="Link to Pic"/>
              <br />
              <Form.File id="fileUpload" placeholder="upload pic" />
            </Form.Group>
            <Button variant="link">Link</Button>
          </form>
        </div>
      )
    }
}

export default CreatePic

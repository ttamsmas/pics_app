// import React/dev Tools
import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

// import { Redirect } from 'react-router-dom'

// import messaging for feedback
import messages from '../AutoDismissAlert/messages'

// import module with API/Server calls
import { createPic } from '../../api/pic'

class CreatePic extends Component {
  constructor (props) {
    super(props)

    this.state = {
      caption: '',
      tag: '',
      imgLink: '',
      created: null
    }
  }

  // componentDidMount () {}

    handleInputChange = event => {
      event.persist()

      this.setState(prevState => {
        const updatedField = {
          [event.target.name]: event.target.value
        }
        const updatedData = Object.assign({}, prevState.pic, updatedField)

        return updatedData
      })
    }

    onCreatePic = (event, props) => {
      event.preventDefault()
      const { user, msgAlert } = this.props
      const { caption, tag, imgLink } = this.state
      const pic = {
        caption,
        tag,
        imgLink
      }

      createPic(user, pic)
      // Next make form clear on submit
        .then(() => this.setState({
          caption: '',
          tag: '',
          imgLink: '',
          created: '/'
        })
        )

        .then(() => msgAlert({
          heading: 'Sent!',
          message: messages.createMessageSuccess,
          variant: 'success'
        }))

        .catch(error => {
          msgAlert({
            heading: 'Message failed ' + error.message,
            message: messages.createMessageFailure,
            variant: 'danger'
          })
        })
    }

    render () {
      if (this.state.created) {
        return (
          <Redirect to={this.state.created}/>
        )
      }

      return (
        <div>
          <h1>Create New Pic</h1>
          <form onSubmit={this.onCreatePic}>
            <Form.Group>
              <Form.Label>Pic Caption</Form.Label>
              <Form.Control onChange={this.handleInputChange} value={this.state.caption} type="text" name='caption'/>
              <br />
              <Form.Label>Pic Tags</Form.Label>
              <Form.Control as="select" onChange={this.handleInputChange} value={this.state.tag} name='tag'>
                <option>People</option>
                <option>Pets</option>
                <option>Nature</option>
                <option>Action</option>
                <option>Lifestyle</option>
              </Form.Control>
              <br />
              <Form.Label>Pic Link</Form.Label>
              <Form.Control type="text" onChange={this.handleInputChange} value={this.state.imgLink} placeholder="Link to Pic" name='imgLink'/>
            </Form.Group>
            <Button type='submit' variant="dark">Create</Button>
          </form>
        </div>
      )
    }
}

export default CreatePic

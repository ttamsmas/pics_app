// import React/dev Tools
import React, { Component } from 'react'
import { Button, Form, Accordion, Card } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

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

    onCreatePic = event => {
      event.preventDefault()
      const { msgAlert, user } = this.props
      console.log(this.state)

      const { caption, tag, imgLink } = this.state
      const pic = {
        caption,
        tag,
        imgLink
      }
      console.log(pic)
      createPic(user, pic)
        // Next make form clear on submit
        .then(() => this.setState({
          caption: '',
          tag: '',
          imgLink: '',
          created: '/'
        }))

        .then(() => msgAlert({
          heading: 'Sent!',
          message: messages.createMessageSuccess,
          variant: 'success'
        }))

        .catch(error => {
          this.setState({ pic: '' })
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
          <Redirect to={this.state.redirect}/>
        )
      }
      return (
        <div>
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  Upload a Pic
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <form onSubmit={this.onCreatePic}>
                    <Form.Group>
                      <Form.Label>Pic Caption</Form.Label>
                      <Form.Control type="text" placeholder="type caption here..." name='caption' onChange={this.handleInputChange}/>
                      <br />
                      <Form.Label>Pic Tags</Form.Label>
                      <Form.Control as="select" name='tag' onChange={this.handleInputChange}>
                        <option>People</option>
                        <option>Pets</option>
                        <option>Nature</option>
                        <option>Action</option>
                        <option>Lifestyle</option>
                      </Form.Control>
                      <br />
                      <Form.Label>Pic Link</Form.Label>
                      <Form.Control type="text" placeholder="Link to Pic" name='imgLink' onChange={this.handleInputChange}/>
                      <br />
                      <Form.File id="fileUpload" placeholder="upload pic" name='file' onChange={this.handleInputChange}/>
                    </Form.Group>
                    <Button as={Button} type='submit' variant="dark">Dark</Button>
                  </form>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      )
    }
}

export default CreatePic

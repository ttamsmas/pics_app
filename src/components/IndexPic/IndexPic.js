import React, { Component } from 'react'

import { indexPic, picDelete, updatePic } from '../../api/pic'
import { Button, Card, Form, Container, CardGroup, Col, Row } from 'react-bootstrap'
// import Like from '../Like/Like'

class Pics extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pics: [],
      showUpdate: false,
      picId: '',
      caption: '',
      tag: '',
      imgLink: ''
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props
    const runIndex = user => {
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
    runIndex(user)
  }

  runIndex = () => {
    const { user, msgAlert } = this.props
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

  showUpdateFields = (event) => {
    if (this.state.showUpdate === false) {
      this.setState({ showUpdate: true, picId: event.target.name })
    } else {
      this.setState({ showUpdate: false, picId: '' })
    }
  }

  handleInputChange = event => {
    event.persist()
    const updatedField = { [event.target.name]: event.target.value }
    this.setState(oldPic => {
      const updatedPic = { ...oldPic, ...updatedField }
      return updatedPic
    })
  }

  onUpdatePic = event => {
    event.preventDefault()
    const { user } = this.props
    const iD = this.state.picId
    const updates = this.state
    updatePic(user, updates, iD)
      // Next make form clear on submit
      .then(() => this.setState({ showUpdate: false, caption: '', tag: '', imgLink: '' }))
      .then(() => this.props.msgAlert({
        heading: 'Updating...',
        message: 'Update Complete',
        variant: 'success'
      }))
      .then(() => this.runIndex(user))
      .catch(error => {
        this.props.msgAlert({
          heading: 'Warning: ' + error.message,
          message: 'Update Failed',
          variant: 'danger'
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
    // const user = this.props.user
    const pics = this.state.pics.map(pic => (
      <Col fluid="true" md={4} xs={6} key={pic.id}>
        <Card>
          <Card.Img variant="top" src={pic.imgLink} alt="Cat Meme"/>
          <Card.Body>
            <Card.Title>{pic.caption}</Card.Title>
            <Card.Text>{pic.tag}</Card.Text>
            <Button variant="dark" size="sm" name={pic.id} onClick={this.onPicDelete}>Delete</Button>
            <Button variant="info" size="sm" name={pic.id} onClick={this.showUpdateFields}>Update</Button>
            {/* <Like props={user} name={pic.id}/> */}
          </Card.Body>
        </Card>
      </Col>
    ))

    const update = props => {
      if (this.state.showUpdate) {
        return (
          <div>
            <h1>Update Fields</h1>
            <form onSubmit={this.onUpdatePic}>
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
                <br />
                <Form.File id="fileUpload" placeholder="upload pic" name='file'/>
              </Form.Group>
              <Button type='submit' variant="dark">Dark</Button>
            </form>
          </div>
        )
      }
    }

    return (
      <div>
        <Container fluid="true">
          <Row xs={1}>
            {update()}
          </Row>
          <CardGroup display="flex">
            {pics}
          </CardGroup>
        </Container>
      </div>
    )
  }
}

export default Pics

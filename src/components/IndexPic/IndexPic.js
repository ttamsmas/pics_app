import React, { Component } from 'react'

import { indexPic, picDelete, updatePic } from '../../api/pic'
import { Button, Card, Form } from 'react-bootstrap'

class Pics extends Component {
  constructor (props) {
    super(props)
    this.showUpdateFields = this.showUpdateFields.bind(this)
    this.state = {
      pics: [],
      showUpdate: false,
      pic: {
        caption: '',
        tag: '',
        imgLink: ''
      }
    }
  }
  componentDidMount () {
    const { user, msgAlert } = this.props
    console.log(user)
    console.log(this.props)
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

  showUpdateFields = () => {
    if (this.state.showUpdate === false) {
      this.setState({ showUpdate: true })
    } else {
      this.setState({ showUpdate: false })
    }
  }

  handleInputChange = event => {
    event.persist()

    this.setState(prevState => {
      const updatedField = {
        [event.target.name]: event.target.value
      }
      const updatedData = Object.assign({}, prevState.pic, updatedField)

      return { pic: updatedData }
    })
  }

  onUpdatePic = event => {
    event.preventDefault()
    const { msgAlert, user } = this.props
    const id = event.target.name
    updatePic(this.state.pic, user, id)
      // Next make form clear on submit
      .then(() => this.setState({ showUpdate: false, caption: '', tag: '', imgLink: '' }))

      .then(() => msgAlert({
        heading: 'Updating...',
        message: 'Update Complete',
        variant: 'success'
      }))

      .catch(error => {
        this.setState({ pic: '' })
        msgAlert({
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
    const pics = this.state.pics.map(pic => (
      <div key={pic.id}>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={pic.imgLink} alt="Cat Meme"/>
          <Card.Body>
            <Card.Title>{pic.caption}</Card.Title>
            <Card.Text>{pic.tag}</Card.Text>
            <Button variant="dark" name={pic.id} onClick={this.onPicDelete}>Delete</Button>
            <Button variant="info" name={pic.id} onClick={this.showUpdateFields}>Update</Button>
          </Card.Body>
        </Card>
      </div>
    ))

    const update = props => {
      if (this.showUpdate) {
        return (
          <div>
            <h1>Update Fields</h1>
            <form onSubmit={this.onUpdatePic}>
              <Form.Group>
                <Form.Label>Pic Caption</Form.Label>
                <Form.Control type="text" placeholder="type caption here..." name='pic[caption]' onChange={this.handleInputChange}/>
                <br />
                <Form.Label>Pic Tags</Form.Label>
                <Form.Control as="select" name='pic[tag]' onChange={this.handleInputChange}>
                  <option>People</option>
                  <option>Pets</option>
                  <option>Nature</option>
                  <option>Action</option>
                  <option>Lifestyle</option>
                </Form.Control>
                <br />
                <Form.Label>Pic Link</Form.Label>
                <Form.Control type="text" placeholder="Link to Pic" name='pic[imgLink]' onChange={this.handleInputChange}/>
                <br />
                <Form.File id="fileUpload" placeholder="upload pic" name='file' onChange={this.handleInputChange}/>
              </Form.Group>
              <Button type='submit' variant="dark">Dark</Button>
            </form>
          </div>
        )
      }
    }

    return (
      <div>
        {update()}
        {pics}
      </div>
    )
  }
}

export default Pics

import React, { Component } from 'react'

import { indexPic } from '../../api/pic'

class Pics extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pics: []
    }
  }
  componentDidMount () {
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
  render () {
    const pics = this.state.pics.map(pic => (
      <li key={pic._id}>
        <p>{pic.tag}</p>
        <p>{pic.caption}</p>
        <p>{pic.imgLink}</p>
      </li>
    ))

    return (
      <div>
        {pics}
      </div>
    )
  }
}

export default Pics

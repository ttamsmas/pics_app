import React, { useState, useEffect } from 'react'

import { showPics } from '../../api/pic'

const PicShow = (props) => {
  // const [loading, setLoading] = useState(true)
  const [pic, setPic] = useState(null)
  const { user, msgAlert, match } = props

  useEffect(() => {
    showPics(user, match.params.picId)
      .then(res => {
        setPic(res.data.pic)
      })
      .then(() => {
        msgAlert({
          heading: 'Show Pic Success',
          message: 'See the pic there!',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Show Pic Failed :(',
          message: 'Error code: ' + err.message,
          variant: 'danger'
        })
      })
  }, [])

  return (
    <div>
      <h3>Show Pic</h3>
      {pic ? (
        <div>
          <h2>{pic.text}</h2>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default PicShow

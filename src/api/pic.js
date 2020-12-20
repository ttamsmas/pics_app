import apiUrl from '../apiConfig'
import axios from 'axios'

export const createPic = (pic, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/pics/',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: { pic }
  })
}

export const indexPic = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/pics/',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const showPic = (user, picId) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/pics/' + picId,
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const picDelete = (user, picId) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/pics/' + picId + '/',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

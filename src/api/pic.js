import apiUrl from '../apiConfig'
import axios from 'axios'

export const createPic = (user, pic) => {
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

export const updatePic = (user, data, picId) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/pics/' + picId + '/',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      pic: data
    }
  })
}

export const pinView = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/pins/',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

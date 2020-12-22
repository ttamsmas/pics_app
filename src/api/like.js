import apiUrl from '../apiConfig'
import axios from 'axios'

export const createLike = (like, token) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/likes/',
    headers: {
      'Authorization': `Token ${token}`
    },
    data: { like }
  })
}

export const indexLike = token => {
  return axios({
    method: 'GET',
    url: apiUrl + '/likes/',
    headers: {
      'Authorization': `Token ${token}`
    }
  })
}

export const likeDelete = (token, likeId) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/likes/' + likeId + '/',
    headers: {
      'Authorization': `Token ${token}`
    }
  })
}

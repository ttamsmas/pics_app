import apiUrl from '../apiConfig'
import axios from 'axios'

export const createLike = (pic, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/likes/',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      like: {
        pic_id: pic,
        user_id: user.id
      }
    }
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

export const likeDelete = (user, likeId) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/likes/' + likeId + '/',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

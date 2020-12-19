import apiUrl from '../apiConfig'
import axios from 'axios'

export const createPic = (pic, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/pics',
    headers: {
      Authorization: `Token ${user.token}`
    },
    data: { pic }
  })
}

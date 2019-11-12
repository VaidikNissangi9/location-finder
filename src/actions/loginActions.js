import axios from 'axios'
import { loginError, loginSuccess } from './actions'
import ls from 'local-storage'

/**
 * this function is used to checks the login @param credentials with the backend and dispatches
 * @param {*} credentials 
 * @param {*} dispatch 
 */
export function checkLoginCredentials(credentials, dispatch) {
  axios.post('http://localhost:3001/login', credentials,
    {
      headers: { "Content-Type": "application/json" }
    }).then((response) => {
      // console.log(response.data)
      ls.set('isAuthenticated', true)
      ls.set('access_token',response.data.access_token)
      dispatch(loginSuccess(response))
    }).catch(error => {
      ls.set('access_token'," ")
      dispatch(loginError(error))})
}
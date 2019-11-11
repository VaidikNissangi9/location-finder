import axios from 'axios'
import { loginError, loginSuccess } from './actions'
import ls from 'local-storage'

/**
 * Authenticates the credentials
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
      dispatch(loginSuccess(response))
    }).catch(error => dispatch(loginError(error)))
}
import axios from 'axios'
import { setLocations, addsLocations } from './actions'

/**
 * this function fetches the list of locations from the backend and dispatches the response data.
 * @param {*} dispatch 
 */
export function fetchLocations(dispatch) {
  axios.get('http://localhost:3001/locations', {
    headers: {
      "Content-Type": "application/json",
      "Authorization": JSON.parse(localStorage.getItem('access_token'))
    }
  }).then(res => {
    dispatch(setLocations(res.data));
  });
}

/**
 * this function is used to add the chosen @param center or location and dispatches the response.  
 * @param {*} center 
 * @param {*} dispatch 
 */
export function addLocations(center, dispatch) {
  axios.post("http://localhost:3001/locations", center, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": JSON.parse(localStorage.getItem('access_token'))
    }
  }).then(response => {
    dispatch(addsLocations(response))
  })
}



import axios from 'axios'
import { setLocations, addsLocations } from './actions'

/**
 * Fetches locations 
 * @param {*} dispatch 
 */
export function fetchLocations(dispatch) {
  axios.get('http://localhost:3001/locations', {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "fake-access-token"
    }
  }).then(res => {
    dispatch(setLocations(res.data));
  });
}

/**
 * Adds a location 
 * @param {*} center 
 * @param {*} dispatch 
 */
export function addLocations(center, dispatch) {
  axios.post("http://localhost:3001/locations", center, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "fake-access-token"
    }
  }).then(response => {
    dispatch(addsLocations(response))
  })
}



import axios from 'axios'

export const getCenter='getCenter'
export const getLocations='getLocations'
export const reverseLocations='reverseLocations'

export function fetchLocations() {
    return function(dispatch) {
      return axios.get('http://localhost:3001/locations', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "fake-access-token"
        }}).then(res => {
        dispatch(setLocations(res.data));
      });
    };
  }
  
  function setLocations(data) {
    return {
      type: getLocations,
      payload: data
    };
  }
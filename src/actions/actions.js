
export const GET_CENTER = 'GET_CENTER'
export const GET_LOCATIONS = 'GET_LOCATIONS'
export const REVERSE_LOCATIONS = 'REVERSE_LOCATIONS'
export const SET_USERNAME = 'SET_USERNAME'
export const SET_PASSWORD = 'SET_PASSWORD'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const SET_TOKEN = 'SET_TOKEN'
export const ADD_LOCATION_SUCCESS = 'ADD_LOCATION_SUCCESS'

/**
 * this is a dispatch function called when login is successfull which uses the response as param.
 * @param {*} response 
 */
export function loginSuccess(response) {
    return {
        type: LOGIN_SUCCESS,
        payload: response.data.access_token,
    }
}

/**
 * this is a dispatch function called when login is not successfull
 * @param {*} error 
 */
export function loginError(error) {
    return {
        type: LOGIN_FAILURE,
        payload: error.data,
    }
}

/**
 * 
 * @param {*} response 
 */
export function addsLocations(response) {
    return {
        type: ADD_LOCATION_SUCCESS,
        payload: response
    }
}

/**
 * return type get locations
 * @param {*} data 
 */
export function setLocations(data) {
    return {
        type: GET_LOCATIONS,
        payload: data
    };
}

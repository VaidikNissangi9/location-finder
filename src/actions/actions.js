
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
 * returns Login success type
 * @param {*} response 
 */
export function loginSuccess(response) {
    return {
        type: LOGIN_SUCCESS,
        payload: response.data.access_token,
    }
}

/**
 * return login error type
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
        locations: data
    };
}

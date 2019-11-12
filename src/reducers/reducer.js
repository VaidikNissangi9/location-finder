import * as actionTypes from '../actions/actions'

const initialState = {
    locations: [],
    center: [-96, 36.5],
    username: "",
    password: "",
    token: "",
    locationAdded: false
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_LOCATIONS:
            return {
                ...state,
                locations: action.payload
            }
        case actionTypes.REVERSE_LOCATIONS:
            let newLocations = action.payload;
            let updatedLocations = [...newLocations]
            return {
                ...state,
                locations: updatedLocations
            }
        case actionTypes.GET_CENTER:
            let newCenter = action.payload;
            let updatedCenter = [...newCenter]
            return {
                ...state,
                center: updatedCenter
            }
        case actionTypes.SET_USERNAME:
            return {
                ...state,
                username: action.payload
            }
        case actionTypes.SET_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        case actionTypes.SET_TOKEN:
            return {
                ...state,
                token: [...action.payload]
            }
        case actionTypes.LOGIN_SUCCESS:
            // console.log('success', action.payload)
            return {
                ...state,
                token: action.payload
            }
        case actionTypes.LOGIN_FAILURE:
            return {
                ...state,
                token: action.payload
            }
        case actionTypes.ADD_LOCATION_SUCCESS:
            return {
                ...state,
                locationAdded: action.payload
            }
        default:
            return state
    }
}
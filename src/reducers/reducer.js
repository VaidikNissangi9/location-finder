import * as actionTypes from '../actions/actions'

const initialState={
    locations: [],
    center:[-96,36.5]
}

export const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.getLocations:
            return{
                ...state,
                locations:action.locations
            }
        case actionTypes.reverseLocations:
            let newLocations=action.locations;
            let updatedLocations=[...newLocations]
            return{
                ...state,
                locations:updatedLocations
            }
        case actionTypes.getCenter:
                let newCenter=action.center;
                // let id = action.center;
                // let obj =state.locations..reduce(----)
                // let center = [obj.lat, obj.log]
                let updatedCenter=[...newCenter]
            return{
                ...state,
                center:updatedCenter
            }
        default:
            return state
    }
}
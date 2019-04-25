import { GET_LOCATIONS_BEGIN, GET_LOCATIONS_SUCCESS, GET_LOCATIONS_ERROR,
    GET_LOCATION_BEGIN, GET_LOCATION_SUCCESS, GET_LOCATION_ERROR, GET_LOCATION_RESET,
    SET_LOCATION_BEGIN, SET_LOCATION_SUCCESS, SET_LOCATION_ERROR, SET_LOCATION_RESET,
    UPDATE_LOCATION_BEGIN, UPDATE_LOCATION_SUCCESS, UPDATE_LOCATION_ERROR, UPDATE_LOCATION_RESET,
    DELETE_LOCATION_BEGIN, DELETE_LOCATION_SUCCESS, DELETE_LOCATION_ERROR, DELETE_LOCATION_RESET } from '../../constants/locations';

export function getLocationsReducer(state = {}, action) {
    switch(action.type) {
        case GET_LOCATIONS_BEGIN:

        case GET_LOCATIONS_SUCCESS:

        case GET_LOCATIONS_ERROR:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function getLocationReducer(state = {}, action) {
    switch(action.type) {
        case GET_LOCATION_BEGIN:

        case GET_LOCATION_SUCCESS:

        case GET_LOCATION_ERROR:

        case GET_LOCATION_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}
    
export function setLocationsReducer(state = {}, action) {
        switch(action.type) {
            case SET_LOCATION_BEGIN:
    
            case SET_LOCATION_SUCCESS:
    
            case SET_LOCATION_ERROR:
            
            case SET_LOCATION_RESET:
                return Object.assign({}, action.payload);
    
            default:
                return Object.assign({}, state);
    }
}
    
export function updateLocationReducer(state = {}, action) {
        switch(action.type) {
            case UPDATE_LOCATION_BEGIN:
    
            case UPDATE_LOCATION_SUCCESS:
    
            case UPDATE_LOCATION_ERROR:
    
            case UPDATE_LOCATION_RESET:
                return Object.assign({}, action.payload);
    
            default:
                return Object.assign({}, state);
    }
}
    
export function deleteLocationReducer(state = {}, action) {
        switch(action.type) {
            case DELETE_LOCATION_BEGIN:
    
            case DELETE_LOCATION_SUCCESS:
    
            case DELETE_LOCATION_ERROR:
    
            case DELETE_LOCATION_RESET:
                return Object.assign({}, action.payload);
    
            default:
                return Object.assign({}, state);
    }
}
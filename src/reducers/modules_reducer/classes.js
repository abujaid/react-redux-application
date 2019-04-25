import { GET_CLASSES_BEGIN, GET_CLASSES_SUCCESS, GET_CLASSES_ERROR,
    GET_CLASS_BEGIN, GET_CLASS_SUCCESS, GET_CLASS_ERROR, GET_CLASS_RESET,
    SET_CLASS_BEGIN, SET_CLASS_SUCCESS, SET_CLASS_ERROR, SET_CLASS_RESET,
    UPDATE_CLASS_BEGIN, UPDATE_CLASS_SUCCESS, UPDATE_CLASS_ERROR, UPDATE_CLASS_RESET,
    DELETE_CLASS_BEGIN, DELETE_CLASS_SUCCESS, DELETE_CLASS_ERROR, DELETE_CLASS_RESET } from '../../constants/classes';

export function getClassesReducer(state = {}, action) {
    switch(action.type) {
        case GET_CLASSES_BEGIN:

        case GET_CLASSES_SUCCESS:

        case GET_CLASSES_ERROR:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function getClassReducer(state = {}, action) {
    switch(action.type) {
        case GET_CLASS_BEGIN:

        case GET_CLASS_SUCCESS:

        case GET_CLASS_ERROR:

        case GET_CLASS_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function setClassesReducer(state = {}, action) {
    switch(action.type) {
        case SET_CLASS_BEGIN:

        case SET_CLASS_SUCCESS:

        case SET_CLASS_ERROR:
        
        case SET_CLASS_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function updateClassReducer(state = {}, action) {
    switch(action.type) {
        case UPDATE_CLASS_BEGIN:

        case UPDATE_CLASS_SUCCESS:

        case UPDATE_CLASS_ERROR:

        case UPDATE_CLASS_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function deleteClassReducer(state = {}, action) {
    switch(action.type) {
        case DELETE_CLASS_BEGIN:

        case DELETE_CLASS_SUCCESS:

        case DELETE_CLASS_ERROR:

        case DELETE_CLASS_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}
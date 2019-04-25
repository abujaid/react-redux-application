import { GET_CATEGORY_BEGIN, GET_CATEGORY_SUCCESS, GET_CATEGORY_ERROR } from '../../constants/categories';

export function getCategoriesReducer(state = {}, action) {
    switch(action.type) {
        case GET_CATEGORY_BEGIN:

        case GET_CATEGORY_SUCCESS:
        
        case GET_CATEGORY_ERROR:
            return Object.assign({}, action.payload);
            
        default:
            return Object.assign({}, state);
    }
}
import axios from 'axios';

import { API_URL } from './../../constants';
import { GET_CATEGORY_BEGIN, GET_CATEGORY_SUCCESS, GET_CATEGORY_ERROR } from '../../constants/categories';

export function getCategories(token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        dispatch({ type: GET_CATEGORY_BEGIN, payload: {} });
        await axios.get(`${API_URL}/private/categories`).
            then(response => dispatch({ type: GET_CATEGORY_SUCCESS, payload: response.data })).
            catch(error => dispatch({ type: GET_CATEGORY_ERROR, payload: error.response.data }));
    }
}
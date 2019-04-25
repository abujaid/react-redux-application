import axios from 'axios';

import { API_URL } from './../../constants';
import { SIGNUP_BEGIN, SIGNUP_SUCCESS, SIGNUP_ERROR, SIGNUP_RESET } from '../../constants/signup';

export function signup (formData = {})
{
    return async dispatch =>
    {
        if (Object.keys(formData).length > 0) {
            dispatch({ type: SIGNUP_BEGIN, payload: {} }); // dispatch is a function which send types of action to redux store
            await axios.post(`${API_URL}/public/users/register`, formData).
                then(response => dispatch({ type: SIGNUP_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: SIGNUP_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: SIGNUP_RESET, payload: {} });
        }
    }
}
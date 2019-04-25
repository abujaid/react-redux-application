import axios from 'axios';

import { API_URL } from './../../constants';
import { FORGOT_PASSWORD_BEGIN, FORGOT_PASSWORD_REQUESTING, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_ERROR, FORGOT_PASSWORD_RESET } from '../../constants/forgot_password';

export function forgotPassword(formData = {}) {
    return async dispatch => {
        if (Object.keys(formData).length > 0) {
            dispatch({ type: FORGOT_PASSWORD_BEGIN, payload: {} });
            if (Object.keys(formData).length > 0) {
                dispatch({ type: FORGOT_PASSWORD_REQUESTING, payload: { isRequesting: true } });
            }
            await axios.post(`${API_URL}/public/users/forgot-password`, formData).
                then(response => dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: FORGOT_PASSWORD_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: FORGOT_PASSWORD_RESET, payload: {} });
        }

    }
}
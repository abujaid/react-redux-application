import axios from 'axios';

import { API_URL } from './../../constants';
import {
    VALIDATE_RESET_TOKEN_BEGIN, VALIDATE_RESET_TOKEN_SUCCESS, VALIDATE_RESET_TOKEN_ERROR, VALIDATE_RESET_TOKEN_RESET,
    RESET_PASSWORD_BEGIN, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR, RESET_PASSWORD_RESET
} from '../../constants/reset_password';

export function validateResetToken(formData = {}) {
    return async dispatch => {
        dispatch({ type: VALIDATE_RESET_TOKEN_BEGIN, payload: {} });
        if (Object.keys(formData).length > 0) {
            await axios.post(`${API_URL}/public/users/validate-reset-token`, formData).
                then(response => dispatch({ type: VALIDATE_RESET_TOKEN_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: VALIDATE_RESET_TOKEN_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: VALIDATE_RESET_TOKEN_RESET, payload: {} });
        }
    }
}

export function resetPassword(formData = {}) {
    return async dispatch => {
        dispatch({ type: RESET_PASSWORD_BEGIN, payload: {} });
        if (Object.keys(formData).length > 0) {
            await axios.patch(`${API_URL}/public/users/reset-password`, formData).
                then(response => dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: RESET_PASSWORD_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: RESET_PASSWORD_RESET, payload: {} });
        }
    }
}
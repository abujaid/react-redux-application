import axios from 'axios';

import { API_URL } from './../../constants';
import { GET_SUBSCRIPTIONS_BEGIN, GET_SUBSCRIPTIONS_SUCCESS, GET_SUBSCRIPTIONS_ERROR } from '../../constants/subscription';

export function getSubscriptions() {
    return async dispatch => {
        dispatch({ type: GET_SUBSCRIPTIONS_BEGIN, payload: {} });
        await axios.get(`${API_URL}/public/subscriptions`)
            .then(response => dispatch({ type: GET_SUBSCRIPTIONS_SUCCESS, payload: response.data })).
            catch(error => dispatch({ type: GET_SUBSCRIPTIONS_ERROR, payload: error.response.data }));
    }
}
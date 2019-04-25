import axios from 'axios';

import { API_URL } from './../../constants';
import {
    GET_LOCATIONS_BEGIN, GET_LOCATIONS_SUCCESS, GET_LOCATIONS_ERROR,
    GET_LOCATION_BEGIN, GET_LOCATION_SUCCESS, GET_LOCATION_ERROR, GET_LOCATION_RESET,
    SET_LOCATION_BEGIN, SET_LOCATION_SUCCESS, SET_LOCATION_ERROR, SET_LOCATION_RESET,
    UPDATE_LOCATION_BEGIN, UPDATE_LOCATION_SUCCESS, UPDATE_LOCATION_ERROR, UPDATE_LOCATION_RESET,
    DELETE_LOCATION_BEGIN, DELETE_LOCATION_SUCCESS, DELETE_LOCATION_ERROR, DELETE_LOCATION_RESET
} from '../../constants/locations';

export function getLocations(token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        dispatch({ type: GET_LOCATIONS_BEGIN, payload: {} });
        await axios.get(`${API_URL}/private/locations`).
            then(response => dispatch({ type: GET_LOCATIONS_SUCCESS, payload: response.data })).
            catch(error => dispatch({ type: GET_LOCATIONS_ERROR, payload: error.response.data }));
    }
}

export function getLocation(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: GET_LOCATION_BEGIN, payload: {} });
            await axios.get(`${API_URL}/private/locations/${id}/item`).
                then(response => dispatch({ type: GET_LOCATION_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: GET_LOCATION_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: GET_LOCATION_RESET, payload: {} });
        }
    }
}

export function setLocations(token, data = {}) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (Object.keys(data).length > 0) {
            dispatch({ type: SET_LOCATION_BEGIN, payload: {} });
            await axios.post(`${API_URL}/private/locations/new`, data).
                then(response => dispatch({ type: SET_LOCATION_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: SET_LOCATION_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: SET_LOCATION_RESET, payload: {} });
        }
    }
}

export function updateLocation(token, id, data = {}) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (Object.keys(data).length > 0) {
            dispatch({ type: UPDATE_LOCATION_BEGIN, payload: {} });
            await axios.patch(`${API_URL}/private/Locations/${id}/edit`, data).
                then(response => dispatch({ type: UPDATE_LOCATION_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: UPDATE_LOCATION_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: UPDATE_LOCATION_RESET, payload: {} });
        }
    }
}

export function deleteLocation(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: DELETE_LOCATION_BEGIN, payload: {} });
            await axios.delete(`${API_URL}/private/locations/${id}/delete`).
                then(response => dispatch({ type: DELETE_LOCATION_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: DELETE_LOCATION_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: DELETE_LOCATION_RESET, payload: {} });
        }
    }
}
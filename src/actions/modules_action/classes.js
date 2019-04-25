import axios from 'axios';

import { API_URL } from './../../constants';
import {
    GET_CLASSES_BEGIN, GET_CLASSES_SUCCESS, GET_CLASSES_ERROR,
    GET_CLASS_BEGIN, GET_CLASS_SUCCESS, GET_CLASS_ERROR, GET_CLASS_RESET,
    SET_CLASS_BEGIN, SET_CLASS_SUCCESS, SET_CLASS_ERROR, SET_CLASS_RESET,
    UPDATE_CLASS_BEGIN, UPDATE_CLASS_SUCCESS, UPDATE_CLASS_ERROR, UPDATE_CLASS_RESET,
    DELETE_CLASS_BEGIN, DELETE_CLASS_SUCCESS, DELETE_CLASS_ERROR, DELETE_CLASS_RESET
} from '../../constants/classes';

export function getClasses(token = '', id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        dispatch({ type: GET_CLASSES_BEGIN, payload: {} });
        await axios.get(`${API_URL}/private/users/${id}/trainings`).
            then(response => dispatch({ type: GET_CLASSES_SUCCESS, payload: response.data })).
            catch(error => dispatch({ type: GET_CLASSES_ERROR, payload: error.response.data }));
    }
}

export function getClass(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: GET_CLASS_BEGIN, payload: {} });
            await axios.get(`${API_URL}/private/trainings/${id}/item`).
                then(response => dispatch({ type: GET_CLASS_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: GET_CLASS_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: GET_CLASS_RESET, payload: {} });
        }
    }
}

export function setClasses(token, data = {}) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (Object.keys(data).length > 0) {
            dispatch({ type: SET_CLASS_BEGIN, payload: {} });
            await axios.post(`${API_URL}/private/trainings/new`, data).
                then(response => dispatch({ type: SET_CLASS_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: SET_CLASS_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: SET_CLASS_RESET, payload: {} });
        }
    }
}

export function updateClass(token, id, data = {}) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (Object.keys(data).length > 0) {
            dispatch({ type: UPDATE_CLASS_BEGIN, payload: {} });
            await axios.patch(`${API_URL}/private/trainings/${id}/edit`, data).
                then(response => dispatch({ type: UPDATE_CLASS_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: UPDATE_CLASS_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: UPDATE_CLASS_RESET, payload: {} });
        }
    }
}

export function deleteClass(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: DELETE_CLASS_BEGIN, payload: {} });
            await axios.delete(`${API_URL}/private/trainings/${id}/delete`).
                then(response => dispatch({ type: DELETE_CLASS_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: DELETE_CLASS_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: DELETE_CLASS_RESET, payload: {} });
        }
    }
}
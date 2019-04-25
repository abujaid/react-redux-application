import axios from 'axios';

import { API_URL } from './../../constants';
import {
    GET_CERTIFICATE_BEGIN, GET_CERTIFICATE_SUCCESS, GET_CERTIFICATE_ERROR, GET_CERTIFICATE_RESET,
    Edit_CERTIFICATE_BEGIN, Edit_CERTIFICATE_SUCCESS, Edit_CERTIFICATE_ERROR,
    Edit_CERTIFICATE_RESET, GET_CERTIFICATE_BY_ID_BEGIN, GET_CERTIFICATE_BY_ID_SUCCESS,
    GET_CERTIFICATE_BY_ID_ERROR, GET_CERTIFICATE_BY_ID_RESET, GET_CERTIFICATE_TEMPLATES_BEGIN,
    GET_CERTIFICATE_TEMPLATES_SUCCESS, GET_CERTIFICATE_TEMPLATES_ERROR, GET_CERTIFICATE_TEMPLATES_RESET
} from '../../constants/certificate';

export function getCertificate(token, userId) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (userId != '') {
            dispatch({ type: GET_CERTIFICATE_BEGIN, payload: {} });
            await axios.get(`${API_URL}/private/certificates/${userId}`).
                then(response => dispatch({ type: GET_CERTIFICATE_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: GET_CERTIFICATE_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: GET_CERTIFICATE_RESET, payload: {} });
        }
    }
}

export function editCertificate(token, data = {}) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (Object.keys(data).length > 0) {
            dispatch({ type: Edit_CERTIFICATE_BEGIN, payload: {} });
            await axios.post(`${API_URL}/private/certificates/template`, data).
                then(response => dispatch({ type: Edit_CERTIFICATE_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: Edit_CERTIFICATE_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: Edit_CERTIFICATE_RESET, payload: {} });
        }
    }
}

export function getCertificateById(token, userId, courseId) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (userId > 0 && courseId > 0) {
            dispatch({ type: GET_CERTIFICATE_BY_ID_BEGIN, payload: {} });
            await axios.get(`${API_URL}/private/certificates/${userId}/item/${courseId}`).
                then(response => dispatch({ type: GET_CERTIFICATE_BY_ID_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: GET_CERTIFICATE_BY_ID_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: GET_CERTIFICATE_BY_ID_RESET, payload: {} });
        }
    }
}

export function getCertificateTemplate(token, reset) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if(reset){
            dispatch({ type: GET_CERTIFICATE_TEMPLATES_BEGIN, payload: {} });
            await axios.get(`${API_URL}/private/certificates/template`).
            then(response => dispatch({ type: GET_CERTIFICATE_TEMPLATES_SUCCESS, payload: response.data })).
            catch(error => dispatch({ type: GET_CERTIFICATE_TEMPLATES_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: GET_CERTIFICATE_TEMPLATES_RESET, payload: {} });
        }
    }
}
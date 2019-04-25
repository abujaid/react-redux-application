import axios from 'axios';

import { API_URL } from './../../constants';
import {
    GET_ACTIVITIES_BEGIN, GET_ACTIVITIES_SUCCESS, GET_ACTIVITIES_ERROR,
    GET_ACTIVITY_BEGIN, GET_ACTIVITY_SUCCESS, GET_ACTIVITY_ERROR, GET_ACTIVITY_RESET,
    UPLOAD_FILE_BEGIN, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_ERROR, UPLOAD_FILE_RESET,
    SET_ACTIVITY_BEGIN, SET_ACTIVITY_SUCCESS, SET_ACTIVITY_ERROR, SET_ACTIVITY_RESET,
    UPDATE_ACTIVITY_BEGIN, UPDATE_ACTIVITY_SUCCESS, UPDATE_ACTIVITY_ERROR, UPDATE_ACTIVITY_RESET,
    DELETE_ACTIVITY_BEGIN, DELETE_ACTIVITY_SUCCESS, DELETE_ACTIVITY_ERROR, DELETE_ACTIVITY_RESET,
    SET_SAVE_ASSESSMENT_DETAILS_BEGIN, SET_SAVE_ASSESSMENT_DETAILS_SUCCESS, SET_SAVE_ASSESSMENT_DETAILS_ERROR,
    SET_SAVE_ASSESSMENT_DETAILS_RESET, SET_GET_ASSESSMENT_DETAILS_BEGIN, SET_GET_ASSESSMENT_DETAILS_SUCCESS,
    SET_GET_ASSESSMENT_DETAILS_ERROR, SET_GET_ASSESSMENT_DETAILS_RESET, DELETE_ASSESSMENT_BEGIN,
    DELETE_ASSESSMENT_SUCCESS, DELETE_ASSESSMENT_ERROR, DELETE_ASSESSMENT_RESET, GET_ASSESSMENT_BY_ID_BEGIN,
    GET_ASSESSMENT_BY_ID_SUCCESS, GET_ASSESSMENT_BY_ID_ERROR, GET_ASSESSMENT_BY_ID_RESET,
    UPDATE_ASSESSMENT_DETAILS_BEGIN, UPDATE_ASSESSMENT_DETAILS_SUCCESS, UPDATE_ASSESSMENT_DETAILS_ERROR,
    UPDATE_ASSESSMENT_DETAILS_RESET, GET_TEST_ACTIVITY_BEGIN, GET_TEST_ACTIVITY_SUCCESS,
    GET_TEST_ACTIVITY_ERROR, GET_TEST_ACTIVITY_RESET, SET_SUBMIT_TEST_ASSESSMENT_BEGIN,
    SET_SUBMIT_TEST_ASSESSMENT_SUCCESS, SET_SUBMIT_TEST_ASSESSMENT_ERROR,
    SET_SUBMIT_TEST_ASSESSMENT_RESET, SET_SAVE_FEEDBACK_DETAILS_BEGIN,
    SET_SAVE_FEEDBACK_DETAILS_SUCCESS, SET_SAVE_FEEDBACK_DETAILS_ERROR, SET_SAVE_FEEDBACK_DETAILS_RESET,
    SET_GET_FEEDBACK_DETAILS_BEGIN, SET_GET_FEEDBACK_DETAILS_SUCCESS, SET_GET_FEEDBACK_DETAILS_ERROR,
    SET_GET_FEEDBACK_DETAILS_RESET, DELETE_FEEDBACK_BEGIN, DELETE_FEEDBACK_SUCCESS, DELETE_FEEDBACK_ERROR,
    DELETE_FEEDBACK_RESET, GET_FEEDBACK_BY_ID_BEGIN, GET_FEEDBACK_BY_ID_SUCCESS, GET_FEEDBACK_BY_ID_ERROR,
    GET_FEEDBACK_BY_ID_RESET, UPDATE_FEEDBACK_DETAILS_BEGIN, UPDATE_FEEDBACK_DETAILS_SUCCESS, UPDATE_FEEDBACK_DETAILS_ERROR,
    UPDATE_FEEDBACK_DETAILS_RESET
} from '../../constants/activities';

export function getActivities(token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        dispatch({ type: GET_ACTIVITIES_BEGIN, payload: {} });
        await axios.get(`${API_URL}/private/activities`).
            then(response => dispatch({ type: GET_ACTIVITIES_SUCCESS, payload: response.data })).
            catch(error => dispatch({ type: GET_ACTIVITIES_ERROR, payload: error.response.data }));
    }
}

export function getActivity(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: GET_ACTIVITY_BEGIN, payload: {} });
            await axios.get(`${API_URL}/private/activities/${id}/item`).
                then(response => dispatch({ type: GET_ACTIVITY_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: GET_ACTIVITY_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: GET_ACTIVITY_RESET, payload: {} });
        }
    }
}

export function activityUploadFile(token, formData = new FormData()) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (formData.get('file') !== null) {
            dispatch({ type: UPLOAD_FILE_BEGIN, payload: {} });
            await axios.post(`${API_URL}/private/file_uploads/single`, formData).
                then(response => dispatch({ type: UPLOAD_FILE_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: UPLOAD_FILE_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: UPLOAD_FILE_RESET, payload: {} });
        }
    }
}

export function setActivities(token, data = {}) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (Object.keys(data).length > 0) {
            dispatch({ type: SET_ACTIVITY_BEGIN, payload: {} });
            await axios.post(`${API_URL}/private/activities/new`, data).
                then(response => dispatch({ type: SET_ACTIVITY_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: SET_ACTIVITY_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: SET_ACTIVITY_RESET, payload: {} });
        }

    }
}

export function updateActivity(token, id, data = {}) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (Object.keys(data).length > 0) {
            dispatch({ type: UPDATE_ACTIVITY_BEGIN, payload: {} });
            await axios.patch(`${API_URL}/private/activities/${id}/edit`, data).
                then(response => dispatch({ type: UPDATE_ACTIVITY_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: UPDATE_ACTIVITY_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: UPDATE_ACTIVITY_RESET, payload: {} });
        }
    }
}

export function deleteActivity(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: DELETE_ACTIVITY_BEGIN, payload: {} });
            await axios.delete(`${API_URL}/private/activities/${id}/delete`).
                then(response => dispatch({ type: DELETE_ACTIVITY_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: DELETE_ACTIVITY_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: DELETE_ACTIVITY_RESET, payload: {} });
        }
    }
}

export function saveAssessmentDetails(token, data = {}, activityId) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (Object.keys(data).length > 0) {
            dispatch({ type: SET_SAVE_ASSESSMENT_DETAILS_BEGIN, payload: {} });
            await axios.post(`${API_URL}/private/activities/${activityId}/add_question`, data).
                then(response => dispatch({ type: SET_SAVE_ASSESSMENT_DETAILS_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: SET_SAVE_ASSESSMENT_DETAILS_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: SET_SAVE_ASSESSMENT_DETAILS_RESET, payload: {} });
        }

    }
}

export function getAssessmentDetails(token, activityId) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (activityId > 0) {
            dispatch({ type: SET_GET_ASSESSMENT_DETAILS_BEGIN, payload: {} });
            await axios.get(`${API_URL}/private/activities/${activityId}/get_questions`).
                then(response => dispatch({ type: SET_GET_ASSESSMENT_DETAILS_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: SET_GET_ASSESSMENT_DETAILS_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: SET_GET_ASSESSMENT_DETAILS_RESET, payload: {} });
        }
    }
}

export function deleteAssessment(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: DELETE_ASSESSMENT_BEGIN, payload: {} });
            await axios.delete(`${API_URL}/private/activities/delete_question/${id}`).
                then(response => dispatch({ type: DELETE_ASSESSMENT_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: DELETE_ASSESSMENT_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: DELETE_ASSESSMENT_RESET, payload: {} });
        }
    }
}

export function getAssessmentById(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: GET_ASSESSMENT_BY_ID_BEGIN, payload: {} });
            await axios.get(`${API_URL}/private/activities/get_question/${id}`).
                then(response => dispatch({ type: GET_ASSESSMENT_BY_ID_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: GET_ASSESSMENT_BY_ID_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: GET_ASSESSMENT_BY_ID_RESET, payload: {} });
        }
    }
}


export function updateAssessmentDetails(token, id, data = {}) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (Object.keys(data).length > 0) {
            dispatch({ type: UPDATE_ASSESSMENT_DETAILS_BEGIN, payload: {} });
            await axios.patch(`${API_URL}/private/activities/edit_question/${id}`, data).
                then(response => dispatch({ type: UPDATE_ASSESSMENT_DETAILS_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: UPDATE_ASSESSMENT_DETAILS_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: UPDATE_ASSESSMENT_DETAILS_RESET, payload: {} });
        }
    }
}

export function getTestActivity(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: GET_TEST_ACTIVITY_BEGIN, payload: {} });
            await axios.get(`${API_URL}/private/tests/activity_test/${id}`).
                then(response => dispatch({ type: GET_TEST_ACTIVITY_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: GET_TEST_ACTIVITY_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: GET_TEST_ACTIVITY_RESET, payload: {} });
        }
    }
}

export function submitTestQuestion(token, data = {}) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (Object.keys(data).length > 0) {
            dispatch({ type: SET_SUBMIT_TEST_ASSESSMENT_BEGIN, payload: {} });
            await axios.post(`${API_URL}/private/tests/activity_test_result`, data).
                then(response => dispatch({ type: SET_SUBMIT_TEST_ASSESSMENT_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: SET_SUBMIT_TEST_ASSESSMENT_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: SET_SUBMIT_TEST_ASSESSMENT_RESET, payload: {} });
        }

    }
}

export function saveFeedbackDetails(token, data = {}, activityId) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (Object.keys(data).length > 0) {
            dispatch({ type: SET_SAVE_FEEDBACK_DETAILS_BEGIN, payload: {} });
            await axios.post(`${API_URL}/private/courses/add_feedback_question`, data).
                then(response => dispatch({ type: SET_SAVE_FEEDBACK_DETAILS_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: SET_SAVE_FEEDBACK_DETAILS_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: SET_SAVE_FEEDBACK_DETAILS_RESET, payload: {} });
        }

    }
}

export function getFeedbackDetails(token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        dispatch({ type: SET_GET_FEEDBACK_DETAILS_BEGIN, payload: {} });
        await axios.get(`${API_URL}/private/courses/feedback_template`).
            then(response => dispatch({ type: SET_GET_FEEDBACK_DETAILS_SUCCESS, payload: response.data })).
            catch(error => dispatch({ type: SET_GET_FEEDBACK_DETAILS_ERROR, payload: error.response.data }));
    }
}

export function deleteFeedback(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: DELETE_FEEDBACK_BEGIN, payload: {} });
            await axios.delete(`${API_URL}/private/courses/delete_feedback_question/${id}`).
                then(response => dispatch({ type: DELETE_FEEDBACK_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: DELETE_FEEDBACK_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: DELETE_FEEDBACK_RESET, payload: {} });
        }
    }
}

export function getFeedbackById(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: GET_FEEDBACK_BY_ID_BEGIN, payload: {} });
            await axios.get(`${API_URL}/private/courses/get_feedback_question/${id}`).
                then(response => dispatch({ type: GET_FEEDBACK_BY_ID_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: GET_FEEDBACK_BY_ID_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: GET_FEEDBACK_BY_ID_RESET, payload: {} });
        }
    }
}

export function updateFeedbackDetails(token, id, data = {}) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (Object.keys(data).length > 0) {
            dispatch({ type: UPDATE_FEEDBACK_DETAILS_BEGIN, payload: {} });
            await axios.patch(`${API_URL}/private/courses/edit_feedback_question/${id}`, data).
                then(response => dispatch({ type: UPDATE_FEEDBACK_DETAILS_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: UPDATE_FEEDBACK_DETAILS_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: UPDATE_FEEDBACK_DETAILS_RESET, payload: {} });
        }
    }
}
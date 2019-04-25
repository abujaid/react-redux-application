import axios from 'axios';

import { API_URL } from './../../constants';
import {
    GET_COURSES_BEGIN, GET_COURSES_SUCCESS, GET_COURSES_ERROR,
    GET_COURSE_BEGIN, GET_COURSE_SUCCESS, GET_COURSE_ERROR, GET_COURSE_RESET,
    SET_COURSE_BEGIN, SET_COURSE_SUCCESS, SET_COURSE_ERROR, SET_COURSE_RESET,
    UPDATE_COURSE_BEGIN, UPDATE_COURSE_SUCCESS, UPDATE_COURSE_ERROR, UPDATE_COURSE_RESET,
    DELETE_COURSE_BEGIN, DELETE_COURSE_SUCCESS, DELETE_COURSE_ERROR, DELETE_COURSE_RESET,
    GET_COURSES_BY_USER_BEGIN, GET_COURSES_BY_USER_SUCCESS, GET_COURSES_BY_USER_ERROR, GET_COURSES_BY_USER_RESET,
    GET_USER_COURSES_DETAILS_BEGIN, GET_USER_COURSES_DETAILS_SUCCESS, GET_USER_COURSES_DETAILS_ERROR,
    UPDATE_ACTIVITY_PROGRESS_BEGIN, UPDATE_ACTIVITY_PROGRESS_SUCCESS, UPDATE_ACTIVITY_PROGRESS_ERROR,
    UPDATE_ACTIVITY_PROGRESS_RESET, GET_USER_COURSES_DETAILS_RESET, GET_FEEDBACK_BEGIN, GET_FEEDBACK_SUCCESS,
    GET_FEEDBACK_ERROR, GET_FEEDBACK_RESET, SAVE_USER_FEEDBACK_BEGIN, SAVE_USER_FEEDBACK_SUCCESS, SAVE_USER_FEEDBACK_ERROR,
    SAVE_USER_FEEDBACK_RESET, GET_USER_COURSE_FEEDBACK_DETAILS_BEGIN, GET_USER_COURSE_FEEDBACK_DETAILS_SUCCESS,
    GET_USER_COURSE_FEEDBACK_DETAILS_ERROR, GET_USER_COURSE_FEEDBACK_DETAILS_RESET
} from '../../constants/courses';

export function getCourses(token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        dispatch({ type: GET_COURSES_BEGIN, payload: {} });
        await axios.get(`${API_URL}/private/courses`).
            then(response => dispatch({ type: GET_COURSES_SUCCESS, payload: response.data })).
            catch(error => dispatch({ type: GET_COURSES_ERROR, payload: error.response.data }));
    }
}

export function getCourse(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: GET_COURSE_BEGIN, payload: {} });
            await axios.get(`${API_URL}/private/courses/${id}/item`).
                then(response => dispatch({ type: GET_COURSE_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: GET_COURSE_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: GET_COURSE_RESET, payload: {} });
        }
    }
}

export function setCourses(token, data = {}) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (Object.keys(data).length > 0) {
            dispatch({ type: SET_COURSE_BEGIN, payload: {} });
            await axios.post(`${API_URL}/private/courses/new`, data).
                then(response => dispatch({ type: SET_COURSE_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: SET_COURSE_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: SET_COURSE_RESET, payload: {} });
        }
    }
}

export function updateCourse(token, id, data = {}) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (Object.keys(data).length > 0) {
            dispatch({ type: UPDATE_COURSE_BEGIN, payload: {} });
            await axios.patch(`${API_URL}/private/courses/${id}/edit`, data).
                then(response => dispatch({ type: UPDATE_COURSE_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: UPDATE_COURSE_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: UPDATE_COURSE_RESET, payload: {} });
        }
    }
}

export function deleteCourse(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: DELETE_COURSE_BEGIN, payload: {} });
            await axios.delete(`${API_URL}/private/courses/${id}/delete`).
                then(response => dispatch({ type: DELETE_COURSE_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: DELETE_COURSE_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: DELETE_COURSE_RESET, payload: {} });
        }
    }
}

export function getCoursesByUser(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: GET_COURSES_BY_USER_BEGIN, payload: {} });
            await axios.get(`${API_URL}/private/users/${id}/courses_details`).
                then(response => dispatch({ type: GET_COURSES_BY_USER_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: GET_COURSES_BY_USER_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: GET_COURSES_BY_USER_RESET, payload: {} });
        }
    }
}

export function getUserCoursesDetails(token, id, courseId = null) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        dispatch({ type: GET_USER_COURSES_DETAILS_BEGIN, payload: {} });
        if (id > 0 && courseId > 0) {
            await axios.get(`${API_URL}/private/users/${id}/courses_details/${courseId}`).
                then(response => dispatch({ type: GET_USER_COURSES_DETAILS_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: GET_USER_COURSES_DETAILS_ERROR, payload: error.response.data }));
        } else if (id > 0 && courseId == null) {
            await axios.get(`${API_URL}/private/users/${id}/courses_details`).
                then(response => dispatch({ type: GET_USER_COURSES_DETAILS_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: GET_USER_COURSES_DETAILS_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: GET_USER_COURSES_DETAILS_RESET, payload: {} });
        }

    }
}

export function updateActivityProgress(token, id, courseId, data = {}) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (Object.keys(data).length > 0) {
            dispatch({ type: UPDATE_ACTIVITY_PROGRESS_BEGIN, payload: {} });
            await axios.put(`${API_URL}/private/users/${id}/change_course_progress/${courseId}`, data).
                then(response => dispatch({ type: UPDATE_ACTIVITY_PROGRESS_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: UPDATE_ACTIVITY_PROGRESS_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: UPDATE_ACTIVITY_PROGRESS_RESET, payload: {} });
        }
    }
}

export function getFeedbackQuestion(token, data = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (data == 'reset') {
            dispatch({ type: GET_FEEDBACK_BEGIN, payload: {} });
        } else {
            dispatch({ type: GET_FEEDBACK_BEGIN, payload: {} });
            await axios.get(`${API_URL}/private/courses/feedback_template`).
                then(response => dispatch({ type: GET_FEEDBACK_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: GET_FEEDBACK_ERROR, payload: error.response.data }));
        }
    }
}

export function saveUserComment(token, courseId, userId, data = {}) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (Object.keys(data).length > 0 && courseId > 0 && userId > 0) {
            dispatch({ type: SAVE_USER_FEEDBACK_BEGIN, payload: {} });
            await axios.put(`${API_URL}/private/courses/${courseId}/edit_feedback/${userId}`, data).
                then(response => dispatch({ type: SAVE_USER_FEEDBACK_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: SAVE_USER_FEEDBACK_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: SAVE_USER_FEEDBACK_RESET, payload: {} });
        }
    }
}

export function getUserCourseFeedbackDetails(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: GET_USER_COURSE_FEEDBACK_DETAILS_BEGIN, payload: {} });
            await axios.get(`${API_URL}/private/courses/${id}/feedbacks`).
                then(response => dispatch({ type: GET_USER_COURSE_FEEDBACK_DETAILS_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: GET_USER_COURSE_FEEDBACK_DETAILS_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: GET_USER_COURSE_FEEDBACK_DETAILS_RESET, payload: {} });
        }
    }
}
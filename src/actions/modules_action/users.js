import axios from "axios";

import { API_URL } from "./../../constants";
import {
  GET_USERS_BEGIN, GET_USERS_SUCCESS, GET_USERS_ERROR,
  GET_USER_BEGIN, GET_USER_SUCCESS, GET_USER_ERROR, GET_USER_RESET,
  SET_USER_BEGIN, SET_USER_SUCCESS, SET_USER_ERROR, SET_USER_RESET,
  UPDATE_USER_BEGIN, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, UPDATE_USER_RESET,
  UPDATE_USER_ADMIN_BEGIN, UPDATE_USER_ADMIN_SUCCESS, UPDATE_USER_ADMIN_ERROR, UPDATE_USER_ADMIN_RESET,
  GET_USERS_BY_COURSES_BEGIN, GET_USERS_BY_COURSES_SUCCESS, GET_USERS_BY_COURSES_ERROR,
  GET_USERS_BY_TRAININGS_BEGIN, GET_USERS_BY_TRAININGS_SUCCESS, GET_USERS_BY_TRAININGS_ERROR,
  UPDATE_USER_BY_TRAINING_BEGIN, UPDATE_USER_BY_TRAINING_SUCCESS, UPDATE_USER_BY_TRAINING_ERROR, UPDATE_USER_BY_TRAINING_RESET,
  DELETE_USER_BEGIN, DELETE_USER_SUCCESS, DELETE_USER_ERROR, DELETE_USER_RESET, GET_USERS_BY_TRAININGS_RESET
} from "../../constants/users";

export function getUsers(token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return async dispatch => {
    dispatch({ type: GET_USERS_BEGIN, payload: {} });
    await axios
      .get(`${API_URL}/private/users`)
      .then(response =>
        dispatch({ type: GET_USERS_SUCCESS, payload: response.data })
      )
      .catch(error =>
        dispatch({ type: GET_USERS_ERROR, payload: error.response.data })
      );
  };
}

export function getUser(token, id = '') {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  return async dispatch => {
    if (id !== '') {
      dispatch({ type: GET_USER_BEGIN, payload: {} });
      await axios.get(`${API_URL}/private/users/${id}/item`).
        then(response => dispatch({ type: GET_USER_SUCCESS, payload: response.data })).
        catch(error => dispatch({ type: GET_USER_ERROR, payload: error.response.data }));
    } else {
      dispatch({ type: GET_USER_RESET, payload: {} });
    }
  }
}

export function setUsers(token, data = {}) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  return async dispatch => {
    if (Object.keys(data).length > 0) {
      dispatch({ type: SET_USER_BEGIN, payload: {} });
      await axios.post(`${API_URL}/private/users/new`, data).
        then(response => dispatch({ type: SET_USER_SUCCESS, payload: response.data })).
        catch(error => dispatch({ type: SET_USER_ERROR, payload: error.response.data }));
    } else {
      dispatch({ type: SET_USER_RESET, payload: {} });
    }
  }
}

export function updateUser(token, id, data = {}) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return async dispatch => {
    if (Object.keys(data).length > 0) {
      dispatch({ type: UPDATE_USER_BEGIN, payload: {} });
      await axios
        .patch(`${API_URL}/private/users/${id}/edit`, data)
        .then(response => {
          let fs_user_data = { ...response.data, token: token };
          localStorage.setItem("fs_user_data", JSON.stringify(fs_user_data));
          dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
        })
        .catch(error =>
          dispatch({ type: UPDATE_USER_ERROR, payload: error.response.data })
        );
    } else {
      dispatch({ type: UPDATE_USER_RESET, payload: {} });
    }
  };
}

export function updateUserAdmin(token, id, data = {}) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  return async dispatch => {
    if (Object.keys(data).length > 0) {
      dispatch({ type: UPDATE_USER_ADMIN_BEGIN, payload: {} });
      await axios.patch(`${API_URL}/private/users/${id}/edit`, data).
        then(response => dispatch({ type: UPDATE_USER_ADMIN_SUCCESS, payload: response.data })).
        catch(error => dispatch({ type: UPDATE_USER_ADMIN_ERROR, payload: error.response.data }));
    } else {
      dispatch({ type: UPDATE_USER_ADMIN_RESET, payload: {} });
    }
  }
}

export function deleteUser(token, id = '') {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  return async dispatch => {
    if (id !== '') {
      dispatch({ type: DELETE_USER_BEGIN, payload: {} });
      await axios.delete(`${API_URL}/private/users/${id}/delete`).
        then(response => dispatch({ type: DELETE_USER_SUCCESS, payload: response.data })).
        catch(error => dispatch({ type: DELETE_USER_ERROR, payload: error.response.data }));
    } else {
      dispatch({ type: DELETE_USER_RESET, payload: {} });
    }
  };
}

export function getUsersByCourses(token, id) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return async dispatch => {
    dispatch({ type: GET_USERS_BY_COURSES_BEGIN, payload: {} });
    await axios
      .get(`${API_URL}/private/courses/${id}/course_users`)
      .then(response =>
        dispatch({ type: GET_USERS_BY_COURSES_SUCCESS, payload: response.data })
      )
      .catch(error =>
        dispatch({ type: GET_USERS_BY_COURSES_ERROR, payload: error.response.data })
      );
  };
}

export function getUsersByTrainings(token, id) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return async dispatch => {
    if (id !== '' || id == undefined) {
      dispatch({ type: GET_USERS_BY_TRAININGS_BEGIN, payload: {} });
      await axios
        .get(`${API_URL}/private/trainings/${id}/training_user`)
        .then(response =>
          dispatch({ type: GET_USERS_BY_TRAININGS_SUCCESS, payload: response.data })
        )
        .catch(error =>
          dispatch({ type: GET_USERS_BY_TRAININGS_ERROR, payload: error.response.data })
        );
    } else {
      dispatch({ type: GET_USERS_BY_TRAININGS_RESET, payload: {} });
    }
  };
}

export function updateUsersByTrainings(token, tId, id, data = {}) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  return async dispatch => {
    if (data != '') {
      dispatch({ type: UPDATE_USER_BY_TRAINING_BEGIN, payload: {} });
      await axios.patch(`${API_URL}/private/trainings/${tId}/edit/${id}`, data).
        then(response => dispatch({ type: UPDATE_USER_BY_TRAINING_SUCCESS, payload: response.data })).
        catch(error => dispatch({ type: UPDATE_USER_BY_TRAINING_ERROR, payload: error.response.data }));
    } else {
      dispatch({ type: UPDATE_USER_BY_TRAINING_RESET, payload: {} });
    }
  }
}










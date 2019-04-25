import axios from "axios";

import { API_URL } from "./../../constants";
import {
  VALIDATE_BEGIN
} from "../../constants/profile";
import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_RESET
} from "../../constants/login";

export function login(formData = {}) {
  return async dispatch => {
    if (Object.keys(formData).length > 0) {
      dispatch({ type: VALIDATE_BEGIN, payload: {} });
      dispatch({ type: LOGIN_BEGIN, payload: {} });
      await axios
        .post(`${API_URL}/public/users/login`, formData)
        .then(response => {
          localStorage.setItem("fs_user_data", JSON.stringify(response.data));
          dispatch({ type: LOGIN_SUCCESS, payload: response.data });
        })
        .catch(error =>
          dispatch({ type: LOGIN_ERROR, payload: error.response.data })
        );
    } else {
      dispatch({ type: LOGIN_RESET, payload: {} });
    }
  };
}

export function loginGoogle(tokenId = {}) {
  return async dispatch => {
    if (Object.keys(tokenId).length > 0) {
      dispatch({ type: LOGIN_BEGIN, payload: {} });
      await axios
        .post(`${API_URL}/public/users/login-google`, tokenId)
        .then(response => {
          localStorage.setItem("fs_user_data", JSON.stringify(response.data));
          dispatch({ type: LOGIN_SUCCESS, payload: response.data });
        })
        .catch(error =>
          dispatch({ type: LOGIN_ERROR, payload: error.response.data })
        );
    } else {
      dispatch({ type: LOGIN_RESET, payload: {} });
    }
  };
}

export function loginFacebook(accessToken = {}) {
  return async dispatch => {
    if (Object.keys(accessToken).length > 0) {
      dispatch({ type: LOGIN_BEGIN, payload: {} });
      await axios
        .post(`${API_URL}/public/users/login-facebook`, accessToken)
        .then(response => {
          localStorage.setItem("fs_user_data", JSON.stringify(response.data));
          dispatch({ type: LOGIN_SUCCESS, payload: response.data });
        })
        .catch(error => {
          dispatch({ type: LOGIN_ERROR, payload: error.response.data });
        });
    } else {
      dispatch({ type: LOGIN_RESET, payload: {} });
    }
  };
}

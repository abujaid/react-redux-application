import axios from "axios";

import { API_URL } from "./../../constants";
import {
  VALIDATE_BEGIN,
  VALIDATE_SUCCESS,
  VALIDATE_ERROR
} from "../../constants/profile";

export function validateToken(token) {
  return async dispatch => {
    dispatch({ type: VALIDATE_BEGIN, payload: {} });
    if (localStorage.getItem("fs_user_data") !== null) {
      let user_data = JSON.parse(localStorage.getItem("fs_user_data"));
      if (user_data.token === token.token) {
        await axios
          .post(`${API_URL}/public/users/validate-token`, token)
          .then(response =>
            dispatch({ type: VALIDATE_SUCCESS, payload: response.data })
          )
          .catch(error =>
            dispatch({ type: VALIDATE_ERROR, payload: error.response.data })
          );
      } else {
        dispatch({
          type: VALIDATE_ERROR,
          payload: { status: false, isvalid: false, err: "Invalid Token" }
        });
      }
    } else {
      dispatch({
        type: VALIDATE_ERROR,
        payload: { status: false, isvalid: false, err: "Invalid Token" }
      });
    }
  };
}

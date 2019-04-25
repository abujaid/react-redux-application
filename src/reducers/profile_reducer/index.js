import {
  VALIDATE_BEGIN,
  VALIDATE_SUCCESS,
  VALIDATE_ERROR
} from "../../constants/profile";

export function ValidateTokenReducer(state = {}, action) {
  switch (action.type) {
    case VALIDATE_BEGIN:

    case VALIDATE_SUCCESS:

    case VALIDATE_ERROR:
      return Object.assign({}, action.payload);

    default:
      return Object.assign({}, state);
  }
}

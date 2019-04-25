import
{
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_RESET
} from "../../constants/login";

export function LoginReducer (state = {}, action)
{
  switch (action.type) {
    case LOGIN_BEGIN:

    case LOGIN_SUCCESS:

    case LOGIN_ERROR:

    case LOGIN_RESET:
      return Object.assign({}, action.payload);

    default:
      return Object.assign({}, state);
  }
}

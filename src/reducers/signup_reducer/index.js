import { SIGNUP_BEGIN, SIGNUP_SUCCESS, SIGNUP_ERROR, SIGNUP_RESET } from "../../constants/signup";

export function SignupReducer (state = {}, action)
{
    switch (action.type) {
        case SIGNUP_BEGIN:

        case SIGNUP_SUCCESS:

        case SIGNUP_ERROR:

        case SIGNUP_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}
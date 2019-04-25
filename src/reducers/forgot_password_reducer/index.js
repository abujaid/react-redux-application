import { FORGOT_PASSWORD_BEGIN, FORGOT_PASSWORD_REQUESTING, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_ERROR, FORGOT_PASSWORD_RESET } from "../../constants/forgot_password";

export function ForgotPasswordReducer(state = {}, action) {
    switch(action.type) {
        case FORGOT_PASSWORD_BEGIN:
        
        case FORGOT_PASSWORD_SUCCESS:
        
        case FORGOT_PASSWORD_ERROR:
        
        case FORGOT_PASSWORD_RESET:
            
        case FORGOT_PASSWORD_REQUESTING:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}
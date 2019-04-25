import { VALIDATE_RESET_TOKEN_BEGIN, VALIDATE_RESET_TOKEN_SUCCESS, VALIDATE_RESET_TOKEN_ERROR, VALIDATE_RESET_TOKEN_RESET,
    RESET_PASSWORD_BEGIN, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR, RESET_PASSWORD_RESET } from '../../constants/reset_password';

export function validateResetTokenReducer(state = {}, action) {
    switch(action.type) {
        case VALIDATE_RESET_TOKEN_BEGIN:

        case VALIDATE_RESET_TOKEN_SUCCESS:

        case VALIDATE_RESET_TOKEN_ERROR:

        case VALIDATE_RESET_TOKEN_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function resetPasswordToken(state = {}, action) {
    switch(action.type) {
        case RESET_PASSWORD_BEGIN:

        case RESET_PASSWORD_SUCCESS:

        case RESET_PASSWORD_ERROR: 

        case RESET_PASSWORD_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}
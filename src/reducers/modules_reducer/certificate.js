import { GET_CERTIFICATE_BEGIN, GET_CERTIFICATE_SUCCESS, GET_CERTIFICATE_ERROR, GET_CERTIFICATE_RESET, 
    Edit_CERTIFICATE_BEGIN, Edit_CERTIFICATE_SUCCESS, Edit_CERTIFICATE_ERROR, 
    Edit_CERTIFICATE_RESET, GET_CERTIFICATE_BY_ID_BEGIN, GET_CERTIFICATE_BY_ID_SUCCESS, 
    GET_CERTIFICATE_BY_ID_ERROR, GET_CERTIFICATE_BY_ID_RESET,GET_CERTIFICATE_TEMPLATES_BEGIN, 
    GET_CERTIFICATE_TEMPLATES_SUCCESS, GET_CERTIFICATE_TEMPLATES_ERROR, GET_CERTIFICATE_TEMPLATES_RESET } from '../../constants/certificate';

export function getCertificateReducer(state = {}, action) {
    switch(action.type) {
        case GET_CERTIFICATE_BEGIN:

        case GET_CERTIFICATE_SUCCESS:

        case GET_CERTIFICATE_ERROR:

        case GET_CERTIFICATE_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function editCertificateReducer(state = {}, action) {
    switch(action.type) {
        case Edit_CERTIFICATE_BEGIN:

        case Edit_CERTIFICATE_SUCCESS:

        case Edit_CERTIFICATE_ERROR:

        case Edit_CERTIFICATE_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function getCertificateByIdReducer(state = {}, action) {
    switch(action.type) {
        case GET_CERTIFICATE_BY_ID_BEGIN:

        case GET_CERTIFICATE_BY_ID_SUCCESS:

        case GET_CERTIFICATE_BY_ID_ERROR:

        case GET_CERTIFICATE_BY_ID_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function getCertificateTemplateReducer(state = {}, action) {
    switch(action.type) {
        case GET_CERTIFICATE_TEMPLATES_BEGIN:

        case GET_CERTIFICATE_TEMPLATES_SUCCESS:

        case GET_CERTIFICATE_TEMPLATES_ERROR:

        case GET_CERTIFICATE_TEMPLATES_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}
import { GET_ACTIVITIES_BEGIN, GET_ACTIVITIES_SUCCESS, GET_ACTIVITIES_ERROR,
    GET_ACTIVITY_BEGIN, GET_ACTIVITY_SUCCESS, GET_ACTIVITY_ERROR, GET_ACTIVITY_RESET,
    UPLOAD_FILE_BEGIN, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_ERROR, UPLOAD_FILE_RESET,
    SET_ACTIVITY_BEGIN, SET_ACTIVITY_SUCCESS, SET_ACTIVITY_ERROR, SET_ACTIVITY_RESET,
    UPDATE_ACTIVITY_BEGIN, UPDATE_ACTIVITY_SUCCESS, UPDATE_ACTIVITY_ERROR, UPDATE_ACTIVITY_RESET,
    DELETE_ACTIVITY_BEGIN, DELETE_ACTIVITY_SUCCESS, DELETE_ACTIVITY_ERROR, DELETE_ACTIVITY_RESET, 
    SET_SAVE_ASSESSMENT_DETAILS_BEGIN, SET_SAVE_ASSESSMENT_DETAILS_SUCCESS, SET_SAVE_ASSESSMENT_DETAILS_ERROR, 
    SET_SAVE_ASSESSMENT_DETAILS_RESET, SET_GET_ASSESSMENT_DETAILS_BEGIN, SET_GET_ASSESSMENT_DETAILS_SUCCESS, 
    SET_GET_ASSESSMENT_DETAILS_ERROR, SET_GET_ASSESSMENT_DETAILS_RESET, DELETE_ASSESSMENT_BEGIN, 
    DELETE_ASSESSMENT_SUCCESS, DELETE_ASSESSMENT_ERROR, DELETE_ASSESSMENT_RESET, GET_ASSESSMENT_BY_ID_BEGIN, 
    GET_ASSESSMENT_BY_ID_SUCCESS, GET_ASSESSMENT_BY_ID_ERROR, GET_ASSESSMENT_BY_ID_RESET, 
    UPDATE_ASSESSMENT_DETAILS_BEGIN, UPDATE_ASSESSMENT_DETAILS_SUCCESS, UPDATE_ASSESSMENT_DETAILS_ERROR, 
    UPDATE_ASSESSMENT_DETAILS_RESET, GET_TEST_ACTIVITY_BEGIN, GET_TEST_ACTIVITY_SUCCESS, 
    GET_TEST_ACTIVITY_ERROR, GET_TEST_ACTIVITY_RESET, SET_SUBMIT_TEST_ASSESSMENT_BEGIN, 
    SET_SUBMIT_TEST_ASSESSMENT_SUCCESS, SET_SUBMIT_TEST_ASSESSMENT_ERROR, 
    SET_SUBMIT_TEST_ASSESSMENT_RESET, SET_SAVE_FEEDBACK_DETAILS_BEGIN, SET_SAVE_FEEDBACK_DETAILS_SUCCESS, 
    SET_SAVE_FEEDBACK_DETAILS_ERROR, SET_SAVE_FEEDBACK_DETAILS_RESET, SET_GET_FEEDBACK_DETAILS_BEGIN, 
    SET_GET_FEEDBACK_DETAILS_SUCCESS, SET_GET_FEEDBACK_DETAILS_ERROR, SET_GET_FEEDBACK_DETAILS_RESET, 
    DELETE_FEEDBACK_BEGIN, DELETE_FEEDBACK_SUCCESS, DELETE_FEEDBACK_ERROR, DELETE_FEEDBACK_RESET, 
    GET_FEEDBACK_BY_ID_BEGIN, GET_FEEDBACK_BY_ID_SUCCESS, GET_FEEDBACK_BY_ID_ERROR, GET_FEEDBACK_BY_ID_RESET, 
    UPDATE_FEEDBACK_DETAILS_BEGIN, UPDATE_FEEDBACK_DETAILS_SUCCESS, UPDATE_FEEDBACK_DETAILS_ERROR, UPDATE_FEEDBACK_DETAILS_RESET } from '../../constants/activities';

export function getActivitiesReducer(state = {}, action) {
    switch(action.type) {
        case GET_ACTIVITIES_BEGIN:

        case GET_ACTIVITIES_SUCCESS:

        case GET_ACTIVITIES_ERROR:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function getActivityReducer(state = {}, action) {
    switch(action.type) {
        case GET_ACTIVITY_BEGIN:

        case GET_ACTIVITY_SUCCESS:

        case GET_ACTIVITY_ERROR:

        case GET_ACTIVITY_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function activityUploadFileReducer(state = {}, action) {
    switch(action.type) {
        case UPLOAD_FILE_BEGIN:

        case UPLOAD_FILE_SUCCESS:

        case UPLOAD_FILE_ERROR:

        case UPLOAD_FILE_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function setActivitiesReducer(state = {}, action) {
    switch(action.type) {
        case SET_ACTIVITY_BEGIN:

        case SET_ACTIVITY_SUCCESS:

        case SET_ACTIVITY_ERROR:
        
        case SET_ACTIVITY_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function updateActivityReducer(state = {}, action) {
    switch(action.type) {
        case UPDATE_ACTIVITY_BEGIN:

        case UPDATE_ACTIVITY_SUCCESS:

        case UPDATE_ACTIVITY_ERROR:

        case UPDATE_ACTIVITY_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function deleteActivityReducer(state = {}, action) {
    switch(action.type) {
        case DELETE_ACTIVITY_BEGIN:

        case DELETE_ACTIVITY_SUCCESS:

        case DELETE_ACTIVITY_ERROR:

        case DELETE_ACTIVITY_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function saveAssessmentDetailsReducer(state = {}, action) {
    switch(action.type) {
        case SET_SAVE_ASSESSMENT_DETAILS_BEGIN:

        case SET_SAVE_ASSESSMENT_DETAILS_SUCCESS:

        case SET_SAVE_ASSESSMENT_DETAILS_ERROR:

        case SET_SAVE_ASSESSMENT_DETAILS_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function getAssessmentDetailsReducer(state = {}, action) {
    switch(action.type) {
        case SET_GET_ASSESSMENT_DETAILS_BEGIN:

        case SET_GET_ASSESSMENT_DETAILS_SUCCESS:

        case SET_GET_ASSESSMENT_DETAILS_ERROR:

        case SET_GET_ASSESSMENT_DETAILS_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function deleteAssessmentReducer(state = {}, action) {
    switch(action.type) {
        case DELETE_ASSESSMENT_BEGIN:

        case DELETE_ASSESSMENT_SUCCESS:

        case DELETE_ASSESSMENT_ERROR:

        case DELETE_ASSESSMENT_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function getAssessmentByIdReducer(state = {}, action) {
    switch(action.type) {
        case GET_ASSESSMENT_BY_ID_BEGIN:

        case GET_ASSESSMENT_BY_ID_SUCCESS:

        case GET_ASSESSMENT_BY_ID_ERROR:

        case GET_ASSESSMENT_BY_ID_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function updateAssessmentDetailsReducer(state = {}, action) {
    switch(action.type) {
        case UPDATE_ASSESSMENT_DETAILS_BEGIN:

        case UPDATE_ASSESSMENT_DETAILS_SUCCESS:

        case UPDATE_ASSESSMENT_DETAILS_ERROR:

        case UPDATE_ASSESSMENT_DETAILS_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function getTestActivityReducer(state = {}, action) {
    switch(action.type) {
        case GET_TEST_ACTIVITY_BEGIN:

        case GET_TEST_ACTIVITY_SUCCESS:

        case GET_TEST_ACTIVITY_ERROR:

        case GET_TEST_ACTIVITY_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function submitTestQuestionReducer(state = {}, action) {
    switch(action.type) {
        case SET_SUBMIT_TEST_ASSESSMENT_BEGIN:

        case SET_SUBMIT_TEST_ASSESSMENT_SUCCESS:

        case SET_SUBMIT_TEST_ASSESSMENT_ERROR:

        case SET_SUBMIT_TEST_ASSESSMENT_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function saveFeedbackDetailsReducer(state = {}, action) {
    switch(action.type) {
        case SET_SAVE_FEEDBACK_DETAILS_BEGIN:

        case SET_SAVE_FEEDBACK_DETAILS_SUCCESS:

        case SET_SAVE_FEEDBACK_DETAILS_ERROR:

        case SET_SAVE_FEEDBACK_DETAILS_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function getFeedbackDetailsReducer(state = {}, action) {
    switch(action.type) {
        case SET_GET_FEEDBACK_DETAILS_BEGIN:

        case SET_GET_FEEDBACK_DETAILS_SUCCESS:

        case SET_GET_FEEDBACK_DETAILS_ERROR:

        case SET_GET_FEEDBACK_DETAILS_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function deleteFeedbackReducer(state = {}, action) {
    switch(action.type) {
        case DELETE_FEEDBACK_BEGIN:

        case DELETE_FEEDBACK_SUCCESS:

        case DELETE_FEEDBACK_ERROR:

        case DELETE_FEEDBACK_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function getFeedbackByIdReducer(state = {}, action) {
    switch(action.type) {
        case GET_FEEDBACK_BY_ID_BEGIN:

        case GET_FEEDBACK_BY_ID_SUCCESS:

        case GET_FEEDBACK_BY_ID_ERROR:

        case GET_FEEDBACK_BY_ID_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function updateFeedbackDetailsReducer(state = {}, action) {
    switch(action.type) {
        case UPDATE_FEEDBACK_DETAILS_BEGIN:

        case UPDATE_FEEDBACK_DETAILS_SUCCESS:

        case UPDATE_FEEDBACK_DETAILS_ERROR:

        case UPDATE_FEEDBACK_DETAILS_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}
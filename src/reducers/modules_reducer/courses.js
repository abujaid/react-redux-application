import { GET_COURSES_BEGIN, GET_COURSES_SUCCESS, GET_COURSES_ERROR, 
  GET_COURSE_BEGIN, GET_COURSE_SUCCESS, GET_COURSE_ERROR, GET_COURSE_RESET, 
  SET_COURSE_BEGIN, SET_COURSE_SUCCESS, SET_COURSE_ERROR, SET_COURSE_RESET,
  UPDATE_COURSE_BEGIN, UPDATE_COURSE_SUCCESS, UPDATE_COURSE_ERROR, UPDATE_COURSE_RESET,
  DELETE_COURSE_BEGIN, DELETE_COURSE_SUCCESS, DELETE_COURSE_ERROR, DELETE_COURSE_RESET,
  GET_COURSES_BY_USER_BEGIN, GET_COURSES_BY_USER_SUCCESS, GET_COURSES_BY_USER_ERROR, GET_COURSES_BY_USER_RESET,
  GET_USER_COURSES_DETAILS_BEGIN, GET_USER_COURSES_DETAILS_SUCCESS, GET_USER_COURSES_DETAILS_ERROR, GET_USER_COURSES_DETAILS_RESET, 
  UPDATE_ACTIVITY_PROGRESS_BEGIN, UPDATE_ACTIVITY_PROGRESS_SUCCESS, UPDATE_ACTIVITY_PROGRESS_ERROR, UPDATE_ACTIVITY_PROGRESS_RESET, 
  GET_FEEDBACK_BEGIN, GET_FEEDBACK_SUCCESS, GET_FEEDBACK_ERROR, GET_FEEDBACK_RESET, SAVE_USER_FEEDBACK_BEGIN, SAVE_USER_FEEDBACK_SUCCESS, 
  SAVE_USER_FEEDBACK_ERROR, SAVE_USER_FEEDBACK_RESET, GET_USER_COURSE_FEEDBACK_DETAILS_BEGIN, GET_USER_COURSE_FEEDBACK_DETAILS_SUCCESS, 
  GET_USER_COURSE_FEEDBACK_DETAILS_ERROR, GET_USER_COURSE_FEEDBACK_DETAILS_RESET
} from "../../constants/courses";

export function getCoursesReducer(state = {}, action) {
  switch (action.type) {
    case GET_COURSES_BEGIN:

    case GET_COURSES_SUCCESS:

    case GET_COURSES_ERROR:
      return Object.assign({}, action.payload);

    default:
      return Object.assign({}, state);
  }
}

export function getCourseReducer(state = {}, action) {
  switch (action.type) {
    case GET_COURSE_BEGIN:

    case GET_COURSE_SUCCESS:

    case GET_COURSE_ERROR:

    case GET_COURSE_RESET:
      return Object.assign({}, action.payload);

    default:
      return Object.assign({}, state);
  }
}

export function setCoursesReducer(state = {}, action) {
  switch (action.type) {
    case SET_COURSE_BEGIN:

    case SET_COURSE_SUCCESS:

    case SET_COURSE_ERROR:

    case SET_COURSE_RESET:
      return Object.assign({}, action.payload);

    default:
      return Object.assign({}, state);
  }
}

export function updateCourseReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_COURSE_BEGIN:

    case UPDATE_COURSE_SUCCESS:

    case UPDATE_COURSE_ERROR:

    case UPDATE_COURSE_RESET:
      return Object.assign({}, action.payload);

    default:
      return Object.assign({}, state);
  }
}

export function deleteCourseReducer(state = {}, action) {
  switch (action.type) {
    case DELETE_COURSE_BEGIN:

    case DELETE_COURSE_SUCCESS:

    case DELETE_COURSE_ERROR:

    case DELETE_COURSE_RESET:
      return Object.assign({}, action.payload);

    default:
      return Object.assign({}, state);
  }
}

export function getCoursesByUserReducer(state = {}, action) {
  switch (action.type) {
    case GET_COURSES_BY_USER_BEGIN:

    case GET_COURSES_BY_USER_SUCCESS:

    case GET_COURSES_BY_USER_ERROR:

    case GET_COURSES_BY_USER_RESET:
      return Object.assign({}, action.payload);

    default:
      return Object.assign({}, state);
  }
}

export function getUserCoursesDetailsReducer(state = {}, action) {
  switch (action.type) {
    case GET_USER_COURSES_DETAILS_BEGIN:

    case GET_USER_COURSES_DETAILS_SUCCESS:

    case GET_USER_COURSES_DETAILS_ERROR:

    case GET_USER_COURSES_DETAILS_RESET:
      return Object.assign({}, action.payload);

    default:
      return Object.assign({}, state);
  }
}

export function updateActivityProgressReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_ACTIVITY_PROGRESS_BEGIN:

    case UPDATE_ACTIVITY_PROGRESS_SUCCESS:

    case UPDATE_ACTIVITY_PROGRESS_ERROR:

    case UPDATE_ACTIVITY_PROGRESS_RESET:
      return Object.assign({}, action.payload);

    default:
      return Object.assign({}, state);
  }
}

export function getFeedbackQuestionReducer(state = {}, action) {
  switch (action.type) {
    case GET_FEEDBACK_BEGIN:

    case GET_FEEDBACK_SUCCESS:

    case GET_FEEDBACK_ERROR:

    case GET_FEEDBACK_RESET:
      return Object.assign({}, action.payload);

    default:
      return Object.assign({}, state);
  }
}

export function saveUserCommentReducer(state = {}, action) {
  switch (action.type) {
    case SAVE_USER_FEEDBACK_BEGIN:

    case SAVE_USER_FEEDBACK_SUCCESS:

    case SAVE_USER_FEEDBACK_ERROR:

    case SAVE_USER_FEEDBACK_RESET:
      return Object.assign({}, action.payload);

    default:
      return Object.assign({}, state);
  }
}

export function getUserCourseFeedbackDetailsReducer(state = {}, action) {
  switch (action.type) {
    case GET_USER_COURSE_FEEDBACK_DETAILS_BEGIN:

    case GET_USER_COURSE_FEEDBACK_DETAILS_SUCCESS:

    case GET_USER_COURSE_FEEDBACK_DETAILS_ERROR:

    case GET_USER_COURSE_FEEDBACK_DETAILS_RESET:
      return Object.assign({}, action.payload);

    default:
      return Object.assign({}, state);
  }
}
import { 
  GET_USERS_BEGIN, GET_USERS_SUCCESS, GET_USERS_ERROR, 
  GET_USER_BEGIN, GET_USER_SUCCESS, GET_USER_ERROR, GET_USER_RESET,
  SET_USER_BEGIN, SET_USER_SUCCESS, SET_USER_ERROR, SET_USER_RESET,
  UPDATE_USER_BEGIN, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, UPDATE_USER_RESET,
  UPDATE_USER_ADMIN_BEGIN, UPDATE_USER_ADMIN_SUCCESS, UPDATE_USER_ADMIN_ERROR, UPDATE_USER_ADMIN_RESET,
  GET_USERS_BY_COURSES_BEGIN, GET_USERS_BY_COURSES_SUCCESS, GET_USERS_BY_COURSES_ERROR, GET_USERS_BY_COURSES_RESET,
  GET_USERS_BY_TRAININGS_BEGIN, GET_USERS_BY_TRAININGS_SUCCESS, GET_USERS_BY_TRAININGS_ERROR, GET_USERS_BY_TRAININGS_RESET,
  UPDATE_USER_BY_TRAINING_BEGIN, UPDATE_USER_BY_TRAINING_SUCCESS, UPDATE_USER_BY_TRAINING_ERROR, UPDATE_USER_BY_TRAINING_RESET,
  DELETE_USER_BEGIN, DELETE_USER_SUCCESS, DELETE_USER_ERROR, DELETE_USER_RESET
} from "../../constants/users";

export function getUsersReducer(state = {}, action) {
  switch (action.type) {
    case GET_USERS_BEGIN:

    case GET_USERS_SUCCESS:

    case GET_USERS_ERROR:
      return Object.assign({}, action.payload);

    default:
      return Object.assign({}, state);
  }
}

export function getUserReducer(state = {}, action) {
  switch(action.type) {
      case GET_USER_BEGIN:

      case GET_USER_SUCCESS:

      case GET_USER_ERROR:

      case GET_USER_RESET:
          return Object.assign({}, action.payload);

      default:
          return Object.assign({}, state);
  }
}

export function setUsersReducer(state = {}, action) {
  switch(action.type) {
      case SET_USER_BEGIN:

      case SET_USER_SUCCESS:

      case SET_USER_ERROR:
      
      case SET_USER_RESET:
          return Object.assign({}, action.payload);

      default:
          return Object.assign({}, state);
}
}

export function updateUserReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_USER_BEGIN:

    case UPDATE_USER_SUCCESS:

    case UPDATE_USER_ERROR:

    case UPDATE_USER_RESET:
      return Object.assign({}, action.payload);

    default:
      return Object.assign({}, state);
  }
}


export function updateUserAdminReducer(state = {}, action) {
  switch(action.type) {
      case UPDATE_USER_ADMIN_BEGIN:

      case UPDATE_USER_ADMIN_SUCCESS:

      case UPDATE_USER_ADMIN_ERROR:

      case UPDATE_USER_ADMIN_RESET:
          return Object.assign({}, action.payload);

      default:
          return Object.assign({}, state);
}
}


export function deleteUserReducer(state = {}, action) {
  switch (action.type) {
    case DELETE_USER_BEGIN:

    case DELETE_USER_SUCCESS:

    case DELETE_USER_ERROR:

    case DELETE_USER_RESET:
      return Object.assign({}, action.payload);

    default:
      return Object.assign({}, state);
  }
}

export function getUsersByCoursesReducer(state = {}, action) {
  switch (action.type) {
    case GET_USERS_BY_COURSES_BEGIN:

    case GET_USERS_BY_COURSES_SUCCESS:

    case GET_USERS_BY_COURSES_ERROR:
      return Object.assign({}, action.payload);

    default:
      return Object.assign({}, state);
  }
}

export function getUsersByTrainingsReducer(state = {}, action) {
  switch (action.type) {
    case GET_USERS_BY_TRAININGS_BEGIN:

    case GET_USERS_BY_TRAININGS_SUCCESS:

    case GET_USERS_BY_TRAININGS_ERROR:

    case GET_USERS_BY_TRAININGS_RESET:
      return Object.assign({}, action.payload);

    default:
      return Object.assign({}, state);
  }
}

export function updateUserByTrainingReducer(state = {}, action) {
  switch(action.type) {
      case UPDATE_USER_BY_TRAINING_BEGIN:

      case UPDATE_USER_BY_TRAINING_SUCCESS:

      case UPDATE_USER_BY_TRAINING_ERROR:

      case UPDATE_USER_BY_TRAINING_RESET:
          return Object.assign({}, action.payload);

      default:
          return Object.assign({}, state);
}
}



 





 
  

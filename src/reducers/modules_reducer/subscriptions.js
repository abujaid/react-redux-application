import {
  GET_SUBSCRIPTIONS_BEGIN,
  GET_SUBSCRIPTIONS_SUCCESS,
  GET_SUBSCRIPTIONS_ERROR
} from "../../constants/subscription";

export function getSubscriptionsReducer(state = {}, action) {
  switch (action.type) {
    case GET_SUBSCRIPTIONS_BEGIN:

    case GET_SUBSCRIPTIONS_SUCCESS:

    case GET_SUBSCRIPTIONS_ERROR:
      return Object.assign({}, action.payload);

    default:
      return Object.assign({}, state);
  }
}

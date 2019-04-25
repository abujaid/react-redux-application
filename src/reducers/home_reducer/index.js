import { 
    BASIC_COURSES_BEGIN, BASIC_COURSES_SUCCESS, BASIC_COURSES_ERROR,
    EDUCATION_COURSES_BEGIN, EDUCATION_COURSES_SUCCESS, EDUCATION_COURSES_ERROR,
    BLOG_BEGIN, BLOG_SUCCESS, BLOG_ERROR,
    NEWSLETTER_BEGIN, NEWSLETTER_SUCCESS, NEWSLETTER_ERROR, NEWSLETTER_RESET,
    GET_NEWS_EVENTS_BEGIN, GET_NEWS_EVENTS_SUCCESS, GET_NEWS_EVENTS_ERROR, GET_NEWS_EVENTS_RESET } from "../../constants/home";

export function BasicCoursesReducer(state = {}, action) {
    switch(action.type) {
        case BASIC_COURSES_BEGIN:

        case BASIC_COURSES_SUCCESS:

        case BASIC_COURSES_ERROR:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function EducationCoursesReducer(state = {}, action) {
    switch(action.type) {
        case EDUCATION_COURSES_BEGIN:

        case EDUCATION_COURSES_SUCCESS:

        case EDUCATION_COURSES_ERROR:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function BlogReducer(state = {}, action) {
    switch(action.type) {
        case BLOG_BEGIN:

        case BLOG_SUCCESS:

        case BLOG_ERROR:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function BlogImageReducer(state = {}, action) {
    switch(action.type) {
        case BLOG_BEGIN:

        case BLOG_SUCCESS:

        case BLOG_ERROR:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}
export function SubscribeUserReducer(state = {}, action) {
    switch(action.type) {
        case NEWSLETTER_BEGIN:

        case NEWSLETTER_SUCCESS:

        case NEWSLETTER_ERROR:

        case NEWSLETTER_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function GetNewsEventsReducer(state = {}, action) {
    switch(action.type) {
        case GET_NEWS_EVENTS_BEGIN:   

        case GET_NEWS_EVENTS_SUCCESS:

        case GET_NEWS_EVENTS_ERROR:

        case GET_NEWS_EVENTS_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}
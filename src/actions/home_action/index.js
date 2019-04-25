/*  import react packages */
import axios from 'axios';

/*  import a javascript file */
import { API_URL, WP_API_URL } from './../../constants';

/*  import Constants */
import {
    BASIC_COURSES_BEGIN, BASIC_COURSES_SUCCESS, BASIC_COURSES_ERROR,
    EDUCATION_COURSES_BEGIN, EDUCATION_COURSES_SUCCESS, EDUCATION_COURSES_ERROR,
    BLOG_BEGIN, BLOG_SUCCESS, BLOG_ERROR,
    NEWSLETTER_BEGIN, NEWSLETTER_SUCCESS, NEWSLETTER_ERROR, NEWSLETTER_RESET,
    GET_NEWS_EVENTS_BEGIN, GET_NEWS_EVENTS_SUCCESS, GET_NEWS_EVENTS_ERROR, GET_NEWS_EVENTS_RESET,
} from '../../constants/home';

// START: Functions list related to the Display Basic Courses at Home Page
export function getBasicCourses() {
    return async dispatch => {
        dispatch({ type: BASIC_COURSES_BEGIN, payload: {} });
        await axios.get(`${API_URL}/public/courses/basics`).
            then(response => dispatch({ type: BASIC_COURSES_SUCCESS, payload: response.data })).
            catch(error => dispatch({ type: BASIC_COURSES_ERROR, payload: error.response.data }));
    }
}
// END: Functions list related to the Display Basic Courses at Home Page

// START: Functions list related to the Display Education Courses at Home Page
export function getEducationCourses() {
    return async dispatch => {
        dispatch({ type: EDUCATION_COURSES_BEGIN, payload: {} });
        await axios.get(`${API_URL}/public/courses/education`).
            then(response => dispatch({ type: EDUCATION_COURSES_SUCCESS, payload: response.data })).
            catch(error => dispatch({ type: EDUCATION_COURSES_ERROR, payload: error.response.data }));
    }
}
// END: Functions list related to the Display Education Courses at Home Page

// START: Functions list related to the Display Blog Post at Home Page
export function getBlogs() {
    return async dispatch => {
        dispatch({ type: BLOG_BEGIN, payload: {} });
        await axios.get(`${WP_API_URL}/posts?_embed`).
            then(response => dispatch({ type: BLOG_SUCCESS, payload: response.data })).
            catch(error => dispatch({ type: BLOG_ERROR, payload: error.response.data }));
    }
}
// END: Functions list related to the Display Blog Post at Home Page

// START: Functions list related to the Display Media Images at Home Page
export function getImages() {
    return async dispatch => {
        dispatch({ type: BLOG_BEGIN, payload: {} });
        await axios.get(`${WP_API_URL}/media`).
            then(response => dispatch({ type: BLOG_SUCCESS, payload: response.data })).
            catch(error => dispatch({ type: BLOG_ERROR, payload: error.response.data }));
    }
}
// END: Functions list related to the Display Media Images at Home Page

// START: Functions list related to the Subscriber
export function subscribeUser(formData = {}) {
    return async dispatch => {
        if (Object.keys(formData).length > 0) {
            dispatch({ type: NEWSLETTER_BEGIN, payload: {} });
            await axios.post(`${API_URL}/public/subscribe`, formData).
                then(response => dispatch({ type: NEWSLETTER_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: NEWSLETTER_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: NEWSLETTER_RESET, payload: {} })
        }
    }
}
// END: Functions list related to the Subscriber

// START: Functions list related to the News And Events section at Home Page
export function getNewsEvents(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id != '') {
            dispatch({ type: GET_NEWS_EVENTS_BEGIN, payload: {} });
            await axios.get(`${API_URL}/public/theme_customization/newsevent_settings`).
                then(response => dispatch({ type: GET_NEWS_EVENTS_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: GET_NEWS_EVENTS_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: GET_NEWS_EVENTS_RESET, payload: {} })
        }
    }
}
// END: Functions list related to the News And Events section at Home Page

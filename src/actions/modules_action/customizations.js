/*  import react packages */
import axios from 'axios';

/*  import a javascript file */
import { API_URL } from './../../constants';

/*  import Constants */
import {
    GET_GENERAL_BEGIN, GET_GENERAL_SUCCESS, GET_GENERAL_ERROR, GET_GENERAL_RESET,
    UPDATE_GENERAL_BEGIN, UPDATE_GENERAL_SUCCESS, UPDATE_GENERAL_ERROR, UPDATE_GENERAL_RESET,
    GET_GALLERYS_BEGIN, GET_GALLERYS_SUCCESS, GET_GALLERYS_ERROR, GET_GALLERYS_RESET,
    GET_GALLERY_BEGIN, GET_GALLERY_SUCCESS, GET_GALLERY_ERROR, GET_GALLERY_RESET,
    SET_GALLERY_BEGIN, SET_GALLERY_SUCCESS, SET_GALLERY_ERROR, SET_GALLERY_RESET,
    UPDATE_GALLERY_BEGIN, UPDATE_GALLERY_SUCCESS, UPDATE_GALLERY_ERROR, UPDATE_GALLERY_RESET,
    DELETE_GALLERY_BEGIN, DELETE_GALLERY_SUCCESS, DELETE_GALLERY_ERROR, DELETE_GALLERY_RESET,
    GET_MENUS_BEGIN, GET_MENUS_SUCCESS, GET_MENUS_ERROR, GET_MENUS_RESET,
    GET_MENU_BEGIN, GET_MENU_SUCCESS, GET_MENU_ERROR, GET_MENU_RESET,
    SET_MENU_BEGIN, SET_MENU_SUCCESS, SET_MENU_ERROR, SET_MENU_RESET,
    UPDATE_MENU_BEGIN, UPDATE_MENU_SUCCESS, UPDATE_MENU_ERROR, UPDATE_MENU_RESET,
    DELETE_MENU_BEGIN, DELETE_MENU_SUCCESS, DELETE_MENU_ERROR, DELETE_MENU_RESET,
    GET_TESTIMONIALS_BEGIN, GET_TESTIMONIALS_SUCCESS, GET_TESTIMONIALS_ERROR, GET_TESTIMONIALS_RESET,
    GET_TESTIMONIAL_BEGIN, GET_TESTIMONIAL_SUCCESS, GET_TESTIMONIAL_ERROR, GET_TESTIMONIAL_RESET,
    SET_TESTIMONIAL_BEGIN, SET_TESTIMONIAL_SUCCESS, SET_TESTIMONIAL_ERROR, SET_TESTIMONIAL_RESET,
    UPDATE_TESTIMONIAL_BEGIN, UPDATE_TESTIMONIAL_SUCCESS, UPDATE_TESTIMONIAL_ERROR, UPDATE_TESTIMONIAL_RESET,
    DELETE_TESTIMONIAL_BEGIN, DELETE_TESTIMONIAL_SUCCESS, DELETE_TESTIMONIAL_ERROR, DELETE_TESTIMONIAL_RESET,
    GET_BANNER_BEGIN, GET_BANNER_ERROR, GET_BANNER_SUCCESS, GET_BANNER_RESET,
    UPDATE_BANNER_BEGIN, UPDATE_BANNER_SUCCESS, UPDATE_BANNER_ERROR, UPDATE_BANNER_RESET,
    GET_NEWS_EVENTS_BEGIN, GET_NEWS_EVENTS_SUCCESS, GET_NEWS_EVENTS_ERROR,
    GET_NEWS_EVENT_BEGIN, GET_NEWS_EVENT_SUCCESS, GET_NEWS_EVENT_ERROR, GET_NEWS_EVENT_RESET,
    SET_NEWS_EVENT_BEGIN, SET_NEWS_EVENT_SUCCESS, SET_NEWS_EVENT_ERROR, SET_NEWS_EVENT_RESET,
    UPDATE_NEWS_EVENT_BEGIN, UPDATE_NEWS_EVENT_SUCCESS, UPDATE_NEWS_EVENT_ERROR, UPDATE_NEWS_EVENT_RESET,
    DELETE_NEWS_EVENT_BEGIN, DELETE_NEWS_EVENT_SUCCESS, DELETE_NEWS_EVENT_ERROR, DELETE_NEWS_EVENT_RESET
} from '../../constants/customizations';

// START: Functions list related to the General section
export function getGeneral(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: GET_GENERAL_BEGIN, payload: {} });
            await axios.get(`${API_URL}/public/theme_customization/general_settings/${id}/item`).
                then(response => dispatch({ type: GET_GENERAL_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: GET_GENERAL_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: GET_GENERAL_RESET, payload: {} });
        }
    }
}

export function updateGeneral(token, id, data = {}) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (Object.keys(data).length > 0) {
            dispatch({ type: UPDATE_GENERAL_BEGIN, payload: {} });
            await axios.patch(`${API_URL}/private/theme_customization/general_settings/${id}/edit`, data).
                then(response => dispatch({ type: UPDATE_GENERAL_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: UPDATE_GENERAL_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: UPDATE_GENERAL_RESET, payload: {} });
        }
    }
}
// END: Functions list related to the General section

// START: Functions list related to the Image Gallery section
export function getGallerys(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: GET_GALLERYS_BEGIN, payload: {} });
            await axios.get(`${API_URL}/public/theme_customization/gallery_settings`).
                then(response => dispatch({ type: GET_GALLERYS_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: GET_GALLERYS_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: GET_GALLERYS_RESET, payload: {} });
        }
    }
}


export function getGallery(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: GET_GALLERY_BEGIN, payload: {} });
            await axios.get(`${API_URL}/private/theme_customization/gallery_settings/${id}/item`).
                then(response => dispatch({ type: GET_GALLERY_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: GET_GALLERY_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: GET_GALLERY_RESET, payload: {} });
        }
    }
}

export function setGallerys(token, data = {}) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (Object.keys(data).length > 0) {
            dispatch({ type: SET_GALLERY_BEGIN, payload: {} });
            await axios.post(`${API_URL}/private/theme_customization/gallery_settings`, data).
                then(response => dispatch({ type: SET_GALLERY_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: SET_GALLERY_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: SET_GALLERY_RESET, payload: {} });
        }
    }
}

export function updateGallery(token, id, data = {}) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (Object.keys(data).length > 0) {
            dispatch({ type: UPDATE_GALLERY_BEGIN, payload: {} });
            await axios.patch(`${API_URL}/private/theme_customization/gallery_settings/${id}/edit`, data).
                then(response => dispatch({ type: UPDATE_GALLERY_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: UPDATE_GALLERY_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: UPDATE_GALLERY_RESET, payload: {} });
        }
    }
}

export function deleteGallery(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: DELETE_GALLERY_BEGIN, payload: {} });
            await axios.delete(`${API_URL}/private/theme_customization/gallery_settings/${id}/delete`).
                then(response => dispatch({ type: DELETE_GALLERY_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: DELETE_GALLERY_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: DELETE_GALLERY_RESET, payload: {} });
        }
    }
}

// END: Functions list related to the Gallery section

// START: Functions list related to the Menu section
export function getMenus(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: GET_MENUS_BEGIN, payload: {} });
            await axios.get(`${API_URL}/public/theme_customization/menu_settings`).
                then(response => dispatch({ type: GET_MENUS_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: GET_MENUS_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: GET_MENUS_RESET, payload: {} });
        }
    }
}

export function getMenu(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: GET_MENU_BEGIN, payload: {} });
            await axios.get(`${API_URL}/private/theme_customization/menu_settings/${id}/item`).
                then(response => dispatch({ type: GET_MENU_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: GET_MENU_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: GET_MENU_RESET, payload: {} });
        }
    }
}

export function setMenus(token, data = {}) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (Object.keys(data).length > 0) {
            dispatch({ type: SET_MENU_BEGIN, payload: {} });
            await axios.post(`${API_URL}/private/theme_customization/menu_settings`, data).
                then(response => dispatch({ type: SET_MENU_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: SET_MENU_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: SET_MENU_RESET, payload: {} });
        }
    }
}

export function updateMenu(token, id, data = {}) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (Object.keys(data).length > 0) {
            dispatch({ type: UPDATE_MENU_BEGIN, payload: {} });
            await axios.patch(`${API_URL}/private/theme_customization/menu_settings/${id}/edit`, data).
                then(response => dispatch({ type: UPDATE_MENU_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: UPDATE_MENU_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: UPDATE_MENU_RESET, payload: {} });
        }
    }
}

export function deleteMenu(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: DELETE_MENU_BEGIN, payload: {} });
            await axios.delete(`${API_URL}/private/theme_customization/menu_settings/${id}/delete`).
                then(response => dispatch({ type: DELETE_MENU_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: DELETE_MENU_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: DELETE_MENU_RESET, payload: {} });
        }
    }
}

// END: Functions list related to the Menu section

// START: Functions list related to the testimonials section
export function getTestimonials(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: GET_TESTIMONIALS_BEGIN, payload: {} });
            await axios.get(`${API_URL}/public/theme_customization/testimonial_settings`).
                then(response => dispatch({ type: GET_TESTIMONIALS_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: GET_TESTIMONIALS_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: GET_TESTIMONIALS_RESET, payload: {} });
        }
    }
}


export function getTestimonial(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: GET_TESTIMONIAL_BEGIN, payload: {} });
            await axios.get(`${API_URL}/private/theme_customization/testimonial_settings/${id}/item`).
                then(response => dispatch({ type: GET_TESTIMONIAL_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: GET_TESTIMONIAL_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: GET_TESTIMONIAL_RESET, payload: {} });
        }
    }
}

export function setTestimonials(token, data = {}) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (Object.keys(data).length > 0) {
            dispatch({ type: SET_TESTIMONIAL_BEGIN, payload: {} });
            await axios.post(`${API_URL}/private/theme_customization/testimonial_settings`, data).
                then(response => dispatch({ type: SET_TESTIMONIAL_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: SET_TESTIMONIAL_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: SET_TESTIMONIAL_RESET, payload: {} });
        }
    }
}

export function updateTestimonial(token, id, data = {}) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (Object.keys(data).length > 0) {
            dispatch({ type: UPDATE_TESTIMONIAL_BEGIN, payload: {} });
            await axios.patch(`${API_URL}/private/theme_customization/testimonial_settings/${id}/edit`, data).
                then(response => dispatch({ type: UPDATE_TESTIMONIAL_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: UPDATE_TESTIMONIAL_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: UPDATE_TESTIMONIAL_RESET, payload: {} });
        }
    }
}

export function deleteTestimonial(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: DELETE_TESTIMONIAL_BEGIN, payload: {} });
            await axios.delete(`${API_URL}/private/theme_customization/testimonial_settings/${id}/delete`).
                then(response => dispatch({ type: DELETE_TESTIMONIAL_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: DELETE_TESTIMONIAL_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: DELETE_TESTIMONIAL_RESET, payload: {} });
        }
    }
}
// END: Functions list related to the testimonials section

// START: Functions list related to the Banner section
export function getBanner(token = '', id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: GET_BANNER_BEGIN, payload: {} });
            await axios.get(`${API_URL}/public/theme_customization/banner_settings/${id}/item`).
                then(response => dispatch({ type: GET_BANNER_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: GET_BANNER_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: GET_BANNER_RESET, payload: {} });
        }
    }
}

export function updateBanner(token, id = 1, data = {}) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (Object.keys(data).length > 0) {
            dispatch({ type: UPDATE_BANNER_BEGIN, payload: {} });
            await axios.patch(`${API_URL}/private/theme_customization/banner_settings/${id}/edit`, data).
                then(response => dispatch({ type: UPDATE_BANNER_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: UPDATE_BANNER_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: UPDATE_BANNER_RESET, payload: {} });
        }
    }
}
// END: Functions list related to the Banner section

// START: Functions list related to the News And Events section
export function getNewsEvents(token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        dispatch({ type: GET_NEWS_EVENTS_BEGIN, payload: {} });
        await axios.get(`${API_URL}/private/theme_customization/newsevent_settings`).
            then(response => dispatch({ type: GET_NEWS_EVENTS_SUCCESS, payload: response.data })).
            catch(error => dispatch({ type: GET_NEWS_EVENTS_ERROR, payload: error.response.data }));
    }
}

export function getNewsEvent(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: GET_NEWS_EVENT_BEGIN, payload: {} });
            await axios.get(`${API_URL}/private/theme_customization/newsevent_settings/${id}/item`).
                then(response => dispatch({ type: GET_NEWS_EVENT_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: GET_NEWS_EVENT_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: GET_NEWS_EVENT_RESET, payload: {} });
        }
    }
}

export function setNewsEvents(token, data = {}) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (Object.keys(data).length > 0) {
            dispatch({ type: SET_NEWS_EVENT_BEGIN, payload: {} });
            await axios.post(`${API_URL}/private/theme_customization/newsevent_settings`, data).
                then(response => dispatch({ type: SET_NEWS_EVENT_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: SET_NEWS_EVENT_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: SET_NEWS_EVENT_RESET, payload: {} });
        }
    }
}

export function updateNewsEvent(token, id, data = {}) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (Object.keys(data).length > 0) {
            dispatch({ type: UPDATE_NEWS_EVENT_BEGIN, payload: {} });
            await axios.patch(`${API_URL}/private/theme_customization/newsevent_settings/${id}/edit`, data).
                then(response => dispatch({ type: UPDATE_NEWS_EVENT_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: UPDATE_NEWS_EVENT_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: UPDATE_NEWS_EVENT_RESET, payload: {} });
        }
    }
}

export function deleteNewsEvent(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: DELETE_NEWS_EVENT_BEGIN, payload: {} });
            await axios.delete(`${API_URL}/private/theme_customization/newsevent_settings/${id}/delete`).
                then(response => dispatch({ type: DELETE_NEWS_EVENT_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: DELETE_NEWS_EVENT_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: DELETE_NEWS_EVENT_RESET, payload: {} });
        }
    }
}
// END: Functions list related to the News And Events section
import { GET_GENERAL_BEGIN, GET_GENERAL_SUCCESS, GET_GENERAL_ERROR, GET_GENERAL_RESET, 
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
    DELETE_NEWS_EVENT_BEGIN, DELETE_NEWS_EVENT_SUCCESS, DELETE_NEWS_EVENT_ERROR, DELETE_NEWS_EVENT_RESET, } from '../../constants/customizations';
    

// START: Function Based Component  ---- For General
export function getGeneralReducer(state = {}, action) {
    switch(action.type) {
        case GET_GENERAL_BEGIN:
    
        case GET_GENERAL_SUCCESS:
    
        case GET_GENERAL_ERROR:
    
        case GET_GENERAL_RESET:
            return Object.assign({}, action.payload);
    
        default:
            return Object.assign({}, state);
    }
}
 
export function updateGeneralReducer(state = {}, action) {
    switch(action.type) {
        case UPDATE_GENERAL_BEGIN:

        case UPDATE_GENERAL_SUCCESS:

        case UPDATE_GENERAL_ERROR:

        case UPDATE_GENERAL_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}
// END: Function Based Component  ---- For General

// START: Function Based Component  ---- For Image Gallery
export function getGallerysReducer(state = {}, action) {
    switch(action.type) {
        case GET_GALLERYS_BEGIN:

        case GET_GALLERYS_SUCCESS:

        case GET_GALLERYS_ERROR:

        case GET_GALLERYS_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function getGalleryReducer(state = {}, action) {
    switch(action.type) {
        case GET_GALLERY_BEGIN:

        case GET_GALLERY_SUCCESS:

        case GET_GALLERY_ERROR:

        case GET_GALLERY_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function setGallerysReducer(state = {}, action) {
    switch(action.type) {
        case SET_GALLERY_BEGIN:

        case SET_GALLERY_SUCCESS:

        case SET_GALLERY_ERROR:
        
        case SET_GALLERY_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function updateGalleryReducer(state = {}, action) {
    switch(action.type) {
        case UPDATE_GALLERY_BEGIN:

        case UPDATE_GALLERY_SUCCESS:

        case UPDATE_GALLERY_ERROR:

        case UPDATE_GALLERY_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function deleteGalleryReducer(state = {}, action) {
    switch(action.type) {
        case DELETE_GALLERY_BEGIN:

        case DELETE_GALLERY_SUCCESS:

        case DELETE_GALLERY_ERROR:

        case DELETE_GALLERY_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}
// END: Function Based Component  ---- For Image Gallery

// START: Function Based Component  ---- For Menu Gallery
export function getMenusReducer(state = {}, action) {
    switch(action.type) {
        case GET_MENUS_BEGIN:

        case GET_MENUS_SUCCESS:

        case GET_MENUS_ERROR:

        case GET_MENUS_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function getMenuReducer(state = {}, action) {
    switch(action.type) {
        case GET_MENU_BEGIN:

        case GET_MENU_SUCCESS:

        case GET_MENU_ERROR:

        case GET_MENU_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function setMenusReducer(state = {}, action) {
    switch(action.type) {
        case SET_MENU_BEGIN:

        case SET_MENU_SUCCESS:

        case SET_MENU_ERROR:
        
        case SET_MENU_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function updateMenuReducer(state = {}, action) {
    switch(action.type) {
        case UPDATE_MENU_BEGIN:

        case UPDATE_MENU_SUCCESS:

        case UPDATE_MENU_ERROR:

        case UPDATE_MENU_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function deleteMenuReducer(state = {}, action) {
    switch(action.type) {
        case DELETE_MENU_BEGIN:

        case DELETE_MENU_SUCCESS:

        case DELETE_MENU_ERROR:

        case DELETE_MENU_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}
// END: Function Based Component  ---- For Menu Gallery

// START: Function Based Component  ---- For Testimonial
export function getTestimonialsReducer(state = {}, action) {
    switch(action.type) {
        case GET_TESTIMONIALS_BEGIN:

        case GET_TESTIMONIALS_SUCCESS:

        case GET_TESTIMONIALS_ERROR:

        case GET_TESTIMONIALS_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function getTestimonialReducer(state = {}, action) {
    switch(action.type) {
        case GET_TESTIMONIAL_BEGIN:

        case GET_TESTIMONIAL_SUCCESS:

        case GET_TESTIMONIAL_ERROR:

        case GET_TESTIMONIAL_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function setTestimonialsReducer(state = {}, action) {
    switch(action.type) {
        case SET_TESTIMONIAL_BEGIN:

        case SET_TESTIMONIAL_SUCCESS:

        case SET_TESTIMONIAL_ERROR:
        
        case SET_TESTIMONIAL_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function updateTestimonialReducer(state = {}, action) {
    switch(action.type) {
        case UPDATE_TESTIMONIAL_BEGIN:

        case UPDATE_TESTIMONIAL_SUCCESS:

        case UPDATE_TESTIMONIAL_ERROR:

        case UPDATE_TESTIMONIAL_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function deleteTestimonialReducer(state = {}, action) {
    switch(action.type) {
        case DELETE_TESTIMONIAL_BEGIN:

        case DELETE_TESTIMONIAL_SUCCESS:

        case DELETE_TESTIMONIAL_ERROR:

        case DELETE_TESTIMONIAL_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}
//END: Function Based Component  ---- For Testimonial

// START: Function Based Component  ---- For Banner
export function getBannerReducer(state = {}, action) {
    switch(action.type) {
        case GET_BANNER_BEGIN:
    
        case GET_BANNER_SUCCESS:
    
        case GET_BANNER_ERROR:
    
        case GET_BANNER_RESET:
            return Object.assign({}, action.payload);
    
        default:
            return Object.assign({}, state);
    }
}
 
export function updateBannerReducer(state = {}, action) {
    switch(action.type) {
        case UPDATE_BANNER_BEGIN:

        case UPDATE_BANNER_SUCCESS:

        case UPDATE_BANNER_ERROR:

        case UPDATE_BANNER_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}
// END: Function Based Component  ---- For General

// START: Function Based Component  ---- For    NEWS EVENT
export function getNewsEventsReducer(state = {}, action) {
    switch(action.type) {
        case GET_NEWS_EVENTS_BEGIN:

        case GET_NEWS_EVENTS_SUCCESS:

        case GET_NEWS_EVENTS_ERROR:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function getNewsEventReducer(state = {}, action) {
    switch(action.type) {
        case GET_NEWS_EVENT_BEGIN:

        case GET_NEWS_EVENT_SUCCESS:

        case GET_NEWS_EVENT_ERROR:

        case GET_NEWS_EVENT_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}  

export function setNewsEventsReducer(state = {}, action) {
    switch(action.type) {
        case SET_NEWS_EVENT_BEGIN:

        case SET_NEWS_EVENT_SUCCESS:

        case SET_NEWS_EVENT_ERROR:
        
        case SET_NEWS_EVENT_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function updateNewsEventReducer(state = {}, action) {
    switch(action.type) {
        case UPDATE_NEWS_EVENT_BEGIN:

        case UPDATE_NEWS_EVENT_SUCCESS:

        case UPDATE_NEWS_EVENT_ERROR:

        case UPDATE_NEWS_EVENT_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function deleteNewsEventReducer(state = {}, action) {
    switch(action.type) {
        case DELETE_NEWS_EVENT_BEGIN:

        case DELETE_NEWS_EVENT_SUCCESS:

        case DELETE_NEWS_EVENT_ERROR:

        case DELETE_NEWS_EVENT_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}
// END: Function Based Component  ---- For NEWS EVENT


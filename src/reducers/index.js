import { combineReducers } from 'redux';

import { BasicCoursesReducer, EducationCoursesReducer, BlogReducer, BlogImageReducer, SubscribeUserReducer, GetNewsEventsReducer } from './home_reducer';
import { LoginReducer } from './login_reducer';
import { SignupReducer } from './signup_reducer';
import { ForgotPasswordReducer } from './forgot_password_reducer';
import { validateResetTokenReducer, resetPasswordToken } from './forgot_password_reducer/reset_password';
import { ValidateTokenReducer } from './profile_reducer';
import { getUsersReducer, getUserReducer, setUsersReducer, updateUserReducer, updateUserAdminReducer, deleteUserReducer,  getUsersByCoursesReducer, getUsersByTrainingsReducer, updateUserByTrainingReducer} from './modules_reducer/users';
import { getCategoriesReducer } from './modules_reducer/categories';
import { getCertificateReducer, editCertificateReducer, getCertificateByIdReducer, getCertificateTemplateReducer } from './modules_reducer/certificate';
import { getActivitiesReducer, getActivityReducer, activityUploadFileReducer, setActivitiesReducer, updateActivityReducer, deleteActivityReducer, saveAssessmentDetailsReducer, getAssessmentDetailsReducer, deleteAssessmentReducer, getAssessmentByIdReducer, updateAssessmentDetailsReducer, getTestActivityReducer, submitTestQuestionReducer, saveFeedbackDetailsReducer, getFeedbackDetailsReducer, deleteFeedbackReducer, getFeedbackByIdReducer, updateFeedbackDetailsReducer } from './modules_reducer/activities';
import { getCoursesReducer, getCourseReducer, setCoursesReducer, updateCourseReducer, deleteCourseReducer, getCoursesByUserReducer, getUserCoursesDetailsReducer, updateActivityProgressReducer, getFeedbackQuestionReducer, saveUserCommentReducer, getUserCourseFeedbackDetailsReducer } from './modules_reducer/courses';
import { getClassesReducer, getClassReducer, setClassesReducer, updateClassReducer, deleteClassReducer } from './modules_reducer/classes';
import { getLocationsReducer, getLocationReducer, setLocationsReducer, updateLocationReducer, deleteLocationReducer } from './modules_reducer/locations';
import { getTranscriptsReducer, getTranscriptReducer } from './modules_reducer/transcript';
import { 
    getGeneralReducer, updateGeneralReducer, 
    getGallerysReducer, getGalleryReducer, setGallerysReducer, updateGalleryReducer, deleteGalleryReducer,
    getMenusReducer, getMenuReducer, setMenusReducer, updateMenuReducer, deleteMenuReducer,
    getTestimonialsReducer, getTestimonialReducer, setTestimonialsReducer, updateTestimonialReducer, deleteTestimonialReducer,
    getBannerReducer, updateBannerReducer, 
    getNewsEventsReducer, getNewsEventReducer, setNewsEventsReducer, updateNewsEventReducer, deleteNewsEventReducer
} from './modules_reducer/customizations';

import { getSubscriptionsReducer } from './modules_reducer/subscriptions';

const Reducers = combineReducers({
    BasicCourses: BasicCoursesReducer,
    EducationCourses: EducationCoursesReducer,
    BlogReducer: BlogReducer,
    BlogImageReducer: BlogImageReducer,
    SubscribeUser: SubscribeUserReducer,
    GetNewsEvents:GetNewsEventsReducer,
    Login: LoginReducer,
    Signup: SignupReducer,
    ForgotPassword: ForgotPasswordReducer,
    ValidateResetToken: validateResetTokenReducer,
    ResetPassword: resetPasswordToken,
    ValidateToken: ValidateTokenReducer,
    GetUsers: getUsersReducer,
    GetUser: getUserReducer,
    SetUsers: setUsersReducer,
    UpdateUser: updateUserReducer,
    UpdateUserAdmin: updateUserAdminReducer,
    DeleteUser: deleteUserReducer,
    GetUsersByCourses: getUsersByCoursesReducer,
    GetUsersByTrainings: getUsersByTrainingsReducer,
    UpdateUserByTraining: updateUserByTrainingReducer,
    GetCategories: getCategoriesReducer,
    GetActivities: getActivitiesReducer,
    GetActivity: getActivityReducer,
    ActivityUploadFile: activityUploadFileReducer,
    SetActivities: setActivitiesReducer,
    UpdateActivity: updateActivityReducer,
    DeleteActivity: deleteActivityReducer,
    GetCourses: getCoursesReducer,
    GetCourse: getCourseReducer,
    SetCourses: setCoursesReducer,
    UpdateCourse: updateCourseReducer,
    DeleteCourse: deleteCourseReducer,
    GetClasses: getClassesReducer,
    GetClass: getClassReducer,
    SetClasses: setClassesReducer,
    UpdateClass: updateClassReducer,
    DeleteClass: deleteClassReducer,
    GetLocations: getLocationsReducer,
    GetLocation: getLocationReducer,
    SetLocations: setLocationsReducer,
    UpdateLocation: updateLocationReducer,
    DeleteLocation: deleteLocationReducer,
    GetTranscripts: getTranscriptsReducer,
    GetTranscript: getTranscriptReducer,
    GetGeneral: getGeneralReducer,  
    UpdateGeneral: updateGeneralReducer,
    GetGallerys: getGallerysReducer,
    GetGallery: getGalleryReducer,
    SetGallerys: setGallerysReducer,
    UpdateGallery: updateGalleryReducer,
    DeleteGallery: deleteGalleryReducer,
    GetMenus: getMenusReducer, 
    GetMenu: getMenuReducer, 
    SetMenus: setMenusReducer, 
    UpdateMenu: updateMenuReducer, 
    DeleteMenu: deleteMenuReducer,
    GetTestimonials: getTestimonialsReducer,
    GetTestimonial: getTestimonialReducer,
    SetTestimonials: setTestimonialsReducer,
    UpdateTestimonial: updateTestimonialReducer,
    DeleteTestimonial: deleteTestimonialReducer,
    GetBanner: getBannerReducer,
    UpdateBanner:updateBannerReducer,
    GetNewsEvents: getNewsEventsReducer, 
    GetNewsEvent: getNewsEventReducer, 
    SetNewsEvents: setNewsEventsReducer, 
    UpdateNewsEvent: updateNewsEventReducer, 
    DeleteNewsEvent: deleteNewsEventReducer,
    GetSubscriptions: getSubscriptionsReducer,
    GetCoursesByUser: getCoursesByUserReducer,
    GetUserCoursesDetails: getUserCoursesDetailsReducer,
    SaveAssessmentDetails: saveAssessmentDetailsReducer,
    GetAssessmentDetails: getAssessmentDetailsReducer,
    DeleteAssessment: deleteAssessmentReducer,
    GetAssessmentById: getAssessmentByIdReducer,
    UpdateAssessmentDetails: updateAssessmentDetailsReducer,
    GetTestActivity: getTestActivityReducer,
    SubmitTestQuestion: submitTestQuestionReducer,
    UpdateActivityProgress: updateActivityProgressReducer,
    GetCertificate: getCertificateReducer,
    EditCertificate: editCertificateReducer,
    GetCertificateById: getCertificateByIdReducer,
    GetCertificateTemplate: getCertificateTemplateReducer,
    SaveFeedbackDetails: saveFeedbackDetailsReducer,
    GetFeedbackDetails: getFeedbackDetailsReducer,
    DeleteFeedback: deleteFeedbackReducer,
    GetFeedbackById: getFeedbackByIdReducer,
    UpdateFeedbackDetails: updateFeedbackDetailsReducer,
    FeedbackQuestion: getFeedbackQuestionReducer,
    SaveUserComment: saveUserCommentReducer,
    GetUserCourseFeedbackDetails: getUserCourseFeedbackDetailsReducer
});

export default Reducers;
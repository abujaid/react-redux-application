import { GET_TRANSCRIPTS_BEGIN, GET_TRANSCRIPTS_SUCCESS, GET_TRANSCRIPTS_ERROR,
    GET_TRANSCRIPT_BEGIN, GET_TRANSCRIPT_SUCCESS, GET_TRANSCRIPT_ERROR, GET_TRANSCRIPT_RESET } from '../../constants/transcript';

export function getTranscriptsReducer(state = {}, action) {
    switch(action.type) {
        case GET_TRANSCRIPTS_BEGIN:

        case GET_TRANSCRIPTS_SUCCESS:

        case GET_TRANSCRIPTS_ERROR:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}

export function getTranscriptReducer(state = {}, action) {
    switch(action.type) {
        case GET_TRANSCRIPT_BEGIN:

        case GET_TRANSCRIPT_SUCCESS:

        case GET_TRANSCRIPT_ERROR:

        case GET_TRANSCRIPT_RESET:
            return Object.assign({}, action.payload);

        default:
            return Object.assign({}, state);
    }
}
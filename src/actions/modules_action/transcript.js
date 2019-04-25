import axios from 'axios';

import { API_URL } from './../../constants';
import {
    GET_TRANSCRIPTS_BEGIN, GET_TRANSCRIPTS_SUCCESS, GET_TRANSCRIPTS_ERROR,
    GET_TRANSCRIPT_BEGIN, GET_TRANSCRIPT_SUCCESS, GET_TRANSCRIPT_ERROR, GET_TRANSCRIPT_RESET
} from '../../constants/transcript';

export function getTranscripts(token, id = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        dispatch({ type: GET_TRANSCRIPTS_BEGIN, payload: {} });
        await axios.get(`${API_URL}/private/transcripts/${id}`).
            then(response => dispatch({ type: GET_TRANSCRIPTS_SUCCESS, payload: response.data })).
            catch(error => dispatch({ type: GET_TRANSCRIPTS_ERROR, payload: error.response.data }));
    }
}

export function getTranscript(token, id = '', cid = '') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return async dispatch => {
        if (id !== '') {
            dispatch({ type: GET_TRANSCRIPT_BEGIN, payload: {} });
            await axios.get(`${API_URL}/private/transcripts/${id}/item/${cid}`).
                then(response => dispatch({ type: GET_TRANSCRIPT_SUCCESS, payload: response.data })).
                catch(error => dispatch({ type: GET_TRANSCRIPT_ERROR, payload: error.response.data }));
        } else {
            dispatch({ type: GET_TRANSCRIPT_RESET, payload: {} });
        }
    }
}
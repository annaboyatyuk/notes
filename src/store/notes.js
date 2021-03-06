import superagent from 'superagent';

// import notes from "../../server/src/models/notes";

// Actions
const CREATE = 'NOTE_CREATE';
const UPDATE = 'NOTE_UPDATE';
const DELETE = 'NOTE_DELETE';
const GETALL = 'NOTE_GETALL';

let initialState = [];

// Reducer
export default function reducer(state = initialState, action) {

  const {type, payload} = action;

  switch (type) {
    case CREATE: return [...state, payload];
    case UPDATE: return state.map(notes => notes._id === payload._id ? payload : note);
    case DELETE: return state.filter(note => note._id !== payload._id);
    case GETALL: return [...state, ...payload];
    default: return state;
  }
}

// Action Creators

const ENV = {};
// ENV.apiUrl = 'https://notereaction.herokuapp.com';
ENV.apiUrl = 'http://localhost:3005';

export const noteCreate = note => dispatch => {
  superagent.post(`${ENV.apiUrl}/api/v1/notes`, note)
    .then(res => {
      dispatch ({
        type: CREATE,
        payload: res.body,
      });
    });
};

export const noteUpdate = note => dispatch => {
  let id = note.id;
  superagent.put(`${ENV.apiUrl}/api/v1/notes/${id}`, note)
    .then(res => {
      dispatch({
        type: UPDATE,
        payload: res.body,
      });
    });
};

export const noteDelete = note => dispatch => {
  superagent.delete(`${ENV.apiUrl}/api/v1/notes/${note._id}`)
    .then(dispatch({
      type: DELETE,
      payload: note,
    }));
};

export const notesGetAll = () => dispatch => {
  superagent.get(`${ENV.apiUrl}/api/v1/notes`)
    .then(res => {
      dispatch({
        type: GETALL,
        payload: res.body,
      });
    });
};
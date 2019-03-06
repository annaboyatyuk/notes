import superagent from 'superagent';


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

export const notesGetAll = () => dispatch => {
  superagent.get(`${process.env.API_URL}/api/v1/notes`)
    .then(res => {
      dispatch({
        type: GETALL,
        payload: res.body,
      });
    });
};

export const noteCreate = note => dispatch => {
  superagent.post(`${process.env.API_URL}/api/v1/notes`, note)
    .then(res => {
      dispatch ({
        type: CREATE,
        payload: res.body,
      });
    });
};

export const noteUpdate = note => dispatch => {
  let id = note.id;
  superagent.put(`${process.env.API_URL}/api/v1/notes/${id}`, note)
    .then(res => {
      dispatch({
        type: UPDATE,
        payload: res.body,
      });
    });
};

export const noteDelete = note => dispatch => {
  superagent.delete(`${process.env.API_URL}/api/v1/notes/${note._id}`)
    .then(dispatch({
      type: DELETE,
      payload: note,
    }));
};

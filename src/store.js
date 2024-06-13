// src/store.js
import { createStore, combineReducers } from 'redux';

// Example reducer
const initialState = {
  name: '',
  email: '',
  message: '',
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CONTACT_INFO':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

// Combine reducers if you have multiple
const rootReducer = combineReducers({
  contact: contactReducer,
});

const store = createStore(rootReducer);

export default store;

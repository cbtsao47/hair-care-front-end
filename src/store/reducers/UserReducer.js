// Actions
import {
  GETTING_STYLISTS_CHECK,
  GETTING_STYLISTS_CHECK_COMPLETE,
  GETTING_STYLISTS_CHECK_ERROR
} from "../actions/index.js";

// Initial state
const initialState = {
  stylists: []
};

// Reducer
export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETTING_STYLISTS_CHECK:
      return {
        ...state
      };
    case GETTING_STYLISTS_CHECK_COMPLETE: {
      return {
        ...state,
        stylists: action.payload
      };
    }

    case GETTING_STYLISTS_CHECK_ERROR:
    default:
      return state;
  }
};

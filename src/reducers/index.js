import {
  SEARCH_JOBS,
  ADD_TO_FAVORITE,
  REMOVE_FROM_FAVORITE,
  NO_RESULTS,
  RESET_RESULTS,
} from "../actions/types";
import {combineReducers} from 'redux'

const reducer = (state = {}, { type, payload }) => {
  console.log(payload);
  switch (type) {
    case SEARCH_JOBS:
      return {
        ...state,
        history: [...state.history, state.current],
        current: {
          jobs: payload.jobs,
          position: payload.position,
          location: payload.location,
        },
      };
    case ADD_TO_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, payload],
      };

    case REMOVE_FROM_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((fav) => fav.id !== payload.id),
      };
    case RESET_RESULTS:
      return {
        ...state,
        history: [...state.history, state.current],
        current: {
          jobs: "",
          position: "",
          location: "",
        },
      };
    case NO_RESULTS:
      return {
        ...state,
        error_msg: payload,
      };
    default:
      return state;
  }
};



export default reducer;

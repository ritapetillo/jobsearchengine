import {
  SEARCH_JOBS,
  ADD_TO_FAVORITE,
  REMOVE_FROM_FAVORITE,
  NO_RESULTS,
  RESET_RESULTS,
} from "./types";
import { fetchJobResults } from "../Utils/fetches";

export const searchJobs = (position, location) => async (dispatch) => {
  try {
    const jobs = await fetchJobResults(position, location);
    if (jobs.length !== 0) {
      console.log("here");
      dispatch(noResults(""));
    } else {
      dispatch(noResults("There are no results for this location/position"));
    }
    dispatch({
      type: SEARCH_JOBS,
      payload: { jobs, position, location },
    });
  } catch (err) {}
};

export const addToFavorite = (favorite) => (dispatch) => {
  dispatch({
    type: ADD_TO_FAVORITE,
    payload: favorite,
  });
};

export const removeFromFavorite = (favorite) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_FAVORITE,
    payload: favorite,
  });
};

export const noResults = (msg) => (dispatch) => {
  dispatch({
    type: NO_RESULTS,
    payload: msg,
  });
};
export const resetResults = () => (dispatch) => {
  dispatch({
    type: RESET_RESULTS,
  });
};

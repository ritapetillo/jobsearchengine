import {
  SEARCH_JOBS,
  ADD_TO_FAVORITE,
  REMOVE_FROM_FAVORITE,
  NO_RESULTS,
  RESET_RESULTS,
  LOGIN,
  LOGOUT,
} from "./types";
import { fetchJobResults, getUserInfo, logout } from "../Utils/fetches";

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

export const addToFavorite = (favorite) => (dispatch,getState) => {
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

export const logUserIn = () => async dispatch =>{
//when i get redirected from google to my page, i want to grab the user cookies, fetch /me route and grab the user information
try{
  const user = await getUserInfo()
//if I get the user I want to send a payload to redux store with
//isLogged: true and the user information
//only if I have an user, i'll dispatch the login action
if(user)
dispatch({
type:LOGIN,
payload:user
})

} catch(err){
  console.log(err)
}
}


export const logUserOut = () => async dispatch =>{
  try{
    //I'm logging the user out
    const logoutUser = await logout()

//update the reduc store
  dispatch({
    type:LOGOUT
  })
  
  } catch(err){
    console.log(err)
  }
  }
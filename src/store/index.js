import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";

const initialState = {
  user:{
    isLogged:false,
    profile:{}
  },
  favorites: [],
  current: {
    jobs: [],
    position: "",
    location: "",
    error_msg: "",
  },
  history: [],
};
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
);
const configureStore = () => createStore(rootReducer, initialState, enhancer);

export default configureStore;

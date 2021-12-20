import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import errorMsgReducer from "./reducers/errorMsgReducer";
import blogReducer from "./reducers/blogReducer";

const reducer = combineReducers({
  errorMsg: errorMsgReducer,
  blogs: blogReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
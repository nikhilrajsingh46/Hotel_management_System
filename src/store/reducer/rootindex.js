import { createStore,combineReducers } from "redux";
import roomsReducer from './index' 

const root =combineReducers({
    roomsReducer
})

const store=createStore(root,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;


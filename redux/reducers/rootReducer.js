import { combineReducers } from 'redux';
import userReducer from './userReducer';
import alterReducer from './alterReducer';

const rootReducer = combineReducers({
    User: userReducer,
    Alter: alterReducer
});

export default rootReducer;
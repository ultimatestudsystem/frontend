import { combineReducers} from 'redux';
import sessionReducer from "./session";
import userReducer from "./users";
import studentReducer from "./student";
import courseReducer from "./course";

const reducers = combineReducers({
    sessionState: sessionReducer,
    userReducer: userReducer,
    studentState: studentReducer,
    courseState: courseReducer,
});

export default reducers;
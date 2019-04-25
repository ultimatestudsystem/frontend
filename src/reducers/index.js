import { combineReducers} from 'redux';
import sessionReducer from "./session";
import userReducer from "./users";
import studentReducer from "./student";
import courseReducer from "./course";
import taskReducer from "./task";
import { reducer as formReducer } from 'redux-form'

const reducers = combineReducers({
    sessionState: sessionReducer,
    userReducer: userReducer,
    studentState: studentReducer,
    courseState: courseReducer,
    taskState: taskReducer,
    form: formReducer,
});

export default reducers;
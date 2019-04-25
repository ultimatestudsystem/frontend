const INITIAL_STATE = {
    courses: null,
    currentCourseName: '',
    currentCoursesId: [],
    tasks: {},
};


const courseReducer = (state = INITIAL_STATE, action)=> {

    switch (action.type) {
        case 'COURSES_SET': {
            return { ...state,  courses:  action.courses, currentCourseName: action.currentCourseName}
        }
        case 'SET_CURRENT_COURSE': {
            const currentCoursesId = [];
            for (const key in state.courses){
                if (key === action.courseName){
                    currentCoursesId.push(state.courses[key][0].key)
                }
            }
            const nextState = {...state, currentCourseName: action.courseName, currentCoursesId, tasks: {}};
            return nextState;
        }
        case 'SET_TASKS': {
            const nextState = {...state, tasks: {...state.tasks, [action.course_id]: action.tasks}};
            return nextState;
        }
        default :
            return state;
    }
};

export default courseReducer;
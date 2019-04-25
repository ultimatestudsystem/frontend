const INITIAL_STATE = {
    date: null,
    courseId: null,
    currentCourseName: null,
};


const taskReducer = (state = INITIAL_STATE, action)=> {

    switch (action.type) {
        case 'SET_CURRENT_NEW_TASK_INFO': {
            return { date: action.date, courseId: action.courseId, currentCourseName: action.currentCourseName}
        }
        case 'RESET_CURRENT_SELECTED_TASK': {
            return { ...INITIAL_STATE }
        }
        default :
            return state;
    }
};

export default taskReducer;
const INITIAL_STATE = {
    averageScore: '0',
    groupId: '',
    additionalInfo: '',
    courses: null,
    tasks: [],
};



const studentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_STUDENT_INFO': {
            return {
                ...state,
                averageScore: action.averageScore,
                groupId: action.groupId,
                additionalInfo: action.additionalInfo
            }
        }
        case 'SET_STUDENT_COURSES': {
            return {
                ...state,
                courses: action.courses,
            }
        }
        case 'SET_STUDENT_TASKS': {
            return {
                ...state,
                tasks: {...state.tasks, [action.course_id]: action.tasks},
            }
        }
        default: return state;
    }

};

export default studentReducer;
const INITIAL_STATE = {
    courses: null,
};


const courseReducer = (state = INITIAL_STATE, action)=> {

    switch (action.type) {
        case 'COURSES_SET': {
            return { ...state,  courses: action.courses}
        }
        default :
            return state;
    }
};

export default courseReducer;
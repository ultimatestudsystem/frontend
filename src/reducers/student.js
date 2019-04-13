const INITIAL_STATE = {
    averageScore: '0',
    groupId: '',
    additionalInfo: ''
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
        default: return state;
    }

};

export default studentReducer;
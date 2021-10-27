import * as type from '../constants/action_type'

var initialState = [];

var myReducer = (state = initialState, action) =>{
    switch(action.type){       
        case type.GET_NHIEUKHOAHOCTHEOID:
            state.push(action.khoahoc[0]);
            return state;
        case type.RESET_NHIEUKHOAHOC:
            state = [];
            return state;
        default:
            return state;
    }
}

export default myReducer;
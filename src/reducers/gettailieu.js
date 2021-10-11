import * as type from '../constants/action_type'

var initialState = [];

var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case type.GET_TAILIEU:
            state = action.tailieu;            
            return [...state];   
        case type.GET_TAILIEUKH:
            state = action.tailieu;
            return [...state];
        default:
            return state;
    }
}

export default myReducer;
import * as type from '../constants/action_type'

var initialState = [];

var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case type.GET_KHOAHOC:
            state = action.khoahoc;            
            return [...state];
        case type.SHOW_KHOAHOC:
            console.log(state);
            return state;    
        default:
            return state;
    }
}

export default myReducer;
import * as type from '../constants/action_type'

var initialState = false;

var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case type.TOGGLE_TK:          
            return state;  
        default:
            return state;
    }
}

export default myReducer;
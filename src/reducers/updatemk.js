import * as type from '../constants/action_type'

var initialState = '';

var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case type.UPDATE_MATKHAU:
            state = action.result;      
            return state;  
        default:
            return state;
    }
}

export default myReducer;
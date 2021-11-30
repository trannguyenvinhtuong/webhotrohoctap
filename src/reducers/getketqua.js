import * as type from '../constants/action_type'

var initialState = [];

var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case type.GET_KETQUA:
            state = action.ketqua;            
            return [...state];   
        default:
            return state;
    }
}

export default myReducer;
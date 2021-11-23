import * as type from '../constants/action_type'

var initialState = [];

var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case type.CHECKGIANGVIEN:
            state = action.gv;            
            return state;   
        default:
            return state;
    }
}

export default myReducer;
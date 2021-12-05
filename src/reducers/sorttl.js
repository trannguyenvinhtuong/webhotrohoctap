import * as type from '../constants/action_type'

var initialState = {
    sort_tl_data: ''
};

var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case type.SORT_TL_DATA:
            state = action.sortdata;          
            return state;  
        default:
            return state;
    }
}

export default myReducer;
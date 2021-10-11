import * as type from '../constants/action_type'

var initialState = {
    keyword: '',
    machude: '',
    macapbac: ''
};

var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case type.ON_FILTER:
            state = action.filter_data;          
            return state;  
        default:
            return state;
    }
}

export default myReducer;
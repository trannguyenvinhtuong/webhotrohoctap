import * as type from '../constants/action_type'
import Dashboard from './../component/admincomponent/Dashboard';

var initialState = <Dashboard />;

var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case type.TOGGLE_PAGE_ADMIN:
            state = action.page;         
            return state;  
        default:
            return state;
    }
}

export default myReducer;
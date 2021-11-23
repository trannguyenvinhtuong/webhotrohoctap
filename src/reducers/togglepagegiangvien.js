import * as type from '../constants/action_type'
import Dashboard from '../component/giangviencomponent/sitecomponent/Dashboard';

var initialState = <Dashboard />;

var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case type.TOGGLE_PAGE_GIANGVIEN:
            state = action.page;         
            return state;  
        default:
            return state;
    }
}

export default myReducer;
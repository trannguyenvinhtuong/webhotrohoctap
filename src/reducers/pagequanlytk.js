import * as type from '../constants/action_type'
import Thongtintk from '../component/taikhoan/Thongtintk';

var initialState = <Thongtintk />;

var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case type.CHANGE_PAGE_TK:
            state = action.page;      
            return state;  
        default:
            return state;
    }
}

export default myReducer;
import * as type from '../constants/action_type'

var initialState = {
    Marketing1 : '',
    Marketing2 : '',
    Marketing3 : '',
    Marketing4 : '',
    Marketing5 : '',
    Marketing6 : '',
    GioiThieuKH: ''
};

var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case type.GET_TTKHOAHOC:
            state = action.thongtin;            
            return state;   
        default:
            return state;
    }
}

export default myReducer;
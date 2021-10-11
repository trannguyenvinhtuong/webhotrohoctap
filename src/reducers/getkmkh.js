import * as type from '../constants/action_type'

var initialState = {
   TenKhuyenMai : '',
   PhanTramGiam: '',
   NgayBatDau: '',
   NgayHetHan: ''
};

var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case type.GET_KHUYENMAIKH:
            state = action.khuyenmai;      
            return state;
        case type.GET_KMTL:
            state = action.khuyenmai;
            return state;
        default:
            return state;
    }
}

export default myReducer;
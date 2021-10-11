import * as type from '../constants/action_type'

var initialState = {
    MaKH: '',
    TenKH: '',
    SDT: '',
    DiaChi: '',
    Email: '',
    AnhDaiDien: '',
    TaiKhoan: '',
    MatKhau: ''
};

var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case type.GET_KHACHHANG:
            state = action.khachhang;            
            return state; 
        case type.GET_KHACHHANGBYID:
            state = action.khachhang;          
            return state; 
        default:
            return state;
    }
}

export default myReducer;
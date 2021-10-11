import * as type from '../constants/action_type'

var initialState = {
    MaTL: '',
    TenTL: '',
    MoTa: '',
    MaGV: '',
    MaCB: '',
    MaCD: '',
    GiaTL: '',
    AnhTL: '',
    Link: '',
    NoiCongTac: '',
    TrinhDo: '',
    KinhNghiem: '',
    GioiThieuBanThan: '',
    GioiThieuNgheNghiep: '',
    GioiThieuKinhNghiem: '',
    MaKH: '',
    SoLuongHV: '',
    TenKH: '',
    SDT: '',
    DiaChi: '',
    Email: '',
    AnhDaiDien: '',
    TenCD: '',
    IconCD: '',
    TenCB: '',
    ChuyenNganh: '',
    SoLuongKH: '',
    SoTrang: '',
    Demo: ''

};

var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case type.GET_MOTTAILIEU:
            state = action.tailieu;            
            return state;   
        default:
            return state;
    }
}

export default myReducer;
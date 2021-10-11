import * as type from '../constants/action_type'

var initialState = {
    MaKhoaHoc: '',
    TenKhoaHoc: '',
    MoTa: '',
    GiaKH: '',
    MaGV: '',
    MaCD: '',
    MaCB: '',
    AnhKhoaHoc: '',
    VideoGT: '',
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
    SoLuongKH: ''
};

var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case type.GET_MOT_KHOAHOC:
            state = action.motkhoahoc;      
            return state;
        case type.SHOW_MOTKHOAHOC:
            return state;
        default:
            return state;
    }
}

export default myReducer;
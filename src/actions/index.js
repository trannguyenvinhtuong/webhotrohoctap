import * as type from './../constants/action_type';
import axios from 'axios';

export const getKhoaHoc = (khoahoc) => {
    return {
        type: type.GET_KHOAHOC,
        khoahoc
    }
}

export const showKhoaHoc = () => {
    return {
        type: type.SHOW_KHOAHOC
    }
}

export const requestKhoaHoc = () => {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: 'http://localhost/backendAPI/api/getkhoahoc',
            data: null
        }).then(res => {
            dispatch(getKhoaHoc(res.data));
        }).catch(error => {
            console.log(error);
        })
    }
}

export const toogleFilter = () => {
    return{
        type : type.TOGGLE_FILTER
    }    
}

export const onFilter = (filter_data) =>{
    return{
        type: type.ON_FILTER,
        filter_data
    }
}

export const changePageTK = (page) =>{
    return{
        type: type.CHANGE_PAGE_TK,
        page
    }
}

export const getOneKhoaHoc = (motkhoahoc) =>{
    return{
        type: type.GET_MOT_KHOAHOC,
        motkhoahoc
    }
}

export const showMotKhoaHoc = () => {
    return {
        type: type.SHOW_MOTKHOAHOC
    }
}

export const requestMotKhoaHoc = (idkh) => {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: 'http://localhost/backendAPI/api/getkhoahoc?id=' + idkh ,
            data: null
        }).then(res => {
            dispatch(getOneKhoaHoc(res.data));
        }).catch(error => {
            console.log(error);
        })
    }
}

export const getChuDe = (chude) => {
    return {
        type: type.GET_CHUDE,
        chude
    }
}

export const requestChuDe = () => {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: 'http://localhost/backendAPI/api/getchude',
            data: null
        }).then(res => {
            dispatch(getChuDe(res.data));
        }).catch(error => {
            console.log(error);
        })
    }
}

export const getChuDeLimit = (chude) => {
    return {
        type: type.GET_CHUDELIMIT,
        chude
    }
}

export const requestChuDeLimit = () => {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: 'http://localhost/backendAPI/api/getchudelimit',
            data: null
        }).then(res => {
            dispatch(getChuDeLimit(res.data));
        }).catch(error => {
            console.log(error);
        })
    }
}

export const getTTKH = (thongtin) => {
    return {
        type: type.GET_TTKHOAHOC,
        thongtin
    }
}

export const requestTTKH = (idkh) => {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: 'http://localhost/backendAPI/api/getthongtinkhoahoc?id=' + idkh,
            data: null
        }).then(res => {
            dispatch(getTTKH(res.data));
        }).catch(error => {
            console.log(error);
        })
    }
}

export const getKMKH = (khuyenmai) => {
    return {
        type: type.GET_KHUYENMAIKH,
        khuyenmai
    }
}

export const requestKMKH = (idkh) => {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: 'http://localhost/backendAPI/api/getkhuyenmaikh?id=' + idkh,
            data: null
        }).then(res => {
            dispatch(getKMKH(res.data));
        }).catch(error => {
            console.log(error);
        })
    }
}

export const getALLKMKH = (khuyenmai) => {
    return {
        type: type.GET_ALLKMKH,
        khuyenmai
    }
}

export const requestALLKMKH = () => {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: 'http://localhost/backendAPI/api/getallkmkh',
            data: null
        }).then(res => {
            dispatch(getALLKMKH(res.data));
        }).catch(error => {
            console.log(error);
        })
    }
}

export const getTaiLieu = (tailieu) => {
    return {
        type: type.GET_TAILIEU,
        tailieu
    }
}

export const requestTaiLieu = () => {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: 'http://localhost/backendAPI/api/gettailieu',
            data: null
        }).then(res => {
            dispatch(getTaiLieu(res.data));
        }).catch(error => {
            console.log(error);
        })
    }
}

export const getMotTaiLieu = (tailieu) => {
    return {
        type: type.GET_MOTTAILIEU,
        tailieu
    }
}

export const requestMotTaiLieu = (idtl) => {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: 'http://localhost/backendAPI/api/gettailieu?id=' + idtl,
            data: null
        }).then(res => {
            dispatch(getMotTaiLieu(res.data));
        }).catch(error => {
            console.log(error);
        })
    }
}

export const onFilterTL = (filter_data) =>{
    return{
        type: type.ON_FILTERTL,
        filter_data
    }
}

export const getCapBac = (capbac) => {
    return {
        type: type.GET_CAPBAC,
        capbac
    }
}

export const requestCapBac = () => {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: 'http://localhost/backendAPI/api/getcapbac',
            data: null
        }).then(res => {
            dispatch(getCapBac(res.data));
        }).catch(error => {
            console.log(error);
        })
    }
}

export const getKhachHang = (khachhang) => {
    return {
        type: type.GET_KHACHHANG,
        khachhang
    }
}

export const requestKhachHang = (tendn) => {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: 'http://localhost/backendAPI/api/getkhachhang?tendn=' + tendn,
            data: null
        }).then(res => {
            dispatch(getKhachHang(res.data));
        }).catch(error => {
            console.log(error);
        })
    }
}

export const getKhachHangByID = (khachhang) => {
    return {
        type: type.GET_KHACHHANGBYID,
        khachhang
    }
}

export const requestKhachHangByID = (idkh) => {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: 'http://localhost/backendAPI/api/getkhachhang?idkh=' + idkh,
            data: null
        }).then(res => {
            dispatch(getKhachHangByID(res.data));
        }).catch(error => {
            console.log(error);
        })
    }
}

export const toogleTK = () =>{
    return{
        type: type.TOGGLE_TK
    }
}

export const dangxuatTK = () =>{
    return{
        type: type.TK_DANGXUAT
    }
}

export const getKhoaHocKH = (khoahoc) => {
    return {
        type: type.GET_KHOAHOCKH,
        khoahoc
    }
}

export const requestKhoaHocKH = (idkh) => {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: 'http://localhost/backendAPI/api/getkhoahockh?idkh=' + idkh,
            data: null
        }).then(res => {
            dispatch(getKhoaHocKH(res.data));
        }).catch(error => {
            console.log(error);
        })
    }
}

export const getVideoKH = (video) =>{
    return{
        type: type.GET_VIDEOKH,
        video
    }
}

export const getTaiLieuKH = (tailieu) => {
    return {
        type: type.GET_TAILIEUKH,
        tailieu
    }
}

export const requestTaiLieuKH = (idkh) => {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: 'http://localhost/backendAPI/api/gettailieukh?idkh=' + idkh,
            data: null
        }).then(res => {
            dispatch(getTaiLieuKH(res.data));
        }).catch(error => {
            console.log(error);
        })
    }
}

export const getKMTL = (khuyenmai) => {
    return {
        type: type.GET_KMTL,
        khuyenmai
    }
}

export const requestKMTL = (idtl) => {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: 'http://localhost/backendAPI/api/getkhuyenmaitl?id=' + idtl,
            data: null
        }).then(res => {
            dispatch(getKMTL(res.data));
        }).catch(error => {
            console.log(error);
        })
    }
}

export const updateMK = (result) =>{
    return{
        type: type.UPDATE_MATKHAU,
        result
    }
}

export const requestUpdateMK = (idkh,mkm) =>{
    return (dispatch) => {
        return axios({
            method: 'get',
            url: 'http://localhost/backendAPI/api/updatemk?mkmoi=' + mkm + '&idkh=' + idkh ,
            data: null
        }).then(res => {
            dispatch(updateMK(res.data));
        }).catch(error => {
            console.log(error);
        })
    }
}

export const addCart = (cart) =>{
    return{
        type: type.ADD_CART,
        cart
    }
}

export const requestNhieuKhoaHoc = (idkh) =>{
    return (dispatch) => {
        return axios({
            method: 'get',
            url: 'http://localhost/backendAPI/api/getkhoahoc?id=' + idkh ,
            data: null
        }).then(res => {
            dispatch(getNhieuKhoaHoc(res.data));
        }).catch(error => {
            console.log(error);
        })
    }
}

export const getNhieuKhoaHoc = (khoahoc) =>{
    return{
        type: type.GET_NHIEUKHOAHOCTHEOID,
        khoahoc
    }
}

export const resetNhieuKhoaHoc = () =>{
    return{
        type: type.RESET_NHIEUKHOAHOC
    }
}

export const toogleTaiLieu = () =>{
    return{
        type: type.TOGGLE_TAILIEU
    }
}

export const toogleKiemTra = () =>{
    return{
        type: type.TOGGLE_KIEMTRA
    }
}

export const getDeKiemTra = (dekt) =>{
    return{
        type: type.GETDEKIEMTRA,
        dekt
    }
}
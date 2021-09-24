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
            url: 'https://613b2820110e000017a454c7.mockapi.io/employees',
            data: null
        }).then(res => {
            dispatch(getKhoaHoc(res.data));
        }).catch(err => {
            console.log(err);
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
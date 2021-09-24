import { combineReducers } from "redux";
import getkhoahoc from './getkhoahoc';
import tooglefilter from './toggleFilter';
import filter from './onFilter'
import tkstatus from './taikhoanstatus';

const myReducer = combineReducers({
    getkhoahoc,
    tooglefilter,
    filter,
    tkstatus
})

export default myReducer;
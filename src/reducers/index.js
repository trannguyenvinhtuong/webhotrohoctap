import { combineReducers } from "redux";
import getkhoahoc from './getkhoahoc';
import tooglefilter from './toggleFilter';
import filter from './onFilter';
import pagequanlytk from './pagequanlytk';
import getmotkhoahoc from './getmotkhoahoc';
import getchude from './getchude';
import getchudelimit from './getchudelimit';
import getttkhoahoc from './getttkhoahoc';
import getkmkh from './getkmkh';
import getallkmkh from './getallkmkh';
import gettailieu from './gettailieu';
import getmottailieu from './getmottailieu';
import onfiltertl from './onFilterTL';
import getcapbac from './getcapbac';
import getkhachhang from './getkhachhang';
import getvideokh from './getvideokh';
import updatemk from './updatemk';
import cart from './cart';
import getnhieukhoahoc from './getnhieukhoahoc';
import toogletailieu from './toogletailieu';
import togglekiemtra from './togglekiemtra';
import getdekiemtra from './getdekiemtra';
import checkgv from './checkgv';
import togglepagegiangvien from './togglepagegiangvien';
import getkhoahoctheogv from './getkhoahoctheogv';
import gettailieutheogv from './gettailieutheogv';
import getthongtingv from './getthongtingv';
import toggledekt from './toggledekt';
import onfilterkt from './onFilterKT';
import getketqua from './getketqua';
import gethoadon from './gethoadon';
import getgiangvien from './getgiangvien';
import getkichhoatkhoahoc from './getkichhoatkhoahoc';
import getallkh from './getallkh';
import sortkh from './sortkh';
import sorttl from './sorttl';
import togglepageadmin from './togglepageadmin';
import gethoadontheoid from './gethoadontheoid';
import getketquathi from './getketquathi';
import getanhkh from './getanhkh';

const myReducer = combineReducers({
    getkhoahoc,
    tooglefilter,
    filter,
    pagequanlytk,
    getmotkhoahoc,
    getchude,
    getchudelimit,
    getttkhoahoc,
    getkmkh,
    getallkmkh,
    gettailieu,
    getmottailieu,
    onfiltertl,
    getcapbac,
    getkhachhang,
    getvideokh,
    updatemk,
    cart,
    getnhieukhoahoc,
    toogletailieu,
    togglekiemtra,
    getdekiemtra,
    checkgv,
    togglepagegiangvien,
    getkhoahoctheogv,
    gettailieutheogv,
    getthongtingv,
    toggledekt,
    onfilterkt,
    getketqua,
    gethoadon,
    getgiangvien,
    getkichhoatkhoahoc,
    getallkh,
    sortkh,
    sorttl,
    togglepageadmin,
    gethoadontheoid,
    getketquathi,
    getanhkh
});

export default myReducer;
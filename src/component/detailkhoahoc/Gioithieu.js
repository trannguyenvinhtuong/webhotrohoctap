import { Component } from "react";
import './../../SASS/detail.sass';
import {connect} from "react-redux";
import * as action from './../../actions/index';

class Gioithieu extends Component {
    componentDidMount() {
        var {idkh} = this.props;
        this.props.requestMotKhoaHoc(idkh);
    }

    render() {
        var {khoahoc} = this.props;
        var kh = khoahoc[0]; 
        return (
            <div className="detail-gioithieu">
                <h1>{khoahoc.TenKhoaHoc === undefined ? kh.TenKhoaHoc : khoahoc.TenKhoaHoc}</h1>
                <p>
                    {khoahoc.MoTa === undefined ? kh.MoTa : khoahoc.MoTa}
                </p>
                <div>
                    <img src={khoahoc.AnhDaiDien === undefined ? kh.AnhDaiDien : khoahoc.AnhDaiDien} />
                    <span>{khoahoc.TenKH === undefined ? kh.TenKH: khoahoc.TenKH}</span>
                    <span>
                        <i className="far fa-smile" style={{ color: 'yellow' }}></i>
                        3950 Đánh giá
                    </span>
                    <span>
                        <i className="fas fa-user-graduate"></i>
                        {khoahoc.SoLuongHV === undefined ? kh.SoLuongHV : khoahoc.SoLuongHV} Học viên
                    </span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        khoahoc: state.getmotkhoahoc
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        requestMotKhoaHoc: (idkh) =>{
            dispatch(action.requestMotKhoaHoc(idkh));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Gioithieu);
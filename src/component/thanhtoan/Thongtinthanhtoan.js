import { Component } from "react";
import './../../SASS/thanhtoan.sass';
import './../../stylecss/progressbar.css';
import * as action from "./../../actions/index";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';

class Thongtinthanhtoan extends Component {
    componentDidMount(){
        var log = localStorage.getItem('user');
        var jslog = JSON.parse(log);
        this.props.requestKhachHangByID(jslog.makh);
    }

    onClick = () =>{
        this.props.history.push('/nguoidung/thanhtoanbuoc2');
    }

    render() {
        var {khachhang} = this.props;
        var kh = khachhang[0];
        return (
            <div className="thanhtoan container" style={{marginTop:'4.3rem'}} >
                <h1>Thanh toán</h1>
                <div className="containerprogress">
                    <ul className="progressbar">
                        <li className="active">Thông tin thanh toán</li>
                        <li className="inactive">Thông tin giỏ hàng</li>
                        <li className="inactive">Thành công</li>
                    </ul>
                </div>
                <br />
                <br />
                <br />
                <br />            
                <div className="themkhoahoc">
                    <label>Tên khách hàng</label>
                    <input className="form-control"
                        name="tenkh"
                        type="text"
                        id="tenkh"
                        value = {kh===undefined ? khachhang.TenKH : kh.TenKH}
                        readOnly
                    />
                    <br />
                    <label>Địa chỉ</label>
                    <input className="form-control"
                        name="diachi"
                        type="text"
                        id="diachi"
                        value = {kh===undefined ? khachhang.DiaChi : kh.DiaChi}
                        readOnly
                    />
                    <br />
                    <label>Số điện thoại</label>
                    <input className="form-control"
                        name="sodienthoai"
                        type="text"
                        id="sodienthoai"
                        value = {kh===undefined ? khachhang.SDT : kh.SDT}
                        readOnly
                    />
                    <br />
                    <label>Email</label>
                    <input className="form-control"
                        name="email"
                        type="text"
                        id="email"
                        value = {kh===undefined ? khachhang.Email : kh.Email}
                        readOnly
                    />
                </div>
                <br />
                <br />
                <p><i className="fas fa-exclamation"></i> Bạn có thể chỉnh sửa thông tin tại trang cá nhân</p>
                <a onClick={this.onClick}>
                    <button>Bước tiếp theo</button>
                </a>
                <br />
                <br />
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        khachhang: state.getkhachhang
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        requestKhachHangByID: (idkh) =>{
            dispatch(action.requestKhachHangByID(idkh));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Thongtinthanhtoan));
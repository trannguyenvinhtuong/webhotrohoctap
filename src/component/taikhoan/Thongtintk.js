import { Component } from "react";
import { connect } from "react-redux";
import * as action from "./../../actions/index";
import './../../SASS/quantritk.sass';
import Chinhsuathongtin from './Chinhsuathongtin';

class Thongtintk extends Component{
    componentDidMount(){
        var logg = localStorage.getItem('user');
        var jslog = JSON.parse(logg);      
        this.props.requestKhachHang(jslog.makh);
    }

    onChangePage = (page) =>{
        this.props.onChangePage(page);
    }

    render() {
        var {khachhang} = this.props;
        var kh = khachhang[0];
        return (
            <div className="thongtintk-kh">
                <div className="container">                    
                    <br />
                    <h2>Thông tin tài khoản</h2>
                    <a onClick = {() => this.onChangePage(<Chinhsuathongtin khachhang={kh} />)}>
                        <button className="btn btn-primary">Chỉnh sửa thông tin</button>
                    </a>
                    <br />
                    <br />
                    <div className="row">                    
                        <div className="col-2">
                            <img src={khachhang.AnhDaiDien === undefined ? kh.AnhDaiDien : khachhang.AnhDaiDien} />
                        </div>
                        <div className="col">
                            <h3>Tên khách hàng: <span>{khachhang.TenKH === undefined ? kh.TenKH : khachhang.TenKH}</span></h3>
                            <br />
                            <h3>Số điện thoại: <span>{khachhang.SDT === undefined ? kh.SDT : khachhang.SDT}</span></h3>
                            <br/>
                            <h3>Địa chỉ: <span>{khachhang.DiaChi === undefined ? kh.DiaChi : khachhang.DiaChi}</span></h3>
                            <br />
                            <h3>Email: <span>{khachhang.Email === undefined ? kh.Email : khachhang.Email}</span></h3>
                        </div>                     
                    </div>
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        khachhang: state.getkhachhang
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return{
        requestKhachHang: (idkh) =>{
            dispatch(action.requestKhachHangByID(idkh));
        },
        onChangePage: (page) =>{
            dispatch(action.changePageTK(page));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Thongtintk);
import { Component } from "react";
import './../../../SASS/detail.sass';
import { Row, Col } from 'antd';
import ah from './../../../imgs/vatly.jpg';
import {connect} from "react-redux";
import * as action from './../../../actions/index';

class Thongtingv extends Component {
    componentDidMount(){
        var {idkhoahoc} = this.props;
        this.props.requestMotKhoaHoc(idkhoahoc);
    }

    render() {
        var {khoahoc} = this.props;
        var kh = khoahoc[0]; 
        return (
            <div className="gt-qc ttgv">
                <h1>Thông tin giảng viên</h1>
                <Row>
                    <Col span={6} style={{textAlign:'center'}}>
                        <img src={khoahoc.AnhDaiDien === undefined ? kh.AnhDaiDien : khoahoc.AnhDaiDien} />
                        <br/>
                        <p>
                            <i className="fas fa-user-friends"></i>
                            {khoahoc.SoLuongHV === undefined ? kh.SoLuongHV : khoahoc.SoLuongHV} học viên
                        </p>
                        <p style={{marginTop:'-2rem'}}>
                            <i className="fab fa-discourse"></i>
                            {khoahoc.SoLuongKH === undefined ? kh.SoLuongKH : khoahoc.SoLuongKH} khóa học
                        </p>
                    </Col>
                    <Col span={18}>
                        <h2>{khoahoc.TenKH === undefined ? kh.TenKH : khoahoc.TenKH}</h2>
                        <i>{khoahoc.TrinhDo === undefined ? kh.TrinhDo : khoahoc.TrinhDo} - 
                            {khoahoc.ChuyenNganh ===  undefined ? kh.ChuyenNganh : khoahoc.ChuyenNganh}
                        </i>
                        <br />
                        <br />
                        <div>
                            {khoahoc.GioiThieuBanThan === undefined ? kh.GioiThieuBanThan : khoahoc.GioiThieuBanThan}
                        </div>
                        <div>
                            {khoahoc.GioiThieuNgheNghiep === undefined ? kh.GioiThieuNgheNghiep : khoahoc.GioiThieuNgheNghiep}
                        </div>
                        <div>
                            {khoahoc.GioiThieuKinhNghiem === undefined ? kh.GioiThieuKinhNghiem : khoahoc.GioiThieuKinhNghiem}
                        </div>                      
    
                    </Col>
                </Row>
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

export default connect(mapStateToProps,mapDispatchToProps)(Thongtingv);

import { Component } from "react";
import './../../SASS/detail.sass';
import { Row, Col } from 'antd';
import {connect} from "react-redux";
import * as action from './../../actions/index';

class Thongtingv extends Component {
    componentDidMount() {
        var {idtailieu} = this.props;
        this.props.requestMotTaiLieu(idtailieu);
    }

    render() {
        var {tailieu} = this.props;
        var tl = tailieu[0]; 
        return (
            <div className="gt-qc ttgv">
                <h1>Thông tin giảng viên</h1>
                <Row>
                    <Col span={6} style={{textAlign:'center'}}>
                        <img src={tailieu.AnhDaiDien === undefined ? tl.AnhDaiDien : tailieu.AnhDaiDien} />
                        <br/>
                        <p>
                            <i className="fas fa-user-friends"></i>
                            {tailieu.SoLuongHV === undefined ? tl.SoLuongHV : tailieu.SoLuongHV} học viên
                        </p>
                        <p style={{marginTop:'-2rem'}}>
                            <i className="fab fa-discourse"></i>
                            {tailieu.SoLuongKH === undefined ? tl.SoLuongKH : tailieu.SoLuongKH} khóa học
                        </p>
                    </Col>
                    <Col span={18}>
                        <h2>{tailieu.TenKH === undefined ? tl.TenKH : tailieu.TenKH}</h2>
                        <i>{tailieu.TrinhDo === undefined ? tl.TrinhDo : tailieu.TrinhDo} - 
                            {tailieu.ChuyenNganh ===  undefined ? tl.ChuyenNganh : tailieu.ChuyenNganh}
                        </i>
                        <br />
                        <br />
                        <div>
                            {tailieu.GioiThieuBanThan === undefined ? tl.GioiThieuBanThan : tailieu.GioiThieuBanThan}
                        </div>
                        <div>
                            {tailieu.GioiThieuNgheNghiep === undefined ? tl.GioiThieuNgheNghiep : tailieu.GioiThieuNgheNghiep}
                        </div>
                        <div>
                            {tailieu.GioiThieuKinhNghiem === undefined ? tl.GioiThieuKinhNghiem : tailieu.GioiThieuKinhNghiem}
                        </div>                      
    
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        tailieu: state.getmottailieu
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        requestMotTaiLieu: (idtl) =>{
            dispatch(action.requestMotTaiLieu(idtl));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Thongtingv);

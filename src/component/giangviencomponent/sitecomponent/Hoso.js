import { Component } from "react";
import { connect } from "react-redux";
import * as action from './../../../actions/index';
import './../../../SASS/giangvienpage.sass';

class Hoso extends Component{
    componentDidMount(){
        var logg = localStorage.getItem('user');
        var jslog = JSON.parse(logg);      
        this.props.requestThongTinGV(jslog.makh);
    }

    checkTrangThai = (trangthai) =>{
        var rs = null;
        if(trangthai == 0){
            return rs = <span>Đang làm việc</span>
        }
        else if(trangthai == 1){
            return rs = <span>Đang bị đình chỉ</span>
        }
        else if(trangthai == 2){
            return rs = <span>Đã nghỉ</span>
        }
        return rs;
    }

    render() {
        var {giangvien} = this.props;
        var gv = giangvien[0];
        console.log(giangvien);
        return (
            <div className="hosogv-gv">
                <div className="container">
                    <h2>Hồ sơ giảng viên</h2>
                    <br />
                    <a href="#">
                        <button className="btn btn-info">Chỉnh sửa thông tin</button>
                    </a>
                    <br />
                    <br />
                    <div className="row">
                        <div className="col-2">
                            <img src={gv.AnhDaiDien} />
                        </div>
                        <div className="col-3">
                            <h3>Tên giảng viên: <span>{gv.TenKH}</span></h3>
                            <h3>Trình độ: <span>{gv.TrinhDo}</span></h3>
                            <h3>Chuyên ngành: <span>{gv.ChuyenNganh}</span></h3>
                            <h3>Kinh nghiệm: <span>{gv.KinhNghiem}</span> năm</h3>
                        </div>
                        <div className="col">
                            <h3>Nơi công tác: <span>{gv.NoiCongTac}</span></h3>
                            <h3>Số lượng khoá học: <span>{gv.SoLuongKH}</span></h3>
                            <h3>Số lượng học viên: <span>{gv.SoLuongHV}</span></h3>
                            <h3>Trạng thái: {this.checkTrangThai(gv.TrangThai)}</h3>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="row">
                        <div className="col">
                            <h3>Giới thiệu bản thân: <span>{gv.GioiThieuBanThan}</span></h3>
                        </div>
                        <div className="col">
                            <h3>Giới thiệu nghề nghiệp: <span>{gv.GioiThieuNgheNghiep}</span></h3>
                        </div>
                        <div className="col">
                            <h3>Giới thiệu kinh nghiệm: <span>{gv.GioiThieuKinhNghiem}</span></h3>
                        </div>
                    </div>
                </div>      
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        giangvien: state.getthongtingv
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        requestThongTinGV: (makh) =>{
            dispatch(action.requestThongTinGV(makh));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Hoso);
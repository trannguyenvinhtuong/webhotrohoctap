import { Component } from "react";
import { connect } from "react-redux";
import * as action from "./../../actions/index";
import './../../SASS/tk_giangvien.sass';
import { Link } from 'react-router-dom';
import router from './../../config/router';

class Giangvien extends Component {
    componentDidMount() {
        var data = JSON.parse(localStorage.getItem('user'));
        var idkh = data.makh;
        this.props.requestCheckGV(idkh);
    }

    showUI = (gv) => {
        if (gv.length < 1) {
            return (
                <div className="tk_giangvien">
                    <h3>Đăng ký trở thành giảng viên để nhận ngay ưu đãi trong hôm nay!</h3>
                    <br />
                    <Link to='/nguoidung/dangkygiangvien'>
                        <button>Đăng ký ngay</button>
                    </Link>
                </div>
            )
        }
        else if (gv[0].TrangThai == '-1') {
            return (
                <div className="tk_giangvien" style={{ paddingTop: '2rem', textAlign: 'left' }}>
                    <h2>Bạn đã đăng ký giảng viên thành công, chờ xác nhận từ hệ thống!</h2>
                    <br />
                </div>
            );
        }
        else if (gv[0].TrangThai == '0') {
            return (
                <div className="tk_giangvien" style={{ paddingTop: '2rem', textAlign: 'left' }}>
                    <h2>Truy cập trang quản trị dành cho giảng viên</h2>
                    <br />
                    <a href={router + "/giangvienpage"}>
                        {window.location.reload}
                        <button>Truy cập</button>
                    </a>
                </div>
            )
        }
        else if (gv[0].TrangThai == '1') {
            return (
                <div className="tk_giangvien" style={{ paddingTop: '2rem', textAlign: 'left' }}>
                    <h2>Bạn đang bị đình chỉ, liên hệ với nhân viên để biết thêm chi tiết!</h2>
                </div>
            )
        }
    }

    render() {
        var { gv } = this.props;
        console.log(gv);
        return (
            <div>
                {this.showUI(gv)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        gv: state.checkgv
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        requestCheckGV: (idkh) => {
            dispatch(action.requestCheckGV(idkh));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Giangvien);
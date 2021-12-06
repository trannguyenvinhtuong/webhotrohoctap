import { Component } from "react";
import './../../SASS/dn_dk.sass';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from './../../actions/index';
import Swal from "sweetalert2";

class Dangnhap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tendn: '',
            matkhau: ''
        }
    }

    componentDidMount() {
        this.props.requestAllKhachHang();
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    onClick = (e) => {
        e.preventDefault();
        if (this.state.tendn !== '' && this.state.matkhau !== '') {
            var { khachhang } = this.props;
            var rs = false;
            khachhang.map((kh) => {
                if (kh.TaiKhoan == this.state.tendn && kh.MatKhau == this.state.matkhau) {
                    if(kh.TrangThaiTK == '0'){
                        localStorage.setItem('user', JSON.stringify({
                            trangthai: 'logged',
                            makh: khachhang.MaKH === undefined ? kh.MaKH : khachhang.MaKH
                        }));
                        rs = true;
                        window.location.reload();
                    }
                    else if(kh.TrangThaiTK == '1'){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Tài khoản của bạn đã bị khoá, liên hệ admin để biết thêm chi tiết!'
                        });
                        rs = true;
                    }                    
                }
            });
            if (rs === false) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Sai tên đăng nhập hoặc mật khẩu!'
                });
            }
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui lòng điền tên đăng nhập hoặc mật khẩu!'
            });
        }
    }

    render() {
        var { tendn, matkhau } = this.state;

        return (
            <div className="dangnhap" style={{ marginTop: '5rem' }}>
                <div className="wrap">
                    <form>
                        <div className="header-dn">
                            <div className="icon-dn">
                                <span className="far fa-user"></span>
                            </div>
                        </div>
                        <h2>Đăng nhập</h2>
                        <br />
                        <Input placeholder="User name" className="inputdn" name="tendn" value={tendn} onChange={this.onChange} />
                        <br />
                        <br />
                        <Input placeholder="Password" className="inputdn" type="password" name="matkhau" value={matkhau} onChange={this.onChange} />
                        <br />
                        <div className="item-forgot">
                            <a href="#">Quên mật khẩu</a>
                        </div>
                        <br />
                        <a onClick={this.onClick}>
                            <button>
                                Đăng nhập
                            </button>
                        </a>
                        <br />
                        <div className="link-dndk">
                            <span>Bạn chưa có tài khoản?</span>
                            <span>
                                <Link to="/nguoidung/dangky">Đăng ký ngay!</Link>
                            </span>
                        </div>
                    </form>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        khachhang: state.getallkh
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        requestKhachHang: (tendn) => {
            dispatch(action.requestKhachHang(tendn));
        },
        toogleTK: () => {
            dispatch(action.toogleTK());
        },
        requestAllKhachHang: () => {
            dispatch(action.requestAllKhachHang());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dangnhap);



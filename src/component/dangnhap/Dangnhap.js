import { Component } from "react";
import './../../SASS/dn_dk.sass';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from './../../actions/index';

class Dangnhap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tendn: '',
            matkhau: ''
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
        if (this.state.tendn !== '' && this.state.matkhau !== '') {
            this.props.requestKhachHang(this.state.tendn);
        }
    }

    onClick = (e) => {
        e.preventDefault();
        if (this.state.matkhau !== '' && this.state.tendn !== null) {
            var { khachhang } = this.props;
            if (khachhang) {
                var kh = khachhang[0];
                if ((khachhang.MatKhau === undefined ? kh.MatKhau : khachhang.MatKhau) === this.state.matkhau) {
                    localStorage.setItem('user', JSON.stringify({
                        trangthai: 'logged',
                        makh: khachhang.MaKH === undefined ? kh.MaKH : khachhang.MaKH
                    }));
                    window.location.reload();
                }
                else {
                    alert('Sai tên đăng nhập hoặc mật khẩu');
                }
            }
        }
        else {
            alert('Vui lòng điền tên đăng nhập hoặc mật khẩu');
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
                                <Link to="/dangkytk">Đăng ký ngay!</Link>
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
        khachhang: state.getkhachhang
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        requestKhachHang: (tendn) => {
            dispatch(action.requestKhachHang(tendn));
        },
        toogleTK: () => {
            dispatch(action.toogleTK());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dangnhap);



import { Component } from 'react';
import './../../SASS/dn_dk.sass';
import { Link, withRouter } from 'react-router-dom';
import { Input } from 'antd';
import * as action from './../../actions/index';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';

class Dangky extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tenkh: '',
            sdt: '',
            diachi: '',
            email: '',
            taikhoan: '',
            matkhau: '',
            xnmatkhau: ''
        }
    }

    componentDidMount(){
        this.props.requestAllKhachHang();
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    checkEmail = (email) =>{
        var rs = false;
        var {khachhang} = this.props;
        if(khachhang.length > 0){
            khachhang.map((kh)=>{
                if(kh.Email == email){
                    rs = true;
                }
            })
        }
        return rs;
    }

    onClick = (e) => {
        e.preventDefault();
        
        var { tenkh, sdt, diachi, email, taikhoan, matkhau, xnmatkhau } = this.state;
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!tenkh || !sdt || !diachi || !email || !taikhoan || !matkhau || !xnmatkhau) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui lòng nhập đầy đủ thông tin!'
            });
        }
        else if(tenkh.length < 6){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Tên không hợp lệ!'
            });
        }
        else if(sdt.length < 9){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Số điện thoại không hợp lệ!'
            });
        }
        else if(!re.test(email)){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email không hợp lệ!'
            });
        }
        else if(this.checkEmail(email) === true){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email đã sử dụng!'
            });
        }
        else if(matkhau.length<8){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Mật khẩu phải lớn hơn 8 ký tự!'
            });
        }
        
        else if (xnmatkhau != matkhau) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Xác nhận mật khẩu phải trùng với mật khẩu!'
            });
        }
        else {
            this.props.insertKhachHang(tenkh, sdt, diachi, email, taikhoan, matkhau);
            Swal.fire({
                title: 'Đăng ký thành công!',
                width: 600,
                padding: '3em',
                background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
                backdrop: `
                  rgba(0,0,123,0.4)
                  url("https://sweetalert2.github.io/images/nyan-cat.gif")
                  left top
                  no-repeat
                `
            }); 
            this.props.history.push('/nguoidung/dangnhap');
        }
    }

    render() {
        var { tenkh, sdt, diachi, email, taikhoan, matkhau, xnmatkhau } = this.state;
        return (
            <div className="dangnhap" style={{marginTop:'4.3rem'}} >
                <div className="wrap">
                    <form>
                        <div className="header-dn">
                            <div className="icon-dn">
                                <span className="far fa-registered"></span>
                            </div>
                        </div>
                        <h2>Đăng ký tài khoản</h2>
                        <br />
                        <Input placeholder="Họ và tên ...."
                            className="inputdn"
                            type="text"
                            name="tenkh"
                            value={tenkh}
                            onChange={this.onChange} />
                        <br />
                        <br />
                        <Input placeholder="Số điện thoại ...."
                            className="inputdn"
                            type="text"
                            name="sdt"
                            value={sdt}
                            onChange={this.onChange} />
                        <br />
                        <br />
                        <Input placeholder="Địa chỉ"
                            className="inputdn"
                            type="text"
                            name="diachi"
                            value={diachi}
                            onChange={this.onChange} />
                        <br />
                        <br />
                        <Input placeholder="Email"
                            className="inputdn"
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.onChange} />
                        <br />
                        <br />
                        <Input placeholder="Tên đăng nhập ...."
                            className="inputdn"
                            type="text"
                            name="taikhoan"
                            value={taikhoan}
                            onChange={this.onChange} />
                        <br />
                        <br />
                        <Input placeholder="Mật khẩu ...."
                            className="inputdn"
                            type="password"
                            name="matkhau"
                            value={matkhau}
                            onChange={this.onChange} />
                        <br />
                        <br />
                        <Input placeholder="Xác nhận mật khẩu ...."
                            className="inputdn"
                            type="password"
                            name="xnmatkhau"
                            value={xnmatkhau}
                            onChange={this.onChange} />
                        <br />
                        <br />
                        <a onClick={this.onClick}>
                            <button>
                                Đăng ký
                            </button>
                        </a>
                        <br />
                        <div className="link-dndk">
                            <span>Bạn đã có tài khoản?</span>
                            <span>
                                <Link to="/nguoidung/dangnhap">Đăng nhập ngay!</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        khachhang: state.getallkh
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        insertKhachHang: (tenkh, sdt, diachi, email,
            taikhoan, matkhau) => {
            dispatch(action.insertKhachHang(tenkh, sdt, diachi, email,
                taikhoan, matkhau));
        },
        requestAllKhachHang: () =>{
            dispatch(action.requestAllKhachHang());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dangky));
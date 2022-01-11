import { Component } from "react";
import { Input } from 'antd';
import { connect } from "react-redux";
import * as action from './../../actions/index';
import emailjs from 'emailjs-com';
import Swal from "sweetalert2";
import {withRouter} from 'react-router-dom';

class Nhapthongtin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    onClick = (e) => {
        e.preventDefault();
        var { email } = this.state;
        if (email == '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email không được để trống!'                
            })
        }
        else{
            this.props.requestKhachHangByEmail(email);
        }      
    }

    componentDidUpdate() {
        var { khachhang } = this.props;
        console.log(khachhang);
        if (khachhang.length > 0) {
            var message = "http://localhost:3000/nguoidung/doimatkhau/" + khachhang[0].MaKH;
            var templateParams = {
                name: khachhang[0].TenKH,
                email: khachhang[0].Email,
                message: message
            }
            emailjs.send('service_4zxxb3m', 'template_47vtc5w', templateParams,'user_iVOGiqr6x0VSnscIiUPdR')
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Mail đã gửi!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    
                }, function (error) {
                    console.log('FAILED...', error);
                });
        }
    }

    render() {
        var { email } = this.state;
        return (
            <div className="dangnhap" style={{ marginTop: '4.3rem' }} >
                <div className="wrap">
                    <form>
                        <div className="header-dn">
                            <div className="icon-dn">
                                <span className="far fa-user"></span>
                            </div>
                        </div>
                        <h2>Quên mật khẩu</h2>
                        <br />
                        <Input placeholder="Email"
                            className="inputdn"
                            type="text" name="email"
                            value={email}
                            onChange={this.onChange} />
                        <br />
                        <br />
                        <a onClick={this.onClick}>
                            <button>
                                Gửi mail
                            </button>
                        </a>
                        <br />
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
        requestKhachHangByEmail: (email) => {
            dispatch(action.requestKhachHangByEmail(email));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nhapthongtin));
import { Component } from "react";
import './../../SASS/dn_dk.sass';
import {Input} from 'antd';
import {Link} from 'react-router-dom';

class Dangnhap extends Component {
    render() {
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
                        <Input placeholder="User name" className="inputdn" />
                        <br />
                        <br />
                        <Input placeholder="Password" className="inputdn" type="password" />
                        <br />
                        <div className="item-forgot">
                            <a href="#">Quên mật khẩu</a>
                        </div>
                        <br />
                        <button>
                            Đăng nhập
                        </button>
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

export default Dangnhap;
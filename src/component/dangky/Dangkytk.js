import { Component } from "react";
import './../../SASS/dn_dk.sass';
import { Input } from 'antd';
import { Link } from 'react-router-dom';

class Dangkytk extends Component {
    render() {
        return (
            <div style={{ marginTop: '5rem' }}>
                <div className="dangnhap" style={{ marginTop: '5rem' }}>
                    <div className="wrap">
                        <form>
                            <div className="header-dn">
                                <div className="icon-dn">
                                    <span className="fas fa-user-plus"></span>
                                </div>
                            </div>
                            <h2>Đăng ký</h2>
                            <br />
                            <Input placeholder="User name" className="inputdn" />
                            <br />
                            <br />
                            <Input placeholder="Password" className="inputdn" type="password" />
                            <br />
                            <br />
                            <Input placeholder="Xác nhận" className="inputdn" type="password" />
                            <br />
                            <br />
                            <Input placeholder="Họ tên" className="inputdn" />
                            <br />
                            <br />
                            <Input placeholder="Email" className="inputdn" type="email" />
                            <br />
                            <br />
                            <Input placeholder="Số điện thoại" className="inputdn" />
                            <br />
                            <br />
                            <Input placeholder="Địa chỉ" className="inputdn" />
                            <br />
                            <br />
                            <a type="submit" style={{width:'100%'}}>
                                <button>
                                    Đăng ký
                                </button>
                            </a>
                            <br />
                            <div className="link-dndk">
                                <span>Bạn đã có tài khoản?</span>
                                <span>
                                    <Link to="/dangnhap">Đăng nhập ngay!</Link>
                                </span>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        );
    }
}

export default Dangkytk;
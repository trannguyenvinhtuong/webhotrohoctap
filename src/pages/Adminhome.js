import { Component } from "react";
import { Row, Col, Input } from "antd";
import Nav from './../component/admincomponent/master/Nav';
import Sidenav from './../component/admincomponent/master/Sidenav';
import './../SASS/admin.sass';
import Footer from './../component/master/footter/Footer';
import { connect } from 'react-redux';
import Swal from "sweetalert2";

class Adminhome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pass: ''
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        var tk = 'admin';
        var mk = 'admin';
        var { username, pass } = this.state;
        if (!username || !pass) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui lòng điền tên đăng nhập hoặc mật khẩu!'                
            });
        }
        else{
            if(username != tk || pass != mk){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Sai tên đăng nhập hoặc mật khẩu!'                
                });
            }
            else if(username == tk && pass == mk){
                localStorage.removeItem('admin');
                localStorage.setItem('admin',{'trangthai':'logged'});
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Đăng nhập thành công',
                    showConfirmButton: false,
                    timer: 1500
                });
                window.location.reload();
            }
        }
    }

    showDangNhap = () => {
        var { username, pass } = this.state;
        var rs = null;
        rs = (
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
                        <Input placeholder="User name"
                            className="inputdn"
                            name="username"
                            value={username}
                            onChange={this.onChange} />
                        <br />
                        <br />
                        <Input placeholder="Password"
                            className="inputdn"
                            type="password"
                            name="pass"
                            value={pass}
                            onChange={this.onChange} />
                        <br />
                        <br />
                        <br />
                        <a onClick={this.onSubmit}>
                            <button>
                                Đăng nhập
                            </button>
                        </a>
                        <br />
                    </form>
                </div>
            </div>
        );
        return rs;
    }

    showSide = () => {
        var rs = null;
        var { togglepageadmin } = this.props;
        rs = (
            <div style={{ height: '80vh' }}>
                <Nav />
                <Row>
                    <Col span={3}>
                        <Sidenav />
                    </Col>
                    <Col span={21} className="background-admin">
                        {togglepageadmin}
                    </Col>
                </Row>
                <Footer />

            </div>
        );
        return rs;
    }

    render() {
        var admin = localStorage.getItem('admin');
        return (
            <div>
                {admin != null ? this.showSide() : this.showDangNhap()}
            
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        togglepageadmin: state.togglepageadmin
    }
}

export default connect(mapStateToProps, null)(Adminhome);
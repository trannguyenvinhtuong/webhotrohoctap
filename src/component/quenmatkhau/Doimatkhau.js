import { Component } from 'react';
import { Input } from 'antd';
import * as action from './../../actions/index';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';

class Doimatkhau extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matkhau: '',
            xnmatkhau: ''
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

    onClick = (e) => {
        e.preventDefault();
        var { match } = this.props;
        var idkh = match.params.idkh;
        var { matkhau, xnmatkhau } = this.state;
        
        if (matkhau == '' || xnmatkhau == '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui lòng không bỏ trống!'
            });
        }
        else if (matkhau.length < 8 || xnmatkhau.length < 8) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Mật khẩu phải dài hơn 8 ký tự!'
            });
        }
        else if (matkhau !== xnmatkhau) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Xác nhận mật khẩu phải trùng mật khẩu!'
            });
        }
        else {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Đổi mật khẩu thành công',
                showConfirmButton: false,
                timer: 1500
            });
            this.props.requestUpdateMK(idkh, matkhau);
            this.props.history.push('/nguoidung');
        }
    }

    render() {
        var { matkhau, xnmatkhau } = this.state;
        return (
            <div className="dangnhap" style={{ marginTop: '4.3rem' }} >
                <div className="wrap">
                    <form>
                        <div className="header-dn">
                            <div className="icon-dn">
                                <span className="far fa-user"></span>
                            </div>
                        </div>
                        <h2>Đổi mật khẩu</h2>
                        <br />
                        <Input placeholder="Password mới" className="inputdn" type="password" name="matkhau" value={matkhau} onChange={this.onChange} />
                        <br />
                        <br />
                        <Input placeholder="Xác nhận password" className="inputdn" type="password" name="xnmatkhau" value={xnmatkhau} onChange={this.onChange} />
                        <br />
                        <br />
                        <a onClick={this.onClick}>
                            <button>
                                Đổi mật khẩu
                            </button>
                        </a>
                        <br />
                    </form>
                </div>

            </div>

        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        requestUpdateMK: (idkh, mkm) => {
            dispatch(action.requestUpdateMK(idkh, mkm));
        }
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Doimatkhau));
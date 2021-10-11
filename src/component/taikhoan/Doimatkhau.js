import { Component } from "react";
import { Input } from 'antd';
import './../../SASS/quantritk.sass';
import { connect } from "react-redux";
import * as action from "./../../actions/index";

class Doimatkhau extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matkhaucu: '',
            matkhaumoi: '',
            xnmatkhau: ''
        }
    }

    componentDidMount() {
        var data = JSON.parse(sessionStorage.getItem('user'));
        var idkh = data.makh;
        this.props.requestKhachHangByID(idkh);
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    onClickMK = (e) => {
        e.preventDefault();
        var { khachhang } = this.props;
        var kh = khachhang[0];
        var { matkhaucu, matkhaumoi, xnmatkhau } = this.state;
        if (matkhaucu === '' && matkhaumoi === '' && xnmatkhau === '') {
            alert("Vui lòng không bỏ trống");
        }
        else if (kh.MatKhau !== matkhaucu) {
            alert("Sai mật khẩu cũ");
        }
        else if (xnmatkhau !== matkhaumoi) {
            alert("Xác nhận không đúng");
        }
        else if (kh.MatKhau === matkhaucu && xnmatkhau === matkhaumoi) {
            var data = JSON.parse(sessionStorage.getItem('user'));
            var idkh = data.makh;
            var anwser = window.confirm("Bạn có muốn đổi?");
            if(anwser){
                this.props.requestUpdateMK(idkh, matkhaumoi);
            }
            
        }
    }

    componentDidUpdate() {
        var { result } = this.props;
        if(result !== ""){
            if (result === "sucess") {
                alert("Thành công");
                var rs = '';
                this.props.updateMK(rs);
                sessionStorage.removeItem('user');
                window.location.reload();
            }
            else {
                alert("Thất bại");
            }
        }        
    }

    render() {
        var { matkhaucu, matkhaumoi, xnmatkhau } = this.state;

        return (
            <div className="doimatkhau">
                <Input placeholder="Mật khẩu cũ"
                    type="password"
                    className="input-doimk"
                    name="matkhaucu"
                    value={matkhaucu}
                    onChange={this.onChange} />
                <br />
                <br />
                <Input type="password"
                    placeholder="Mật khẩu mới"
                    className="input-doimk"
                    name="matkhaumoi"
                    value={matkhaumoi}
                    onChange={this.onChange} />
                <br />
                <br />
                <Input type="password"
                    placeholder="Xác nhận mật khẩu"
                    className="input-doimk"
                    name="xnmatkhau"
                    value={xnmatkhau}
                    onChange={this.onChange} />
                <br />
                <br />
                <a onClick={this.onClickMK}>
                    <button>Đổi mật khẩu</button>
                </a>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        khachhang: state.getkhachhang,
        result: state.updatemk
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        requestKhachHangByID: (idkh) => {
            dispatch(action.requestKhachHangByID(idkh));
        },
        requestUpdateMK: (idkh, mkm) => {
            dispatch(action.requestUpdateMK(idkh, mkm));
        },
        updateMK: (result) => {
            dispatch(action.updateMK(result));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Doimatkhau);
import { Component } from "react";
import { connect } from 'react-redux';
import * as action from './../../actions/index';
import Swal from "sweetalert2";
import Thongtintk from "./Thongtintk";

class Chinhsuathongtin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            makh: '',
            tenkh: '',
            sdt: '',
            diachi: '',
            email: ''
        }
    }
    componentDidMount() {
        var { khachhang } = this.props;
        this.setState({
            makh: khachhang.MaKH,
            tenkh: khachhang.TenKH,
            sdt: khachhang.SDT,
            diachi: khachhang.DiaChi,
            email: khachhang.Email
        });
    }

    onChangePage = (page) => {
        this.props.onChangePage(page);
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    onReset = (e) => {
        e.preventDefault();
        var { khachhang } = this.props;
        this.setState({
            tenkh: khachhang.TenKH,
            sdt: khachhang.SDT,
            diachi: khachhang.DiaChi,
            email: khachhang.Email
        });
    }

    onCancer = (e) => {
        e.preventDefault();
        window.location.reload();
    }

    onSubmit = (e) => {
        e.preventDefault();
        var { makh, tenkh, sdt, diachi, email } = this.state;
        Swal.fire({
            title: 'Bạn có muốn thay đổi?',
            text: "Bạn không thể quay về dữ liệu cũ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.updateKhachHang(makh, tenkh, sdt, diachi, email);
                Swal.fire(
                    'Thay đổi thành công!',
                    'Thông tin của bạn đã được thay đổi.',
                    'success'
                );
                this.onChangePage(<Thongtintk />);
            }
        })
    }

    render() {
        var { tenkh, sdt, diachi, email } = this.state;
        return (
            <div className="themkhoahoc">
                <h3>Chỉnh sửa thông tin</h3>
                <form>
                    <label>Tên khách hàng</label>
                    <input className="form-control"
                        name="tenkh"
                        value={tenkh}
                        onChange={this.onChange}
                        type="text"
                    />
                    <br />
                    <label>Số điện thoại</label>
                    <input className="form-control"
                        name="sdt"
                        value={sdt}
                        onChange={this.onChange}
                        type="text"
                    />
                    <br />
                    <label>Địa chỉ</label>
                    <input className="form-control"
                        name="diachi"
                        value={diachi}
                        onChange={this.onChange}
                        type="text"
                    />
                    <br />
                    <label>Email</label>
                    <input className="form-control"
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        type="text"
                    />
                    <br />
                    <br />
                    <br />
                    <div className="bottom-btn">
                        <a onClick={this.onSubmit}>
                            <button className="btn btn-success">Lưu lại</button>
                        </a>
                        <a onClick={this.onReset}>
                            <button className="btn btn-warning">Reset</button>
                        </a>
                        <a onClick={this.onCancer}>
                            <button className="btn btn-danger">Huỷ bỏ</button>
                        </a>
                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onChangePage: (page) => {
            dispatch(action.changePageTK(page));
        },
        updateKhachHang: (makh, tenkh, sdt, diachi, email) => {
            dispatch(action.updateKhachHang(makh, tenkh, sdt, diachi, email));
        }
    }
}

export default connect(null, mapDispatchToProps)(Chinhsuathongtin);
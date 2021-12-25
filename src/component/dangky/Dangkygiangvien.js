import { Component } from "react";
import { Input, Select } from 'antd';
import * as action from './../../actions/index';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Swal from "sweetalert2";
import './../../SASS/dn_dk.sass';

const { Option } = Select;

class Dangkygiangvien extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noicongtac: '',
            trinhdo: '',
            kinhnghiem: '',
            gioithieubanthan: '',
            gioithieunghenghiep: '',
            gioithieukinhnghiem: '',
            macb: '1',
            chuyennganh: ''
        }
    }

    componentDidMount() {
        var user = JSON.parse(localStorage.getItem('user'));
        var makh = user.makh;
        this.props.requestCheckGV(makh);
        this.props.requestCapBac();
    }

    handleChangeCB = (value) => {
        this.setState({
            macb: value
        })
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    showOptionCapBac = (data) => {
        var rs = null;
        if (data.length > 0) {
            rs = data.map((da) => {
                return (
                    <Option key={da.MaCB} value={da.MaCB}>{da.TenCB}</Option>
                );
            });
        }
        return rs;
    }

    onClick = (e) => {
        e.preventDefault();
        var { noicongtac, trinhdo, kinhnghiem, gioithieubanthan, gioithieunghenghiep, gioithieukinhnghiem, macb, chuyennganh } = this.state;
        var user = JSON.parse(localStorage.getItem('user'));
        var makh = user.makh;
        if (noicongtac == '' || trinhdo=='' || kinhnghiem=='' || gioithieubanthan=='' || gioithieunghenghiep=='' || gioithieukinhnghiem=='' || chuyennganh=='') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui lòng không để trống!'
            });
        }
        else {            
            this.props.insertGiangVien(noicongtac, trinhdo, kinhnghiem, gioithieubanthan,
                gioithieunghenghiep, gioithieukinhnghiem, makh, macb, chuyennganh);
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
            this.props.history.push('/nguoidung');
        }
    }

    showForm = () => {
        var { noicongtac, trinhdo, kinhnghiem, gioithieubanthan, gioithieunghenghiep, gioithieukinhnghiem, macb, chuyennganh } = this.state;
        var {capbac} = this.props;
        var rs = null;
        rs = (
            <form>
                <div className="header-dn">
                    <div className="icon-dn">
                        <span className="fas fa-graduation-cap"></span>
                    </div>
                </div>
                <h2>Đăng ký giảng viên</h2>
                <br />
                <Input placeholder="Nơi công tác ...."
                    className="inputdn"
                    name="noicongtac"
                    type="text"
                    value={noicongtac}
                    onChange={this.onChange} />
                <br />
                <br />
                <Input placeholder="Trình độ ...."
                    className="inputdn"
                    type="text"
                    name="trinhdo"
                    value={trinhdo}
                    onChange={this.onChange} />
                <br />
                <br />
                <Input placeholder="Kinh nghiệm ...."
                    className="inputdn"
                    type="text"
                    name="kinhnghiem"
                    value={kinhnghiem}
                    onChange={this.onChange} />
                <br />
                <br />
                <Input placeholder="Giới thiệu bản thân ...."
                    className="inputdn"
                    type="text"
                    name="gioithieubanthan"
                    value={gioithieubanthan}
                    onChange={this.onChange} />
                <br />
                <br />
                <Input placeholder="Giới thiệu nghề nghiệp ...."
                    className="inputdn"
                    type="text"
                    name="gioithieunghenghiep"
                    value={gioithieunghenghiep}
                    onChange={this.onChange} />
                <br />
                <br />
                <Input placeholder="Giới thiệu kinh nghiệm ...."
                    className="inputdn"
                    type="text"
                    name="gioithieukinhnghiem"
                    value={gioithieukinhnghiem}
                    onChange={this.onChange} />
                <br />
                <br />
                <Input placeholder="Chuyên ngành ...."
                    className="inputdn"
                    type="text"
                    name="chuyennganh"
                    value={chuyennganh}
                    onChange={this.onChange} />
                <br />
                <br />
                <label>Cấp bậc giảng dạy</label>
                <br />
                <Select defaultValue={macb} style={{ width: '80%' }} onChange={this.handleChangeCB}>
                    {this.showOptionCapBac(capbac)}
                </Select>
                <br />
                <br />
                <br />
                <a onClick={this.onClick}>
                    <button>
                        Đăng ký
                    </button>
                </a>
                <br />
            </form>
        );
        return rs;
    }

    render() {
        var { giangvien, capbac } = this.props;
        var { noicongtac, trinhdo, kinhnghiem, gioithieubanthan, gioithieunghenghiep, gioithieukinhnghiem, macb, chuyennganh } = this.state;
        return (
            <div className="dangnhap" style={{ marginTop: '5rem' }}>
                <div className="wrap">
                    {giangvien.length<1 ? this.showForm() : <h2 className="h2-warning">Bạn đã đăng ký rồi ! Vui lòng kiểm tra trong mục tài khoản</h2>}
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        capbac: state.getcapbac,
        giangvien: state.checkgv
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        insertGiangVien: (noicongtac, trinhdo, kinhnghiem, gioithieubanthan,
            gioithieunghenghiep, gioithieukinhnghiem, makh, macb, chuyennganh) => {
            dispatch(action.insertGiangVien(noicongtac, trinhdo, kinhnghiem, gioithieubanthan,
                gioithieunghenghiep, gioithieukinhnghiem, makh, macb, chuyennganh));
        },
        requestCheckGV: (idkh) => {
            dispatch(action.requestCheckGV(idkh));
        },
        requestCapBac: () => {
            dispatch(action.requestCapBac());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dangkygiangvien));
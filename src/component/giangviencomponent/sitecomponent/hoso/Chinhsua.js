import { Component } from "react";
import './../../../../SASS/giangvienpage.sass';
import { Select } from 'antd';
import { connect } from "react-redux";
import * as action from './../../../../actions/index';
import Hoso from './../Hoso';
import Swal from "sweetalert2";

const { Option } = Select;

class Chinhsua extends Component {
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
        var { giangvien } = this.props;
        var gv = giangvien[0];
        this.setState({
            noicongtac: gv.NoiCongTac,
            trinhdo: gv.TrinhDo,
            kinhnghiem: gv.KinhNghiem,
            gioithieubanthan: gv.GioiThieuBanThan,
            gioithieunghenghiep: gv.GioiThieuNgheNghiep,
            gioithieukinhnghiem: gv.GioiThieuKinhNghiem,
            macb: gv.MaCB,
            chuyennganh: gv.ChuyenNganh
        });
        this.props.requestCapBac();
    }

    onCancer = () => {
        window.location.reload();
    }

    onClear = (e) => {
        e.preventDefault();
        var { giangvien } = this.props;
        var gv = giangvien[0];
        this.setState({
            noicongtac: gv.NoiCongTac,
            trinhdo: gv.TrinhDo,
            kinhnghiem: gv.KinhNghiem,
            gioithieubanthan: gv.GioiThieuBanThan,
            gioithieunghenghiep: gv.GioiThieuNgheNghiep,
            gioithieukinhnghiem: gv.GioiThieuKinhNghiem,
            macb: gv.MaCB,
            chuyennganh: gv.ChuyenNganh
        });
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

    handleChangeCB = (value) => {
        this.setState({
            macb: value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        var { noicongtac, trinhdo, kinhnghiem, gioithieubanthan, gioithieukinhnghiem, gioithieunghenghiep, macb, chuyennganh } = this.state;
        var logg = localStorage.getItem('user');
        var jslog = JSON.parse(logg);
        var makh = jslog.makh;
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.updateGiangVien(makh, noicongtac, trinhdo, kinhnghiem, gioithieubanthan,
                    gioithieunghenghiep, gioithieukinhnghiem, macb, chuyennganh);
                Swal.fire(
                    'Thành công!',
                    'Cập nhật đã lưu.',
                    'success'
                )
                this.props.togglepagegiangvien(<Hoso />)
            }
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

    render() {
        var { noicongtac, trinhdo, kinhnghiem, gioithieubanthan, gioithieukinhnghiem, gioithieunghenghiep, macb, chuyennganh } = this.state;
        var { capbac } = this.props;
        return (
            <div className="themkhoahoc container">
                <h3>Thông tin giảng viên</h3>
                <form>
                    <label>Nơi công tác</label>
                    <input className="form-control"
                        type="text"
                        value={noicongtac}
                        name="noicongtac"
                        onChange={this.onChange}
                    />
                    <br />
                    <label>Trình độ</label>
                    <input className="form-control"
                        type="text"
                        value={trinhdo}
                        name="trinhdo"
                        onChange={this.onChange}
                    />
                    <br />
                    <label>Kinh nghiệm</label>
                    <input className="form-control"
                        type="text"
                        value={kinhnghiem}
                        name="kinhnghiem"
                        onChange={this.onChange}
                    />
                    <br />
                    <label>Giới thiệu bản thân</label>
                    <input className="form-control"
                        type="text"
                        value={gioithieubanthan}
                        name="gioithieubanthan"
                        onChange={this.onChange}
                    />
                    <br />
                    <label>Giới thiệu nghề nghiệp</label>
                    <input className="form-control"
                        type="text"
                        value={gioithieunghenghiep}
                        name="gioithieunghenghiep"
                        onChange={this.onChange}
                    />
                    <br />
                    <label>Giới thiệu kinh nghiệm</label>
                    <input className="form-control"
                        type="text"
                        value={gioithieukinhnghiem}
                        name="gioithieukinhnghiem"
                        onChange={this.onChange}
                    />
                    <br />
                    <label>Cấp bậc</label>
                    <br />
                    <Select defaultValue={macb} style={{ width: '80%' }} onChange={this.handleChangeCB}>
                        {this.showOptionCapBac(capbac)}
                    </Select>
                    <br />
                    <br />
                    <label>Chuyên ngành</label>
                    <input className="form-control"
                        type="text"
                        value={chuyennganh}
                        name="chuyennganh"
                        onChange={this.onChange}
                    />
                    <br />
                    <br />
                    <div className="bottom-btn">
                        <a onClick={this.onSubmit}>
                            <button className="btn btn-success">Lưu lại</button>
                        </a>
                        <a onClick={this.onClear}>
                            <button className="btn btn-warning">Xoá hết</button>
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

const mapStateToProps = (state) => {
    return {
        giangvien: state.getthongtingv,
        capbac: state.getcapbac
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        requestCapBac: () => {
            dispatch(action.requestCapBac());
        },
        togglepagegiangvien: (page) => {
            dispatch(action.togglePageGiangVien(page));
        },
        updateGiangVien: (makh, noicongtac, trinhdo, kinhnghiem, gioithieubanthan,
            gioithieunghenghiep, gioithieukinhnghiem, macb, chuyennganh) => {
            dispatch(action.updateGiangVien(makh, noicongtac, trinhdo, kinhnghiem, gioithieubanthan,
                gioithieunghenghiep, gioithieukinhnghiem, macb, chuyennganh));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chinhsua);
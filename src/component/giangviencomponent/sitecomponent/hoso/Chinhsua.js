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
        if(!noicongtac || !trinhdo || !kinhnghiem ||!gioithieubanthan || !gioithieukinhnghiem || !gioithieunghenghiep || !macb || !chuyennganh){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui l??ng nh???p ?????y ????? th??ng tin!'
            });
        }
        else if(kinhnghiem < 0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui l??ng ??i???n th??ng tin h???p l???!'
            });
        }
        else{
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
                        'Th??nh c??ng!',
                        'C???p nh???t ???? l??u.',
                        'success'
                    )
                    this.props.togglepagegiangvien(<Hoso />)
                }
            });
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

    render() {
        var { noicongtac, trinhdo, kinhnghiem, gioithieubanthan, gioithieukinhnghiem, gioithieunghenghiep, macb, chuyennganh } = this.state;
        var { capbac } = this.props;
        return (
            <div className="themkhoahoc container">
                <h3>Th??ng tin gi???ng vi??n</h3>
                <form>
                    <label>N??i c??ng t??c</label>
                    <input className="form-control"
                        type="text"
                        value={noicongtac}
                        name="noicongtac"
                        onChange={this.onChange}
                    />
                    <br />
                    <label>Tr??nh ?????</label>
                    <input className="form-control"
                        type="text"
                        value={trinhdo}
                        name="trinhdo"
                        onChange={this.onChange}
                    />
                    <br />
                    <label>Kinh nghi???m</label>
                    <input className="form-control"
                        type="text"
                        value={kinhnghiem}
                        name="kinhnghiem"
                        onChange={this.onChange}
                    />
                    <br />
                    <label>Gi???i thi???u b???n th??n</label>
                    <input className="form-control"
                        type="text"
                        value={gioithieubanthan}
                        name="gioithieubanthan"
                        onChange={this.onChange}
                    />
                    <br />
                    <label>Gi???i thi???u ngh??? nghi???p</label>
                    <input className="form-control"
                        type="text"
                        value={gioithieunghenghiep}
                        name="gioithieunghenghiep"
                        onChange={this.onChange}
                    />
                    <br />
                    <label>Gi???i thi???u kinh nghi???m</label>
                    <input className="form-control"
                        type="text"
                        value={gioithieukinhnghiem}
                        name="gioithieukinhnghiem"
                        onChange={this.onChange}
                    />
                    <br />
                    <label>C???p b???c</label>
                    <br />
                    <Select value={macb} style={{ width: '80%' }} onChange={this.handleChangeCB}>
                        {this.showOptionCapBac(capbac)}
                    </Select>
                    <br />
                    <br />
                    <label>Chuy??n ng??nh</label>
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
                            <button className="btn btn-success">L??u l???i</button>
                        </a>
                        <a onClick={this.onClear}>
                            <button className="btn btn-warning">Xo?? h???t</button>
                        </a>
                        <a onClick={this.onCancer}>
                            <button className="btn btn-danger">Hu??? b???</button>
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
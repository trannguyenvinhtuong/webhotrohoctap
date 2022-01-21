import { Component } from "react";
import { connect } from "react-redux";
import * as action from './../../../../actions/index';
import { Row, Col, Select, Modal } from 'antd';
import Quanlybaigiang from "./Quanlybaigiang";
import Swal from "sweetalert2";
import Khoahoc from './../Khoahoc';

const { Option } = Select;

class Detailkhoahoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            makhoahoc: '',
            tenkhoahoc: '',
            mota: '',
            gia: '',
            anh: '',
            videogioithieu: '',
            gioithieu: '',
            dieu1: '',
            dieu2: '',
            dieu3: '',
            dieu4: '',
            dieu5: '',
            dieu6: '',
            macb: '1',
            macd: '1',
            showkhuyenmai: false,
            tenkhuyenmai: '',
            phantramgiam: '',
            ngaybatdau: '',
            ngayhethan: ''
        }
    }

    componentDidMount() {
        var idkhoahoc = sessionStorage.getItem('idkhoahoc');
        var makhoahoc = JSON.parse(idkhoahoc)
        this.props.requestMotKhoaHoc(makhoahoc.id);
        this.props.requestTTKH(makhoahoc.id);
        this.props.requestChuDe();
        this.props.requestCapBac();
        var user = JSON.parse(localStorage.getItem('user'));
        var idkh = user.makh;
        this.props.requestCheckGV(idkh);
    }

    componentWillReceiveProps() {
        var khoahoc = this.props.khoahoc;
        var kh = khoahoc[0];
        var thongtin = this.props.thongtin;
        var tt = thongtin[0];
        this.setState({
            makhoahoc: khoahoc.MaKhoaHoc === undefined ? kh.MaKhoaHoc : khoahoc.MaKhoaHoc,
            macd: khoahoc.MaCD === undefined ? kh.MaCD : khoahoc.MaCD,
            macb: khoahoc.MaCB === undefined ? kh.MaCB : khoahoc.MaCB,
            tenkhoahoc: khoahoc.TenKhoaHoc === undefined ? kh.TenKhoaHoc : khoahoc.TenKhoaHoc,
            mota: khoahoc.MoTa === undefined ? kh.MoTa : khoahoc.MoTa,
            gia: khoahoc.GiaKH === undefined ? kh.GiaKH : khoahoc.GiaKH,
            anh: khoahoc.AnhKhoaHoc === undefined ? kh.AnhKhoaHoc : khoahoc.AnhKhoaHoc,
            videogioithieu: khoahoc.VideoGT === undefined ? kh.VideoGT : khoahoc.VideoGT,
            gioithieu: thongtin.GioiThieuKH === undefined ? tt.GioiThieuKH : thongtin.GioiThieuKH,
            dieu1: thongtin.Marketing1 === undefined ? tt.Marketing1 : thongtin.Marketing1,
            dieu2: thongtin.Marketing2 === undefined ? tt.Marketing2 : thongtin.Marketing2,
            dieu3: thongtin.Marketing3 === undefined ? tt.Marketing3 : thongtin.Marketing3,
            dieu4: thongtin.Marketing4 === undefined ? tt.Marketing4 : thongtin.Marketing4,
            dieu5: thongtin.Marketing5 === undefined ? tt.Marketing5 : thongtin.Marketing5,
            dieu6: thongtin.Marketing6 === undefined ? tt.Marketing6 : thongtin.Marketing6
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

    onClear = (e) => {
        e.preventDefault();
        var khoahoc = this.props.khoahoc;
        var kh = khoahoc[0];
        var thongtin = this.props.thongtin;
        var tt = thongtin[0];
        this.setState({
            makhoahoc: khoahoc.MaKhoaHoc === undefined ? kh.MaKhoaHoc : khoahoc.MaKhoaHoc,
            macd: khoahoc.MaCD === undefined ? kh.MaCD : khoahoc.MaCD,
            macb: khoahoc.MaCB === undefined ? kh.MaCB : khoahoc.MaCB,
            tenkhoahoc: khoahoc.TenKhoaHoc === undefined ? kh.TenKhoaHoc : khoahoc.TenKhoaHoc,
            mota: khoahoc.MoTa === undefined ? kh.MoTa : khoahoc.MoTa,
            gia: khoahoc.GiaKH === undefined ? kh.GiaKH : khoahoc.GiaKH,
            anh: khoahoc.AnhKhoaHoc === undefined ? kh.AnhKhoaHoc : khoahoc.AnhKhoaHoc,
            videogioithieu: khoahoc.VideoGT === undefined ? kh.VideoGT : khoahoc.VideoGT,
            gioithieu: thongtin.GioiThieuKH === undefined ? tt.GioiThieuKH : thongtin.GioiThieuKH,
            dieu1: thongtin.Marketing1 === undefined ? tt.Marketing1 : thongtin.Marketing1,
            dieu2: thongtin.Marketing2 === undefined ? tt.Marketing2 : thongtin.Marketing2,
            dieu3: thongtin.Marketing3 === undefined ? tt.Marketing3 : thongtin.Marketing3,
            dieu4: thongtin.Marketing4 === undefined ? tt.Marketing4 : thongtin.Marketing4,
            dieu5: thongtin.Marketing5 === undefined ? tt.Marketing5 : thongtin.Marketing5,
            dieu6: thongtin.Marketing6 === undefined ? tt.Marketing6 : thongtin.Marketing6
        })
    }

    onCancer = () => {
        window.location.reload();
    }

    onClick = (page) => {
        this.props.togglepagegiangvien(page);
    }

    onSubmit = (event) => {
        event.preventDefault();
        var { makhoahoc, tenkhoahoc, mota, gia, anh, videogioithieu, gioithieu, dieu1, dieu2, dieu3, dieu4, dieu5, dieu6, macb, macd } = this.state;
        var date = new Date();
        var anhnew = this.getId(anh);
        var videogioithieunew = this.getIdYouTube(videogioithieu);
        var ngaydang = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        var idgv = JSON.parse(sessionStorage.getItem('magv'));
        var magv = idgv.id;
        var sohs = '0';
        if(tenkhoahoc === '' ||mota === '' || gia === '' || anh === '' || videogioithieu === '' ||dieu1 === '' ||dieu2 === '' ||dieu3 === '' ||dieu4 === '' ||dieu5 === '' ||dieu6 === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui lòng nhập đầy đủ thông tin!'
            });
        }
        else if(gia < 0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui lòng điền dữ liệu hợp lệ!'
            });
        }
        else if(isNaN(gia)){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui lòng điền dữ liệu hợp lệ!'
            });
        }
        else{
            Swal.fire({
                title: 'Xác nhận',
                text: "Bạn có chắc chắn?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Có!',
                cancelButtonText: 'Không'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.props.updateKhoaHoc(makhoahoc, tenkhoahoc, mota, gia, magv,
                        macd, macb, anhnew, videogioithieunew, ngaydang,
                        sohs, dieu1, dieu2, dieu3, dieu4, dieu5, dieu6,
                        gioithieu);
                    Swal.fire(
                        'Thành công!',
                        'Cập nhật đã lưu.',
                        'success'
                    )
                    this.props.togglepagegiangvien(<Khoahoc />)
                }
            });
        }        
    }

    showOptionChuDe = (data) => {
        var rs = null;
        if (data.length > 0) {
            rs = data.map((da) => {
                return (
                    <Option key={da.MaCD} value={da.MaCD}>{da.TenCD}</Option>
                );
            });
        }
        return rs;
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

    handleChangeCD = (value) => {
        this.setState({
            macd: value
        })
    }

    handleChangeCB = (value) => {
        this.setState({
            macb: value
        })
    }

    handleOk = () => {
        var { makhoahoc, tenkhuyenmai, phantramgiam, ngaybatdau, ngayhethan } = this.state;
        if(tenkhuyenmai === '' || phantramgiam === '' || ngaybatdau === '' || ngayhethan === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui lòng nhập đầy đủ thông tin!'
            });
        }
        else if(phantramgiam < 0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui lòng điền dữ liệu hợp lệ!'
            });
        }
        else if(isNaN(phantramgiam)){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui lòng điền dữ liệu hợp lệ!'
            });
        }
        else{
            Swal.fire({
                title: 'Bạn có chắc chắn?',
                text: "Bạn không thể khôi phục dữ liệu cũ!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Có!',
                cancelButtonText: 'Không'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.props.updateKhuyenMaiKH(makhoahoc, tenkhuyenmai, phantramgiam, ngaybatdau, ngayhethan);
                    Swal.fire(
                        'Đã lưu!',
                        'Sửa khuyến mãi thành công.',
                        'success'
                    );
                    this.props.togglepagegiangvien(<Khoahoc />);
                }
            });
        }       

    }

    handleCancel = () => {
        this.setState({
            showkhuyenmai: false
        })
    }

    showKM = () => {
        var { khoahoc } = this.props;
        this.setState({
            showkhuyenmai: true,
            tenkhuyenmai: khoahoc[0].TenKhuyenMai,
            phantramgiam: khoahoc[0].PhanTramGiam,
            ngaybatdau: khoahoc[0].NgayBatDau,
            ngayhethan: khoahoc[0].NgayHetHan
        });
    }

    getId = (url) => {
        return url.match(/[-\w]{25,}/);
    }

    getIdYouTube = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return (match && match[2].length === 11)
            ? match[2]
            : null;
    }

    render() {
        var { showkhuyenmai, tenkhoahoc, mota, gia, anh,
            videogioithieu, gioithieu, dieu1, dieu2, dieu3,
            dieu4, dieu5, dieu6, macb, macd, tenkhuyenmai, phantramgiam,
            ngaybatdau, ngayhethan } = this.state;
        console.log(macd);
        var { chude, capbac } = this.props;
        return (
            <div className="themkhoahoc">
                <h3>Thông tin khoá học</h3>
                <br />
                <div className="container">
                    <a onClick={() => this.onClick(<Quanlybaigiang />)} style={{ float: "right" }}>
                        <button className="btn btn-danger">Quản lý bài giảng</button>
                    </a>
                    <a onClick={this.showKM} style={{ float: "right" }}>
                        <button className="btn btn-success">Khuyến mãi giảm giá</button>
                    </a>
                </div>
                <br />
                <form>
                    <label>Tên khoá học</label>
                    <input className="form-control"
                        name="tenkhoahoc"
                        value={tenkhoahoc}
                        onChange={this.onChange}
                        type="text"
                        placeholder="VD: Khoá học làm giàu ..." />
                    <br />
                    <Row>
                        <Col span={12}>
                            <label>Thể loại</label>
                            <br />
                            <Select value={macd} style={{ width: '80%' }} onChange={this.handleChangeCD}>
                                {this.showOptionChuDe(chude)}
                            </Select>
                        </Col>
                        <Col span={12}>
                            <label>Cấp bậc</label>
                            <br />
                            <Select value={macb} style={{ width: '80%' }} onChange={this.handleChangeCB}>
                                {this.showOptionCapBac(capbac)}
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <label>Mô tả</label>
                    <textarea className="form-control"
                        type="text"
                        placeholder="VD: Khoá học sẽ giúp bạn thành tỉ phú ..."
                        value={mota}
                        onChange={this.onChange}
                        name="mota"
                    >
                    </textarea>
                    <br />
                    <label>Giá khoá học</label>
                    <div className="input-group mb-3">
                        <input className="form-control"
                            type="text"
                            value={gia}
                            onChange={this.onChange}
                            name="gia"
                            placeholder="VD: 80000 ..." /><span className="input-group-text">VND</span>
                    </div>
                    <br />
                    <label>Ảnh khoá học</label>
                    <input className="form-control"
                        type="text"
                        name="anh"
                        value={anh}
                        onChange={this.onChange}
                        placeholder="Dán id file google drive ở đây ..." />
                    <br />
                    <label>Video giới thiệu khoá học</label>
                    <input className="form-control"
                        type="text"
                        value={videogioithieu}
                        name="videogioithieu"
                        onChange={this.onChange}
                        placeholder="Dán id file google drive ở đây ..." />
                    <br />
                    <label>Giới thiệu chi tiết khoá học</label>
                    <textarea
                        className="form-control"
                        type="text"
                        value={gioithieu}
                        name="gioithieu"
                        onChange={this.onChange}
                        placeholder="VD: Khoá học gồm 16 bài giảng ..."></textarea>
                    <br />
                    <label>6 Điều đạt được khi tham gia khoá học</label>
                    <Row>
                        <Col span={12}>
                            <textarea
                                className="small-textarea form-control"
                                type="text"
                                value={dieu1}
                                name="dieu1"
                                onChange={this.onChange}
                                placeholder="Điều 1..."></textarea>
                            <br />
                            <textarea
                                className="small-textarea form-control"
                                type="text"
                                value={dieu2}
                                name="dieu2"
                                onChange={this.onChange}
                                placeholder="Điều 2..."></textarea>
                            <br />
                            <textarea
                                className="small-textarea form-control"
                                type="text"
                                value={dieu3}
                                name="dieu3"
                                onChange={this.onChange}
                                placeholder="Điều 3..."></textarea>
                        </Col>
                        <Col span={12}>
                            <textarea
                                className="small-textarea form-control"
                                type="text"
                                value={dieu4}
                                name="dieu4"
                                onChange={this.onChange}
                                placeholder="Điều 4..."></textarea>
                            <br />
                            <textarea
                                className="small-textarea form-control"
                                type="text"
                                value={dieu5}
                                name="dieu5"
                                onChange={this.onChange}
                                placeholder="Điều 5..."></textarea>
                            <br />
                            <textarea
                                className="small-textarea form-control"
                                type="text"
                                value={dieu6}
                                name="dieu6"
                                onChange={this.onChange}
                                placeholder="Điều 6..."></textarea>
                        </Col>
                    </Row>
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

                {/* Modal  */}
                <Modal title="Khuyến mãi khoá học" visible={showkhuyenmai} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <div className="themkhoahoc">
                        <label>Tên khuyến mãi</label>
                        <input className="form-control"
                            name="tenkhuyenmai"
                            value={tenkhuyenmai}
                            onChange={this.onChange}
                            type="text"
                            placeholder="VD: Khoá học làm giàu ..." />
                        <br />
                        <br />
                        <label>Phần trăm giảm</label>
                        <input className="form-control"
                            name="phantramgiam"
                            value={phantramgiam}
                            onChange={this.onChange}
                            type="text"
                            placeholder="VD: Khoá học làm giàu ..." />
                        <br />
                        <br />
                        <label>Ngày bắt đầu</label>
                        <input className="form-control"
                            name="ngaybatdau"
                            value={ngaybatdau}
                            onChange={this.onChange}
                            type="text"
                            placeholder="VD: Khoá học làm giàu ..." />
                        <br />
                        <br />
                        <label>Ngày hết hạn</label>
                        <input className="form-control"
                            name="ngayhethan"
                            value={ngayhethan}
                            onChange={this.onChange}
                            type="text"
                            placeholder="VD: Khoá học làm giàu ..." />
                        <br />
                        <br />
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        khoahoc: state.getmotkhoahoc,
        chude: state.getchude,
        capbac: state.getcapbac,
        thongtin: state.getttkhoahoc
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        requestMotKhoaHoc: (idkh) => {
            dispatch(action.requestMotKhoaHoc(idkh));
        },
        requestTTKH: (idkh) => {
            dispatch(action.requestTTKH(idkh));
        },
        requestChuDe: () => {
            dispatch(action.requestChuDe());
        },
        requestCapBac: () => {
            dispatch(action.requestCapBac());
        },
        requestCheckGV: (idkh) => {
            dispatch(action.requestCheckGV(idkh));
        },
        togglepagegiangvien: (page) => {
            dispatch(action.togglePageGiangVien(page));
        },
        updateKhoaHoc: (makh, tenkh, mota, giakh, magv,
            macd, macb, anhkh, videogt, ngaydang,
            sohs, mar1, mar2, mar3, mar4, mar5, mar6,
            gtkh) => {
            dispatch(action.updateKhoaHoc(makh, tenkh, mota, giakh, magv,
                macd, macb, anhkh, videogt, ngaydang,
                sohs, mar1, mar2, mar3, mar4, mar5, mar6,
                gtkh));
        },
        updateKhuyenMaiKH: (makhoahoc, tenkhuyenmai, phantramgiam, ngaybatdau, ngayhethan) => {
            dispatch(action.updateKhuyenMaiKH(makhoahoc, tenkhuyenmai, phantramgiam, ngaybatdau, ngayhethan));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detailkhoahoc);
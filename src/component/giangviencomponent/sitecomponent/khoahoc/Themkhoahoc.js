import { Component } from "react";
import { Row, Col, Select } from "antd";
import { connect } from "react-redux";
import * as action from './../../../../actions/index';
import Khoahoc from "../Khoahoc";
import Swal from "sweetalert2";

//firebase
import db from './../../../../config/firebase.config';
import { ref, child, get } from "firebase/database";

const { Option } = Select;

class Themkhoahoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tenkhoahoc: '',
            theloai: '1',
            capbacst: '1',
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
            dieu6: ''
        }
    }

    componentDidMount() {
        this.props.requestChuDe();
        this.props.requestCapBac();
    }

    tooglePage = (page) => {
        this.props.togglepagegiangvien(page);
    }

    handleChangeCD = (value) => {
        this.setState({
            chude: value
        })
    }

    handleChangeCB = (value) => {
        this.setState({
            capbac: value
        })
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

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    onClear = () => {
        this.setState({
            tenkhoahoc: '',
            theloai: '1',
            capbacst: '1',
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
            dieu6: ''
        })
    }

    onCancer = () =>{
        window.location.reload();
    }

    onSubmit = (e) =>{
        e.preventDefault();
        var { tenkhoahoc, theloai, capbacst, mota, gia, anh, videogioithieu,gioithieu, dieu1, dieu2, dieu3, dieu4, dieu5, dieu6 } = this.state;
        var idgv = JSON.parse(sessionStorage.getItem('magv'));
        var magv = idgv.id;
        var ngaydang = null;
        var date = new Date();
        var ngaydang = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
        this.props.insertKhoaHoc(tenkhoahoc, theloai, capbacst, mota, gia, anh, videogioithieu, ngaydang, magv,
            gioithieu, dieu1, dieu2, dieu3, dieu4, dieu5, dieu6);
            
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Lưu thành công',
            showConfirmButton: false,
            timer: 1500
        });
        this.props.togglepagegiangvien(<Khoahoc />)
    }

    render() {
        var { chude, capbac } = this.props;
        var { tenkhoahoc, theloai, capbacst, mota, gia, anh, videogioithieu, gioithieu, dieu1, dieu2, dieu3, dieu4, dieu5, dieu6 } = this.state;
        return (
            <div className="themkhoahoc">
                <div className="container">
                    <a onClick={() => this.tooglePage(<Khoahoc />)}>
                        <button className="btn btn-primary">Quay lại</button>
                    </a>
                </div>
                <h3>Thêm khoá học</h3>
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
                            <Select defaultValue={theloai} style={{ width: '80%' }} onChange={this.handleChangeCD}>
                                {this.showOptionChuDe(chude)}
                            </Select>
                        </Col>
                        <Col span={12}>
                            <label>Cấp bậc</label>
                            <br />
                            <Select defaultValue={capbacst} style={{ width: '80%' }} onChange={this.handleChangeCB}>
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        chude: state.getchude,
        capbac: state.getcapbac
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        togglepagegiangvien: (page) => {
            dispatch(action.togglePageGiangVien(page));
        },
        requestChuDe: () => {
            dispatch(action.requestChuDe());
        },
        requestCapBac: () => {
            dispatch(action.requestCapBac());
        },
        insertKhoaHoc: (tenkhoahoc, theloai, capbacst, mota, gia, anh, videogioithieu,magv,
            gioithieu, dieu1, dieu2, dieu3, dieu4, dieu5, dieu6) =>{
            dispatch(action.insertKhoaHoc(tenkhoahoc, theloai, capbacst, mota, gia, anh, videogioithieu,magv,
                gioithieu, dieu1, dieu2, dieu3, dieu4, dieu5, dieu6));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Themkhoahoc);
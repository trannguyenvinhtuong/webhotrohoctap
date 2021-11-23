import { Component } from "react";
import { connect } from "react-redux";
import * as action from './../../../../actions/index';
import { Row, Col } from 'antd';
import Quanlybaigiang from "./Quanlybaigiang";

class Detailkhoahoc extends Component{
    constructor(props){
        super(props);  
        this.state={
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
            dieu6: ''
        }
    }

    componentDidMount(){       
        var idkhoahoc = sessionStorage.getItem('idkhoahoc');
        var makhoahoc = JSON.parse(idkhoahoc)
        this.props.requestMotKhoaHoc(makhoahoc.id);
        this.props.requestTTKH(makhoahoc.id);
        var khoahoc = this.props.khoahoc;
        var kh = khoahoc[0];     
        var thongtin = this.props.thongtin;
        var tt = thongtin[0];   
        this.setState({
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

    onChange = (event) =>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    onClear = () =>{
        this.setState({
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
            dieu6: ''
        })
    }

    onCancer = () =>{
        window.location.reload();
    }

    onClick = (page) =>{
        this.props.togglepagegiangvien(page);
    }

    render() {
        var { tenkhoahoc, mota, gia, anh, videogioithieu, gioithieu, dieu1, dieu2, dieu3, dieu4, dieu5, dieu6 } = this.state;        
        return (
            <div className="themkhoahoc">
            <h3>Thông tin khoá học</h3>
            <br />
            <div className="container">
                <a onClick={() => this.onClick(<Quanlybaigiang />)} style={{float: "right"}}>
                    <button className="btn btn-info">Quản lý bài giảng</button>
                </a>
                <a onClick={() => this.onClick(<Quanlybaigiang />)} style={{float: "right"}}>
                    <button className="btn btn-success">Quản lý tài liệu</button>
                </a>
                <a onClick={() => this.onClick(<Quanlybaigiang />)} style={{float: "right"}}>
                    <button className="btn btn-danger">Quản lý đề kiểm tra</button>
                </a>
            </div>            
            <br/>
            <form>
                <label>Tên khoá học</label>
                <input className="form-control"
                        name="tenkhoahoc" 
                        value={tenkhoahoc} 
                        onChange={this.onChange} 
                        type="text" 
                        placeholder="VD: Khoá học làm giàu ..." />
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
                            name="dieu4" 
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
                    <a href="#">
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

const mapStateToProps = (state) =>{
    return{
        khoahoc: state.getmotkhoahoc,
        thongtin: state.getttkhoahoc
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        requestMotKhoaHoc: (idkh) =>{
            dispatch(action.requestMotKhoaHoc(idkh));
        },
        requestTTKH: (idkh) =>{
            dispatch(action.requestTTKH(idkh));
        },
        togglepagegiangvien: (page) =>{
            dispatch(action.togglePageGiangVien(page));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Detailkhoahoc);
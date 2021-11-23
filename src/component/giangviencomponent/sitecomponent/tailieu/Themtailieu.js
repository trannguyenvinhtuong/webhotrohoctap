import { Component } from "react";
import { connect } from "react-redux";
import * as action from './../../../../actions/index';
import Tailieu from './../Tailieu';

class Themtailieu extends Component{
    tooglePage = (page) =>{
        this.props.togglepagegiangvien(page);
    }
    render() {
        return (
            <div className="themkhoahoc">
                <div className="container">
                    <a onClick={() => this.tooglePage(<Tailieu />)}>
                        <button className="btn btn-primary">Quay lại</button>
                    </a>
                </div>
               
                <h3>Thêm tài liệu</h3>
                <form>
                    <label>Tên tài liệu</label>
                    <input className="form-control" type="text" placeholder="VD: Tài liệu ..." />
                    <br />
                    <label>Mô tả</label>
                    <textarea className="form-control" type="text" placeholder="VD: Tài liệu sẽ giúp bạn ..."></textarea>
                    <br />
                    <label>Ảnh tài liệu</label>
                    <input className="form-control" type="text" placeholder="Dán id file google drive ở đây ..." />
                    <br />
                    <label>File demo tài liệu</label>
                    <input className="form-control" type="text" placeholder="Dán id file google drive ở đây ..." />
                    <br />
                    <label>Số trang tài liệu</label>
                    <input className="form-control" type="text" placeholder="8 ..." />
                    <br />
                    <label>Link tài liệu</label>
                    <input className="form-control" type="text" placeholder="Link file google drive ..." />
                    
                    <br />
                    <br />
                    <div className="bottom-btn">
                        <a href="#">
                            <button className="btn btn-success">Lưu lại</button>
                        </a>
                        <a href="#">
                            <button className="btn btn-warning">Xoá hết</button>
                        </a>
                        <a href="#">
                            <button className="btn btn-danger">Huỷ bỏ</button>
                        </a>
                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        togglepagegiangvien: (page) =>{
            dispatch(action.togglePageGiangVien(page));
        }
    }
}

export default connect(null,mapDispatchToProps)(Themtailieu);
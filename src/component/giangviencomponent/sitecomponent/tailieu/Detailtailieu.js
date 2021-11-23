import { Component } from "react";
import { connect } from "react-redux";
import * as action from './../../../../actions/index';
import Tailieu from './../Tailieu';

class Detailtailieu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tentl: '',
            mota: '',
            gia: '',
            anhtl: '',
            filedemo: '',
            sotrang: '',
            link: ''
        }
    }

    componentWillMount() {
        var idtailieu = sessionStorage.getItem('idtailieu');
        var matailieu = JSON.parse(idtailieu);
        this.props.requestMotTaiLieu(matailieu.id);
        
    }

    componentWillReceiveProps(){
        var tailieu = this.props.tailieu;
        var tl = tailieu[0];
        this.setState({
            tentl: tailieu.TenTL === undefined ? tl.TenTL : tailieu.TenTL,
            mota: tailieu.MoTa === undefined ? tl.MoTa : tailieu.MoTa,
            gia: tailieu.GiaTL === undefined ? tl.GiaTL : tailieu.GiaTL,
            anhtl: tailieu.AnhTL === undefined ? tl.AnhTL : tailieu.AnhTL,
            filedemo: tailieu.Demo === undefined ? tl.Demo : tailieu.Demo,
            sotrang: tailieu.SoTrang === undefined ? tl.SoTrang : tailieu.SoTrang,
            link: tailieu.Link === undefined ? tl.Link : tailieu.Link
        })
    }

    tooglePage = (page) => {
        this.props.togglepagegiangvien(page);
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
        var { tentl, mota, gia, anhtl, filedemo, sotrang, link } = this.state;
        return (
            <div className="themkhoahoc">
                <div className="container">
                    <a onClick={() => this.tooglePage(<Tailieu />)}>
                        <button className="btn btn-primary">Quay lại</button>
                    </a>
                </div>

                <h3>Thông tin tài liệu</h3>
                <form>
                    <label>Tên tài liệu</label>
                    <input className="form-control"
                        type="text"
                        value={tentl}
                        name="tentl"
                        onChange={this.onChange}
                        placeholder="VD: Tài liệu ..." />
                    <br />
                    <label>Mô tả</label>
                    <textarea className="form-control"
                        type="text"
                        value={mota}
                        name="mota"
                        onChange={this.onChange}
                        placeholder="VD: Tài liệu sẽ giúp bạn ..."></textarea>
                    <br />
                    <label>Giá tài liệu</label>
                    <div className="input-group mb-3">
                        <input className="form-control"
                            type="text"
                            value={gia}
                            onChange={this.onChange}
                            name="gia"
                            placeholder="VD: 80000 ..." /><span className="input-group-text">VND</span>
                    </div>
                    <br />
                    <label>Ảnh tài liệu</label>
                    <input className="form-control"
                        type="text"
                        value={anhtl}
                        name="anhtl"
                        onChange={this.onChange}
                        placeholder="Dán id file google drive ở đây ..." />
                    <br />
                    <label>File demo tài liệu</label>
                    <input className="form-control"
                        type="text"
                        value={filedemo}
                        name="filedemo"
                        onChange={this.onChange}
                        placeholder="Dán id file google drive ở đây ..." />
                    <br />
                    <label>Số trang tài liệu</label>
                    <input className="form-control"
                        type="text"
                        value={sotrang}
                        name="sotrang"
                        onChange={this.onChange}
                        placeholder="8 ..." />
                    <br />
                    <label>Link tài liệu</label>
                    <input className="form-control"
                        type="text"
                        value={link}
                        name="link"
                        onChange={this.onChange}
                        placeholder="Link file google drive ..." />
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

const mapStateToProps = (state) => {
    return {
        tailieu: state.getmottailieu
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        togglepagegiangvien: (page) => {
            dispatch(action.togglePageGiangVien(page));
        },
        requestMotTaiLieu: (idtailieu) => {
            dispatch(action.requestMotTaiLieu(idtailieu));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detailtailieu);
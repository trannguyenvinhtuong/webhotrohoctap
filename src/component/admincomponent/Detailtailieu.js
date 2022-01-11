import { Component } from "react";
import { connect } from "react-redux";
import * as action from './../../actions/index';
import Tailieu from './Quanlytailieu';
import { Row, Col, Select } from "antd";
import Swal from "sweetalert2";

const { Option } = Select;

class Detailtailieu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matl: '',
            tentl: '',
            mota: '',
            gia: '',
            anhtl: '',
            filedemo: '',
            sotrang: '',
            macd: '1',
            macb: '1',
            link: '',
            up: false
        }
    }

    componentDidMount() {
        var idtailieu = sessionStorage.getItem('idtailieu');
        var matailieu = JSON.parse(idtailieu);
        this.props.requestMotTaiLieu(matailieu.id);
        this.props.requestChuDe();
        this.props.requestCapBac();
        // var user = JSON.parse(localStorage.getItem('user'));
        // var idkh = user.makh;
        // this.props.requestCheckGV(idkh);
        this.setState({
            up: true
        })    
    }

    componentWillReceiveProps(){        
            var tailieu = this.props.tailieu;
            var tl = tailieu[0];
            this.setState({
                matl: tailieu.MaTL === undefined ? tl.MaTL : tailieu.MaTL,
                tentl: tailieu.TenTL === undefined ? tl.TenTL : tailieu.TenTL,
                mota: tailieu.MoTa === undefined ? tl.MoTa : tailieu.MoTa,
                gia: tailieu.GiaTL === undefined ? tl.GiaTL : tailieu.GiaTL,
                anhtl: tailieu.AnhTL === undefined ? tl.AnhTL : tailieu.AnhTL,
                filedemo: tailieu.Demo === undefined ? tl.Demo : tailieu.Demo,
                sotrang: tailieu.SoTrang === undefined ? tl.SoTrang : tailieu.SoTrang,
                link: tailieu.Link === undefined ? tl.Link : tailieu.Link,
                macd: tailieu.MaCD === undefined ? tl.MaCD : tailieu.MaCD,
                macb: tailieu.MaCB === undefined ? tl.MaCB : tailieu.MaCB
            });
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

    tooglePage = (page) => {
        this.props.togglePageAdmin(page);
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        var { matl, tentl, mota,
            gia, anhtl, filedemo, sotrang,
            link, macb, macd } = this.state;
        var date = new Date();
        var ngaydang = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        var { giangvien } = this.props;
        var magv = giangvien[0].MaGV;
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.updateTaiLieu(matl, tentl, mota,
                    magv, macb, macd, gia, anhtl, filedemo, sotrang,
                    ngaydang, link);
                Swal.fire(
                    'Thành công!',
                    'Cập nhật đã lưu.',
                    'success'
                )
                this.tooglePage(<Tailieu />)
            }
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

    onCancer = () => {
        window.location.reload();
    }

    onClear = (e) => {
        e.preventDefault();
        var tailieu = this.props.tailieu;
        var tl = tailieu[0];
        this.setState({
            matl: tailieu.MaTL === undefined ? tl.MaTL : tailieu.MaTL,
            tentl: tailieu.TenTL === undefined ? tl.TenTL : tailieu.TenTL,
            mota: tailieu.MoTa === undefined ? tl.MoTa : tailieu.MoTa,
            gia: tailieu.GiaTL === undefined ? tl.GiaTL : tailieu.GiaTL,
            anhtl: tailieu.AnhTL === undefined ? tl.AnhTL : tailieu.AnhTL,
            filedemo: tailieu.Demo === undefined ? tl.Demo : tailieu.Demo,
            sotrang: tailieu.SoTrang === undefined ? tl.SoTrang : tailieu.SoTrang,
            link: tailieu.Link === undefined ? tl.Link : tailieu.Link,
            macd: tailieu.MaCD === undefined ? tl.MaCD : tailieu.MaCD,
            macb: tailieu.MaCB === undefined ? tl.MaCB : tailieu.MaCB
        });
    }

    render() {
        var { tentl, mota, gia, anhtl, filedemo, sotrang, link, macd, macb } = this.state;
        var { chude, capbac, tailieu } = this.props;
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
                    <Row>
                        <Col span={12}>
                            <label>Thể loại</label>
                            <br />
                            <Select defaultValue={macd} style={{ width: '80%' }} onChange={this.handleChangeCD}>
                                {this.showOptionChuDe(chude)}
                            </Select>
                        </Col>
                        <Col span={12}>
                            <label>Cấp bậc</label>
                            <br />
                            <Select defaultValue={macb} style={{ width: '80%' }} onChange={this.handleChangeCB}>
                                {this.showOptionCapBac(capbac)}
                            </Select>
                        </Col>
                    </Row>
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
        giangvien: state.checkgv,
        chude: state.getchude,
        capbac: state.getcapbac,
        tailieu: state.getmottailieu
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        togglePageAdmin: (page) => {
            dispatch(action.togglePageAdmin(page));
        },
        requestMotTaiLieu: (idtailieu) => {
            dispatch(action.requestMotTaiLieu(idtailieu));
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
        updateTaiLieu: (matl, tentl, mota,
            magv, macb, macd, giatl, anhtl, demo, sotrang,
            ngaydang, link) => {
            dispatch(action.updateTaiLieu(matl, tentl, mota,
                magv, macb, macd, giatl, anhtl, demo, sotrang,
                ngaydang, link));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detailtailieu);
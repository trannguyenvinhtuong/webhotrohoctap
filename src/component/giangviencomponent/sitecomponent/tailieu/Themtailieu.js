import { Component } from "react";
import { connect } from "react-redux";
import * as action from './../../../../actions/index';
import Tailieu from './../Tailieu';
import { Row, Col, Select } from "antd";
import Swal from "sweetalert2";

const { Option } = Select;

class Themtailieu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tentl: '',
            mota: '',
            macb: '1',
            macd: '1',
            anhtl: '',
            giatl: '',
            demo: '',
            sotrang: '',
            link: ''
        }
    }

    componentDidMount() {
        this.props.requestChuDe();
        this.props.requestCapBac();
        var user = JSON.parse(localStorage.getItem('user'));
        this.props.requestCheckGV(user.makh);
    }


    tooglePage = (page) => {
        this.props.togglepagegiangvien(page);
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

    onClear = () => {
        this.setState({
            tentl: '',
            mota: '',
            macb: '',
            macd: '',
            anhtl: '',
            giatl: '',
            demo: '',
            sotrang: '',
            link: ''
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

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        var { tentl, mota, macb, macd, anhtl, demo, sotrang, link, giatl } = this.state;
        var { giangvien } = this.props;
        // var idgv = JSON.parse(sessionStorage.getItem('magv'));
        // var magv = idgv.id;
        var magv = giangvien[0].MaGV;
        var date = new Date();

        if (anhtl) {
            anhtl = this.getId(anhtl);
        }
        if (demo) {
            let id = this.getId(demo);
            demo = "https://drive.google.com/file/d/" + id + "/preview";
        }
        if (link) {
            let id = this.getId(link);
            link = "https://drive.google.com/file/d/" + id + "/preview";
        }

        var ngaydang = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        if (tentl === '' || mota === '' || magv === '' || macb === '' ||macd === '' ||anhtl === '' ||giatl === '' ||demo === '' ||sotrang === '' ||ngaydang === '' ||link === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui l??ng nh???p ?????y ????? th??ng tin!'
            });
        }
        else if(giatl < 0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui l??ng ??i???n d??? li???u h???p l???!'
            });
        }
        else if(isNaN(giatl)){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui l??ng ??i???n d??? li???u h???p l???!'
            });
        }
        else if(sotrang < 0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui l??ng ??i???n d??? li???u h???p l???!'
            });
        }
        else if(isNaN(sotrang)){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui l??ng ??i???n d??? li???u h???p l???!'
            });
        }
        else {
            this.props.insertTaiLieu(tentl, mota, magv, macb, macd, anhtl, giatl, demo, sotrang, ngaydang, link)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'L??u th??nh c??ng',
                showConfirmButton: false,
                timer: 1500
            });
            window.location.reload();
        }
    }

    onCancel = () => {
        window.location.reload();
    }

    getId = (url) => {
        return url.match(/[-\w]{25,}/);
    }

    render() {
        var { tentl, mota, macb, macd, anhtl, demo, sotrang, link, giatl } = this.state;
        var { chude, capbac } = this.props;
        return (
            <div className="themkhoahoc">
                <div className="container">
                    <a onClick={() => this.tooglePage(<Tailieu />)}>
                        <button className="btn btn-primary">Quay l???i</button>
                    </a>
                </div>

                <h3>Th??m t??i li???u</h3>
                <form>
                    <label>T??n t??i li???u</label>
                    <input className="form-control"
                        type="text"
                        value={tentl}
                        onChange={this.onChange}
                        name="tentl"
                        placeholder="VD: T??i li???u ..." />
                    <br />
                    <Row>
                        <Col span={12}>
                            <label>Th??? lo???i</label>
                            <br />
                            <Select defaultValue={macd} style={{ width: '80%' }} onChange={this.handleChangeCD}>
                                {this.showOptionChuDe(chude)}
                            </Select>
                        </Col>
                        <Col span={12}>
                            <label>C???p b???c</label>
                            <br />
                            <Select defaultValue={macb} style={{ width: '80%' }} onChange={this.handleChangeCB}>
                                {this.showOptionCapBac(capbac)}
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <label>M?? t???</label>
                    <textarea className="form-control"
                        type="text"
                        value={mota}
                        onChange={this.onChange}
                        name="mota"
                        placeholder="VD: T??i li???u s??? gi??p b???n ..."></textarea>
                    <br />
                    <label>Gi?? t??i li???u</label>
                    <div className="input-group mb-3">
                        <input className="form-control"
                            type="text"
                            value={giatl}
                            onChange={this.onChange}
                            name="giatl"
                            placeholder="VD: 80000 ..." /><span className="input-group-text">VND</span>
                    </div>
                    <br />
                    <label>???nh t??i li???u</label>
                    <input className="form-control"
                        type="text"
                        value={anhtl}
                        name="anhtl"
                        onChange={this.onChange}
                        placeholder="D??n id file google drive ??? ????y ..." />
                    <br />
                    <label>File demo t??i li???u</label>
                    <input className="form-control"
                        type="text"
                        value={demo}
                        name="demo"
                        onChange={this.onChange}
                        placeholder="D??n id file google drive ??? ????y ..." />
                    <br />
                    <label>S??? trang t??i li???u</label>
                    <input className="form-control"
                        type="text"
                        value={sotrang}
                        onChange={this.onChange}
                        name="sotrang"
                        placeholder="8 ..." />
                    <br />
                    <label>Link t??i li???u</label>
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
                            <button className="btn btn-success">L??u l???i</button>
                        </a>
                        <a onClick={this.onClear}>
                            <button className="btn btn-warning">Xo?? h???t</button>
                        </a>
                        <a onClick={this.onCancel}>
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
        chude: state.getchude,
        capbac: state.getcapbac,
        giangvien: state.checkgv
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
        insertTaiLieu: (tentl, mota, magv, macb, macd, anh, giatl, demo, sotrang, ngaydang, link) => {
            dispatch(action.insertTaiLieu(tentl, mota, magv, macb, macd, anh, giatl, demo, sotrang, ngaydang, link));
        },
        requestCheckGV: (idkh) => {
            dispatch(action.requestCheckGV(idkh));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Themtailieu);
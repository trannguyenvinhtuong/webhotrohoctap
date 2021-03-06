import { Component } from "react";
import { Row, Col, Select } from "antd";
import { connect } from "react-redux";
import * as action from './../../../../actions/index';
import './../../../../SASS/quantritk.sass';
import Swal from "sweetalert2";
import Dethicuatoi from "../Dethicuatoi";

import db from './../../../../config/firebase.config';
import { ref, child, get, set } from "firebase/database";


const { Option } = Select;

class Themde extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tende: '',
            macd: '1',
            macb: '1',
            cauhoi: '',
            dapanA: '',
            dapanB: '',
            dapanC: '',
            dapanD: '',
            dapan: '',
            dethi: []
        }
    }

    componentDidMount() {
        this.props.requestChuDe();
        this.props.requestCapBac();
        const dbref = ref(db);
        get(child(dbref, "nganhangde")).then((snapshot) => {
            if (snapshot.exists()) {
                this.setState({
                    dethi: snapshot.val()
                });
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
        var user = JSON.parse(localStorage.getItem('user'));
        var idkh = user.makh;
        this.props.requestCheckGV(idkh);
    }

    tooglePage = (page) => {
        this.props.togglepagegiangvien(page);
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

    onCancer = () => {
        window.location.reload();
    }

    onClear = () => {
        this.setState({
            tende: '',
            macd: '1',
            macb: '1',
            cauhoi: '',
            dapanA: '',
            dapanB: '',
            dapanC: '',
            dapanD: '',
            dapan: ''
        });
    }

    onSubmit = () => {
        var { tende, macd, macb, cauhoi, dapanA, dapanB, dapanC, dapanD, dapan, dethi } = this.state;
        
        var { giangvien } = this.props;
        var magv = giangvien[0].MaGV;
        if(tende === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui l??ng nh???p ?????y ????? th??ng tin!'
            });
        }
        else{
            const dbref = ref(db, "nganhangde");
            set(child(dbref, dethi.length.toString()), {
                ten: tende,
                macb: macb,
                macd: macd,
                ma: dethi.length.toString(),
                magv: magv,
                bocauhoi: '0'
            });
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Th??m m???i th??nh c??ng',
                showConfirmButton: false,
                timer: 1500
            });
            this.tooglePage(<Dethicuatoi />);
        }        
    }

    render() {
        var { tende, macd, macb, cauhoi, dapanA, dapanB, dapanC, dapanD, dapan } = this.state;
        var { chude, capbac } = this.props;
        return (
            <div className="themkhoahoc container">
                <h3>Th??m ????? ki???m tra</h3>
                <label>T??n ?????</label>
                <input className="form-control"
                    name="tende"
                    value={tende}
                    onChange={this.onChange}
                    type="text"
                    placeholder="VD: Kho?? h???c l??m gi??u ..." />
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        giangvien: state.checkgv,
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
        requestCheckGV: (idkh) => {
            dispatch(action.requestCheckGV(idkh));
        },
        requestCapBac: () => {
            dispatch(action.requestCapBac());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Themde);
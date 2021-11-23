import { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import * as action from './../../actions/index';
import { Radio, Space } from 'antd';
import './../../SASS/khoahoc.sass';
// firebase
import db from './../../config/firebase.config';
import { ref, child, get } from "firebase/database";

class Kiemtra extends Component {
    constructor(props){
        super(props);
        this.state={
            cautraloiloai1: '',
            cautraloiloai2: '',
            cautraloiloai3: ''
        }
    }
    componentDidMount() {
        const dbRef = ref(db, "nganhangde");
        get(child(dbRef, "1")).then((snapshot) => {
            if (snapshot.exists()) {
                this.props.getdekiemtra(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    showCauHoi = (data) => {
        var rs = null;
        if (data) {
            rs = data.map((da, index) => {
                if (da.loaide == "tuluan") {
                    return (
                        <div className="kiemtra">
                            <h3>{da.ten}</h3>
                            <h3>{da.cauhoi}</h3>
                            <input type="text" name="cautraloiloai1" />
                        </div>
                    );
                }
                else if (da.loaide == "tracnghiem") {
                    return (
                        <div className="kiemtra">
                            <h3>{da.ten}</h3>
                            <h3>{da.cauhoi}</h3>
                            <Radio.Group>
                                <Space direction="vertical">
                                    <Radio value={1} className="white-color">A  {da.dapan.A}</Radio>
                                    <Radio value={2} className="white-color">B  {da.dapan.B}</Radio>
                                    <Radio value={3} className="white-color">C  {da.dapan.C}</Radio>
                                    <Radio value={4} className="white-color">D  {da.dapan.D}</Radio>
                                </Space>
                            </Radio.Group>

                        </div>
                    );
                }
                else if (da.loaide == "dienkhuyet") {
                    return (
                        <div className="cauhoidienkhuyet">
                            <h3>{da.ten}</h3>
                            {da.cauhoi.noidung1}
                            <span>
                                <input type="text" />
                            </span>
                            {da.cauhoi.noidung2}
                            <span>
                                <input type="text" />
                            </span>
                            {da.cauhoi.noidung3}
                            <span>
                                <input type="text" />
                            </span>
                            {da.cauhoi.noidung4}
                            <span>
                                <input type="text" />
                            </span>
                            {da.cauhoi.noidung5}
                            <span>
                                <input type="text" />
                            </span>
                        </div>
                    );
                }
            })
        }
        return rs;
    }

    render() {
        var { getde, togglekiemtra } = this.props;
        return (
            <Row>
                <Col span={togglekiemtra == true ? 24 : 0}>
                    {this.showCauHoi(getde[1])}
                    <br />
                    <br />
                    <button className="btn-nopbai">Nộp bài</button>

                </Col>
                <Col span={togglekiemtra == false ? 24 : 0}>
                    <div></div>
                </Col>

            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        togglekiemtra: state.togglekiemtra,
        getde: state.getdekiemtra
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getdekiemtra: (dekt) => {
            dispatch(action.getDeKiemTra(dekt))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Kiemtra);
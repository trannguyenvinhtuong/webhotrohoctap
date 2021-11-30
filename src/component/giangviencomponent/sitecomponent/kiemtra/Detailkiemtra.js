import { Component } from "react";
import { Radio, Space } from 'antd';
import { connect } from "react-redux";
import * as action from './../../../../actions/index';
import Dethicuatoi from "../Dethicuatoi";
import { Modal } from "antd";
import Swal from "sweetalert2";

import db from './../../../../config/firebase.config';
import { ref, child, get, set, remove } from "firebase/database";


class Detailkiemtra extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ten: '',
            cautraloi: [],
            showThemCauHoi: false,
            cauhoi: '',
            dapanA: '',
            dapanB: '',
            dapanC: '',
            dapanD: '',
            dapan: ''
        }
    }

    componentDidMount() {
        var madethi = JSON.parse(sessionStorage.getItem('madethi'));
        var id = madethi.made;
        const dbRef = ref(db, "nganhangde");
        get(child(dbRef, id.toString())).then((snapshot) => {
            if (snapshot.exists()) {
                this.props.getdekiemtra(snapshot.val().bocauhoi);
                this.setState({
                    ten: snapshot.val().ten
                })
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
                var ham = 'onChange' + index;
                return (
                    <div className="kiemtra">
                        <h3>Câu {(index + 1)}: {da.cauhoi}</h3>
                        <a>
                            <button className="btn btn-primary">Sửa</button>
                        </a>
                        <a onClick={() => this.onDeleteQ(index)}>
                            <button className="btn btn-danger" style={{ marginLeft: '15px' }}>Xoá</button>
                        </a>
                        <br />
                        <br />
                        <Radio.Group key={index} onChange={e => this.onChangeSelect(e.target.value, index)}>
                            <Space direction="vertical" key={index}>
                                <Radio value={1}>A  {da.A}</Radio>
                                <Radio value={2}>B  {da.B}</Radio>
                                <Radio value={3}>C  {da.C}</Radio>
                                <Radio value={4}>D  {da.D}</Radio>
                            </Space>
                        </Radio.Group>
                        <br />
                    </div>

                )
            })
        }
        return rs;
    }

    onDeleteQ = (idch) => {
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
                var madethi = JSON.parse(sessionStorage.getItem('madethi'));
                var id = madethi.made;
                var adaRef = ref(db, 'nganhangde/' + id.toString() + '/bocauhoi/' + idch.toString());

                adaRef.remove()
                    .then(function () {
                        console.log("Remove succeeded.")
                    })
                    .catch(function (error) {
                        console.log("Remove failed: " + error.message)
                    });
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    tooglePage = (page) => {
        this.props.togglepagegiangvien(page);
    }

    onChangeSelect = (value, id) => {
        var { cautraloi } = this.state;
        if (value === 1) {
            cautraloi.push({ 'id': id, 'dapan': 'A' });
        }
        else if (value === 2) {
            cautraloi.push({ 'id': id, 'dapan': 'B' });
        }
        else if (value === 3) {
            cautraloi.push({ 'id': id, 'dapan': 'C' });
        }
        else {
            cautraloi.push({ 'id': id, 'dapan': 'D' });

        }
        this.setState({
            cautraloi: cautraloi
        })
    }

    onAddNew = () => {
        this.setState({
            showThemCauHoi: true
        })
    }

    handleOkThem = () => {
        var { cauhoi, dapanA, dapanB, dapanC, dapanD, dapan } = this.state;
        var { getde } = this.props;
        var i = getde.length;
        var madethi = JSON.parse(sessionStorage.getItem('madethi'));
        var id = madethi.made;
        const dbref = ref(db, "nganhangde");
        const dbref2 = child(dbref, id.toString());
        const dbref3 = child(dbref2, "bocauhoi");
        if (getde == 0) {
            set(child(dbref3, "0"), {
                cauhoi: cauhoi,
                A: dapanA,
                B: dapanB,
                C: dapanC,
                D: dapanD,
                dapan: dapan
            });
        }
        else {
            set(child(dbref3, i.toString()), {
                cauhoi: cauhoi,
                A: dapanA,
                B: dapanB,
                C: dapanC,
                D: dapanD,
                dapan: dapan
            });
        }
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
        });
        this.setState({
            showThemCauHoi: false,
            cauhoi: '',
            dapanA: '',
            dapanB: '',
            dapanC: '',
            dapanD: '',
            dapan: ''
        });
        this.onRefesh();
    }

    handleCancelThem = () => {
        this.setState({
            showThemCauHoi: false
        });
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    onRefesh = () => {
        this.forceUpdate();
    }

    render() {
        var { cauhoi, dapanA, dapanB, dapanC, dapanD, dapan } = this.state;
        var { getde } = this.props;
        var { ten, showThemCauHoi } = this.state;
        return (
            <div>
                <br />
                <h2 style={{ textAlign: 'center' }}>{ten}</h2>
                <br />
                {this.showCauHoi(getde)}
                <br />
                {getde.length < 10 ? <a onClick={this.onAddNew}><button className="btn btn-success">Thêm câu hỏi</button></a> : ''}
                <br />
                <br />
                <div>
                    <a style={{ float: 'left' }} onClick={() => this.tooglePage(<Dethicuatoi />)}>
                        <button className="btn-nopbai btn-primary">Quay lại</button>
                    </a>
                    <a style={{ float: 'left' }} onClick={this.onRefesh}>
                        <button className="btn-nopbai btn-primary">Quay lại</button>
                    </a>
                </div>
                <br />
                <br />
                <br />
                <br />

                {/* modal  */}
                <Modal title="Thêm câu hỏi" visible={showThemCauHoi} onOk={this.handleOkThem} onCancel={this.handleCancelThem}>
                    <div className="themkhoahoc container">
                        <label>Câu hỏi</label>
                        <input className="form-control"
                            name="cauhoi"
                            value={cauhoi}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Câu hỏi ....." />
                        <br />
                        <label>Đáp án A:</label>
                        <input className="form-control"
                            name="dapanA"
                            value={dapanA}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Đáp án A ....." />
                        <br />
                        <label>Đáp án B:</label>
                        <input className="form-control"
                            name="dapanB"
                            value={dapanB}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Đáp án B ....." />
                        <br />
                        <label>Đáp án C:</label>
                        <input className="form-control"
                            name="dapanC"
                            value={dapanC}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Đáp án C ....." />
                        <br />
                        <label>Đáp án D:</label>
                        <input className="form-control"
                            name="dapanD"
                            value={dapanD}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Đáp án D ....." />
                        <br />
                        <label>Đáp án:</label>
                        <input className="form-control"
                            name="dapan"
                            value={dapan}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Đáp án ....." />
                        <br />
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        getde: state.getdekiemtra
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getdekiemtra: (dekt) => {
            dispatch(action.getDeKiemTra(dekt));
        },
        togglepagegiangvien: (page) => {
            dispatch(action.togglePageGiangVien(page));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detailkiemtra);
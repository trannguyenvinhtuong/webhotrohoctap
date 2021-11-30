import { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import * as action from './../../actions/index';
import { Radio, Space } from 'antd';
import './../../SASS/khoahoc.sass';
import Swal from "sweetalert2";
import { withRouter } from 'react-router-dom';
// firebase
import db from './../../config/firebase.config';
import { ref, child, get } from "firebase/database";

class Kiemtra extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cautraloi: [],
            dapan: [],
            socaudung: 0,
            socausai: 0,
            ten: '',
            made: ''
        }
    }

    componentDidMount() {
        var { match } = this.props;
        var id = match.params.idkt;
        this.setState({
            made: id
        })
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

    addDapAn = (de) => {
        var dapan = [];
        if (de) {
            de.map((d) => {
                dapan.push(d.dapan);
            });
        }
        this.setState({
            dapan: dapan
        })
    }

    onSubmit = () => {
        var { getde } = this.props;
        this.addDapAn(getde);

        Swal.fire({
            title: 'Bạn có muốn nộp?',
            text: "Bạn không thể làm lại!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                var { dapan, cautraloi } = this.state;
                this.kiemTraKetQua(dapan, cautraloi);
                Swal.fire(
                    'Nộp bài!',
                    'Bài của bạn đã nộp thành công.',
                    'success'
                );
                this.tinhDiem();
            }
        })

    }

    showCauHoi = (data) => {
        var rs = null;
        if (data) {
            rs = data.map((da, index) => {
                var ham = 'onChange' + index;
                return (
                    <div className="kiemtra">
                        <h3>Câu {(index + 1)}: {da.cauhoi}</h3>
                        <Radio.Group key={index} onChange={e => this.onChange(e.target.value, index)}>
                            <Space direction="vertical">
                                <Radio value={1}>A  {da.A}</Radio>
                                <Radio value={2}>B  {da.B}</Radio>
                                <Radio value={3}>C  {da.C}</Radio>
                                <Radio value={4}>D  {da.D}</Radio>
                            </Space>
                        </Radio.Group>
                    </div>
                )
            })
        }
        return rs;
    }

    onChange = (value, id) => {
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

    kiemTraKetQua = (dapan, cautraloi) => {
        var socaudung = 0;
        var socausai = 0;
        for (let i = 0; i < 10; i++) {
            cautraloi.forEach(element => {
                if (element.id == i) {
                    if (element.dapan == dapan[i]) {
                        socaudung++;
                    }
                    else {
                        socausai++;
                    }
                }
            });
        }
        this.setState({
            socaudung: socaudung,
            socausai: socausai
        });
    }

    tinhDiem = () => {
        var { socaudung,made,ten } = this.state;
        var iSocaudung = parseInt(socaudung);
        var diem = iSocaudung * 0.5;
        sessionStorage.setItem('diem', JSON.stringify({ 'diem': diem }));
        var user = JSON.parse(localStorage.getItem('user'));
        var makh = user.makh;
        this.props.insertKetQua(makh,made,diem,ten);
        this.props.history.push('/nguoidung/hoanthanhkiemtra');
    }

    onDeleteAll = () => {
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
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                window.location.reload();
            }
        })

    }

    onCancel = () => {
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
                this.props.history.push('/nguoidung/alldisplaydethi');
            }
        })
    }

    render() {
        var { getde } = this.props;
        var { ten } = this.state;
        return (
            <div className="container" style={{ marginTop: '6rem' }}>
                <br />
                <h2 style={{ textAlign: 'center' }}>{ten}</h2>
                <br />
                {this.showCauHoi(getde)}
                <br />
                <br />
                <div>
                    <a onClick={this.onSubmit} style={{ float: 'left' }}>
                        <button className="btn-nopbai btn-success">Nộp bài</button>
                    </a>
                    <a onClick={this.onDeleteAll} style={{ float: 'left', marginLeft: '50px' }}>
                        <button className="btn-nopbai btn-danger">Xoá hết</button>
                    </a>
                    <a onClick={this.onCancel} style={{ float: 'left', marginLeft: '50px' }}>
                        <button className="btn-nopbai btn-primary">Huỷ bỏ</button>
                    </a>
                </div>
                <br />
                <br />
                <br />
                <br />
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
        insertKetQua: (makh,made,diem,tende) =>{
            dispatch(action.insertKetQua(makh,made,diem,tende));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Kiemtra));
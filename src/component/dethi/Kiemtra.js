import { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import * as action from './../../actions/index';
import { Radio, Space, Checkbox } from 'antd';
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
            made: '',
            time: {},
            seconds: 900
        }
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
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
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
        this.startTimer();
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    startTimer() {
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds == 0) {
            clearInterval(this.timer);
            
            var { getde } = this.props;
            this.addDapAn(getde);

            this.kiemTraKetQua();
            Swal.fire({
                icon: 'error',
                title: 'Th???i gian ???? h???t',
                text: 'B??i ki???m tra c???a b???n ???? n???p th??nh c??ng'
            });
            this.tinhDiem();
        }
    }

    addDapAn = (de) => {
        var dapan = [];
        if (de) {
            de.map((d, index) => {
                if (d.dapan.length <= 1) {
                    dapan.push({ 'id': index, 'dapan': d.dapan, 'tong': '1' });
                }
                else if (d.dapan.length == 3) {
                    let da = [];
                    let dapan1 = d.dapan.slice(0, 1);
                    let dapan2 = d.dapan.slice(2, 3);
                    da.push(dapan1);
                    da.push(dapan2);
                    dapan.push({ 'id': index, 'dapan': da, 'tong': '2' });
                }
                else if (d.dapan.length == 5) {
                    let da = [];
                    let dapan1 = d.dapan.slice(0, 1);
                    let dapan2 = d.dapan.slice(2, 3);
                    let dapan3 = d.dapan.slice(4, 5);
                    da.push(dapan1);
                    da.push(dapan2);
                    da.push(dapan3);
                    dapan.push({ 'id': index, 'dapan': da, 'tong': '3' });
                }
                else if (d.dapan.length == 7) {
                    let da = [];
                    let dapan1 = d.dapan.slice(0, 1);
                    let dapan2 = d.dapan.slice(2, 3);
                    let dapan3 = d.dapan.slice(4, 5);
                    let dapan4 = d.dapan.slice(6, 7);
                    da.push(dapan1);
                    da.push(dapan2);
                    da.push(dapan3);
                    da.push(dapan4);
                    dapan.push({ 'id': index, 'dapan': da, 'tong': '4' });
                }
            });
        }
        this.setState({
            dapan: dapan
        });
    }

    onSubmit = () => {
        var { getde } = this.props;
        this.addDapAn(getde);

        Swal.fire({
            title: 'B???n c?? mu???n n???p?',
            text: "B???n kh??ng th??? l??m l???i!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'C??',
            cancelButtonText: 'Kh??ng'
        }).then((result) => {
            if (result.isConfirmed) {
                this.kiemTraKetQua();
                Swal.fire(
                    'N???p b??i!',
                    'B??i c???a b???n ???? n???p th??nh c??ng.',
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
                return (
                    <div className="kiemtra">
                        <h3>C??u {(index + 1)}: {da.cauhoi}</h3>
                        {/* <Radio.Group key={index} onChange={e => this.onChange(e.target.value, index)}>
                            <Space direction="vertical">
                                <Radio value={1}>A  {da.A}</Radio>
                                <Radio value={2}>B  {da.B}</Radio>
                                <Radio value={3}>C  {da.C}</Radio>
                                <Radio value={4}>D  {da.D}</Radio>
                            </Space>
                        </Radio.Group> */}
                        {/* <Checkbox.Group options={plainOptions} onChange={e => this.onChange(e.target.checked,index)} /> */}
                        <Checkbox onChange={e => this.onChange(e.target.checked, index, 'A')}>A  {da.A}</Checkbox>
                        <Checkbox onChange={e => this.onChange(e.target.checked, index, 'B')}>B  {da.B}</Checkbox>
                        <Checkbox onChange={e => this.onChange(e.target.checked, index, 'C')}>C  {da.C}</Checkbox>
                        <Checkbox onChange={e => this.onChange(e.target.checked, index, 'D')}>D  {da.D}</Checkbox>
                    </div>
                )
            })
        }
        return rs;
    }

    onChange = (value, id, dapan) => {
        var { cautraloi } = this.state;
        if (value === true) {
            var res = false;
            // push vo cai cu 
            if (cautraloi.length > 0) {
                cautraloi.map((ctr, index) => {
                    if (ctr.id == id) {
                        cautraloi.splice(index, 1);
                        var da = ctr.dapan;
                        var newda = [];
                        if (da.length > 1) {
                            da.map((d) => {
                                newda.push(d);
                            });
                        }
                        else {
                            newda.push(da);
                        }
                        newda.push(dapan);
                        cautraloi.push({ 'id': id, 'dapan': newda });
                        res = true;
                    }
                })
            }
            // push moi 
            if (res == false) {
                var da = cautraloi;
                da.push({ 'id': id, 'dapan': dapan.toString() });

            }

        }
        else if (value === false) {
            cautraloi.map((ctl, index) => {
                if (ctl.id == id) {
                    var cau = [];
                    cau = ctl.dapan;
                    if (cau.length > 1) {
                        var ct = cau.indexOf(dapan);
                        cau.splice(ct, 1);
                    }
                    //fix bug
                    else {
                        ctl.dapan = [];
                    }
                }
            })
        }
        this.setState({
            cautraloi: cautraloi
        })
    }


    // onChange = (value, id) => {
    //     var { cautraloi } = this.state;
    //     if (value === 1) {
    //         cautraloi.push({ 'id': id, 'dapan': 'A' });
    //     }
    //     else if (value === 2) {
    //         cautraloi.push({ 'id': id, 'dapan': 'B' });
    //     }
    //     else if (value === 3) {
    //         cautraloi.push({ 'id': id, 'dapan': 'C' });
    //     }
    //     else {
    //         cautraloi.push({ 'id': id, 'dapan': 'D' });

    //     }
    //     this.setState({
    //         cautraloi: cautraloi
    //     })
    // }

    kiemTraKetQua = () => {
        var { dapan, cautraloi } = this.state;
        var socaudung = 0;
        var socausai = 0;

        for (let i = 0; i < 10; i++) {
            cautraloi.forEach(element => {
                if (element.id == dapan[i].id) {
                    if (element.dapan.length == dapan[i].tong) {
                        if (dapan[i].dapan.length <= 1) {
                            if (element.dapan == dapan[i].dapan) {
                                socaudung++;
                            }
                            else {
                                socausai++;
                            }
                        }
                        else if (dapan[i].dapan.length == 2) {
                            let da = dapan[i].dapan;
                            let ele = element.dapan;
                            let tt = dapan[i].tong;
                            let dem = 0;
                            if (da[0] == ele[0]) {
                                dem++;
                            }
                            if (da[1] == ele[1]) {
                                dem++;
                            }
                            if (dem == tt) {
                                socaudung++;
                            }
                            else {
                                socausai++;
                            }
                        }
                        else if (dapan[i].dapan.length == 3) {
                            let da = dapan[i].dapan;
                            let ele = element.dapan;
                            let tt = dapan[i].tong;
                            let dem = 0;
                            if (da[0] == ele[0]) {
                                dem++;
                            }
                            if (da[1] == ele[1]) {
                                dem++;
                            }
                            if (da[2] == ele[2]) {
                                dem++;
                            }
                            if (dem == tt) {
                                socaudung++;
                            }
                            else {
                                socausai++;
                            }
                        }
                        else if (dapan[i].dapan.length == 4) {
                            let da = dapan[i].dapan;
                            let ele = element.dapan;
                            let tt = dapan[i].tong;
                            let dem = 0;
                            if (da[0] == ele[0]) {
                                dem++;
                            }
                            if (da[1] == ele[1]) {
                                dem++;
                            }
                            if (da[2] == ele[2]) {
                                dem++;
                            }
                            if (da[3] == ele[3]) {
                                dem++;
                            }
                            if (dem == tt) {
                                socaudung++;
                            }
                            else {
                                socausai++;
                            }
                        }
                    }
                    else if (element.dapan.length != dapan[i].tong) {
                        socausai++;
                        console.log("sai");
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
        var { socaudung, socausai, made, ten } = this.state;
        var iSocaudung = parseInt(socaudung);
        var diem = iSocaudung * 1;
        sessionStorage.setItem('diem', JSON.stringify({ 'diem': diem, 'socaudung': socaudung, 'socausai': socausai, 'made': made }));
        var user = JSON.parse(localStorage.getItem('user'));
        var makh = user.makh;
        var date = new Date();
        var ngaylambai = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        this.props.insertKetQua(makh, made, diem, ten, ngaylambai);
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
            <div className="container" style={{ marginTop: '4.3rem' }} >
                <br />
                <h2 style={{ textAlign: 'center' }}>{ten}</h2>                
                <div className="timer-kiemtra">
                    <p>Th???i gian c??n l???i: <span>{this.state.time.m}</span> ph??t <span>{this.state.time.s}</span> gi??y</p>
                </div>
                <p className="kt-alert"><i class="fas fa-exclamation"></i> H???t th???i gian l??m b??i, h??? th???ng s??? t??? n???p b??i ki???m tra c???a b???n</p>
                {this.showCauHoi(getde)}
                <br />
                <br />
                <div>
                    <a onClick={this.onSubmit} style={{ float: 'left' }}>
                        <button className="btn-nopbai btn-success">N???p b??i</button>
                    </a>
                    <a onClick={this.onDeleteAll} style={{ float: 'left', marginLeft: '50px' }}>
                        <button className="btn-nopbai btn-danger">Xo?? h???t</button>
                    </a>
                    <a onClick={this.onCancel} style={{ float: 'left', marginLeft: '50px' }}>
                        <button className="btn-nopbai btn-primary">Hu??? b???</button>
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
        insertKetQua: (makh, made, diem, tende, ngaylambai) => {
            dispatch(action.insertKetQua(makh, made, diem, tende, ngaylambai));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Kiemtra));
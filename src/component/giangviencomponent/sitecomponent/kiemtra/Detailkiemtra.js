import { Component } from "react";
import { Radio, Space } from 'antd';
import { connect } from "react-redux";
import * as action from './../../../../actions/index';
import Dethicuatoi from "../Dethicuatoi";
import { Modal, Checkbox } from "antd";
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
            showSuaCauHoi: false,
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
                if (da.cauhoi != 'khongco') {
                    return (
                        <div className="kiemtra">
                            <h3>Câu {(index + 1)}: {da.cauhoi}</h3>
                            <a onClick={() => this.onEditQ(index)}>
                                <button className="btn btn-primary">Sửa</button>
                            </a>
                            <a onClick={() => this.onDeleteQ(index)}>
                                <button className="btn btn-danger" style={{ marginLeft: '15px' }}>Xoá</button>
                            </a>
                            <br />
                            <br />
                            <Checkbox onChange={e => this.onChangeSelect(e.target.checked, index, 'A')}>A  {da.A}</Checkbox>
                            <br />
                            <Checkbox onChange={e => this.onChangeSelect(e.target.checked, index, 'B')}>B  {da.B}</Checkbox>
                            <br />
                            <Checkbox onChange={e => this.onChangeSelect(e.target.checked, index, 'C')}>C  {da.C}</Checkbox>
                            <br />
                            <Checkbox onChange={e => this.onChangeSelect(e.target.checked, index, 'D')}>D  {da.D}</Checkbox>
                            
                            <br />
                            <br />
                            <p style={{ color: 'black' }}>Đáp án: {da.dapan}</p>
                        </div>
                    )
                }
            })
        }
        return rs;
    }

    onEditQ = (idch) => {
        var { getde } = this.props;
        var de = getde[idch];
        this.setState({
            showSuaCauHoi: true,
            cauhoi: de.cauhoi,
            dapanA: de.A,
            dapanB: de.B,
            dapanC: de.C,
            dapanD: de.D,
            dapan: de.dapan
        });
        sessionStorage.removeItem('suach');
        sessionStorage.setItem('suach', JSON.stringify({ 'ma': idch }));
    }

    handleCancelSua = () => {
        this.setState({
            showSuaCauHoi: false,
            cauhoi: '',
            dapanA: '',
            dapanB: '',
            dapanC: '',
            dapanD: '',
            dapan: ''
        })
    }

    handleOkSua = () => {
        var { getde } = this.props;
        var { cauhoi, dapanA, dapanB, dapanC, dapanD, dapan } = this.state;
        var suach = JSON.parse(sessionStorage.getItem('suach'));
        var idch = suach.ma;
        if(cauhoi === '' || dapanA === '' || dapanB === '' || dapanC === '' || dapanD === '' || dapan === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui lòng nhập đầy đủ thông tin!'
            });
        }
        else{
            Swal.fire({
                title: 'Xác nhận',
                text: "Bạn có muốn sửa?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Có',
                cancelButtonText: 'Không'
            }).then((result) => {
                if (result.isConfirmed) {
                    var madethi = JSON.parse(sessionStorage.getItem('madethi'));
                    var id = madethi.made;
                    const dbref = ref(db, "nganhangde");
                    const dbref2 = child(dbref, id.toString());
                    const dbref3 = child(dbref2, "bocauhoi");
                    set(child(dbref3, idch.toString()), {
                        cauhoi: cauhoi,
                        A: dapanA,
                        B: dapanB,
                        C: dapanC,
                        D: dapanD,
                        dapan: dapan
                    });
                    Swal.fire(
                        'Thay đổi thành công!',
                        'Câu hỏi của bạn đã được thay đổi.',
                        'success'
                    );
                    this.onRefesh();
                }
            });
        }       
    }

    onDeleteQ = (idch) => {
        Swal.fire({
            title: 'Xác nhận',
            text: "Bạn có muốn xoá?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
        }).then((result) => {
            if (result.isConfirmed) {
                var madethi = JSON.parse(sessionStorage.getItem('madethi'));
                var id = madethi.made;
                const dbref = ref(db, "nganhangde");
                const dbref2 = child(dbref, id.toString());
                const dbref3 = child(dbref2, "bocauhoi");
                set(child(dbref3, idch.toString()), {
                    cauhoi: 'khongco'
                });

                Swal.fire(
                    'Thành công!',
                    'Đã xoá.',
                    'success'
                )

                this.onRefesh();
            }
        })

    }

    tooglePage = (page) => {
        this.props.togglepagegiangvien(page);
    }

    // onChangeSelect = (value, id) => {
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
    onChangeSelect = (value, id, dapan) => {        
        var { cautraloi } = this.state;
        if(value === true){
            var res = false;
            // push vo cai cu 
            if(cautraloi.length > 0){
                cautraloi.map((ctr,index)=>{
                    if(ctr.id == id){
                        cautraloi.splice(index,1);
                        var da = ctr.dapan;
                        var newda = [];
                        if(da.length > 1){
                            da.map((d)=>{
                                newda.push(d);
                            });
                        }
                        else{
                            newda.push(da);
                        }                    
                        newda.push(dapan);
                        cautraloi.push({ 'id': id, 'dapan': newda });
                        res = true;
                    }                
                })
            }
            // push moi 
            if(res == false){
                var da = cautraloi;
                da.push({ 'id': id, 'dapan': dapan.toString() });
                
            }

        } 
        else if(value ===  false){
            cautraloi.map((ctl,index)=>{
                if(ctl.id == id ){
                    var cau = [];
                    cau = ctl.dapan;
                    if(cau.length > 1){
                        var ct = cau.indexOf(dapan);
                        cau.splice(ct,1);
                    }
                    //fix bug
                    else{
                        ctl.dapan = [];
                    }                    
                }
            })
        }
        this.setState({
            cautraloi : cautraloi
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
        if(cauhoi === '' || dapanA === '' || dapanB === '' || dapanC === '' || dapanD === '' || dapan === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui lòng nhập đầy đủ thông tin!'
            });
        }
        else{
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
                var setda = false;
                for (let j = 0; j < getde.length; j++) {
                    if (getde[j].cauhoi == 'khongco') {
                        set(child(dbref3, j.toString()), {
                            cauhoi: cauhoi,
                            A: dapanA,
                            B: dapanB,
                            C: dapanC,
                            D: dapanD,
                            dapan: dapan
                        });
                        setda = true;
                        break;
                    }
    
                }
                if (setda === false) {
                    set(child(dbref3, i.toString()), {
                        cauhoi: cauhoi,
                        A: dapanA,
                        B: dapanB,
                        C: dapanC,
                        D: dapanD,
                        dapan: dapan
                    });
                }
            }
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Thêm thành công',
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
        this.tooglePage(<Dethicuatoi />);
    }

    render() {
        var { cauhoi, dapanA, dapanB, dapanC, dapanD, dapan } = this.state;
        var { getde } = this.props;
        var { ten, showThemCauHoi, showSuaCauHoi } = this.state;
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

                {/* modal sua  */}
                <Modal title="Sửa câu hỏi" visible={showSuaCauHoi} onOk={this.handleOkSua} onCancel={this.handleCancelSua}>
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
import { Component } from "react";
import * as action from './../../../../actions/index';
import { connect } from "react-redux";
import { Table, Modal } from "antd";
import Swal from "sweetalert2";
import Khoahoc from './../Khoahoc';
import Detailkhoahoc from "./Detailkhoahoc";

//firebase
import db from './../../../../config/firebase.config';
import { ref, child, get, set, remove } from "firebase/database";
import { ref as ref2, uploadBytes } from "firebase/storage";
import storage from "../../../../config/firebaseFireStorage";

class Quanlybaigiang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSua: false,
            showThem: false,
            tenbaigiang: '',
            luutru: '',
            tentailieu: '123',
            dekiemtra: ''
        }
    }
    componentDidMount() {
        var idkhoahoc = sessionStorage.getItem('idkhoahoc');
        var makhoahoc = JSON.parse(idkhoahoc)
        const dbRef = ref(db, "khoahoc");
        get(child(dbRef, makhoahoc.id)).then((snapshot) => {
            if (snapshot.exists()) {
                this.props.getVideoKH(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    showDialogSua = (key, tailieu) => {
        this.setState({
            showSua: true
        });
        var { video } = this.props;
        this.setState({
            tenbaigiang: video[key].ten,
            luutru: video[key].link,
            tentailieu: video[key].tentailieu
        });

        if (tailieu) {
            sessionStorage.removeItem('keyvideo');
            sessionStorage.setItem('keyvideo', JSON.stringify({ 'key': key, 'tailieu': tailieu }));
        }
        else {
            sessionStorage.removeItem('keyvideo');
            sessionStorage.setItem('keyvideo', JSON.stringify({ 'key': key }));
        }

    };

    showDiaglogThem = () => {
        this.setState({
            showThem: true
        });
    }

    getId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return (match && match[2].length === 11)
            ? match[2]
            : null;
    }

    handleOkThem = () => {
        var khoahoc = JSON.parse(sessionStorage.getItem('idkhoahoc'));
        var idkhoahoc = khoahoc.id;
        var { video } = this.props;
        var { tenbaigiang, luutru, tentailieu, dekiemtra } = this.state;
        if (luutru) {
            let videoid = this.getId(luutru);
            luutru = "https://www.youtube.com/embed/" + videoid;
        }
        if(tenbaigiang === '' || luutru === '' || tentailieu === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui l??ng ??i???n d??? li???u h???p l???!'
            });
        }

        else{
            Swal.fire({
                title: 'X??c nh???n',
                text: "B???n c?? mu???n th??m",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'C??!',
                cancelButtonText: 'Kh??ng'
            }).then((result) => {
                if (result.isConfirmed) {
                    const dbref = ref(db, "khoahoc");
                    const dbref2 = child(dbref, idkhoahoc.toString());
                    var setthem = false;
                    
                    if (tentailieu != "123") {
                        const storageRef = ref2(storage, "NoiDungKhoaHoc/" + tentailieu.name);
    
                        uploadBytes(storageRef, tentailieu).then((snapshot) => {
                            console.log('Uploaded a blob or file!');
                        });
    
                        if(!dekiemtra){
                            dekiemtra="khongco";
                        }
    
                        for (let i = 0; i < video.length; i++) {
                            if (video[i] == "0") {
                                set(child(dbref2, '0'), {
                                    key: i.toString(),
                                    link: luutru,
                                    ten: tenbaigiang,
                                    tentailieu: tentailieu.name,
                                    dekiemtra: dekiemtra
                                });
                                setthem = true;
                                break;
                            }
                            if (video[i].ten == 'khongco') {
                                set(child(dbref2, i.toString()), {
                                    key: i.toString(),
                                    link: luutru,
                                    ten: tenbaigiang,
                                    tentailieu: tentailieu.name,
                                    dekiemtra: dekiemtra
                                });
                                setthem = true;
                                break;
                            }
                        }
                        if (setthem === false) {
                            set(child(dbref2, (video.length).toString()), {
                                key: (video.length).toString(),
                                link: luutru,
                                ten: tenbaigiang,
                                tentailieu: tentailieu.name,
                                dekiemtra: dekiemtra
                            });
    
                        }
                        Swal.fire(
                            'Th??m th??nh c??ng!',
                            'D??? li???u ???? ???????c th??m.',
                            'success'
                        );
                        this.props.togglepagegiangvien(<Detailkhoahoc />);
                    }
                    else{
                        for (let i = 0; i < video.length; i++) {
                            if (video[i] == "0") {
                                set(child(dbref2, '0'), {
                                    key: i.toString(),
                                    link: luutru,
                                    ten: tenbaigiang,
                                    tentailieu: tentailieu,
                                    dekiemtra: dekiemtra
                                });
                                setthem = true;
                                break;
                            }
                            if (video[i].ten == 'khongco') {
                                set(child(dbref2, i.toString()), {
                                    key: i.toString(),
                                    link: luutru,
                                    ten: tenbaigiang,
                                    tentailieu: tentailieu,
                                    dekiemtra: dekiemtra
                                });
                                setthem = true;
                                break;
                            }
                        }
                        if (setthem === false) {
                            set(child(dbref2, (video.length).toString()), {
                                key: (video.length).toString(),
                                link: luutru,
                                ten: tenbaigiang,
                                tentailieu: tentailieu,
                                dekiemtra: dekiemtra
                            });
    
                        }
                        Swal.fire(
                            'Th??m th??nh c??ng!',
                            'D??? li???u ???? ???????c th??m.',
                            'success'
                        );
                        this.props.togglepagegiangvien(<Detailkhoahoc />);
                    }
                }
            });
        }        
    }

    handleOk = () => {
        var keyvideo = JSON.parse(sessionStorage.getItem('keyvideo'));
        var key = keyvideo.key;
        var tailieu = keyvideo.tailieu;
        var khoahoc = JSON.parse(sessionStorage.getItem('idkhoahoc'));
        var idkhoahoc = khoahoc.id;
        var { video } = this.props;
        var { tenbaigiang, luutru, tentailieu, dekiemtra } = this.state;
        if (luutru) {
            let videoid = this.getId(luutru);
            luutru = "https://www.youtube.com/embed/" + videoid;
        }
        if(tenbaigiang === '' || luutru === '' || tentailieu === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui l??ng ??i???n d??? li???u h???p l???!'
            });
        }
        else{
            Swal.fire({
                title: 'X??c nh???n',
                text: "B???n c?? mu???n s???a",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'C??',
                cancelButtonText: 'Kh??ng'
            }).then((result) => {
                if (result.isConfirmed) {
                    const dbref = ref(db, "khoahoc");
                    const dbref2 = child(dbref, idkhoahoc.toString());
                    set(child(dbref2, key.toString()), {
                        key: key.toString(),
                        link: luutru,
                        ten: tenbaigiang,
                        tentailieu: tentailieu,
                        dekiemtra: dekiemtra
                    });
                    Swal.fire(
                        'S???a th??nh c??ng!',
                        'D??? li???u ???? ???????c c???p nh???t.',
                        'success'
                    )
                    this.props.togglepagegiangvien(<Detailkhoahoc />)
                }
            });
        }       
    }

    handleCancel = () => {
        this.setState({
            showSua: false,
            showThem: false,
            tenbaigiang: '',
            luutru: ''
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

    onDeleteBG = (key) => {
        var khoahoc = JSON.parse(sessionStorage.getItem('idkhoahoc'));
        var idkhoahoc = khoahoc.id;
        Swal.fire({
            title: 'X??c nh???n?',
            text: "B???n c?? mu???n xo???",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'C??',
            cancelButtonText: 'Kh??ng'
        }).then((result) => {
            if (result.isConfirmed) {
                const dbref = ref(db, "khoahoc");
                const dbref2 = child(dbref, idkhoahoc.toString());
                const dbref3 = child(dbref2, key.toString());
                set(child(dbref2, key.toString()), {
                    key: key.toString(),
                    ten: 'khongco'
                });
                Swal.fire(
                    'Th??nh c??ng!',
                    '???? xo??.',
                    'success'
                );
                this.props.togglepagegiangvien(<Detailkhoahoc />)
            }
        })
    }

    checkTenTL = (ten) =>{
        var rs= null;
        if(ten == '123'){
            rs = "kh??ng c??";
        }
        return rs;
    }

    render() {
        var video = this.props.video;
        var hienthi = [];
        hienthi = [...video];
        hienthi.map((vi, index) => {
            if (vi == undefined) {
                hienthi.splice(index, 1);
            }
            if (vi.ten != undefined) {
                if (vi.ten == 'khongco') {
                    hienthi.splice(index, 1);
                }
            }
        });

        const column = [
            {
                title: 'Key',
                dataIndex: 'key'
            },
            {
                title: 'T??n b??i gi???ng',
                render: (record) => <p className="notCap">{record.ten != undefined ? record.ten : ''}</p>
            },
            {
                title: '???????ng d???n l??u tr???',
                render: (record) => <p className="notCap">{record.link != undefined ? record.link : ''}</p>
            },
            {
                title: 'T??i li???u',
                render: (record) => <p className="notCap">{record.tentailieu != undefined ? this.checkTenTL(record.tentailieu) : ''}</p>
            },
            {
                title: 'M?? ????? ki???m tra',
                render: (record) => <p className="notCap">{record.dekiemtra != undefined ? record.dekiemtra : ''}</p>
            },
            {
                title: '',
                render: (record) => <a onClick={() => this.showDialogSua(record.key, record.tentailieu)} className="btn btn-warning">Ch???nh s???a</a>
            },
            {
                title: '',
                render: (record) => <a className="btn btn-danger" onClick={() => this.onDeleteBG(record.key)}>Xo??</a>
            }           
        ]
        var { showSua, showThem, tenbaigiang, luutru, dekiemtra } = this.state;
        return (
            <div className="themkhoahoc">
                <div className="container">
                    <a onClick={this.showDiaglogThem} style={{ float: 'right' }}>
                        <button className="btn btn-success">Th??m b??i gi???ng</button>
                    </a>
                </div>

                <br />
                <Table dataSource={hienthi} rowKey="key" columns={column} />

                {/* modal  */}
                <Modal title="S???a b??i gi???ng" visible={showSua} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <div className="themkhoahoc container">
                        <label>T??n b??i gi???ng</label>
                        <input className="form-control"
                            type="text"
                            value={tenbaigiang}
                            onChange={this.onChange}
                            name="tenbaigiang"
                        />
                        <br />
                        <label>L??u tr???</label>
                        <input className="form-control"
                            type="text"
                            value={luutru}
                            onChange={this.onChange}
                            name="luutru"
                            placeholder="VD: Link ..." />
                        <br />
                        <label>M?? ????? ki???m tra</label>
                        <input className="form-control"
                            type="text"
                            value={dekiemtra}
                            onChange={this.onChange}
                            name="dekiemtra"
                            placeholder="VD: 01"
                        />
                        <br />
                    </div>
                </Modal>

                <Modal title="Th??m b??i gi???ng" visible={showThem} onOk={this.handleOkThem} onCancel={this.handleCancel}>
                    <div className="themkhoahoc container">
                        <label>T??n b??i gi???ng</label>
                        <input className="form-control"
                            type="text"
                            value={tenbaigiang}
                            onChange={this.onChange}
                            name="tenbaigiang"
                            placeholder="VD: B??i h???c 1 ..."
                        />
                        <br />
                        <label>L??u tr???</label>
                        <input className="form-control"
                            type="text"
                            value={luutru}
                            onChange={this.onChange}
                            name="luutru"
                            placeholder="VD: Link ..." />
                        <br />
                        <label>T??i li???u b??i gi???ng</label>
                        <br />
                        <input type="file" onChange={(e) => { this.setState({ tentailieu: e.target.files[0] }) }} />
                        <br />
                        <br />
                        <label>M?? ????? ki???m tra</label>
                        <input className="form-control"
                            type="text"
                            value={dekiemtra}
                            onChange={this.onChange}
                            name="dekiemtra"
                            placeholder="VD: 01"
                        />
                        <br />
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        video: state.getvideokh
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getVideoKH: (video) => {
            dispatch(action.getVideoKH(video));
        },
        togglepagegiangvien: (page) => {
            dispatch(action.togglePageGiangVien(page));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quanlybaigiang);
import { Component } from 'react';
import './../../SASS/khoahoc.sass';
import { Row, Col, Table } from 'antd';
import './../../SASS/detail.sass';
import { connect } from 'react-redux';
import * as action from './../../actions/index';
// import mammoth from 'mammoth';
// firebase
import db from './../../config/firebase.config';
import { ref, child, get } from "firebase/database";
//firestorage
import storage from '../../config/firebaseFireStorage';
import { getDownloadURL } from "firebase/storage";
import * as str  from "firebase/storage";

var mammoth = require("mammoth");

class Khoahoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            link: '',
            ten: ''
        }
    }

    clickShow = (da, ten) => {
        this.setState({
            link: da,
            ten: ten
        });
        this.getFireStorage();
    }

    componentDidMount() {
        var match = this.props.match;
        var idkh = match.match.params.idkhoahoc;
        const dbRef = ref(db);
        get(child(dbRef, idkh)).then((snapshot) => {
            if (snapshot.exists()) {
                this.props.getVideoKH(snapshot.val());
                this.props.getMotKhoaHoc(idkh);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    getFireStorage = () => {
        getDownloadURL(str.ref(storage, 'NoiDungKhoaHoc/test.docx'))
            .then((url)=>{
                this.parseWord(url);
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    readFileInputEventAsArrayBuffer = (files, callback) => {
        var request = new XMLHttpRequest();
        request.open('GET', files, true);
        request.responseType = 'blob';
        request.withCredentials = false;
        request.onload = function () {
            var reader = new FileReader();
            reader.readAsArrayBuffer(request.response);
            reader.onload = function (e) {
                var arrayBuffer = e.target.result;
                callback(arrayBuffer);
            };
        };
        request.send();
    }


    parseWord = (file) => {
        this.readFileInputEventAsArrayBuffer(file, function (arrayBuffer) {
            mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
                .then(function (result) {
                    document.getElementById('word').innerHTML = (result.value);
                })
                .done();
        });
    }

    render() {
        const columns = [
            {
                title: 'Bài học',
                key: 'key',
                render: (record) => <a onClick={() => this.clickShow(record.link, record.ten)} className="namekh">
                    {record.ten === undefined ? '' : record.ten}
                </a>
            }
        ]
        var { link, ten } = this.state;
        var { video, khoahoc } = this.props;
        var kh = khoahoc[0];
        return (
            <div style={{ marginTop: '4.7rem' }}>
                <div className="khoahocvideo">
                    <Row>
                        <Col span={18} className="video-kh">
                            <iframe src={link} width="100%" height="615px" allow="autoplay"></iframe>
                            <h3>{ten}</h3>
                            <br />
                            <h2>Nội dung bài học</h2>
                            <div id="word"></div>
                            <br />
                            <br />
                            <div className="detail-gioithieu" style={{ borderRadius: '3px' }}>
                                <h1>{khoahoc.TenKhoaHoc === undefined ? kh.TenKhoaHoc : khoahoc.TenKhoaHoc}</h1>
                                <p>
                                    {khoahoc.MoTa === undefined ? kh.MoTa : khoahoc.MoTa}
                                </p>
                                <div>
                                    <img src={khoahoc.AnhDaiDien === undefined ? kh.AnhDaiDien : khoahoc.AnhDaiDien} />
                                    <span>{khoahoc.TenKH === undefined ? kh.TenKH : khoahoc.TenKH}</span>
                                    <span>
                                        <i className="far fa-smile" style={{ color: 'yellow' }}></i>
                                        3950 Đánh giá
                                    </span>
                                    <span>
                                        <i className="fas fa-user-graduate"></i>
                                        {khoahoc.SoLuongHV === undefined ? kh.SoLuongHV : khoahoc.SoLuongHV} Học viên
                                    </span>
                                </div>
                            </div>

                        </Col>
                        <Col span={6}>
                            <Table dataSource={video} columns={columns} />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        video: state.getvideokh,
        khoahoc: state.getmotkhoahoc
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getVideoKH: (video) => {
            dispatch(action.getVideoKH(video));
        },
        getMotKhoaHoc: (idkh) => {
            dispatch(action.requestMotKhoaHoc(idkh))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Khoahoc);
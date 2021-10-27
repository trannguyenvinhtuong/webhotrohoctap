import { Component } from 'react';
import './../../SASS/khoahoc.sass';
import { Row, Col, Table } from 'antd';
import './../../SASS/detail.sass';
import { connect } from 'react-redux';
import * as action from './../../actions/index';
import TaiLieu from './TaiLieu';
import Kiemtra from './Kiemtra';
// firebase
import db from './../../config/firebase.config';
import { ref, child, get } from "firebase/database";

class Khoahoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            link: '',
            ten: '',
            tailieu: false
        }
    }

    clickShow = (da, ten) => {
        this.setState({
            link: da,
            ten: ten
        });
    }

    onToggleTaiLieu = () => {
        this.setState({
            tailieu: true
        })
        this.props.toogleTaiLieu();
    }

    onToggleKiemTra = () => {
        this.props.toogleKiemTra();
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
                            <a style={{ color: 'blue', textTransform: 'none' }} onClick={() => this.onToggleTaiLieu()}>Xem tài liệu <i class="fas fa-caret-down"></i></a>
                            <TaiLieu />
                            <br />
                            <br />
                            <h2>Bài kiểm tra</h2>
                            <a style={{ color: 'blue', textTransform: 'none' }} onClick={() => this.onToggleKiemTra()}>Xem đề kiểm tra <i class="fas fa-caret-down"></i></a>
                            <Kiemtra />
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
        },
        toogleTaiLieu: () => {
            dispatch(action.toogleTaiLieu());
        },
        toogleKiemTra: () => {
            dispatch(action.toogleKiemTra());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Khoahoc);
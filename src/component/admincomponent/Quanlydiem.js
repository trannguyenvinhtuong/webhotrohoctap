import { Component } from "react";
import db from './../../config/firebase.config';
import { ref, child, get, remove } from "firebase/database";
import * as action from "./../../actions/index";
import { connect } from "react-redux";
import { Table } from 'antd';
import Detaildiem from "./Detaildiem";
import Swal from "sweetalert2";
import Dashboard from './Dashboard';

class Quanlydiem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dethi: []
        }
    }
    componentDidMount() {
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
        this.props.requestChuDe();
        this.props.requestCapBac();
    }

    showChuDe = (makt) => {
        var rs = null;
        var { chude } = this.props;
        if (chude) {
            rs = chude.map((cb) => {
                if (makt == cb.MaCD) {
                    return (
                        <p className="table-p">{cb.TenCD}</p>
                    )
                }
            });
        }
        return rs;
    }

    showCapBac = (makt) => {
        var rs = null;
        var { capbac } = this.props;
        if (capbac) {
            rs = capbac.map((cb) => {
                if (makt == cb.MaCB) {
                    return (
                        <p className="table-p">{cb.TenCB}</p>
                    )
                }
            });
        }
        return rs;
    }

    onClick = (page, madethi) => {
        this.props.togglePageAdmin(page);
        sessionStorage.removeItem('madethi');
        sessionStorage.setItem('madethi', JSON.stringify({ made: madethi }));
    }

    tooglePage = (page) => {
        this.props.togglePageAdmin(page);
    }

    onDeleteDe = (idde) => {
        Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: "Bạn không thể khôi phục lại!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                var adaRef = ref(db, 'nganhangde/' + idde.toString());
                remove(adaRef)
                    .then(function () {
                        console.log("Remove succeeded.")
                    })
                    .catch(function (error) {
                        console.log("Remove failed: " + error.message)
                    });
                Swal.fire(
                    'Thành công!',
                    'Đề thi của bạn đã xoá.',
                    'success'
                );
                this.tooglePage(<Dashboard />);
            }
        })
    }

    render() {
        var { dethi } = this.state;
        const columns = [
            {
                title: 'Mã đề',
                render: (record) => <p className="table-p">{record.ma}</p>
            },
            {
                title: 'Tên đề',
                render: (record) => <a className="table-p" onClick={() => this.onClick(<Detaildiem />, record.ma)}>{record.ten}</a>
            },
            {
                title: 'Chủ đề',
                render: (record) => this.showChuDe(record.macd)
            },
            {
                title: 'Cấp bậc',
                render: (record) => this.showCapBac(record.macb)
            }            
        ];
        return (
            <div className="giangvien-khoahoc">
                <Table dataSource={dethi} columns={columns} rowKey="ma" />
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
        togglePageAdmin: (page) => {
            dispatch(action.togglePageAdmin(page));
        },
        requestCheckGV: (idkh) => {
            dispatch(action.requestCheckGV(idkh));
        },
        requestChuDe: () => {
            dispatch(action.requestChuDe());
        },
        requestCapBac: () => {
            dispatch(action.requestCapBac());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quanlydiem);
import { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from './../../actions/index';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
})

class Khoahoc extends Component {
    componentDidMount() {
        this.props.requestKhoaHoc();
        this.props.requestALLKMKH();
    }

    showContent = (datainput, km) => {
        var data = [];
        if(datainput.length < 7){
            data = datainput;
        }
        else if(datainput > 6){
            for(let i =0; i<6;i++){
                data.push(datainput[i]);
            }
        }
        var rs = null;
        if (data) {
            rs = data.map((da, index) => {
                return (
                    <div className="col-md-3 p-kh" key={index}>
                        <div className="sanpham">
                            <Link to={`/nguoidung/Detailkhoahoc/${da.MaKhoaHoc}`}>
                                <img src={da.AnhKhoaHoc} />
                                <h3>{da.TenKhoaHoc}</h3>
                                <div className="thongtin-sp row">
                                    <div className="col">
                                        <h1>{da.TenKH}</h1>
                                    </div>
                                    <div className="col">
                                        <p className="giacu">{formatter.format(da.GiaKH)}</p>
                                        <p className="giamoi">
                                            {
                                                this.loadgiagiam(km, da.MaKhoaHoc, da.GiaKH)
                                            }
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                )
            });
        }
        return rs;
    }

    loadgiagiam = (km, idkh, giacu) => {
        var rs = null;
        if (km) {
            km.map((k, index) => {
                if (k.MaKhoaHoc === idkh) {
                    rs = formatter.format((giacu * (100 - k.PhanTramGiam)) / 100)
                }
            })
        }
        return rs;
    }

    render() {
        var { khoahoc } = this.props;
        var { khuyenmai } = this.props;
        return (
            <div className="container khoahoc">
                <h3>KHÓA HỌC</h3>
                <br />
                <div className="row">
                    {this.showContent(khoahoc, khuyenmai)}
                </div>
                <Link to="/nguoidung/alldisplay/0" className="xemthem">Xem thêm
                    <i className="fas fa-angle-double-right" style={{ color: '#0d6efd' }}></i>
                </Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        khoahoc: state.getkhoahoc,
        khuyenmai: state.getallkmkh
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        requestKhoaHoc: () => {
            dispatch(action.requestKhoaHoc());
        },
        requestALLKMKH: () => {
            dispatch(action.requestALLKMKH());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Khoahoc);
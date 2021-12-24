import { Component } from "react";
import { connect } from "react-redux";
import * as action from './../../actions/index';
import {Link} from 'react-router-dom';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
})

class Price extends Component {
    componentDidMount() {
        var { idtailieu } = this.props;
        this.props.requestMotTaiLieu(idtailieu);
        this.props.requestKMTL(idtailieu);
    }

    showTimeKM = (batdau, ketthuc, today) => {
        var rs = null;
        var ngaybd = batdau.slice(8, 10);
        var thangbd = batdau.slice(5, 7);
        var nambd = batdau.slice(0, 4);
        var ngaykt = ketthuc.slice(8, 10);
        var thangkt = ketthuc.slice(5, 7);
        var namkt = ketthuc.slice(0, 4);
        if (ngaybd <= today.getDate() && thangbd <= (today.getMonth() + 1) && nambd <= today.getFullYear()
            && today.getDate() <= ngaykt && (today.getMonth() + 1) <= thangkt && today.getFullYear() <= namkt
        ) {
            rs = (
                <div>
                    <p className="thoigian-ud">
                        <i class="fas fa-hourglass-start"></i>
                        Thời gian ưu đãi còn
                    </p>
                    <p style={{ color: '#db3e3e' }}>
                        {ngaykt - today.getDate()}
                        &nbsp; ngày &nbsp;
                        {thangkt - today.getMonth()}
                        &nbsp; tháng &nbsp;
                        {namkt - today.getFullYear()}
                        &nbsp; năm &nbsp;
                    </p>
                </div>
            )

        }
        return rs;
    }

    render() {
        var { khuyenmai } = this.props;
        var km = khuyenmai[0];
        var { tailieu } = this.props;
        var tl = tailieu[0];
        var ngaybd = khuyenmai.NgayBatDau === undefined ? km.NgayBatDau : khuyenmai.NgayBatDau;
        var ngaykt = khuyenmai.NgayHetHan === undefined ? km.NgayHetHan : khuyenmai.NgayHetHan;
        var today = new Date();

        return (
            <div className="detail-price">
                <div>
                    <h1>{
                        tailieu.GiaTL === undefined && khuyenmai.PhanTramGiam === undefined
                            ? formatter.format(((tl.GiaTL * (100 - km.PhanTramGiam)) / 100))
                            : 0
                    }</h1>
                    <h2>{tailieu.GiaTL === undefined ? formatter.format(tl.GiaTL) : tailieu.GiaTL}</h2>
                    <h3>( - {khuyenmai.PhanTramGiam === undefined ? km.PhanTramGiam : khuyenmai.PhanTramGiam} % )</h3>
                </div>
                <br />
                <br />
                <Link to={`/nguoidung/tailieu/${tailieu.MaTL === undefined ? tl.MaTL : tailieu.MaTL}`}>
                    <button className="themvaogio">
                        <i className="fas fa-cart-plus"></i>
                        Xem miễn phí
                    </button>
                </Link>                
                <br />
                <br />
                <p className="thongtin">
                    <i className="far fa-file-pdf"></i>
                    Số trang:
                    <span>{tailieu.SoTrang === undefined ? tl.SoTrang : tailieu.SoTrang} trang</span>
                </p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        khuyenmai: state.getkmkh,
        tailieu: state.getmottailieu
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        requestKMTL: (idtl) => {
            dispatch(action.requestKMTL(idtl))
        },
        requestMotTaiLieu: (idtl) => {
            dispatch(action.requestMotTaiLieu(idtl));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Price);
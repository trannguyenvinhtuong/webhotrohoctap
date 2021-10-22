import { Component } from "react";
import { connect } from "react-redux";
import * as action from './../../actions/index';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
})

class Price extends Component {
    componentDidMount() {
        var { idkh } = this.props;
        this.props.requestKMKH(idkh);
        this.props.requestMotKhoaHoc(idkh);
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
            rs =
                <p style={{ color: '#db3e3e' }}>
                    {ngaykt - today.getDate()}
                    &nbsp; ngày &nbsp;
                    {thangkt - today.getMonth()}
                    &nbsp; tháng &nbsp;
                    {namkt - today.getFullYear()}
                    &nbsp; năm &nbsp;
                </p>

        }
        return rs;
    }

    addCart = (typecart, id) => {
        var cart = {
            typecart: typecart,
            id: id
        }
        this.props.addCart(cart);        
    }

    render() {
        var { khuyenmai } = this.props;
        var km = khuyenmai[0];
        var { khoahoc } = this.props;
        var kh = khoahoc[0];
        var ngaybd = khuyenmai.NgayBatDau === undefined ? km.NgayBatDau : khuyenmai.NgayBatDau;
        var ngaykt = khuyenmai.NgayHetHan === undefined ? km.NgayHetHan : khuyenmai.NgayHetHan;
        var today = new Date();
        return (
            <div className="detail-price">
                <div>
                    <h1>{
                        khoahoc.GiaKH === undefined && khuyenmai.PhanTramGiam === undefined
                            ? formatter.format(((kh.GiaKH * (100 - km.PhanTramGiam)) / 100))
                            : 0
                    }</h1>
                    <h2>{khoahoc.GiaKH === undefined ? formatter.format(kh.GiaKH) : khoahoc.GiaKH}</h2>
                    <h3>( - {khuyenmai.PhanTramGiam === undefined ? km.PhanTramGiam : khuyenmai.PhanTramGiam} % )</h3>
                </div>
                <br />
                <br />
                <p className="thoigian-ud">
                    <i className="fas fa-hourglass-start"></i>
                    Thời gian ưu đãi còn
                </p>
                {this.showTimeKM(ngaybd, ngaykt, today)}
                <a onClick={()=>this.addCart('kh',khoahoc.MaKhoaHoc === undefined ? kh.MaKhoaHoc : khoahoc.MaKhoaHoc)}>
                    <button className="themvaogio">
                        <i className="fas fa-cart-plus"></i>
                        Thêm vào giỏ
                    </button>
                </a>
                <br />
                <br />
                <p className="thongtin">
                    <i className="far fa-clock"></i>
                    Thời lượng:
                    <span>06 giờ 36 phút</span>
                </p>
                <p className="thongtin">
                    <i className="fas fa-play"></i>
                    Giáo trình:
                    <span>63 bài giảng</span>
                </p>
                <p className="thongtin">
                    <i className="fas fa-history"></i>
                    Sở hữu khóa học trọn đời
                </p>
                <p className="thongtin">
                    <i className="far fa-file"></i>
                    Cấp chứng nhận hoàn thành
                </p>
                <p className="thongtin">
                    <i className="fas fa-percent"></i>
                    Giảm thêm 20% khi thanh toán online
                </p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        khuyenmai: state.getkmkh,
        khoahoc: state.getmotkhoahoc
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        requestKMKH: (idkh) => {
            dispatch(action.requestKMKH(idkh))
        },
        requestMotKhoaHoc: (idkh) => {
            dispatch(action.requestMotKhoaHoc(idkh));
        },
        addCart: (cart) => {
            dispatch(action.addCart(cart));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Price);
import { Component } from "react";
import './../../SASS/thanhtoan.sass';
import './../../stylecss/progressbar.css';
import {withRouter} from 'react-router-dom';
import * as action from "./../../actions/index";
import { connect } from "react-redux";
import {Table} from 'antd';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
})

class Thanhtoanbuoc2 extends Component {
    componentDidMount() {
        var cartdachon = JSON.parse(sessionStorage.getItem('cartdachon'));
        if (cartdachon.length == undefined) {           
            this.props.requestKhoaHocTheoGH(cartdachon.id);
          
        }
        else {
            this.props.resetNhieuKhoaHoc();
            for (let i = 0; i < cartdachon.length; i++) {                
                this.props.requestNhieuKhoaHoc(cartdachon[i].id);         
            }
        }
    }

    onClickReturn = () =>{
        this.props.history.push('/nguoidung/thongtinthanhtoan');
    }

    onClick = () =>{
        var logg = JSON.parse(localStorage.getItem('user'));
        var makh = logg.makh;
        var ghichu = "abc";
        var tongtien = JSON.parse(sessionStorage.getItem('tongtien'));
        var tong = tongtien.tongtien;
        var date = new Date();
        var ngaydat = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();
        var cartdachon = JSON.parse(sessionStorage.getItem('cartdachon'));
        this.props.insertHoaDon(makh,ghichu,tong,ngaydat,cartdachon);
        this.props.history.push('/nguoidung/thanhtoanthanhcong');
    }

    showSoLuong = (id) => {
        var rs = null;
        var cartdachon = JSON.parse(sessionStorage.getItem('cartdachon'));
        cartdachon.map((ca) => {
            if (ca.id === id) {
                rs = ca.soluong;
            }
        });
        return rs;
    }

    render() {
        var {getnhieukhoahoc} = this.props;
        var tong = JSON.parse(sessionStorage.getItem("tongtien"));

        const column = [
            {
                title: '',
                key: 'MaKhoaHoc',
                render: (record) => <img className="img-gh" src={record.AnhKhoaHoc} key={record.MaKhoaHoc} />
            },
            {
                title: 'Tên khóa học',
                key: 'TenKhoaHoc',
                render: (record) => <a className="tenkhoahoc-gh" href="#" key={record.TenKhoaHoc}>{record.TenKhoaHoc}</a>
            },
            {
                title: 'Giảng viên',
                key: 'MaKH',
                render: (record) => <p className="text-giohang">{record.TenKH}</p>
            },
            {
                title: 'Số lượng',
                render: (record) => <input value={this.showSoLuong(record.MaKhoaHoc)} readOnly />
            },
            {
                title: 'Giá',
                key: 'MaKH',
                render: (record) => <div>
                    <p className="text-giohang giacu">{formatter.format(record.GiaKH)}</p>
                    <p className="text-giohang giamoi">{formatter.format(record.GiaKH - (record.GiaKH * record.PhanTramGiam) / 100)}</p>
                </div>
            }
        ];

        return (
            <div className="thanhtoan container">
                <h1>Thanh toán</h1>
                <div className="containerprogress">
                    <ul className="progressbar">
                        <li className="done">Thông tin thanh toán</li>
                        <li className="active">Thông tin giỏ hàng</li>
                        <li className="inactive">Thành công</li>
                    </ul>
                </div>
                <br />
                <br />
                <br />
                <br />
                <Table dataSource={getnhieukhoahoc}
                    columns={column}
                    rowKey="MaKhoaHoc"
                />
                <br />
                <p style={{float: 'right', color: 'red'}}>Tổng tiền: <span>{formatter.format(tong.tongtien)}</span></p>
                <br />
                <br />
                <div>
                    <a onClick={this.onClickReturn}>
                        <button style={{float: 'left'}}>Bước trước đó</button>
                    </a>
                    <a onClick={this.onClick}>
                        <button>Đặt hàng</button>
                    </a>
                </div>
                <br />
                <br />
                <br />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        getnhieukhoahoc: state.getnhieukhoahoc
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        requestNhieuKhoaHoc: (idkh) => {
            dispatch(action.requestNhieuKhoaHoc(idkh));
        },
        resetNhieuKhoaHoc: () => {
            dispatch(action.resetNhieuKhoaHoc());
        },
        insertHoaDon: (makh, ghichu, tongtien, ngaydat) =>{
            dispatch(action.insertHoaDon(makh, ghichu, tongtien, ngaydat));
        },
        insertCTHD: (mahd, makhoahoc, matl, soluong) => {
            dispatch(action.insertCTHD(mahd, makhoahoc, matl, soluong));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Thanhtoanbuoc2));
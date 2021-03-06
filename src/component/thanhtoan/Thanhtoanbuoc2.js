import { Component } from "react";
import './../../SASS/thanhtoan.sass';
import './../../stylecss/progressbar.css';
import { withRouter } from 'react-router-dom';
import * as action from "./../../actions/index";
import { connect } from "react-redux";
import { Table } from 'antd';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
})

class Thanhtoanbuoc2 extends Component {
    componentDidMount() {
        var cartdachon = JSON.parse(sessionStorage.getItem('cartdachon'));
        var logg = JSON.parse(localStorage.getItem('user'));
        var makh = logg.makh;
        this.props.requestKhachHangByID(makh);
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

    onClickReturn = () => {
        this.props.history.push('/nguoidung/thongtinthanhtoan');
    }

    onClick = () => {
        var { khachhang } = this.props;
        
        if (khachhang.length > 0) {
            var logg = JSON.parse(localStorage.getItem('user'));
            var makh = logg.makh;
            var ghichu = "abc";
            var tongtien = JSON.parse(sessionStorage.getItem('tongtien'));
            var tong = tongtien.tongtien;
            var date = new Date();
            var ngaydat = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
            var cartdachon = JSON.parse(sessionStorage.getItem('cartdachon'));
            this.props.insertHoaDon(makh, ghichu, tong, ngaydat, cartdachon);

            //mail
            var templateParams = {
                name: khachhang[0].TenKH,
                email: khachhang[0].Email,
                message: formatter.format(tong) + ' VND'
            }
            emailjs.send('service_4zxxb3m', 'template_5e5jwjb', templateParams, 'user_iVOGiqr6x0VSnscIiUPdR')
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Th??nh c??ng!',
                        showConfirmButton: false,
                        timer: 1500
                    });

                }, function (error) {
                    console.log('FAILED...', error);
                });
            this.props.history.push('/nguoidung/thanhtoanthanhcong');
        }
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
        var { getnhieukhoahoc } = this.props;
        var tong = JSON.parse(sessionStorage.getItem("tongtien"));

        const column = [
            {
                title: '',
                key: 'MaKhoaHoc',
                render: (record) => <img className="img-gh" src={record.AnhKhoaHoc} key={record.MaKhoaHoc} />
            },
            {
                title: 'T??n kh??a h???c',
                key: 'TenKhoaHoc',
                render: (record) => <a className="tenkhoahoc-gh" href="#" key={record.TenKhoaHoc}>{record.TenKhoaHoc}</a>
            },
            {
                title: 'Gi???ng vi??n',
                key: 'MaKH',
                render: (record) => <p className="text-giohang">{record.TenKH}</p>
            },
            {
                title: 'S??? l?????ng',
                render: (record) => <input value={this.showSoLuong(record.MaKhoaHoc)} readOnly />
            },
            {
                title: 'Gi??',
                key: 'MaKH',
                render: (record) => <div>
                    <p className="text-giohang giacu">{formatter.format(record.GiaKH * this.showSoLuong(record.MaKhoaHoc))}</p>
                    <p className="text-giohang giamoi">{formatter.format((record.GiaKH - (record.GiaKH * record.PhanTramGiam) / 100) * this.showSoLuong(record.MaKhoaHoc))}</p>
                </div>
            }
        ];

        return (
            <div className="thanhtoan container" style={{ marginTop: '4.3rem' }} >
                <h1>Thanh to??n</h1>
                <div className="containerprogress">
                    <ul className="progressbar">
                        <li className="done">Th??ng tin thanh to??n</li>
                        <li className="active">Th??ng tin gi??? h??ng</li>
                        <li className="inactive">Th??nh c??ng</li>
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
                <p style={{ float: 'right', color: 'red' }}>T???ng ti???n: <span>{formatter.format(tong.tongtien)}</span></p>
                <br />
                <br />
                <div>
                    <a onClick={this.onClickReturn}>
                        <button style={{ float: 'left' }}>B?????c tr?????c ????</button>
                    </a>
                    <a onClick={this.onClick}>
                        <button>?????t h??ng</button>
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
        getnhieukhoahoc: state.getnhieukhoahoc,
        khachhang: state.getkhachhang
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
        insertHoaDon: (makh, ghichu, tongtien, ngaydat) => {
            dispatch(action.insertHoaDon(makh, ghichu, tongtien, ngaydat));
        },
        insertCTHD: (mahd, makhoahoc, matl, soluong) => {
            dispatch(action.insertCTHD(mahd, makhoahoc, matl, soluong));
        },
        requestKhachHangByID: (idkh) => {
            dispatch(action.requestKhachHangByID(idkh));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Thanhtoanbuoc2));
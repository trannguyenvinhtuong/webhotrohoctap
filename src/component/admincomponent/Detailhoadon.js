import { Component } from "react";
import { connect } from "react-redux";
import * as action from './../../actions/index';
import { Table, Modal, Select } from 'antd';
import Swal from "sweetalert2";
import Quanlyhoadon from './Quanlyhoadon';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
});

const { Option } = Select;

class Detailhoadon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trangthai: '',
            showChangeForm: false
        }
    }

    componentDidMount() {
        var detailhoadon = JSON.parse(sessionStorage.getItem('detailhoadon'));
        var mahd = detailhoadon.mahd;
        var thongtinhoadon = JSON.parse(sessionStorage.getItem('thongtinhoadon'));
        var makh = thongtinhoadon.makh;
        this.props.requestHoaDonTheoID(mahd);
        this.props.requestKhachHangByID(makh);
    }

    handleCancel = () => {
        this.setState({
            showChangeForm: false,
        });
    }

    showChangeForm = () => {
        var { hoadon } = this.props;
        this.setState({
            showChangeForm: true,
            trangthai: hoadon[0].TrangThaiHD
        })
    }

    handleChange = (value) => {
        this.setState({
            trangthai: value
        });
    }

    handleOk = () => {
        var detailhoadon = JSON.parse(sessionStorage.getItem('detailhoadon'));
        var mahd = detailhoadon.mahd;
        var { trangthai } = this.state;

        if (trangthai) {
            Swal.fire({
                title: 'Bạn có chắc chắn?',
                text: "Bạn không thể phục hồi dữ liệu!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.props.updateTTHD(mahd, trangthai);
                    Swal.fire(
                        'Thành công!',
                        'Thông tin đã được cập nhật.',
                        'success'
                    );
                    this.props.togglePageAdmin(<Quanlyhoadon />);
                }
            });
        }
    }

    tinhTongTien = (data) => {
        var tong = 0;
        if (data.length > 1) {
            data.map((da, index) => {
                tong = tong + Number((da.GiaKH - (da.GiaKH * da.PhanTramGiam) / 100) * da.SoLuong);
            })
        }
        else if (data.length == 1) {
            tong = data[0].GiaKH - (((data[0].GiaKH * data[0].PhanTramGiam) / 100) * data[0].SoLuong);
        }
        else if (data == 0) {
            tong = 0;
        }
        return tong;
    }

    onExport = () => {
        const doc = new jsPDF();

        //get html
        const pdfTable = document.getElementById('divToPrint');
        //html to pdf format
        var html = htmlToPdfmake(pdfTable.innerHTML);

        const documentDefinition = { content: html };
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(documentDefinition).open();
    }

    render() {
        var { hoadon, khachhang } = this.props;
        console.log(khachhang);
        const columns = [
            {
                title: 'Tên khoá học',
                render: (record) => <p className="table-p">{record.TenKhoaHoc}</p>
            },
            {
                title: 'Giá khoá học',
                render: (record) => <div>
                    <p className="giacu" style={{ textAlign: 'left' }}>{formatter.format(record.GiaKH * record.SoLuong)}</p>
                    <p className="giamoi" style={{ textAlign: 'left' }}>
                        {
                            formatter.format((record.GiaKH - (record.GiaKH * record.PhanTramGiam) / 100) * record.SoLuong)
                        }
                    </p>
                </div>
            },
            {
                title: 'Số lượng',
                render: (record) => <p className="table-p">{record.SoLuong}</p>
            }
        ]
        var { showChangeForm, trangthai } = this.state;
        return (
            <div className="giangvien-khoahoc">
                <a onClick={this.showChangeForm}>
                    <button className="giangvien-khbtn">Thay đổi trạng thái đơn hàng</button>
                </a>
                <a onClick={this.onExport} style={{ marginLeft: '5rem' }}>
                    <button className="giangvien-khbtn">Xuất hoá đơn</button>
                </a>
                <br />
                <br />
                <div id="divToPrint">
                    <h3>Thông tin đặt hàng</h3>
                    <p>Tên khách hàng: {khachhang.length == 1 ? khachhang[0].TenKH : ''}</p>
                    <p>Địa chỉ: {khachhang.length == 1 ? khachhang[0].DiaChi : ''}</p>
                    <p>SDT: {khachhang.length == 1 ? khachhang[0].SDT : ''}</p>
                    <p>Email: {khachhang.length == 1 ? khachhang[0].Email : ''}</p>
                    <br />
                    <Table dataSource={hoadon} columns={columns} rowKey="Id" />
                    <h3 style={{ color: 'red', textAlign: 'center' }}>Tổng tiền: {formatter.format(this.tinhTongTien(hoadon))} VND</h3>
                </div>

                {/* Modal  */}
                <Modal title="Sửa trạng thái" visible={showChangeForm} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <label>Trạng thái</label>
                    <br />
                    <br />
                    <Select defaultValue={trangthai} style={{ width: '100%' }} onChange={this.handleChange}>
                        <Option value="0">Chờ xử lý</Option>
                        <Option value="1">Đang giao hàng</Option>
                        <Option value="2">Giao hàng thành công</Option>
                        <Option value="-1">Đã huỷ đơn</Option>
                    </Select>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        hoadon: state.gethoadontheoid,
        khuyenmai: state.getallkmkh,
        khachhang: state.getkhachhang
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        requestAllHoaDon: () => {
            dispatch(action.requestAllHoaDon());
        },
        togglePageAdmin: (page) => {
            dispatch(action.togglePageAdmin(page));
        },
        requestHoaDonTheoID: (idhd) => {
            dispatch(action.requestHoaDonTheoID(idhd));
        },
        updateTTHD: (mahd, trangthai) => {
            dispatch(action.updateTTHD(mahd, trangthai));
        },
        requestALLKMKH: () => {
            dispatch(action.requestALLKMKH());
        },
        requestKhachHangByID: (idkh) =>{
            dispatch(action.requestKhachHangByID(idkh));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detailhoadon);


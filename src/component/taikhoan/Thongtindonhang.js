import { Component } from "react";
import { connect } from "react-redux";
import * as action from './../../actions/index';
import {Table} from 'antd';
import './../../SASS/quantritk.sass';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
})

class Thongtindonhang extends Component{
    componentDidMount(){
        var user = JSON.parse(localStorage.getItem('user'));
        var idkh = user.makh;
        this.props.requestHoaDon(idkh);
    }

    showTrangThai = (data) => {
        var rs = null;
        if (data) {
            if (data == '0') {
                rs = <p className="table-p">Đang chờ xử lý</p>;
            }
            else if (data == '1') {
                rs = <p className="table-p">Đang giao hàng</p>
            }
            else if (data == '2') {
                rs = <p className="table-p">Giao thành công</p>
            }
            else if (data == '-1') {
                rs = <p className="table-p">Đơn hàng đã huỷ</p>
            }
        }
        return rs;
    }

    render() {
        var {gethoadon} = this.props;
        console.log(gethoadon);
        const columns = [
            {
                title: 'Mã hoá đơn',
                render: (record) => <p>{record.MaHD}</p>
            },
            {
                title: '',
                render: (record) => <img className="img-hoadon" src={record.AnhKhoaHoc}></img>
            },
            {
                title: 'Tên',
                render: (record) => <p>{record.TenKhoaHoc}</p>
            },
            {
                title: 'Số lượng',
                render: (record) => <p>{record.SoLuong}</p>
            },
            {
                title: 'Giá',
                render: (record) => <p>{formatter.format((record.GiaKH-(record.GiaKH*record.PhanTramGiam)/100)*(record.SoLuong))}</p>
            },
            {
                title: 'Ngày đặt',
                render: (record) => <p>{record.NgayDat}</p>
            },
            {
                title: 'Trạng thái',
                render: (record) => this.showTrangThai(record.TrangThaiHD)
            }
        ]
        return (
            <div>
                <Table dataSource={gethoadon} columns={columns} />
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        gethoadon: state.gethoadon
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        requestHoaDon: (idkh) =>{
            dispatch(action.requestHoaDon(idkh));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Thongtindonhang);
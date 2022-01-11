import { Component } from "react";
import { connect } from "react-redux";
import * as action from './../../actions/index';
import {Table} from 'antd';
import Detailhoadon from "./Detailhoadon";

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
});

class Quanlyhoadon extends Component{
    componentDidMount(){
        this.props.requestAllHoaDon();
    }

    showTrangThai = (data) => {
        var rs = null;
        if (data) {
            if (data == '0') {
                rs = <p className="table-p">Đang xử lý</p>;
            }
            else if (data == '1') {
                rs = <p className="table-p">Đang giao hàng</p>
            }
            else if (data == '2') {
                rs = <p className="table-p">Giao hàng thành công</p>
            }
            else if (data == '-1') {
                rs = <p className="table-p">Đơn hàng đã huỷ</p>
            }
        }
        return rs;
    }

    showDetail = (id,idkh) =>{
        sessionStorage.removeItem('detailhoadon');
        sessionStorage.setItem('detailhoadon',JSON.stringify({'mahd':id}));
        sessionStorage.removeItem('thongtinhoadon');
        sessionStorage.setItem('thongtinhoadon',JSON.stringify({'makh':idkh}));
        this.props.togglePageAdmin(<Detailhoadon />);
    }

    render() {
        var {hoadon} = this.props;
        const columns = [
            {
                title: 'Mã hoá đơn',
                render: (record) => <a className="table-p" onClick={()=>this.showDetail(record.MaHD,record.MaKH)}>{record.MaHD}</a>
            },
            {
                title: 'Tên khách hàng',
                render: (record) => <p className="table-p">{record.TenKH}</p>
            },
            {
                title: 'SDT',
                render: (record) => <p className="table-p">{record.SDT}</p>
            },
            {
                title: 'Địa chỉ',
                render: (record) => <p className="table-p">{record.DiaChi}</p>
            },
            {
                title: 'Email',
                render: (record) => <p className="table-p">{record.Email}</p>
            },
            {
                title: 'Tổng tiền',
                render: (record) => <p className="table-p">{formatter.format(record.TongTien)}</p>
            },
            {
                title: 'Ngày đặt',
                render: (record) => <p className="table-p">{record.NgayDat}</p>
            },
            {
                title: 'Trạng thái',
                render: (record) => this.showTrangThai(record.TrangThaiHD)
            }            
        ]
        return (
            <div>
                <Table columns={columns} dataSource={hoadon} rowKey="MaHD" />
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        hoadon: state.gethoadon
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        requestAllHoaDon: () =>{
            dispatch(action.requestAllHoaDon());
        },
        togglePageAdmin: (page) =>{
            dispatch(action.togglePageAdmin(page));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Quanlyhoadon);
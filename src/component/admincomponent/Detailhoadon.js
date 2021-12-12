import { Component } from "react";
import { connect } from "react-redux";
import * as action from './../../actions/index';
import {Table, Modal, Select} from 'antd';
import Swal from "sweetalert2";
import Quanlyhoadon from './Quanlyhoadon';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
});

const { Option } = Select;

class Detailhoadon extends Component{
    constructor(props) {
        super(props);
        this.state = {
            trangthai: '',
            showChangeForm: false
        }
    }

    componentDidMount(){
        var detailhoadon = JSON.parse(sessionStorage.getItem('detailhoadon'));
        var mahd = detailhoadon.mahd;
        this.props.requestHoaDonTheoID(mahd);
    }

    handleCancel = () => {       
        this.setState({
            showChangeForm: false,           
        });
    }

    showChangeForm = () =>{
        var {hoadon} = this.props;
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

    handleOk = () =>{
        var detailhoadon = JSON.parse(sessionStorage.getItem('detailhoadon'));
        var mahd = detailhoadon.mahd;
        var {trangthai} = this.state;
       
        if(trangthai){
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
                    this.props.updateTTHD(mahd,trangthai);
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

    render() {
        var {hoadon} = this.props;
        const columns = [
            {
                title: 'Ảnh khoá học',
                render: (record) => <img src={record.AnhKhoaHoc} />
            },
            {
                title: 'Tên khoá học',
                render: (record) => <p className="table-p">{record.TenKhoaHoc}</p>
            },
            {
                title: 'Giá khoá học',
                render: (record) => <p className="table-p">{formatter.format(record.GiaKH)}</p>
            },
            {
                title: 'Số lượng',
                render: (record) => <p className="table-p">{record.SoLuong}</p>
            }
        ]
        var {showChangeForm,trangthai} = this.state;
        return (
            <div className="giangvien-khoahoc">
                <a onClick={this.showChangeForm}>
                    <button className="giangvien-khbtn">Thay đổi trạng thái đơn hàng</button>
                </a>
                <br />
                <br />
                <Table dataSource={hoadon} columns={columns} rowKey="Id" />

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

const mapStateToProps = (state) =>{
    return{
        hoadon: state.gethoadontheoid
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        requestAllHoaDon: () =>{
            dispatch(action.requestAllHoaDon());
        },
        togglePageAdmin: (page) =>{
            dispatch(action.togglePageAdmin(page));
        },
        requestHoaDonTheoID: (idhd) =>{
            dispatch(action.requestHoaDonTheoID(idhd));
        },
        updateTTHD: (mahd,trangthai) =>{
            dispatch(action.updateTTHD(mahd,trangthai));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Detailhoadon);


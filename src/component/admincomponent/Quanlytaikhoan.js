import { Component } from "react";
import {Table,Modal,Select} from "antd";
import * as action from "./../../actions/index";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Dashboard from "./Dashboard";

const { Option } = Select;

class Quanlytaikhoan extends Component{
    constructor(props) {
        super(props);
        this.state = {
            trangthai: '',
            showChangeForm: false
        }
    }

    componentDidMount(){
        this.props.requestAllKhachHang();
    }

    showTrangThai = (data) => {
        var rs = null;
        if (data) {
            if (data == '0') {
                rs = <p className="table-p">Hoạt động</p>;
            }
            else if (data == '1') {
                rs = <p className="table-p">Đang bị khoá</p>
            }
        }
        return rs;
    }

    onChangeTT = (makh, tt) => {
        this.setState({
            showChangeForm: true,
            trangthai: tt
        });
        sessionStorage.removeItem('updatekh');
        sessionStorage.setItem('updatekh', JSON.stringify({ 'update': makh }));
    }

    
    handleOk = () => {
        var { trangthai } = this.state;
        var up = JSON.parse(sessionStorage.getItem('updatekh'));
        var makh = up.update;
        if (makh) {
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
                    this.props.updateTTKH(makh,trangthai);
                    Swal.fire(
                        'Thành công!',
                        'Thông tin đã được cập nhật.',
                        'success'
                    );
                    this.props.togglePageAdmin(<Dashboard />);
                   
                }
            })
        }
    }

    handleCancel = () => {
        this.setState({
            showChangeForm: false
        });
    }

    handleChange = (value) => {
        this.setState({
            trangthai: value
        });
    }

    render() {
        var {khachhang} = this.props;
        var {showChangeForm,trangthai} = this.state;
        const columns = [
            {
                title: 'Mã khách hàng',
                render: (record) => <p className="table-p">{record.MaKH}</p>
            },
            {
                title: 'Tên khách hàng',
                render: (record) => <p className="table-p">{record.TenKH}</p>
            },
            {
                title: 'Ảnh đại diện',
                render: (record) => <img className="img-table" src={record.AnhDaiDien} />
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
                title: 'Trạng thái',
                render: (record) => this.showTrangThai(record.TrangThaiTK)
            },
            {
                title: '',
                render: (record) => <a onClick={() => this.onChangeTT(record.MaKH,record.TrangThaiTK)}><button className="btn btn-danger">Chỉnh sửa</button></a>
            }
        ]
        return (
            <div>
                <Table dataSource={khachhang} columns={columns} rowKey="MaKH" />
                {/* Modal  */}
                <Modal title="Sửa trạng thái" visible={showChangeForm} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <label>Trạng thái</label>
                    <br />
                    <br />
                    <Select value={trangthai} style={{ width: '100%' }} onChange={this.handleChange}>
                        <Option value="0">Hoạt động</Option>
                        <Option value="1">Khoá tài khoản</Option>
                    </Select>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        khachhang: state.getallkh
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        requestAllKhachHang: () =>{
            dispatch(action.requestAllKhachHang());
        },
        updateTTKH: (makh,trangthai) =>{
            dispatch(action.updateTTKH(makh,trangthai));
        },
        togglePageAdmin: (page) =>{
            dispatch(action.togglePageAdmin(page));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Quanlytaikhoan);
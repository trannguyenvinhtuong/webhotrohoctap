import { Component } from "react";
import { connect } from "react-redux";
import * as action from './../../actions/index';
import { Table, Modal, Select } from 'antd';
import Swal from "sweetalert2";
import Dashboard from "./Dashboard";

const { Option } = Select;

class Quanlygiangvien extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trangthai: '',
            showChangeForm: false
        }
    }

    componentDidMount() {
        this.props.requestGiangVien();
    }

    showTrangThai = (data) => {
        var rs = null;
        if (data) {
            if (data == '0') {
                rs = <p className="table-p">Hoạt động</p>;
            }
            else if (data == '1') {
                rs = <p className="table-p">Đang bị đình chỉ</p>
            }
            else if (data == '-1') {
                rs = <p className="table-p">Đang chờ xác nhận</p>
            }
        }
        return rs;
    }

    onChangeTT = (magv, tt) => {
        this.setState({
            showChangeForm: true,
            trangthai: tt
        });
        sessionStorage.removeItem('updategv');
        sessionStorage.setItem('updategv', JSON.stringify({ 'update': magv }));
    }

    handleOk = () => {
        var { trangthai } = this.state;
        var up = JSON.parse(sessionStorage.getItem('updategv'));
        var magv = up.update;
        if (magv) {
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
                    this.props.updateTTGV(magv,trangthai);
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
        var { giangvien } = this.props;
        const column = [
            {
                title: 'Mã giảng viên',
                render: (record) => <p className="table-p">{record.MaGV}</p>
            },
            {
                title: 'Tên giảng viên',
                render: (record) => <p className="table-p">{record.TenKH}</p>
            },
            {
                title: 'Ảnh đại diện',
                render: (record) => <img className="img-table" src={record.AnhDaiDien} />
            },
            {
                title: 'Trình độ',
                render: (record) => <p className="table-p">{record.TrinhDo} {record.ChuyenNganh}</p>
            },
            {
                title: 'Kinh nghiệm',
                render: (record) => <p className="table-p">{record.KinhNghiem} năm</p>
            },
            {
                title: 'Trạng thái',
                render: (record) => this.showTrangThai(record.TrangThai)
            },
            {
                title: '',
                render: (record) => <a onClick={() => this.onChangeTT(record.MaGV,record.TrangThai)}><button className="btn btn-danger">Chỉnh sửa</button></a>
            }
        ]
        var { showChangeForm, trangthai } = this.state;
        return (
            <div>
                <Table dataSource={giangvien} columns={column} rowKey="MaGV" />
                {/* Modal  */}
                <Modal title="Sửa trạng thái" visible={showChangeForm} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <label>Trạng thái</label>
                    <br />
                    <br />
                    <Select defaultValue={trangthai} style={{ width: '100%' }} onChange={this.handleChange}>
                        <Option value="0">Hoạt động</Option>
                        <Option value="1">Bị đình chỉ</Option>
                        <Option value="-1">Chờ xét duyệt</Option>
                    </Select>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        giangvien: state.getgiangvien
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        requestGiangVien: () => {
            dispatch(action.requestGiangVien());
        },
        updateTTGV: (magv,trangthai) =>{
            dispatch(action.updateTTGV(magv,trangthai));
        },
        togglePageAdmin: (page) =>{
            dispatch(action.togglePageAdmin(page));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Quanlygiangvien);
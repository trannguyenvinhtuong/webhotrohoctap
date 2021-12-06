import { Component } from "react";
import { connect } from "react-redux";
import * as action from './../../actions/index';
import { Table, Modal, Select } from 'antd';
import Swal from "sweetalert2";
import Dashboard from "./Dashboard";

const { Option } = Select;

class Quanlymakichhoat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trangthai: '',
            showChangeForm: false,
            showAddForm: false,
            makhadd: ''
        }
    }

    componentDidMount() {
        this.props.requestKichHoatKhoaHoc();
    }

    showTrangThai = (data) => {
        var rs = null;
        if (data) {
            if (data == '0') {
                rs = <p className="table-p">Hoạt động</p>;
            }
            else if (data == '1') {
                rs = <p className="table-p">Đã sửa dụng</p>
            }
        }
        return rs;
    }

    handleCancel = () => {
        this.setState({
            showChangeForm: false,
            showAddForm: false
        });
    }

    handleChange = (value) => {
        this.setState({
            trangthai: value
        });
    }

    onChangeTT = (id, tt) => {
        this.setState({
            showChangeForm: true,
            trangthai: tt
        });
        sessionStorage.removeItem('updatemakichhoat');
        sessionStorage.setItem('updatemakichhoat', JSON.stringify({ 'update': id }));
    }

    handleOk = () => {
        var { trangthai } = this.state;
        var up = JSON.parse(sessionStorage.getItem('updatemakichhoat'));
        var id = up.update;
        if (id) {
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
                    this.props.updateMaKichHoat(id, trangthai);
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

    showAddForm = () => {
        this.setState({
            showAddForm: true
        })
    }

    makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    handleOkAdd = () => {
        var { makhadd } = this.state;
        if (!makhadd) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Không để trống!'
            });
        }
        else {
            var idran = this.makeid(10);
            this.props.insertMaKichHoat(makhadd, idran);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Thêm thành công',
                showConfirmButton: false,
                timer: 1500
            });
            this.props.togglePageAdmin(<Dashboard />);
        }
    }

    handleChangeAdd = (value) => {
        this.setState({
            makhadd: value
        });
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    render() {
        var { kichhoat } = this.props;
        var { showChangeForm, trangthai, showAddForm, makhadd } = this.state;
        const columns = [
            {
                title: 'Mã khoá học',
                render: (record) => <p className="table-p">{record.MaKhoaHoc}</p>
            },
            {
                title: 'Tên khoá học',
                render: (record) => <p className="table-p">{record.TenKhoaHoc}</p>
            },
            {
                title: 'Mã kích hoạt',
                render: (record) => <p className="table-p">{record.MaKichHoat}</p>
            },
            {
                title: 'Trạng thái',
                render: (record) => this.showTrangThai(record.TrangThai)
            },
            {
                title: '',
                render: (record) => <a onClick={() => this.onChangeTT(record.Id, record.TrangThai)}><button className="btn btn-danger">Chỉnh sửa</button></a>
            }
        ]
        return (
            <div>
                <a onClick={this.showAddForm}>
                    <button className="giangvien-khbtn">Thêm mã kích hoạt</button>
                </a>
                <br />
                <br />
                <Table columns={columns} dataSource={kichhoat} rowKey="Id" />
                {/* Modal  */}
                <Modal title="Sửa trạng thái" visible={showChangeForm} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <label>Trạng thái</label>
                    <br />
                    <br />
                    <Select defaultValue={trangthai} style={{ width: '100%' }} onChange={this.handleChange}>
                        <Option value="0">Hoạt động</Option>
                        <Option value="1">Khoá mã</Option>
                    </Select>
                </Modal>

                <Modal title="Thêm mã kích hoạt" visible={showAddForm} onOk={this.handleOkAdd} onCancel={this.handleCancel}>
                    <label>Nhập mã khoá học</label>
                    <br />
                    <input type="text" className="form-control"
                        name="makhadd" value={makhadd} onChange={this.onChange}
                    />
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        kichhoat: state.getkichhoatkhoahoc,
        khoahoc: state.getkhoahoc
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        requestKichHoatKhoaHoc: () => {
            dispatch(action.requestKichHoatKhoaHoc())
        },
        updateMaKichHoat: (id, trangthai) => {
            dispatch(action.updateMaKichHoat(id, trangthai));
        },
        togglePageAdmin: (page) => {
            dispatch(action.togglePageAdmin(page));
        },
        insertMaKichHoat: (makhoahoc, makichhoat) => {
            dispatch(action.insertMaKichHoat(makhoahoc, makichhoat));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quanlymakichhoat);
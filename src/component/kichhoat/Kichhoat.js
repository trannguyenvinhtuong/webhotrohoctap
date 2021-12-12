import { Component } from "react";
import './../../SASS/khoahoc.sass';
import * as action from './../../actions/index';
import { connect } from "react-redux";
import { Table } from 'antd';
import Swal from "sweetalert2";
import { withRouter } from 'react-router-dom';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
})

class Kichhoat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            makichhoat: '',
            data: []
        }
    }

    componentDidMount() {
        this.props.requestKichHoatKhoaHoc();
        var user = JSON.parse(localStorage.getItem('user'));
        var makh = user.makh;
        this.props.requestKhoaHocKH(makh);
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    onCheckMa = () => {
        var { makichhoat } = this.state;
        var { khoahoc } = this.props;
        console.log(khoahoc);
        var data = []
        khoahoc.map((kh, index) => {
            if (kh.MaKichHoat == makichhoat) {
                data.push(kh);
            }
        });
        this.setState({
            data: data
        });
    }

    showTable = (data) => {
        var rs = null;
        const columns = [
            {
                title: '',
                render: (record) => <img className="kichhoatanh" src={record.AnhKhoaHoc} />
            },
            {
                title: 'Khoá học',
                render: (record) => <p className="size-kichhoat">{record.TenKhoaHoc}</p>
            },
            {
                title: 'Giá khoá học',
                render: (record) => <p className="size-kichhoat" style={{color: 'red'}}>{formatter.format(record.GiaKH)}</p>
            },
            {
                title: 'Mã kích hoạt',
                render: (record) => <p className="size-kichhoat">{record.MaKichHoat}</p>
            },
            {
                title: '',
                render: (record) => <a onClick={() => this.onKichHoat(record.MaKhoaHoc)}><button className="btn btn-success">Kích hoạt</button></a>
            }
        ]
        if (data) {
            rs = <Table columns={columns} dataSource={data} className="w100" rowKey="MaKhoaHoc" />
        }
        return rs;
    }

    onKichHoat = (idkh) => {
        var { makichhoat, data } = this.state;
        var user = JSON.parse(localStorage.getItem('user'));
        var makh = user.makh;
        var {khoahockh} = this.props;        
        Swal.fire({
            title: 'Bạn có muốn thêm?',
            text: "Mã chỉ sử dụng một lần!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {            
            if (result.isConfirmed) {
                var rs = false;
                data.map((da) => {
                    if (da.TrangThai == '1') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Mã đã được sử dụng!'
                        })
                        rs = true;
                    }
                });

                khoahockh.map((kh)=>{
                    if(kh.MaKhoaHoc == idkh){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Bạn đã có khoá học này rồi!'
                        });
                        rs = true;
                    }
                })
                
                if(rs === false){
                    this.props.insertKichHoatKhoaHoc(makh, idkh, makichhoat);
                    Swal.fire(
                        'Đã thêm!',
                        'Khoá học đã thêm vào tài khoản của bạn.',
                        'success'
                    );
                    this.props.history.push('/nguoidung');
                }                
            }            
        });
    }

    render() {
        var { makichhoat, data } = this.state;
        return (
            <div className="container kichhoatkhoahoc" style={{ marginTop: '6rem' }}>
                <input type="text"
                    name="makichhoat"
                    value={makichhoat}
                    onChange={this.onChange}
                    placeholder="Nhập mã khoá học....." />
                <br />
                <br />
                <a onClick={this.onCheckMa}>
                    <button className="can-giua btn btn-primary btn-kichhoat">Kiểm tra mã</button>
                </a>
                <br />
                <br />
                <br />
                <br />
                {this.showTable(data)}
                <br />
                <br />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        khoahoc: state.getkichhoatkhoahoc,
        khoahockh: state.getkhoahoc
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        requestKichHoatKhoaHoc: () => {
            dispatch(action.requestKichHoatKhoaHoc());
        },
        insertKichHoatKhoaHoc: (makh, makhoahoc, makichhoat) => {
            dispatch(action.insertKichHoatKhoaHoc(makh, makhoahoc, makichhoat));
        },
        requestKhoaHocKH: (idkh) =>{
            dispatch(action.requestKhoaHocKH(idkh));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Kichhoat));
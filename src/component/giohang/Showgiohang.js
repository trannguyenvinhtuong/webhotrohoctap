import { Component } from "react";
import { connect } from "react-redux";
import * as action from './../../actions/index';
import { Table, InputNumber } from 'antd';
import "./../../SASS/giohang.sass";
import Swal from "sweetalert2";
import {withRouter} from 'react-router-dom';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
})

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
})

class Showgiohang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            selectedRowKeys: [],
            done: false,
            selectedData: [],
            tongtien: 0
        }
    }
    componentDidMount() {
        var cart = JSON.parse(localStorage.getItem('cart'));
        if (cart.length == undefined) {
            if (cart.typecart == "kh") {
                this.props.requestKhoaHocTheoGH(cart.id);
            }
        }
        else {
            this.props.resetNhieuKhoaHoc();
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].typecart == "kh") {
                    this.props.requestNhieuKhoaHoc(cart[i].id);
                }
            }
        }
    }

    onClearGH = () => {
        swalWithBootstrapButtons.fire({
            title: 'Bạn có muốn xoá hết giỏ hàng?',
            text: "Bạn không thể khôi phục giỏ hàng!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Có, xoá đi!',
            cancelButtonText: 'Không, huỷ bỏ!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('cart');
                window.location.reload();
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Huỷ',
                    'Huỷ bỏ'
                )
            }
        })

    }

    tinhTongTien = (data) => {
        if (data.length > 1) {
            var tong = 0;
            data.map((da, index) => {
                tong = tong + Number(da.GiaKH - (da.GiaKH * da.PhanTramGiam) / 100);
                this.setState({
                    tongtien: tong
                });
                document.getElementById("Tongtien").innerHTML = formatter.format(tong);
            })
        }
        else if (data.length == 1) {
            var tong = 0;
            tong = data[0].GiaKH - (data[0].GiaKH * data[0].PhanTramGiam) / 100;
            this.setState({
                tongtien: tong
            });
            document.getElementById("Tongtien").innerHTML = formatter.format(tong);
        }
        else if (data == 0) {
            document.getElementById("Tongtien").innerHTML = formatter.format(0);
        }
        return tong;
    }

    showSoLuong = (id) => {
        var rs = null;
        var cart = JSON.parse(localStorage.getItem('cart'));
        if(cart.length>1){
            cart.map((ca) => {
                if (ca.id === id) {
                    rs = ca.soluong;
                }
            });
        }
        else{
            rs = cart.soluong;
        }
        
        return rs;
    }

    onSelectChange = (selectedRowKeys, selectedRow) => {
        this.setState({ selectedRowKeys });
        this.tinhTongTien(selectedRow);
        if (selectedRow === null) {
            this.tinhTongTien(0);
        }
        this.setState({
            selectedData: selectedRow
        })
    };

    onChangeSoLuong = (value) => {
        console.log('changed', value);
    }

    onDeleteItem = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                var data = JSON.parse(localStorage.getItem("cart"));
                var ide = this.findIndex(id);
                if(data.length>1){
                    data.splice(ide, 1);
                    localStorage.setItem("cart", JSON.stringify(data));
                }
                else{
                    localStorage.removeItem("cart");
                }
                
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                window.location.reload();
            }
        });
    }

    findIndex = (id) => {
        var data = JSON.parse(localStorage.getItem("cart"));
        var rs = -1;
        if(data.length > 1){
            data.map((da, index) => {
                if (da.id === id) {
                    rs = index;
                }
            });
        }        
        return rs;
    }

    muaHang = () => {
        var { selectedData, tongtien } = this.state;
        var cart = JSON.parse(localStorage.getItem('cart'));
        if (selectedData.length == 0) {
            Swal.fire(
                'Bạn chưa chọn sản phẩm?',
                'Hãy chọn sản phẩm để thanh toán?',
                'warning'
            );
        }
        else {
            var cartdachon = [];
            sessionStorage.removeItem("cartdachon");
            selectedData.forEach((sel,index)=>{
                if(cart.length>1){
                    cart.forEach((ca)=>{
                        if(sel.MaKhoaHoc === ca.id){
                            sel.SoLuong=ca.soluong.toString();
                            cartdachon.push({"id":sel.MaKhoaHoc,"soluong":ca.soluong.toString()});
                        }
                    })
                }
                else{
                    if(sel.MaKhoaHoc === cart.id){
                        sel.SoLuong=cart.soluong.toString();
                        cartdachon.push({"id":sel.MaKhoaHoc,"soluong":cart.soluong.toString()});
                    }
                }
            });
            sessionStorage.setItem("cartdachon",JSON.stringify(cartdachon));
            sessionStorage.setItem("tongtien",JSON.stringify({"tongtien":tongtien}))
            // console.log(selectedData,tongtien);
            this.props.history.push('/nguoidung/thongtinthanhtoan');
        }

    }

    render() {
        var data;
        var { getnhieukhoahoc } = this.props;
        data = getnhieukhoahoc;

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
                render: (record) => <InputNumber min={1} max={10} defaultValue={this.showSoLuong(record.MaKhoaHoc)} onChange={this.onChangeSoLuong} />
            },
            {
                title: 'Giá',
                key: 'MaKH',
                render: (record) => <div>
                    <p className="text-giohang giacu">{formatter.format(record.GiaKH)}</p>
                    <p className="text-giohang giamoi">{formatter.format(record.GiaKH - (record.GiaKH * record.PhanTramGiam) / 100)}</p>
                </div>
            },
            {
                title: '',
                render: (record) => <a className="btnxoa-gh" onClick={() => this.onDeleteItem(record.MaKhoaHoc)}>X</a>
            }
        ];
        var { selectedRowKeys } = this.state;
        return (
            <div className="container">
                <Table dataSource={data}
                    columns={column}
                    rowKey="MaKhoaHoc"
                    rowSelection={{
                        selectedRowKeys,
                        onChange: this.onSelectChange
                    }}
                />
                <br />
                <div className="tongtien-gh container">
                    <div className="row">
                        <div className="col xoahet-gh">
                            <a className="btn btn-danger" onClick={this.onClearGH}>
                                Xoá hết
                            </a>
                        </div>
                        <div className="col-3">
                            <div>
                                <h3>Tổng tiền thanh toán: <span id="Tongtien"></span></h3>
                            </div>
                            <div>
                                <a onClick={this.muaHang}>
                                    <button>Mua Hàng</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
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
        requestKhoaHocTheoGH: (idkh) => {
            dispatch(action.requestKhoaHocTheoGH(idkh));
        },
        requestNhieuKhoaHoc: (idkh) => {
            dispatch(action.requestNhieuKhoaHoc(idkh));
        },
        resetNhieuKhoaHoc: () => {
            dispatch(action.resetNhieuKhoaHoc());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Showgiohang));
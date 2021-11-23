import { Component } from "react";
import {Table} from "antd";
import { connect } from "react-redux";
import * as action from "./../../../actions/index";
import './../../../SASS/giangvienpage.sass';
import {Link} from 'react-router-dom';
import Themkhoahoc from "./khoahoc/Themkhoahoc";
import Detailkhoahoc from "./khoahoc/Detailkhoahoc";

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
})

class Khoahoc extends Component{
    componentDidMount(){
        var logg = localStorage.getItem('user');
        var jslog = JSON.parse(logg);
        this.props.requestKhoaHocTheoGV(jslog.makh);
    }

    onClick = (page,idkhoahoc,magv) =>{
        this.props.togglepagegiangvien(page);
        sessionStorage.removeItem('idkhoahoc');
        sessionStorage.setItem('idkhoahoc',JSON.stringify({id: idkhoahoc}));
        sessionStorage.removeItem('magv');
        sessionStorage.setItem('magv',JSON.stringify({id: magv}));
    }

    render() {
        const columns = [
            {
                title: '',
                key: 'MaKhoaHoc',
                render: (record) => <img src={record.AnhKhoaHoc} key={record.MaKhoaHoc}/>
            },
            {
                title: 'Tên khoá học',
                key: 'MaKhoaHoc',
                render: (record) => <a onClick={()=>{this.onClick(<Detailkhoahoc />,record.MaKhoaHoc,record.MaGV)}} key={record.MaKhoaHoc}>{record.TenKhoaHoc}</a>
            },
            {
                title: 'Mô tả',
                render: (record) => <p>{record.MoTa}</p>
            },
            {
                title: 'Giá khoá học',
                render: (record) => <p>{formatter.format(record.GiaKH)}</p>
            },
            {
                title: 'Số học sinh',
                render: (record) => <p>{record.SoHS}</p>
            }    
        ];
        var khoahoc = this.props.getkhoahoctheogv;     
           
        return (
            <div className="giangvien-khoahoc">
                <a onClick={() => this.onClick(<Themkhoahoc />,0,khoahoc[0].MaGV)}>
                    <button className="giangvien-khbtn">Thêm khoá học</button>
                </a>
                <Table dataSource={khoahoc} className="table-khgv" columns={columns} rowKey="MaKhoaHoc"/>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        getkhoahoctheogv: state.getkhoahoctheogv
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        requestKhoaHocTheoGV: (makh) =>{
            dispatch(action.requestKhoaHocTheoGV(makh));
        },
        togglepagegiangvien: (page) =>{
            dispatch(action.togglePageGiangVien(page));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Khoahoc);
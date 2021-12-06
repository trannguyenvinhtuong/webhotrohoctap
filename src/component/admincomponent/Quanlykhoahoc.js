import { Component } from "react";
import {Table} from "antd";
import { connect } from "react-redux";
import * as action from './../../actions/index';
import Detailkhoahoc from "./Detailkhoahoc";

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
})

class Quanlykhoahoc extends Component{
    componentDidMount(){
        this.props.requestKhoaHoc();
    }

    onClick = (page,idkhoahoc,magv) =>{
        this.props.togglePageAdmin(page);
        sessionStorage.removeItem('idkhoahoc');
        sessionStorage.setItem('idkhoahoc',JSON.stringify({id: idkhoahoc}));
        // sessionStorage.removeItem('magv');
        // sessionStorage.setItem('magv',JSON.stringify({id: magv}));
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
                render: (record) => <p className="table-p">{record.MoTa}</p>
            },
            {
                title: 'Giá khoá học',
                render: (record) => <p className="table-p">{formatter.format(record.GiaKH)}</p>
            },
            {
                title: 'Số học sinh',
                render: (record) => <p className="table-p">{record.SoHS}</p>
            }    
        ];
        var {khoahoc} = this.props;     
        return (
            <div className="giangvien-khoahoc">
                <Table dataSource={khoahoc} className="table-khgv" columns={columns} rowKey="MaKhoaHoc"/>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        khoahoc: state.getkhoahoc
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        requestKhoaHoc: () =>{
            dispatch(action.requestKhoaHoc());
        },
        togglePageAdmin: (page) =>{
            dispatch(action.togglePageAdmin(page));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Quanlykhoahoc);
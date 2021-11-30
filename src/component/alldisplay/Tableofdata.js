import { Component } from "react";
import {Table} from 'antd';
import {connect} from 'react-redux';
import './../../SASS/tab.sass';
import {Link} from 'react-router-dom';

const columns = [
    {
        title: '',
        key: 'MaKhoaHoc',
        render: (record) => <img key={record.MaKhoaHoc} alt={record.MaKhoaHoc} className="img-khoahoc" src={record.AnhKhoaHoc} />
    },
    {
        title: 'Khóa học',
        key: 'MaKhoaHoc',
        render: (record) => <Link key={record.MaKhoaHoc} to={`/nguoidung/Detailkhoahoc/${record.MaKhoaHoc}`} className="name-kh">{record.TenKhoaHoc}</Link>
    },
    {
        title: 'Giảng viên',
        dataIndex: 'TenKH',
        key: 'MaKH'
    },
    {
        title: 'Chủ đề',
        dataIndex: 'TenCD',
        key: 'MaCD'
    },
    {
        title: 'Cấp bậc',
        dataIndex: 'TenCB',
        key: 'MaCB'
    },
];

class Tableofdata extends Component{
    render() {
        var {khoahoc,filter_data} = this.props;
        if(filter_data.keyword){
            if(khoahoc){
                khoahoc = khoahoc.filter((kh)=>{
                    return (kh.TenKhoaHoc).toLowerCase().indexOf(filter_data.keyword.toLowerCase()) !== -1;
                })
            }            
        }
        if(filter_data.machude){
            if(khoahoc){
                khoahoc = khoahoc.filter((kh)=>{
                    return kh.MaCD === filter_data.machude
                })
            }
        }
        if(filter_data.macapbac){
            if(khoahoc){
                khoahoc = khoahoc.filter((kh)=>{
                    return kh.MaCB === filter_data.macapbac
                })
            }
        }
        return (
            <div>
                <Table columns={columns} dataSource = {khoahoc} rowKey="MaKhoaHoc" />
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        khoahoc: state.getkhoahoc,
        filter_data: state.filter
    }
}

export default connect(mapStateToProps,null)(Tableofdata);
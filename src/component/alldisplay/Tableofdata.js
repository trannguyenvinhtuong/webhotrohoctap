import { Component } from "react";
import {Table} from 'antd';
import {connect} from 'react-redux';
import './../../SASS/tab.sass';
import {Link} from 'react-router-dom';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
})

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
        title: 'Gía',
        render: (record) => <p key={record.MaKhoaHoc} className="name-kh">{formatter.format(record.GiaKH)}</p>
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
        var {khoahoc,filter_data,sort} = this.props;
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
       
        if(sort.sort_kh_data !== '' && sort.sort_kh_data == 'giam'){
            if(khoahoc){
                khoahoc.sort((a,b)=>{
                    if(a.GiaKH > b.GiaKH) return -1;
                    else if(a.GiaKH < b.GiaKH) return 1;
                    else return 0;
                })
            }
        }
        if(sort.sort_kh_data !== '' && sort.sort_kh_data == 'tang'){
            if(khoahoc){
                khoahoc.sort((a,b)=>{
                    if(a.GiaKH > b.GiaKH) return 1;
                    else if(a.GiaKH < b.GiaKH) return -1;
                    else return 0;
                })                
            }
        }
        return (
            <div>               
                <Table columns={columns} dataSource = {[...khoahoc]} rowKey="MaKhoaHoc" />
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        khoahoc: state.getkhoahoc,
        filter_data: state.filter,
        sort: state.sortkh
    }
}

export default connect(mapStateToProps,null)(Tableofdata);
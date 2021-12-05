import { Component } from "react";
import {Table} from 'antd';
import {connect} from 'react-redux';
import './../../SASS/tab.sass';
import {Link} from 'react-router-dom';
import * as action from '../../actions/index';

const columns = [
    {
        title: '',
        key: 'MaTL',
        render: (record) => <img alt={record.MaTL} className="img-khoahoc" src={record.AnhTL} />
    },
    {
        title: 'Tài liệu',
        key: 'TenTL',
        render: (record) => <Link to={`/nguoidung/detailtailieu/${record.MaTL}`} className="name-kh">{record.TenTL}</Link>
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
    componentDidMount(){
        this.props.requestTaiLieu();
    }

    render() {
        var {tailieu,filter_data,sort} = this.props;
        console.log(sort);
        if(filter_data.keyword){
            if(tailieu){
                tailieu = tailieu.filter((tl)=>{
                    return (tl.TenTL).toLowerCase().indexOf(filter_data.keyword.toLowerCase()) !== -1;
                })
            }
            
        }
        if(filter_data.machude){
            if(tailieu){
                tailieu = tailieu.filter((tl)=>{
                    return tl.MaCD === filter_data.machude
                })
            }
        }
        if(filter_data.macapbac){
            if(tailieu){
                tailieu = tailieu.filter((tl)=>{
                    return tl.MaCB === filter_data.macapbac
                })
            }
        }
        if(sort.sort_tl_data !== '' && sort.sort_tl_data == 'giam'){
            if(tailieu){
                tailieu.sort((a,b)=>{
                    if(a.TenTL > b.TenTL) return 1;
                    else if(a.TenTL < b.TenTL) return -1;
                    else return 0;
                })
            }
        }
        if(sort.sort_tl_data !== '' && sort.sort_tl_data == 'tang'){
            if(tailieu){
                tailieu.sort((a,b)=>{
                    if(a.TenTL > b.TenTL) return -1;
                    else if(a.TenTL < b.TenTL) return 1;
                    else return 0;
                })                
            }
        }
        return (
            <div>
                <Table columns={columns} dataSource = {[...tailieu]} rowKey="name" />
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        tailieu: state.gettailieu,
        filter_data: state.onfiltertl,
        sort: state.sorttl
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return{
        requestTaiLieu : () =>{
            dispatch(action.requestTaiLieu());
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Tableofdata);
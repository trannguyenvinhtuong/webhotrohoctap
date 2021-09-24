import { Component } from "react";
import {Table} from 'antd';
import {connect} from 'react-redux';
import cntt from './../../imgs/cntt.jpg';
import './../../SASS/tab.sass';
import {Link} from 'react-router-dom';

const columns = [
    {
        title: '',
        key: 'image',
        render: (record) => <img alt={record.img} className="img-khoahoc" src={cntt} />
    },
    {
        title: 'Khóa học/Tài liệu',
        key: 'firstname',
        render: (record) => <Link to="" className="name-kh">{record.firstname}</Link>
    },
    {
        title: 'Giảng viên',
        dataIndex: 'lastname',
        key: 'lastname'
    },
    {
        title: 'Chủ đề',
        dataIndex: 'email',
        key: 'email'
    }
];

class Tableofdata extends Component{
    render() {
        var {khoahoc,filter_data} = this.props;
        if(filter_data.keyword){
            if(khoahoc){
                khoahoc = khoahoc.filter((kh)=>{
                    return (kh.firstname).toLowerCase().indexOf(filter_data.keyword.toLowerCase()) !== -1;
                })
            }
            
        }
        return (
            <div>
                <Table columns={columns} dataSource = {khoahoc} />
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
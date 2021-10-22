import { Component } from "react";
import { connect } from "react-redux";
import * as action from './../../actions/index';
import {Link} from 'react-router-dom';
import {Table} from 'antd';

const columns = [
    {
        title: '',
        key: 'MaKhoaHoc',
        render: (record) => <img alt={record.MaKhoaHoc} className="img-khoahoc" src={record.AnhKhoaHoc} />
    },
    {
        title: 'Khóa học',
        key: 'TenKhoaHoc',
        render: (record) => <Link to={`/khoahoc/${record.MaKhoaHoc}`} className="name-kh">{record.TenKhoaHoc}</Link>
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

class Khoahoccuatoi extends Component{
    componentDidMount(){
        var log = localStorage.getItem('user');
        var jslog = JSON.parse(log);
        this.props.requestKhoaHocKH(jslog.makh);
    }

    render() {
        var {khoahoc} = this.props;
        return (
            <div>
               <Table columns={columns} dataSource = {khoahoc} />
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
        requestKhoaHocKH: (idkh) =>{
            dispatch(action.requestKhoaHocKH(idkh));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Khoahoccuatoi);
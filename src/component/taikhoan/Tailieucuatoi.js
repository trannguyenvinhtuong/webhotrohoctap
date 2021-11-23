import { Component } from "react";
import { connect } from "react-redux";
import * as action from './../../actions/index';
import {Link} from 'react-router-dom';
import {Table} from 'antd';

const columns = [
    {
        title: '',
        key: 'MaTL',
        render: (record) => <img alt={record.MaTL} className="img-khoahoc" src={record.AnhTL} />
    },
    {
        title: 'Tài liệu',
        key: 'MaTL',
        render: (record) => <Link to={`/tailieu/${record.MaTL}`} className="name-kh">{record.TenTL}</Link>
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

class Tailieucuatoi extends Component{
    componentDidMount(){
        var log = localStorage.getItem('user');
        var jslog = JSON.parse(log);
        this.props.requestTaiLieuKH(jslog.makh);
    }

    render() {
        var {tailieu} = this.props;
        return (
            <div>
               <Table columns={columns} dataSource = {tailieu} rowKey="MaTL" />
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        tailieu: state.gettailieu
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        requestTaiLieuKH: (idkh) =>{
            dispatch(action.requestTaiLieuKH(idkh));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Tailieucuatoi);
import { Component } from "react";
import { connect } from "react-redux";
import * as action from './../../actions/index';
import {Link} from 'react-router-dom';
import {Table} from 'antd';

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

class Alldisplay extends Component{
    componentDidMount(){
        var {match} = this.props;
        var idkh = match.match.params.idkh;
        this.props.requestKhoaHocTheoGV(idkh);
    }

    render() {
        var {khoahoc} = this.props;
        // console.log(khoahoc);
        return (
            <div style={{marginTop:'4.3rem'}} className="container">
                <Table columns={columns} dataSource = {khoahoc} rowKey="MaKhoaHoc" />
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        khoahoc: state.getkhoahoctheogv
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        requestKhoaHocTheoGV:(idkh) =>{
            dispatch(action.requestKhoaHocTheoGV(idkh));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Alldisplay);
import { Component } from "react";
import { connect } from "react-redux";
import * as action from './../../actions/index';
import {Table} from 'antd';
import './../../SASS/quantritk.sass';
import {Link} from 'react-router-dom';

class Ketquahoctap extends Component{
    componentDidMount(){
        var user = JSON.parse(localStorage.getItem('user'));
        var idkh = user.makh;
        this.props.requestKetQua(idkh);
    }
    render() {
        var {getketqua} = this.props;
        const column = [
            {
                title: 'Mã đề',
                render: (record) => <p className="ketqua">{record.MaDe}</p>
            },
            {
                title: 'Tên bài kiểm tra',
                render: (record) => <p className="ketqua">{record.TenDe}</p>
            },
            {
                title: 'Kết quả',
                render: (record) => <p className="ketqua">{record.Diem} / 10</p>
            },
            {
                title: '',
                render: (record) => <Link to={`/nguoidung/bangxephang/${record.MaDe}`}>Xem bảng xếp hạng</Link>
            }
        ]
        return (
            <div className="container ketqua">
                <Table dataSource={getketqua} columns={column} rowKey="id" />
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        getketqua: state.getketqua
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        requestKetQua: (idkh) =>{
            dispatch(action.requestKetQua(idkh));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Ketquahoctap);
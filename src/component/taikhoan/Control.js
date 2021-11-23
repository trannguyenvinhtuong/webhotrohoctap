import { Component } from "react";
import {Table} from 'antd';
import Doimatkhau from './Doimatkhau';
import Khoahoccuatoi from './Khoahoccuatoi';
import Thongtintk from './Thongtintk';
import Dangxuat from './Dangxuat';
import Giangvien from './Giangvien';
import Tailieucuatoi from './Tailieucuatoi';
import Thongtindonhang from './Thongtindonhang';
import {connect} from 'react-redux';
import * as action from './../../actions/index';

class Control extends Component{   

    onChangePage = (compo) =>{
        this.props.onChangePage(compo);
    }

    render() {
        const controlSrc = [
            {
                key: '1',
                name: 'Thông tin tài khoản',
                link: <Thongtintk />
            },
            {
                key: '7',
                name: 'Thông tin đơn hàng',
                link: <Thongtindonhang />
            }, 
            {
                key: '2',
                name: 'Đổi mật khẩu',
                link: <Doimatkhau />
            },
            {
                key: '3',
                name: 'Khóa học của tôi',
                link: <Khoahoccuatoi />
            },
            {
                key: '4',
                name: 'Tài liệu của tôi',
                link: <Tailieucuatoi />
            },
            {
                key: '5',
                name: 'Giảng viên',
                link: <Giangvien />
            },
            {
                key: '6',
                name: 'Đăng xuất',
                link: <Dangxuat />
            }            
        ]
        const column=[
            {
                title: 'Quản lý tài khoản',
                key: 'key',
                render: (record) => <a className="link-nav-qltk" onClick={()=>this.onChangePage(record.link)}>{record.name}</a>
            }
        ]
        return (
            <div>
                <Table dataSource={controlSrc} columns={column} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        onChangePage: (page) =>{
            dispatch(action.changePageTK(page));
        }
    }
}

export default connect(null,mapDispatchToProps)(Control);
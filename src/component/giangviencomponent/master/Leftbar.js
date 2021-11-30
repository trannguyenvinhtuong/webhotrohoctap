import { Component } from "react";
import * as action from './../../../actions/index';
import Dashboard from "../sitecomponent/Dashboard";
import Khoahoc from "../sitecomponent/Khoahoc";
import Tailieu from "./../sitecomponent/Tailieu";
import Hoso from "./../sitecomponent/Hoso";
import Themkhoahoc from "../sitecomponent/khoahoc/Themkhoahoc";

import { connect } from "react-redux";
import Dethicuatoi from "../sitecomponent/Dethicuatoi";

class Leftbar extends Component {
    onClick = (page) =>{
        this.props.togglepagegiangvien(page);
    }
    showMenu = (menu) => {
        var rs = null;
        rs = menu.map((me, index) => {
            return (
                <div key = {index}>
                    <a onClick = {() => this.onClick(me.link)} key = {index}>
                        <i className={me.icon}></i>{me.name}
                    </a>
                    <br />
                    <br />
                </div> 
                );
        });
        return rs;
    }

    render() {
        const menus = [
            {
                icon: 'fas fa-home',
                name: 'Dashboard',
                link: <Dashboard />
            },
            {
                icon: 'fas fa-graduation-cap',
                name: 'Khoá học',
                link: <Khoahoc />
            },
            {
                icon: 'fas fa-file-word',
                name: 'Tài liệu',
                link: <Tailieu />
            },
            {
                icon: 'fas fa-user-tie',
                name: 'Hồ sơ giảng viên',
                link: <Hoso />
            },
            {
                icon: 'fas fa-envelope-open-text',
                name: 'Đề thi của tôi',
                link: <Dethicuatoi />
            }
        ];
        return (
            <div className="leftbar" style={{ paddingTop: '70px' }}>
                {this.showMenu(menus)}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return{
        togglepagegiangvien: (page) =>{
            dispatch(action.togglePageGiangVien(page));
        }
    }
}

export default connect(null, mapDispatchToProps)(Leftbar);
import { Component } from "react";
import './../../../stylecss/Style.css';
import Logo from './../../../imgs/LOGO_OF_LOGO.svg'
import Bg from './../../../imgs/background10.jpg'
import { Route, NavLink, Link } from "react-router-dom";
import './../../../stylecss/userstyle.css';

const menus = [
    {
        name: 'Trang chủ',
        to: '/',
        exact: true
    },
    {
        name: 'Danh mục',
        to: '/danhmuc',
        exact: false
    },
    {
        name: 'Kích hoạt khóa học',
        to: '/kichhoat',
        exact: false
    }
];
const Menulink = ({ label, to, activeOnlyWhenExact }) => {
    return (
        <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
            var active = match ? 'active-nav' : '';
            return (
                <NavLink to={to} className={`${active}`}>
                    {label}
                </NavLink>
            )
        }} />
    );
}


class NavbarHome extends Component {

    Showmenu = (menus) => {
        var rs = null;
        if (menus.length > 0) {
            rs = menus.map((menu, index) => {
                return (
                    <Menulink
                        key={index}
                        label={menu.name}
                        to={menu.to}
                        activeOnlyWhenExact={menu.exact}
                    />
                );
            });
        }
        return rs;
    }
    render() {
        var logg = sessionStorage.getItem('user');
        return (
            <header style={{ backgroundImage: `url(${Bg})` }}>
                <Link to='/' exact='true'>
                    <img srcset={Logo} />
                </Link>
                <div className="search">
                    <input type="text" placeholder="Tìm khóa học, chủ đề, giảng viên ...." />
                    <a href="#"><i className="fas fa-search"></i></a>
                </div>
                <nav>
                    {this.Showmenu(menus)}
                    {logg === null
                        ? <Menulink to="/dangnhap" label="Đăng nhập" activeOnlyWhenExact={false} />
                        : <Menulink to="/quantritk" label="Xin chào" activeOnlyWhenExact={false} />}
                            
                </nav>
            </header>
        );
    }
}

export default NavbarHome;
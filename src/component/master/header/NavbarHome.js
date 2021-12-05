import { Component } from "react";
import './../../../stylecss/Style.css';
import Logo from './../../../imgs/LOGO_OF_LOGO.svg'
import Bg from './../../../imgs/background10.jpg'
import { Route, NavLink, Link } from "react-router-dom";
import './../../../stylecss/userstyle.css';

const menus = [
    {
        name: 'Trang chủ',
        to: '/nguoidung',
        exact: true
    },
    {
        name: 'Danh mục',
        to: '/nguoidung/danhmuc',
        exact: false
    },
    {
        name: 'Kích hoạt khóa học',
        to: '/nguoidung/kichhoat',
        exact: false
    }
];
const Menulink = ({ label, to, activeOnlyWhenExact }) => {
    return (
        <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
            var active = match ? 'active-nav' : '';
            return (
                // <li class="nav-item">
                    <NavLink to={to} className={`${active}`}>
                        {label}
                    </NavLink>
                // </li>
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
        var logg = localStorage.getItem('user');
        return (
            <header style={{ backgroundImage: `url(${Bg})` }}>
                <Link to='/nguoidung' exact='true'>
                    <img src={Logo} />
                </Link>
                <div className="search">
                    <input type="text" placeholder="Tìm khóa học, chủ đề, giảng viên ...." />
                    <a href="#"><i className="fas fa-search"></i></a>
                </div>
                <nav>
                    {this.Showmenu(menus)}
                    {logg !== null ?
                        <Route path="/giohang" children={({ match }) => {
                            var active = match ? 'active-nav' : '';
                            return (
                                <NavLink to="/nguoidung/giohang" className={`${active}`}>
                                    <i className="fas fa-shopping-cart"></i> Giỏ hàng
                                </NavLink>
                            )
                        }} />
                    : ''
                    }
                    {logg === null
                        ? <Menulink to="/nguoidung/dangnhap" label="Đăng nhập" activeOnlyWhenExact={false} />
                        : <Menulink to="/nguoidung/quantritk" label="Xin chào" activeOnlyWhenExact={false} />}

                </nav>
            </header>
            // <nav class="navbar navbar-expand-lg navbar-light bg-light">
            //     <div class="container-fluid">
            //         <Link class="navbar-brand" to='/nguoidung'>
            //             <img src={Logo} />
            //         </Link>
            //         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            //             <span class="navbar-toggler-icon"></span>
            //         </button>
            //         <div class="collapse navbar-collapse" id="navbarSupportedContent">
            //             <div className="search">
            //                 <input type="text" placeholder="Tìm khóa học, chủ đề, giảng viên ...." />
            //                 <a href="#"><i className="fas fa-search"></i></a>
            //             </div>
            //             <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            //                 {this.Showmenu(menus)}
            //                 {logg !== null ?
            //                     <Route path="/giohang" children={({ match }) => {
            //                         var active = match ? 'active-nav' : '';
            //                         return (
            //                             <li class="nav-item">
            //                                 <NavLink to="/nguoidung/giohang" className={`${active}`}>
            //                                     <i className="fas fa-shopping-cart"></i> Giỏ hàng
            //                                 </NavLink>
            //                             </li>
            //                         )
            //                     }} />
            //                     : ''
            //                 }
            //                 {logg === null
            //                     ? <Menulink to="/nguoidung/dangnhap" label="Đăng nhập" activeOnlyWhenExact={false} />
            //                     : <Menulink to="/nguoidung/quantritk" label="Xin chào" activeOnlyWhenExact={false} />}
            //             </ul>
            //         </div>
            //     </div>
            // </nav>
        );
    }
}

export default NavbarHome;
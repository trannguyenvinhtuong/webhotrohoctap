import { Component } from "react";
import './../../../stylecss/Style.css';
import Logo from './../../../imgs/LOGO_OF_LOGO.svg'
import Bg from './../../../imgs/background10.jpg'
import { Route, NavLink, Link, withRouter } from "react-router-dom";
import './../../../stylecss/userstyle.css';

const menus = [
    {
        name: 'Trang chủ',
        to: '/nguoidung',
        exact: true
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
                <NavLink to={to} className={`${active} nav-link link-style`}>
                    {label}
                </NavLink>
                // </li>
            )
        }} />
    );
}


class NavbarHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keytimkiem: ''
        }
    }

    Showmenu = (menus) => {
        var rs = null;
        if (menus.length > 0) {
            rs = menus.map((menu, index) => {
                return (
                    <li className="nav-item">
                        <Menulink
                            key={index}
                            label={menu.name}
                            to={menu.to}
                            activeOnlyWhenExact={menu.exact}
                        />
                    </li>
                );
            });
        }
        return rs;
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    onSubmitSearch = (e) => {
        e.preventDefault();
        var { keytimkiem } = this.state;
        if (keytimkiem != '') {
            this.props.history.push('/nguoidung/searchpage/' + keytimkiem);
        }
        else {
            this.props.history.push('/nguoidung/searchpage/0');
        }

    }

    render() {
        var logg = localStorage.getItem('user');
        var { keytimkiem } = this.state;
        return (
            // <header style={{ backgroundImage: `url(${Bg})` }}>
            //     <Link to='/nguoidung' exact='true'>
            //         <img src={Logo} />
            //     </Link>
            //     <div className="search">
            //         <form onSubmit={this.onSubmitSearch}>
            //             <input type="text"
            //                     onChange={this.onChange}
            //                     name="keytimkiem"
            //                     value={keytimkiem}
            //                     placeholder="Tìm khóa học, chủ đề, giảng viên ...." />
            //             <a onClick={this.onSubmitSearch}><i className="fas fa-search"></i></a>
            //         </form>                                     
            //     </div>
            //     <nav>
            //         {this.Showmenu(menus)}
            //         {logg !== null ?
            //             <Route path="/giohang" children={({ match }) => {
            //                 var active = match ? 'active-nav' : '';
            //                 return (
            //                     <NavLink to="/nguoidung/giohang" className={`${active}`}>
            //                         <i className="fas fa-shopping-cart"></i> Giỏ hàng
            //                     </NavLink>
            //                 )
            //             }} />
            //         : ''
            //         }
            //         {logg === null
            //             ? <Menulink to="/nguoidung/dangnhap" label="Đăng nhập" activeOnlyWhenExact={false} />
            //             : <Menulink to="/nguoidung/quantritk" label="Xin chào" activeOnlyWhenExact={false} />}

            //     </nav>
            // </header>
            <nav style={{ backgroundImage: `url(${Bg})`, padding: '.8rem 3%' }} class="navbar navbar-expand-lg fixed-top navbar-light bg-light">
                <div class="container-fluid">
                    <Link class="navbar-brand" to='/nguoidung'>
                        <img className="img-nav" src={Logo} />
                    </Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="search ms-auto search">
                            <form onSubmit={this.onSubmitSearch}>
                                <input type="text"
                                    onChange={this.onChange}
                                    name="keytimkiem"
                                    value={keytimkiem}
                                    placeholder="Tìm khóa học, chủ đề, giảng viên ...." />
                                <a onClick={this.onSubmitSearch}><i className="fas fa-search"></i></a>
                            </form>
                        </div>
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            {this.Showmenu(menus)}
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle link-style" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Danh mục
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/nguoidung/alldisplay/1">Toán học</Link></li>
                                    <li><Link className="dropdown-item" to="/nguoidung/alldisplay/2">Văn học</Link></li>
                                    <li><Link className="dropdown-item" to="/nguoidung/alldisplay/3">Vật lý</Link></li>
                                    <li><Link className="dropdown-item" to="/nguoidung/alldisplay/11">Ngoại ngữ</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/nguoidung/danhmuc">Xem tất cả</Link></li>
                                </ul>
                            </li>
                            {logg !== null ?
                                <Route path="/giohang" children={({ match }) => {
                                    var active = match ? 'active-nav' : '';
                                    return (
                                        <li class="nav-item">
                                            <NavLink to="/nguoidung/giohang" className={`${active} nav-link link-style`}>
                                                <i className="fas fa-shopping-cart"></i> Giỏ hàng
                                            </NavLink>
                                        </li>
                                    )
                                }} />
                                : ''
                            }
                            {logg === null
                                ? <Menulink to="/nguoidung/dangnhap" label="Đăng nhập" activeOnlyWhenExact={false} />
                                : <Menulink to="/nguoidung/quantritk" label="Xin chào" activeOnlyWhenExact={false} />}
                        </ul>
                    </div>
                </div>
            </nav>

        );
    }
}

export default withRouter(NavbarHome);
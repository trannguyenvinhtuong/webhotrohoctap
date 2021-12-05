import { Component } from "react";
import './../../../SASS/admin.sass';
import Swal from "sweetalert2";

class Nav extends Component {
    onLogout = () => {
        Swal.fire({
            title: 'Bạn có muốn đăng xuất?',
            text: "Bạn có thể đăng nhập lại!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('admin');
                window.location.reload();
            }
        })
    }
    render() {
        return (
            <div className="nav-admin">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand brand-admin" href="#">Admin Central</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Contact</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={this.onLogout}>Đăng xuất</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Nav;
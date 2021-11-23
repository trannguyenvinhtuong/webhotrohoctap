import { Component } from "react";
import Logo from './../../../imgs/LOGO_OF_LOGO.svg';
import './../../../SASS/giangvienpage.sass';

class Navbar extends Component{
    render() {
        return (
            <div className="giangvien-nav">
                <a href="#">
                    <img src={Logo} />
                </a>
                <a href="#">
                    <h3>Teacher Dashboard</h3>
                </a>
                <a className="backtotk" href="http://tnvinhtuong0299.xyz:3000/nguoidung/quantritk">X</a>
            </div>
        );
    }
}

export default Navbar;
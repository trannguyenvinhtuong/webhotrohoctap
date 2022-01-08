import { Component } from "react";
import './../../SASS/thanhtoan.sass';
import './../../stylecss/progressbar.css';
import {Link} from 'react-router-dom';

class Thanhtoanthanhcong extends Component{
    onClick = () =>{
        sessionStorage.removeItem('cartdachon');
        sessionStorage.removeItem('tongtien');
        localStorage.removeItem('cart');
    }
    render() {
        return (
            <div className="thanhtoan container" style={{marginTop:'4.3rem'}}>
                <h1>Thanh toán</h1>
                <div className="containerprogress">
                    <ul className="progressbar">
                        <li className="done">Thông tin thanh toán</li>
                        <li className="done">Thông tin giỏ hàng</li>
                        <li className="done">Thành công</li>
                    </ul>
                </div>
                <br />
                <br />
                <br />
                <br />
                <h3 className="datthanhcong">Đặt hàng thành công</h3>
                <br />
                <Link to="/nguoidung" onClick={this.onClick}>
                    <button >Về trang chủ</button>
                </Link>  
                <br />
                <br />
            </div>
        );
    }
}

export default Thanhtoanthanhcong;
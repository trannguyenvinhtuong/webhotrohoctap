import { Component } from "react";
import './../../SASS/giohang.sass';
import {Link} from 'react-router-dom';

class Showgiohangrong extends Component{
    render() {
        return (
            <div className="giohang-rong">
                <h1>Giỏ hàng đang trống</h1>
                <h2>Thêm sản phẩm vào giỏ ngay!</h2>
                <br/>
                <div className="btn-option can-giua">
                    <Link to="/nguoidung/alldisplay/0">
                        <button className="btn-khoahoc">Khóa học</button>
                    </Link>
                    <Link to="/nguoidung/alldisplaytailieu/0">
                        <button className="btn-tailieu">Tài liệu</button>
                    </Link>                    
                </div>
                <br/>
                <br/>
                <Link to="/nguoidung">
                    <button className="btn-vetrangchu can-giua">Về trang chủ</button>
                </Link>                
            </div>
        );
    }
}

export default Showgiohangrong;
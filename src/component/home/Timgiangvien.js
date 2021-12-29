import { Component } from "react";
import anh from './../../imgs/anhnguoibian.jpg';
import {Link} from 'react-router-dom';

class Timgiangvien extends Component{
    render() {
        return (
            <div className="container timgiangvien" style={{backgroundImage: `url(${anh})`}}>
                <div className="container">
                    <br />
                    <br />
                    <br />
                    <h2 className="timgiangvien-h2">Bạn tìm thấy bức ảnh của một giảng viên trên mạng nhưng không biết họ là ai?</h2>
                    <br />
                    <br />
                    <Link to="/nguoidung/nhandien">
                        <button>Tra cứu ngay!</button>
                    </Link>                    
                </div>
            </div>
        );
    }
}

export default Timgiangvien;
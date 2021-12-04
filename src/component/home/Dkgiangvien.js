import Button from "@restart/ui/esm/Button";
import { Component } from "react";
import anh from './../../imgs/anhbanner.jpg'
import {Link} from 'react-router-dom';

class Dkgiangvien extends Component {
    render() {
        return (
            <div style={{ backgroundImage: `url(${anh})` }} className="dkgv">
                <h1>Trở thành giảng viên</h1>
                <p>Gia nhập đội ngũ giảng viên nhiệt tình, giàu kinh nghiệm</p>
                <Link to="/nguoidung/dangkygiangvien">
                    <Button className="btn-dkgv">Đăng ký ngay !</Button>
                </Link>
            </div>
        );
    }
}

export default Dkgiangvien;
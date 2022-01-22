import { Component } from "react";
import './../../SASS/detail.sass';
import {Link} from 'react-router-dom';

class Hoanthanh extends Component{
    onClick = () =>{
        sessionStorage.removeItem('diem');
    }
    render() {
        var data = JSON.parse(sessionStorage.getItem('diem'));
        var made = data.made;
        return (
            <div className="hoanthanhkt container">
                <br />
                <h1>Chúc mừng bạn đã hoàn thành bài kiểm tra!</h1>
                <br />
                <h3>Điểm số của bạn là: {data.diem}/10 </h3>
                <div>
                    <p>Số câu đúng: {data.socaudung}</p>
                    <p>Số câu sai: {data.socausai}</p>
                </div>
                <br />
                <Link to="/nguoidung" onClick={this.onClick}>
                    <button className="can-giua hoanthanh-btn btn-primary">Về trang chủ</button>
                </Link>  
                <Link to="/nguoidung" onClick={this.onClick}>
                    <button className="can-giua hoanthanh-btn btn-success">Xem đáp án</button>
                </Link> 
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        );
    }
}

export default Hoanthanh;
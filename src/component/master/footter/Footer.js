import { Component } from "react";
import logo from "./../../../imgs/LOGO_OF_LOGO.svg";

class Footer extends Component{
    render(){
        return( 
            <div className="footer-style">
                <div className="container">
                    <img src={logo} />
                    <h2>Đề tài 152: Xây dựng Website Hỗ Trợ Học Tập</h2>
                    <div className="row">
                        <div className="col">
                            <h3>Sinh viên thực hiện</h3>
                            <p>Trần Nguyễn Vĩnh Tường</p>
                            <p>Ngô Hồng Phúc</p>
                            <p>Nguyễn Lê Phước Hậu</p>
                        </div>
                        <div className="col">
                            <h3>Mã số sinh viên</h3>
                            <p>2001170228</p>
                            <p>2001170132</p>
                            <p>2001181102</p>
                        </div>
                        <div className="col">
                            <h3>Liên hệ</h3>
                            <p>vinhtuong.doubleshit@gmail.com</p>
                            <p>phucsinnet113@gmail.com</p>
                            <p>bennumber186@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
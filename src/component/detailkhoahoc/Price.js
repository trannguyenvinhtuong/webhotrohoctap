import { Component } from "react";

class Price extends Component {
    render() {
        return (
            <div className="detail-price">
                <div>
                    <h1>297,000đ</h1>
                    <h2>600,000đ</h2>
                    <h3>(50% off)</h3>
                </div>
                <br/>
                <br/>
                <p className="thoigian-ud">
                    <i class="fas fa-hourglass-start"></i>                      
                    Thời gian ưu đãi còn 1 ngày
                </p>
                <button className="dangkyhoc">ĐĂNG KÝ HỌC</button>  
                <br />
                <button className="themvaogio">
                    <i class="fas fa-cart-plus"></i>
                    Thêm vào giỏ
                </button>    
                <br />
                <br />             
                <p class="thongtin">
                    <i class="far fa-clock"></i>
                    Thời lượng:
                    <span>06 giờ 36 phút</span>
                </p>
                <p class="thongtin">
                    <i class="fas fa-play"></i>
                    Giáo trình:
                    <span>63 bài giảng</span>
                </p>
                <p class="thongtin">
                    <i class="fas fa-history"></i>
                    Sở hữu khóa học trọn đời
                </p>
                <p class="thongtin">
                    <i class="far fa-file"></i>
                    Cấp chứng nhận hoàn thành
                </p>
                <p class="thongtin">
                    <i class="fas fa-percent"></i>
                    Giảm thêm 20% khi thanh toán online
                </p>
            </div>
        );
    }
}

export default Price;
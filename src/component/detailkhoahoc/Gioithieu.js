import { Component } from "react";
import './../../SASS/detail.sass';
import im from './../../imgs/person.jpg';
import { Row, Col } from 'antd';

class Gioithieu extends Component {
    render() {
        return (
            
                    <div className="detail-gioithieu">
                        <h1>Nhập môn chứng khoán</h1>
                        <p>
                            Khóa học chứng khoán online giúp bạn nắm bắt được kiến thức đầu tư chứng khoán đầy đủ, bài bản và chi tiết nhất dành cho người mới bắt đầu tham gia. Bí quyết để nhanh chóng có được nguồn lợi nhuận khổng lồ từ thị trường chứng khoán
                        </p>
                        <div>
                            <img src={im} />
                            <span>Đặng Trọng Khang</span>
                            <span>
                                <i class="far fa-smile" style={{ color: 'yellow' }}></i>
                                3950 Đánh giá
                            </span>
                            <span>
                                <i class="fas fa-user-graduate"></i>
                                4554 Học viên
                            </span>
                        </div>
                    </div>
             

        );
    }
}

export default Gioithieu;
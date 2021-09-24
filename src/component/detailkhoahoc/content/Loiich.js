import { Component } from "react";
import './../../../SASS/detail.sass';
import { Row, Col } from 'antd';

class Loiich extends Component {
    render() {
        return (
            <div className="gt-qc">
                <h1>Bạn sẽ học được gì</h1>
                <Row>
                    <Col span={12}>
                        <p>
                            <i class="fas fa-check"></i>
                            Kiến thức cơ bản nhất về thị trường chứng khoán, về đầu tư chứng khoán và tiềm năng
                        </p>
                        <p>
                            <i class="fas fa-check"></i>
                            Nắm được những công cụ để đánh giá, phân tích và đầu tư chứng khoán sớm có lời lãi
                        </p>
                        <p>
                            <i class="fas fa-check"></i>
                            Nhanh chóng biết cách đầu tư chứng khoán để đem về nguồn lợi nhuận khổng lồ
                        </p>
                    </Col>
                    <Col span={12}>
                        <p>
                            <i class="fas fa-check"></i>
                            Có được tư duy đúng trong đầu tư cổ phiếu hiệu quả, thông minh
                        </p>
                        <p>
                            <i class="fas fa-check"></i>
                            Tránh được những rủi ro thua lỗ, cạm bẫy trên TTCK
                        </p>
                        <p>
                            <i class="fas fa-check"></i>
                            Đầy đủ những hướng dẫn "cầm tay chỉ việc" để có thể tự tin tham gia TTCK
                        </p>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Loiich;
import { Component } from "react";
import './../../SASS/detail.sass';
import { Row, Col } from 'antd';
import ah from './../../imgs/vatly.jpg';

class Tacgia extends Component {
    render() {
        return (
            <div style={{ padding: '1rem 4rem 1rem 4rem' }}>
                <div className="gt-qc ttgv">
                    <h1>Thông tin giảng viên</h1>
                    <Row>
                        <Col span={6} style={{ textAlign: 'center' }}>
                            <img src={ah} />
                            <br />
                            <p>
                                <i class="fas fa-user-friends"></i>
                                17594 học viên
                            </p>
                            <p style={{ marginTop: '-2rem' }}>
                                <i class="fab fa-discourse"></i>
                                6 khóa học
                            </p>
                        </Col>
                        <Col span={18}>
                            <h2>Đặng Trọng Khang</h2>
                            <i>Causality Investing Speaker</i>
                            <br />
                            <br />
                            <div>
                                Giảng viên Đặng Trọng Khang là người có thâm niên đầu tư thực tế gần 15 năm trong thị trường chứng khoán từ 2006 - 2020
                            </div>
                            <div>
                                Người chia sẻ về Phương pháp đầu tư chứng khoán theo Luật Nhân Quả - Causality Investing
                            </div>
                            <div>
                                Chuyên gia chứng khoán tại NIK Capital
                            </div>
                            <div>
                                CEO CTCP Minh Bảo Tín
                            </div>
                            <div>
                                Trưởng VPDD Bình Dương - Cty chứng khoán Vietcombank (2016 - 2018)
                            </div>
                            <div>
                                Từ 2014 đến nay, đã chia sẻ cho hơn 65.000 lượt người về đầu tư chứng khoán qua các khoá học kinh doanh "đỉnh cao"
                            </div>
                            <div>
                                Là diễn giả về đầu tư cổ phiếu được đánh giá cao tại Việt Nam
                            </div>
                            <div>
                                Được mời đứng chung sân khấu với nhiều doanh nhân - diễn giả hàng đầu như Thầy John C.Maxwell, Thầy Mark Victor Hansen, Doanh nhân Phạm Đình Đoàn, Doanh nhân Đỗ Cao Bảo, Thầy Nguyễn Thành Tiến...
                            </div>
                            <div>
                                Website: https://dangtrongkhang.com/
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Tacgia;
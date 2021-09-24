import { Component } from "react";
import {Link} from 'react-router-dom';
import at from './../../imgs/amthuc.jpg';
import cntt from './../../imgs/cntt.jpg';
import de from './../../imgs/designer.jpg';
import dl from './../../imgs/dulich.jpg';
import hh from './../../imgs/hoahoc.jpg';
import kt from './../../imgs/ketoan.jpg';
import an from './../../imgs/anhnennuoc.jpg'

class Chude extends Component {
    render() {
        return (
            <div className="back-cd" style={{ backgroundImage: `url(${an})`}}>
                <div className="container khoahoc">
                    <h3>CHỦ ĐỀ</h3>
                    <br />
                    <div className="row">
                        <div className="col-4 p-cd">
                            <a href="#">
                                <div className="chude" style={{ backgroundImage: `url(${at})` }}>
                                    <h3>Ẩm thực</h3>
                                </div>
                            </a>
                        </div>
                        <div className="col-4 p-cd">
                            <a href="#">
                                <div className="chude" style={{ backgroundImage: `url(${de})` }}>
                                    <h3>Thiết kế</h3>
                                </div>
                            </a>
                        </div>
                        <div className="col-4 p-cd">
                            <a href="#">
                                <div className="chude" style={{ backgroundImage: `url(${dl})` }}>
                                    <h3>Du lịch</h3>
                                </div>
                            </a>
                        </div>
                        <div className="col-4 p-cd">
                            <a href="#">
                                <div className="chude" style={{ backgroundImage: `url(${cntt})` }}>
                                    <h3>Công nghệ</h3>
                                </div>
                            </a>
                        </div>
                        <div className="col-4 p-cd">
                            <a href="#">
                                <div className="chude" style={{ backgroundImage: `url(${kt})` }}>
                                    <h3>Kế toán</h3>
                                </div>
                            </a>
                        </div>
                        <div className="col-4 p-cd">
                            <a href="#">
                                <div className="chude" style={{ backgroundImage: `url(${hh})` }}>
                                    <h3>Hóa học</h3>
                                </div>
                            </a>
                        </div>
                    </div>
                    <Link to="/danhmuc" className="xemthem">Xem thêm
                        <i class="fas fa-angle-double-right" style={{ color: '#0d6efd' }}></i>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Chude;
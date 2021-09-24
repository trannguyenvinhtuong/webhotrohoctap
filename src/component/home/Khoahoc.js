import { Component } from "react";
import bk from './../../imgs/background2.jpg';
import {Link} from 'react-router-dom';

class Khoahoc extends Component {
    render() {
        return (
            <div className="container khoahoc">
                <h3>KHÓA HỌC</h3>
                <br />
                <div className="row">
                    <div className="col-md-3 p-kh">
                        <div className="sanpham">
                            <Link to="/Detailkhoahoc">
                                <img src={bk} />
                                <h3>Học đệm hát Guitar cùng Haketu</h3>
                                <div className="thongtin-sp row">
                                    <div className="col">
                                        <h1>Hà Kế Tú</h1>
                                    </div>
                                    <div className="col">
                                        <p className="giacu">700.000đ</p>
                                        <p className="giamoi">199.000đ</p>
                                    </div>
                                </div>
                            </Link>
                        </div>                       
                    </div>
                    <div className="col-md-3 p-kh">
                        <div className="sanpham">
                            <Link to="/Detailkhoahoc">
                                <img src={bk} />
                                <h3>Học đệm hát Guitar cùng Haketu</h3>
                                <div className="thongtin-sp row">
                                    <div className="col">
                                        <h1>Hà Kế Tú</h1>
                                    </div>
                                    <div className="col">
                                        <p className="giacu">700.000đ</p>
                                        <p className="giamoi">199.000đ</p>
                                    </div>
                                </div>
                            </Link>
                        </div>       
                    </div>
                    <div className="col-md-3 p-kh">
                        <div className="sanpham">
                            <Link to="/Detailkhoahoc">
                                <img src={bk} />
                                <h3>Học đệm hát Guitar cùng Haketu</h3>
                                <div className="thongtin-sp row">
                                    <div className="col">
                                        <h1>Hà Kế Tú</h1>
                                    </div>
                                    <div className="col">
                                        <p className="giacu">700.000đ</p>
                                        <p className="giamoi">199.000đ</p>
                                    </div>
                                </div>
                            </Link>
                        </div>       
                    </div>
                    <div className="col-md-3 p-kh">
                        <div className="sanpham">
                            <Link to="/Detailkhoahoc">
                                <img src={bk} />
                                <h3>Học đệm hát Guitar cùng Haketu</h3>
                                <div className="thongtin-sp row">
                                    <div className="col">
                                        <h1>Hà Kế Tú</h1>
                                    </div>
                                    <div className="col">
                                        <p className="giacu">700.000đ</p>
                                        <p className="giamoi">199.000đ</p>
                                    </div>
                                </div>
                            </Link>
                        </div>       
                    </div>
                    <div className="col-md-3 p-kh">
                        <div className="sanpham">
                            <Link to="/Detailkhoahoc">
                                <img src={bk} />
                                <h3>Học đệm hát Guitar cùng Haketu</h3>
                                <div className="thongtin-sp row">
                                    <div className="col">
                                        <h1>Hà Kế Tú</h1>
                                    </div>
                                    <div className="col">
                                        <p className="giacu">700.000đ</p>
                                        <p className="giamoi">199.000đ</p>
                                    </div>
                                </div>
                            </Link>
                        </div>       
                    </div>
                    <div className="col-md-3 p-kh">
                        <div className="sanpham">
                            <Link to="/Detailkhoahoc">
                                <img src={bk} />
                                <h3>Học đệm hát Guitar cùng Haketu</h3>
                                <div className="thongtin-sp row">
                                    <div className="col">
                                        <h1>Hà Kế Tú</h1>
                                    </div>
                                    <div className="col">
                                        <p className="giacu">700.000đ</p>
                                        <p className="giamoi">199.000đ</p>
                                    </div>
                                </div>
                            </Link>
                        </div>       
                    </div>
                    <div className="col-md-3 p-kh">
                        <div className="sanpham">
                            <Link to="/Detailkhoahoc">
                                <img src={bk} />
                                <h3>Học đệm hát Guitar cùng Haketu</h3>
                                <div className="thongtin-sp row">
                                    <div className="col">
                                        <h1>Hà Kế Tú</h1>
                                    </div>
                                    <div className="col">
                                        <p className="giacu">700.000đ</p>
                                        <p className="giamoi">199.000đ</p>
                                    </div>
                                </div>
                            </Link>
                        </div>       
                    </div>
                    <div className="col-md-3 p-kh">
                        <div className="sanpham">
                            <Link to="/Detailkhoahoc">
                                <img src={bk} />
                                <h3>Học đệm hát Guitar cùng Haketu</h3>
                                <div className="thongtin-sp row">
                                    <div className="col">
                                        <h1>Hà Kế Tú</h1>
                                    </div>
                                    <div className="col">
                                        <p className="giacu">700.000đ</p>
                                        <p className="giamoi">199.000đ</p>
                                    </div>
                                </div>
                            </Link>
                        </div>       
                    </div>
                </div>
                <Link to="/thongtin" className="xemthem">Xem thêm  
                    <i class="fas fa-angle-double-right" style={{color:'#0d6efd'}}></i>
                </Link>
            </div>
        );
    }
}

export default Khoahoc;
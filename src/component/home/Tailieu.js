import { Component } from "react";
import bk from './../../imgs/background2.jpg';
import {Link} from 'react-router-dom';

class Tailieu extends Component {
    render() {
        return (
            <div className="container khoahoc">
                <h3>TÀI LIỆU</h3>
                <br />
                <div className="row">
                    <div className="col-md-3 p-kh">
                        <div className="sanpham">
                            <Link to='/tailieu'>
                                <img src={bk} />
                                <h3>Học đệm hát Guitar cùng Haketu</h3>
                                <div className="thongtin-sp row">
                                    <div className="col">
                                        <h1>Công nghệ</h1>
                                    </div>
                                    <div className="col">                                        
                                        <p className="giatailieu">Miễn phí</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-3 p-kh">
                        <div className="sanpham">
                            <Link to='/tailieu'>
                                <img src={bk} />
                                <h3>Học đệm hát Guitar cùng Haketu</h3>
                                <div className="thongtin-sp row">
                                    <div className="col">
                                        <h1>Công nghệ</h1>
                                    </div>
                                    <div className="col">                                        
                                        <p className="giatailieu">Miễn phí</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-3 p-kh">
                        <div className="sanpham">
                            <Link to='/tailieu'>
                                <img src={bk} />
                                <h3>Học đệm hát Guitar cùng Haketu</h3>
                                <div className="thongtin-sp row">
                                    <div className="col">
                                        <h1>Công nghệ</h1>
                                    </div>
                                    <div className="col">                                        
                                        <p className="giatailieu">Miễn phí</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-3 p-kh">
                        <div className="sanpham">
                            <Link to='/tailieu'>
                                <img src={bk} />
                                <h3>Học đệm hát Guitar cùng Haketu</h3>
                                <div className="thongtin-sp row">
                                    <div className="col">
                                        <h1>Công nghệ</h1>
                                    </div>
                                    <div className="col">                                        
                                        <p className="giatailieu">Miễn phí</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-3 p-kh">
                        <div className="sanpham">
                            <Link to='/tailieu'>
                                <img src={bk} />
                                <h3>Học đệm hát Guitar cùng Haketu</h3>
                                <div className="thongtin-sp row">
                                    <div className="col">
                                        <h1>Công nghệ</h1>
                                    </div>
                                    <div className="col">                                        
                                        <p className="giatailieu">Miễn phí</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-3 p-kh">
                        <div className="sanpham">
                            <Link to='/tailieu'>
                                <img src={bk} />
                                <h3>Học đệm hát Guitar cùng Haketu</h3>
                                <div className="thongtin-sp row">
                                    <div className="col">
                                        <h1>Công nghệ</h1>
                                    </div>
                                    <div className="col">                                        
                                        <p className="giatailieu">Miễn phí</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-3 p-kh">
                        <div className="sanpham">
                            <Link to='/tailieu'>
                                <img src={bk} />
                                <h3>Học đệm hát Guitar cùng Haketu</h3>
                                <div className="thongtin-sp row">
                                    <div className="col">
                                        <h1>Công nghệ</h1>
                                    </div>
                                    <div className="col">                                        
                                        <p className="giatailieu">Miễn phí</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-3 p-kh">
                        <div className="sanpham">
                            <Link to='/tailieu'>
                                <img src={bk} />
                                <h3>Học đệm hát Guitar cùng Haketu</h3>
                                <div className="thongtin-sp row">
                                    <div className="col">
                                        <h1>Công nghệ</h1>
                                    </div>
                                    <div className="col">                                        
                                        <p className="giatailieu">Miễn phí</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <Link to="/alldisplay" className="xemthem">Xem thêm
                    <i class="fas fa-angle-double-right" style={{ color: '#0d6efd' }}></i>
                </Link>
            </div>
        );
    }
}

export default Tailieu;